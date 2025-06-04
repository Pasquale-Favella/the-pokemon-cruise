"use client"; // Required for Jotai hooks

import Image from "next/image";
import Link from "next/link";
import { useAtom } from 'jotai';
import { filteredCruisesAtom } from '@/store/booking-atoms';
import { Button } from "@/components/ui/button";
import { CruiseSearchFilter } from "@/components/filters/CruiseSearchFilter"; // New filter component
import { CruiseCard } from "@/components/cruise-card"; // New CruiseCard component

export default function CruisesPage() {
  const [cruisesToDisplay] = useAtom(filteredCruisesAtom);
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Presentation Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Explore Our Pokemon Cruises</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover unique cruise experiences inspired by the world of Pokemon. 
          Each cruise offers a different adventure through iconic Pokemon regions.
        </p>
      </div>
      
      {/* Cruise Search Filter Section */}
      <section className="mb-12">
        <div className="max-w-4xl mx-auto">
          <CruiseSearchFilter />
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cruisesToDisplay.length > 0 ? (
          cruisesToDisplay.map((cruise) => (
            <CruiseCard key={cruise.id} cruise={cruise} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-muted-foreground">No cruises match your current filters. Try adjusting your search!</p>
          </div>
        )}
      </div>
    </div>
  );
}
