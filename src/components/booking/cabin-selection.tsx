"use client";

import Image from "next/image";
import { Cruise } from "@/data/cruises";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CabinSelectionProps {
  cruise: Cruise;
  selectedCabinId: string;
  onSelect: (cabinId: string) => void;
}

export function CabinSelection({ cruise, selectedCabinId, onSelect }: CabinSelectionProps) {
  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Choose a Cabin for {cruise.name}</h3>
        <p className="text-sm text-muted-foreground">
          Select the cabin type that best fits your needs and budget.
        </p>
      </div>

      <RadioGroup value={selectedCabinId} onValueChange={onSelect} className="space-y-4">
        {cruise.cabinTypes.map((cabin) => (
          <div key={cabin.id} className="relative">
            <RadioGroupItem
              value={cabin.id}
              id={cabin.id}
              className="peer sr-only"
            />
            <Label
              htmlFor={cabin.id}
              className="block cursor-pointer"
            >
              <Card className="overflow-hidden transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:ring-1 peer-data-[state=checked]:ring-primary">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative h-40 md:h-full">
                    <Image
                      src={cabin.images[0] || "/images/cabin-placeholder.jpg"}
                      alt={cabin.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 md:col-span-2">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{cabin.name}</h3>
                        <p className="text-muted-foreground">Up to {cabin.capacity} guests</p>
                      </div>
                      <span className="text-lg font-bold text-primary">
                        ${cabin.price}
                      </span>
                    </div>
                    <p className="text-sm mb-3">{cabin.description}</p>
                    <div className="mb-2">
                      <h4 className="text-sm font-medium mb-1">Amenities:</h4>
                      <div className="flex flex-wrap gap-2">
                        {cabin.amenities.slice(0, 5).map((amenity, index) => (
                          <span
                            key={index}
                            className="text-xs px-2 py-1 bg-muted rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                        {cabin.amenities.length > 5 && (
                          <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                            +{cabin.amenities.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
