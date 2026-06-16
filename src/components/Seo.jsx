import { Head } from 'vite-react-ssg';

const BASE_URL = 'https://clearcaredentalenterprise.com';

export default function Seo({ title, description, path, jsonLd }) {
  const fullTitle = title
    ? `${title} — Clear Care Dental Enterprise`
    : 'Clear Care Dental Enterprise';

  const canonical = path ? `${BASE_URL}${path}` : undefined;

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
