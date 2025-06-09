import { notFound } from "next/navigation";
import { getCruiseById } from "@/data/cruises"; // Import Cruise type

import { cruises } from "@/data/cruises"; // Import cruises data
import CruiseDetailClient from "./page.client";

export async function generateStaticParams() {
  return cruises.map((cruise) => ({
    id: cruise.id,
  }));
}

export default async function CruiseDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const cruiseParams = await params;
  const cruise = getCruiseById(cruiseParams.id);

  if (!cruise) {
    notFound();
  }

  return <CruiseDetailClient cruise={cruise} />;
}
