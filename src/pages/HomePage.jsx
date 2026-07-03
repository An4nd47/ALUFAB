import Hero from "../components/Hero/Hero";
import AboutPreview from "../components/Hero/AboutPreview";
import ServicesPreview from "../components/Hero/ServicesPreview";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <div className="section-divider container-custom" />
      <AboutPreview />
      <div className="section-divider container-custom" />
      <ServicesPreview />
    </div>
  );
}
