import { lazy, Suspense } from "react";
import { useSEO } from "../useSEO";

const Testimonials = lazy(() => import("../components/Testimonials"));
const FAQ = lazy(() => import("../components/FAQ"));
const Contact = lazy(() => import("../components/Contact"));

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

export default function TestimonialsContactPage() {
  useSEO({
    title: "Contact Alufab – Get a Free Quote | Aluminium & uPVC Fabrication Kerala",
    description:
      "Contact Alufab for a free aluminium or uPVC fabrication quote. Read client testimonials from Kerala and UAE projects. Get answers to common questions about our products and services.",
  });

  return (
    <Suspense fallback={<SectionSkeleton />}>
      <main className="pt-20">
        <Contact />
        <div className="section-divider container-custom" />
        <FAQ />
        <div className="section-divider container-custom" />
        <Testimonials />
      </main>
    </Suspense>
  );
}
