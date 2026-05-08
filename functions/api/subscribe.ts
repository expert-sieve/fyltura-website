interface Env {
  BREVO_API_KEY: string;
  BREVO_LIST_ID: string;
  BREVO_DOI_TEMPLATE_ID: string;
}

function corsHeaders(): HeadersInit {
  return {
    'Access-Control-Allow-Origin': 'https://fyltura.de',
    'Content-Type': 'application/json',
  };
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { status: 204, headers: corsHeaders() });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.BREVO_API_KEY || !env.BREVO_LIST_ID || !env.BREVO_DOI_TEMPLATE_ID) {
    return new Response(
      JSON.stringify({ error: 'Service temporär nicht verfügbar.' }),
      { status: 503, headers: corsHeaders() },
    );
  }

  let email: string | undefined;
  let firstName: string | undefined;
  let consent: string | undefined;
  let utm_source: string | undefined;
  let utm_medium: string | undefined;
  let utm_campaign: string | undefined;

  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    const json = (await request.json()) as Record<string, string>;
    ({ email, firstName, consent, utm_source, utm_medium, utm_campaign } = json);
  } else {
    const fd = await request.formData();
    email = fd.get('email')?.toString();
    firstName = fd.get('firstName')?.toString();
    consent = fd.get('consent')?.toString();
    utm_source = fd.get('utm_source')?.toString();
    utm_medium = fd.get('utm_medium')?.toString();
    utm_campaign = fd.get('utm_campaign')?.toString();
  }

  if (!email || !consent || consent === '0') {
    return new Response(
      JSON.stringify({ error: 'E-Mail und Einwilligung sind erforderlich.' }),
      { status: 400, headers: corsHeaders() },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(
      JSON.stringify({ error: 'Ungültige E-Mail-Adresse.' }),
      { status: 400, headers: corsHeaders() },
    );
  }

  const attributes: Record<string, string> = {};
  if (firstName?.trim()) attributes['FIRSTNAME'] = firstName.trim();
  if (utm_source) attributes['UTM_SOURCE'] = utm_source;
  if (utm_medium) attributes['UTM_MEDIUM'] = utm_medium;
  if (utm_campaign) attributes['UTM_CAMPAIGN'] = utm_campaign;

  const listId = parseInt(env.BREVO_LIST_ID, 10);
  const templateId = parseInt(env.BREVO_DOI_TEMPLATE_ID, 10);

  const brevoRes = await fetch(
    'https://api.brevo.com/v3/contacts/doubleOptinConfirmation',
    {
      method: 'POST',
      headers: {
        'api-key': env.BREVO_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        attributes,
        includeListIds: [listId],
        templateId,
        redirectionUrl: 'https://fyltura.de/blog/?subscribed=1',
      }),
    },
  );

  if (!brevoRes.ok) {
    const text = await brevoRes.text();
    console.error('Brevo DOI error', brevoRes.status, text);
    // 400 usually means contact already exists — treat as success to avoid enum attacks
    if (brevoRes.status === 400) {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Bitte prüfen Sie Ihre E-Mails für die Bestätigung.',
        }),
        { status: 200, headers: corsHeaders() },
      );
    }
    return new Response(
      JSON.stringify({ error: 'Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.' }),
      { status: 500, headers: corsHeaders() },
    );
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: 'Vielen Dank! Bitte bestätigen Sie Ihre Anmeldung per E-Mail.',
    }),
    { status: 200, headers: corsHeaders() },
  );
};
