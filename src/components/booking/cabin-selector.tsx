"use client";

import { useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";
import { useCabinSelection } from "@/hooks/use-booking";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface CabinType {
  id: string;
  name: string;
  description: string;
  capacity: number;
  price: number;
  amenities: string[];
  image: string;
  pokemonTheme?: string;
}

const cabinTypes: CabinType[] = [
  {
    id: "standard",
    name: "Standard Cabin",
    description: "Comfortable accommodations with all the essentials for your Pokemon journey.",
    capacity: 2,
    price: 799,
    amenities: ["Daily housekeeping", "TV with Pokemon Channel", "Private bathroom"],
    image: "/images/cabins/standard.jpg",
    pokemonTheme: "Pikachu"
  },
  {
    id: "deluxe",
    name: "Deluxe Suite",
    description: "Spacious suite with premium amenities and a private balcony overlooking the ocean.",
    capacity: 4,
    price: 1299,
    amenities: ["Private balcony", "Separate living area", "Premium bedding", "Mini-bar"],
    image: "/images/cabins/deluxe.jpg",
    pokemonTheme: "Charizard"
  },
  {
    id: "premium",
    name: "Master Trainer Suite",
    description: "Our most luxurious accommodation with exclusive access to premium ship amenities.",
    capacity: 6,
    price: 1999,
    amenities: ["Butler service", "Priority boarding", "Exclusive lounge access", "Complimentary excursions", "Premium dining"],
    image: "/images/cabins/premium.jpg",
    pokemonTheme: "Mewtwo"
  }
];

export function CabinSelector() {
  const { cabinType, setCabinType } = useCabinSelection();
  const [expandedCabin, setExpandedCabin] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedCabin(expandedCabin === id ? null : id);
  };

  return (
    <div className="space-y-4">
    
      
      <div className="grid grid-cols-1 gap-4">
        {cabinTypes.map((cabin) => (
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
                    src={cabin.image}
                    alt={cabin.name}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback image if the cabin image doesn't exist
                      (e.target as HTMLImageElement).src = "/images/cruise-placeholder.jpg";
                    }}
                  />
                  {cabin.pokemonTheme && (
                    <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-600">
                      {cabin.pokemonTheme} Themed
                    </Badge>
                  )}
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
                              src="/images/trainer-icon.png" 
                              alt="Trainer" 
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
                          {cabin.amenities.map((amenity, index) => (
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
        ))}
      </div>
    </div>
  );
}
