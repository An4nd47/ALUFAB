import { lazy, Suspense } from "react";
import { useSEO } from "../useSEO";

const Services = lazy(() => import("../components/Services"));
const Process = lazy(() => import("../components/Process"));

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

export default function ServicesPage() {
  useSEO({
    title: "uPVC Services – Design, Manufacturing & Installation | Alufab",
    description:
      "End-to-end uPVC services: design consultation, site measurement, custom manufacturing, professional installation, repair and annual maintenance contracts across Kerala and UAE.",
  });

  return (
    <Suspense fallback={<SectionSkeleton />}>
      <main className="pt-20">
        <Services />
        <div className="section-divider container-custom" />
        <Process />
      </main>
    </Suspense>
  );
}
