import { Head } from 'vite-react-ssg';

const BASE_URL = 'https://clearcaredentalenterprise.com';

export default function Seo({ title, description, path, jsonLd }) {
  const fullTitle = title
    ? `${title} — Clear Care Dental Enterprise`
    : 'Clear Care Dental Enterprise';

  // vite-react-ssg prerenders each route to <route>/index.html, which the server
  // serves at the TRAILING-SLASH url and 301s the slashless form onto. So the
  // canonical must carry the slash too — a canonical pointing at a URL that
  // redirects is a conflicting signal and Google declines to index the page.
  // (This is what stranded /demo, /enroll and /solutions/* in Search Console's
  // "Discovered - currently not indexed".) Root is already "/", leave it alone.
  const canonicalPath = path && path !== '/' && !path.endsWith('/') ? `${path}/` : path;
  const canonical = canonicalPath ? `${BASE_URL}${canonicalPath}` : undefined;

  const schemas = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Head>
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
      ))}
    </Head>
  );
}
