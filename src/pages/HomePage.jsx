import { useSEO } from "../useSEO";
import Hero from "../components/Hero/Hero";
import AboutPreview from "../components/Hero/AboutPreview";
import ServicesPreview from "../components/Hero/ServicesPreview";

export default function HomePage() {
  useSEO({
    title: "Alufab – Premium uPVC Fabrication | Kerala & UAE",
    description:
      "Kerala's premier uPVC fabrication company. Premium windows, doors, cabinets and architectural fabrication for modern living and commercial excellence.",
  });

  return (
    <main>
      <Hero />
      <div className="section-divider container-custom" />
      <AboutPreview />
      <div className="section-divider container-custom" />
      <ServicesPreview />
    </main>
  );
}
