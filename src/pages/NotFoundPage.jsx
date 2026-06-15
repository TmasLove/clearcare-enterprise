import Seo from '../components/Seo';
import Section from '../components/Section';
export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" />
      <Section variant="navy">
        <h1>404 — Page not found</h1>
      </Section>
    </>
  );
}
