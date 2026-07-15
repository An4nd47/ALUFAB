import { lazy, Suspense } from "react";
import { useSEO } from "../useSEO";

const About = lazy(() => import("../components/About"));
const WhyChooseUs = lazy(() => import("../components/WhyChooseUs"));

const SectionSkeleton = () => (
  <div className="section-padding container-custom">
    <div className="skeleton h-8 w-32 mb-4" />
    <div className="skeleton h-12 w-2/3 mb-8" />
    <div className="grid grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="skeleton h-48 rounded-xl" />
      ))}
    </div>
  </div>
);

export default function AboutPage() {
  useSEO({
    title: "About Alufab – 5+ Years of uPVC Excellence | Kerala",
    description:
      "Learn about Alufab, Kerala's most trusted uPVC fabrication company. ISO-certified, serving India and the GCC with 500+ completed projects since 2009.",
  });

  return (
    <Suspense fallback={<SectionSkeleton />}>
      <main className="pt-20">
        <About />
        <div className="section-divider container-custom" />
        <WhyChooseUs />
      </main>
    </Suspense>
  );
}
