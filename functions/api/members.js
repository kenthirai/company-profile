async function verifyJWT(token, secret) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const dataToSign = `${encodedHeader}.${encodedPayload}`;
    
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );
    
    const base64UrlDecode = (str) => {
      let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
      while (base64.length % 4) base64 += '=';
      return atob(base64);
    };

    const decodedSignature = base64UrlDecode(encodedSignature);
    const signature = new Uint8Array(decodedSignature.split('').map(c => c.charCodeAt(0)));
    
    const isValid = await crypto.subtle.verify('HMAC', key, signature, encoder.encode(dataToSign));
    if (!isValid) return false;
    
    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return false; 
    
    return true;
  } catch (e) {
    return false;
  }
}

async function checkAuth(request, env) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false;
  }
  const token = authHeader.split(' ')[1];
  return await verifyJWT(token, env.JWT_SECRET);
}

export async function onRequestGet(context) {
  const { env } = context;
  try {
    const { results } = await env.DB.prepare("SELECT * FROM team_members").all();
    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  if (!(await checkAuth(request, env))) return new Response("Unauthorized", { status: 401 });

  try {
    const data = await request.json();
    const { name, role, image_url, twitter_url, linkedin_url, github_url } = data;
    
    const info = await env.DB.prepare(
      "INSERT INTO team_members (name, role, image_url, twitter_url, linkedin_url, github_url) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(name, role, image_url || '', twitter_url || '', linkedin_url || '', github_url || '').run();
    
    return new Response(JSON.stringify({ success: true, id: info.lastRowId }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function onRequestPut(context) {
  const { request, env } = context;
  if (!(await checkAuth(request, env))) return new Response("Unauthorized", { status: 401 });

  try {
    const data = await request.json();
    const { id, name, role, image_url, twitter_url, linkedin_url, github_url } = data;
    
    await env.DB.prepare(
      "UPDATE team_members SET name = ?, role = ?, image_url = ?, twitter_url = ?, linkedin_url = ?, github_url = ? WHERE id = ?"
    ).bind(name, role, image_url || '', twitter_url || '', linkedin_url || '', github_url || '', id).run();
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function onRequestDelete(context) {
  const { request, env } = context;
  if (!(await checkAuth(request, env))) return new Response("Unauthorized", { status: 401 });

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) return new Response("Missing id", { status: 400 });
    
    await env.DB.prepare("DELETE FROM team_members WHERE id = ?").bind(id).run();
    
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
