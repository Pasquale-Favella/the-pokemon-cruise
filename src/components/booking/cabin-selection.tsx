"use client";

import Image from "next/image";
import { Cruise } from "@/data/cruises";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAtom } from 'jotai';
import { passengersAtom } from '@/store/booking-atoms';
import { AlertCircle, InfoIcon } from 'lucide-react';

interface CabinSelectionProps {
  cruise: Cruise;
  selectedCabinId: string;
  onSelect: (cabinId: string) => void;
}

export function CabinSelection({ cruise, selectedCabinId, onSelect }: CabinSelectionProps) {
  const [passengers] = useAtom(passengersAtom);
  const totalTravelers = passengers.adults + passengers.children;
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Choose Your Cabin for {cruise.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Select the cabin type that best fits your party and budget.
        </p>
        <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-md">
          <p className="text-xs text-blue-700 dark:text-blue-300">
            <InfoIcon className="inline-block w-4 h-4 mr-1.5 -mt-0.5" />
            <strong>Pricing Note:</strong> Cruise fares are per person. The cabin cost shown below is an additional flat rate for the entire cabin, regardless of the number of guests (up to cabin capacity).
          </p>
        </div>
      </div>

      <RadioGroup value={selectedCabinId} onValueChange={onSelect} className="space-y-5">
        {cruise.cabinTypes.map((cabin) => (
          <div key={cabin.id} className="relative">
            <RadioGroupItem
              value={cabin.id}
              id={cabin.id}
              className="peer sr-only"
              disabled={totalTravelers > cabin.capacity}
            />
            <Label
              htmlFor={cabin.id}
              className={`block ${totalTravelers > cabin.capacity ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
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
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Image src="/images/pokeball-icon.svg" alt="Capacity" width={16} height={16} className="mr-1.5 opacity-75" />
                          <span>Up to {cabin.capacity} guests</span>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-primary">
                        ${cabin.price}
                      </span>
                    </div>
                    <p className="text-sm mb-3">{cabin.description}</p>
                    {totalTravelers > cabin.capacity && (
                      <div className="mt-2 p-2 text-xs bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md flex items-center">
                        <AlertCircle className="w-4 h-4 mr-1.5 flex-shrink-0" />
                        <span>This cabin cannot accommodate your party of {totalTravelers}. Max capacity: {cabin.capacity}.</span>
                      </div>
                    )}
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
