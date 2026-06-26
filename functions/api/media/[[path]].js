export async function onRequestGet(context) {
  const { request, env, params } = context;
  const path = params.path.join('/');

  if (request.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const object = await env.MEDIA_BUCKET.get(path);

    if (object === null) {
      return new Response('File Not Found', { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set('etag', object.httpEtag);
    headers.set('Cache-Control', 'public, max-age=31536000');

    return new Response(object.body, { headers });
  } catch (e) {
    return new Response('Error fetching media', { status: 500 });
  }
}
