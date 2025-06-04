"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Check, AlertTriangle } from "lucide-react";
import { useBookingForm } from "@/hooks/use-booking";
import { getCruiseById, type Cruise, type CabinType as CruiseCabinTypeFromData } from "@/data/cruises";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


export function CabinSelector() {
  const { cruiseId, cabinType, setCabinType } = useBookingForm();
  const [selectedCruise, setSelectedCruise] = useState<Cruise | null>(null);
  const [displayableCabins, setDisplayableCabins] = useState<CruiseCabinTypeFromData[]>([]);
  const [expandedCabin, setExpandedCabin] = useState<string | null>(null);

  useEffect(() => {
    if (cruiseId) {
      const cruiseData = getCruiseById(cruiseId);
      setSelectedCruise(cruiseData || null);
      setDisplayableCabins(cruiseData?.cabinTypes || []);
    } else {
      setSelectedCruise(null);
      setDisplayableCabins([]);
    }
  }, [cruiseId]);

  const toggleExpand = (id: string) => {
    setExpandedCabin(expandedCabin === id ? null : id);
  };

  return (
    <div className="space-y-4">
    
      
      <div className="grid grid-cols-1 gap-4">
        {selectedCruise && displayableCabins.length > 0 ? (
          displayableCabins.map((cabin: CruiseCabinTypeFromData) => (
            <Card 
              key={cabin.id}
              className={`cursor-pointer transition-all overflow-hidden ${
                cabinType === cabin.id 
                  ? "ring-2 ring-primary ring-offset-2" 
                  : "hover:shadow-md"
              }`}
              onClick={() => setCabinType(cabin.id)}
            >
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                    <Image
                      src={cabin.images && cabin.images.length > 0 ? cabin.images[0] : "/images/cruise-placeholder.jpg"} // Use first image or placeholder
                      alt={cabin.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/images/cruise-placeholder.jpg";
                      }}
                    />
                    {/* Optional: If you have a specific theme field in CruiseCabinTypeFromData 
                    {cabin.pokemonTheme && (
                      <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-600">
                        {cabin.pokemonTheme} Themed
                      </Badge>
                    )} 
                    */}
                  </div>
                  
                  <div className="p-4 md:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <h3 className="text-lg font-bold">{cabin.name}</h3>
                          {cabinType === cabin.id && (
                            <div className="ml-2 bg-primary rounded-full p-1">
                              <Check className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="text-lg font-bold text-primary">${cabin.price}</div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">{cabin.description}</p>
                      
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <span className="mr-2">Capacity:</span>
                        <div className="flex">
                          {Array.from({ length: cabin.capacity }).map((_, i) => (
                            <div key={i} className="w-4 h-4 relative mr-1">
                              <Image 
                                src="/images/pokeball-icon.svg" 
                                alt="Capacity" 
                                width={16} 
                                height={16}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {expandedCabin === cabin.id && (
                        <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                          <h4 className="text-sm font-medium mb-2">Amenities:</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                            {cabin.amenities.map((amenity: string, index: number) => (
                              <li key={index} className="text-sm flex items-center">
                                <div className="w-4 h-4 mr-2 text-amber-500">•</div>
                                {amenity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(cabin.id);
                      }}
                      className="text-sm text-primary mt-2 hover:underline self-start"
                    >
                      {expandedCabin === cabin.id ? "Show less" : "Show details"}
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-1 flex flex-col items-center justify-center p-8 border border-dashed rounded-lg text-center">
            <AlertTriangle className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No Cruise Selected</h3>
            <p className="text-sm text-muted-foreground">
              Please select a cruise in the previous step to see available cabins.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
