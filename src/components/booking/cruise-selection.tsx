"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cruises } from "@/data/cruises";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface CruiseSelectionProps {
  selectedCruiseId: string;
  onSelect: (cruiseId: string) => void;
}

export function CruiseSelection({ selectedCruiseId, onSelect }: CruiseSelectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCruises, setFilteredCruises] = useState(cruises);

  useEffect(() => {
    const filtered = cruises.filter(cruise => 
      cruise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cruise.region.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCruises(filtered);
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Label htmlFor="search-cruises">Search Cruises</Label>
        <Input
          id="search-cruises"
          placeholder="Search by name or region..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-1"
        />
      </div>

      <RadioGroup value={selectedCruiseId} onValueChange={onSelect} className="space-y-4">
        {filteredCruises.length > 0 ? (
          filteredCruises.map((cruise) => (
            <div key={cruise.id} className="relative">
              <RadioGroupItem
                value={cruise.id}
                id={cruise.id}
                className="peer sr-only"
              />
              <Label
                htmlFor={cruise.id}
                className="block cursor-pointer"
              >
                <Card className="overflow-hidden transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative h-40 md:h-full">
                      <Image
                        src={cruise.images[0] || "/images/cruise-placeholder.jpg"}
                        alt={cruise.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 md:col-span-2">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-lg">{cruise.name}</h3>
                          <p className="text-muted-foreground">{cruise.region} Region</p>
                        </div>
                        <span className="text-lg font-bold text-primary">
                          ${cruise.startingPrice}
                        </span>
                      </div>
                      <p className="text-sm mb-3">{cruise.shortDescription}</p>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {cruise.highlights.slice(0, 3).map((highlight, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span className="mr-4">{cruise.duration} days</span>
                        <span>{cruise.itinerary.length} ports</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </Label>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No cruises found matching your search.</p>
          </div>
        )}
      </RadioGroup>
    </div>
  );
}
