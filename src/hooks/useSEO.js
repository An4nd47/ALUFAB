import { useEffect } from "react";

/**
 * Sets document <title> and meta[name="description"] for the current page.
 * Resets to defaults when the component unmounts.
 */
export function useSEO({ title, description }) {
  useEffect(() => {
    const defaultTitle = "Alufab – Premium Aluminium & uPVC Fabrication | Kerala & UAE";
    const defaultDesc =
      "Alufab is Kerala's leading aluminium and uPVC fabrication company. Premium windows, doors, cabinets, glass partitions and architectural fabrication for residential and commercial projects.";

    const prev = document.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute("content") ?? "";

    document.title = title || defaultTitle;
    if (metaDesc) metaDesc.setAttribute("content", description || defaultDesc);

    return () => {
      document.title = prev;
      if (metaDesc) metaDesc.setAttribute("content", prevDesc);
    };
  }, [title, description]);
}
