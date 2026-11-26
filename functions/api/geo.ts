interface CfRequest extends Request {
  cf?: {
    country?: string;
    regionCode?: string;
  };
}

export const onRequestGet = async (context: { request: CfRequest }) => {
  const { request } = context;
  const country = (
    request.cf?.country ||
    request.headers.get('CF-IPCountry') ||
    ''
  ).toUpperCase();
  const regionCode = (request.cf?.regionCode || '').toUpperCase();

  return new Response(JSON.stringify({ country, regionCode }), {
    status: 200,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': 'no-store, max-age=0'
    }
  });
};
