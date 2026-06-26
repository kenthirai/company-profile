async function signJWT(payload, secret) {
  const encoder = new TextEncoder();
  const header = { alg: 'HS256', typ: 'JWT' };
  
  const base64UrlEncode = (str) => btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const dataToSign = `${encodedHeader}.${encodedPayload}`;
  
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(dataToSign));
  const encodedSignature = base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
  
  return `${dataToSign}.${encodedSignature}`;
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const body = await request.json();
    const { username, password } = body;

    const validUser = env.ADMIN_USERNAME;
    const validPass = env.ADMIN_PASSWORD;
    const jwtSecret = env.JWT_SECRET;

    if (!validUser || !validPass || !jwtSecret) {
      return new Response(JSON.stringify({ error: "Server Configuration Error" }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (username === validUser && password === validPass) {
      // Create JWT token valid for 24 hours
      const token = await signJWT({ 
        user: username, 
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) 
      }, jwtSecret);

      return new Response(JSON.stringify({ success: true, token }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response(JSON.stringify({ error: "Username atau password salah" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Auth Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error", details: error.message, stack: error.stack }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
