import { lazy, Suspense } from "react";
import { useSEO } from "../hooks/useSEO";

const Products = lazy(() => import("../components/Products/Products"));
const Projects = lazy(() => import("../components/Projects/Projects"));
const Gallery = lazy(() => import("../components/Gallery/Gallery"));

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

export default function ProductsProjectsPage() {
  useSEO({
    title: "Aluminium Products & Projects – Windows, Doors, Cabinets | Alufab Kerala",
    description:
      "Explore Alufab's full range of aluminium and uPVC products: sliding windows, casement windows, bi-fold doors, glass partitions, kitchen cabinets, curtain walls and more. View our completed projects in Kerala and UAE.",
  });

  return (
    <Suspense fallback={<SectionSkeleton />}>
      <main className="pt-20">
        <Products />
        <div className="section-divider container-custom" />
        <Projects />
        <div className="section-divider container-custom" />
        <Gallery />
      </main>
    </Suspense>
  );
}
