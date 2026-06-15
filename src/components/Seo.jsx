import { Helmet } from 'react-helmet-async';
export default function Seo({ title, description }) {
  return (
    <Helmet>
      <title>{title ? `${title} — Clear Care Dental Enterprise` : 'Clear Care Dental Enterprise'}</title>
      {description && <meta name="description" content={description} />}
    </Helmet>
  );
}
