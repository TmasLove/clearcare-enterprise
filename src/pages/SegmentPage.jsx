import Seo from '../components/Seo';
import Section from '../components/Section';
export default function SegmentPage({ slug }) {
  return (
    <>
      <Seo title={slug} />
      <Section>
        <h1>{slug}</h1>
      </Section>
    </>
  );
}
