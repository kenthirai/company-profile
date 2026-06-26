export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const type = url.searchParams.get('type');

  if (!type) {
    return new Response('Missing type parameter', { status: 400 });
  }

  let data;
  try {
    if (type === 'hero') {
      data = await env.DB.prepare('SELECT * FROM hero_content LIMIT 1').first();
    } else if (type === 'about') {
      data = await env.DB.prepare('SELECT * FROM about_content LIMIT 1').first();
    } else if (type === 'stats') {
      data = await env.DB.prepare('SELECT * FROM stats_content LIMIT 1').first();
    } else if (type === 'services') {
      data = await env.DB.prepare('SELECT * FROM services_content LIMIT 1').first();
    } else if (type === 'gallery') {
      data = await env.DB.prepare('SELECT * FROM gallery_content LIMIT 1').first();
    } else if (type === 'team') {
      data = await env.DB.prepare('SELECT * FROM team_content LIMIT 1').first();
    } else {
      return new Response('Unknown type', { status: 400 });
    }
    
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

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
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return false; // Token expired
    
    return true;
  } catch (e) {
    return false;
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const type = url.searchParams.get('type');

  // Check Authorization using JWT
  const authHeader = request.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response("Unauthorized", { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  const isValidJWT = await verifyJWT(token, env.JWT_SECRET);

  if (!isValidJWT) {
    return new Response("Unauthorized: Invalid Token", { status: 401 });
  }

  if (!type) {
    return new Response('Missing type parameter', { status: 400 });
  }

  try {
    const body = await request.json();

    if (type === 'hero') {
      const { title, subtitle } = body;
      await env.DB.prepare('UPDATE hero_content SET title = ?, subtitle = ? WHERE id = 1').bind(title, subtitle).run();
    } else if (type === 'about') {
      const { subtitle, title, description1, description2 } = body;
      await env.DB.prepare('UPDATE about_content SET subtitle = ?, title = ?, description1 = ?, description2 = ? WHERE id = 1').bind(subtitle, title, description1, description2).run();
    } else if (type === 'stats') {
      const { customers, projects, workers, offices } = body;
      await env.DB.prepare('UPDATE stats_content SET customers = ?, projects = ?, workers = ?, offices = ? WHERE id = 1').bind(customers, projects, workers, offices).run();
    } else if (type === 'services') {
      const { title, description } = body;
      await env.DB.prepare('UPDATE services_content SET title = ?, description = ? WHERE id = 1').bind(title, description).run();
    } else if (type === 'gallery') {
      const { title, description } = body;
      await env.DB.prepare('UPDATE gallery_content SET title = ?, description = ? WHERE id = 1').bind(title, description).run();
    } else if (type === 'team') {
      const { title, description } = body;
      await env.DB.prepare('UPDATE team_content SET title = ?, description = ? WHERE id = 1').bind(title, description).run();
    } else {
      return new Response('Unknown type', { status: 400 });
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
