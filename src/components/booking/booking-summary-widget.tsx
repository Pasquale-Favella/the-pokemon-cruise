"use client";

import { useAtom } from "jotai";
import Image from "next/image";
import { format } from "date-fns";
import { 
  regionAtom, 
  cruiseIdAtom, 
  datesAtom, 
  passengersAtom, 
  cabinTypeAtom 
} from "@/store/booking-atoms";
import { Separator } from "@/components/ui/separator";
import { getCruiseById } from "@/data/cruises";

// Helper function to format dates that might be strings or Date objects
const formatDate = (date: Date | string | null) => {
  if (!date) return "";
  if (typeof date === "string") {
    // Try to parse the string to a Date
    try {
      return new Date(date).toLocaleDateString();
    } catch (e) {
      return date;
    }
  }
  // It's a Date object
  return date.toLocaleDateString();
};

export function BookingSummaryWidget() {
  const [region] = useAtom(regionAtom);
  const [cruiseId] = useAtom(cruiseIdAtom);
  const [dates] = useAtom(datesAtom);
  const [passengers] = useAtom(passengersAtom);
  const [cabinType] = useAtom(cabinTypeAtom);
  
  const selectedCruise = cruiseId ? getCruiseById(cruiseId) : null;
  const selectedCabin = selectedCruise?.cabinTypes.find(c => c.id === cabinType);
  
  if (!selectedCruise) {
    return (
      <div className="p-4 text-center">
        <Image 
          src="/images/pikachu-waiting.png" 
          alt="Pikachu waiting" 
          width={100} 
          height={100}
          className="mx-auto mb-4"
        />
        <p className="text-muted-foreground">Please select a cruise to see your booking details.</p>
      </div>
    );
  }
  
  const calculateTotal = () => {
    const cabinPrice = selectedCabin?.price || selectedCruise.startingPrice;
    const passengerCount = passengers.adults + passengers.children;
    const taxesAndFees = 99;
    
    return (cabinPrice * Math.max(passengerCount, 1)) + taxesAndFees;
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium">Selected Cruise</h3>
        <p>{selectedCruise.name}</p>
        <p className="text-sm text-muted-foreground">
          {selectedCruise.duration} days • {selectedCruise.region} Region
        </p>
      </div>
      
      <Separator />
      
      {dates.startDate && (
        <div>
          <h3 className="font-medium">Travel Dates</h3>
          <p>
            {formatDate(dates.startDate)} - {dates.endDate ? formatDate(dates.endDate) : ''}
          </p>
          <p className="text-sm text-muted-foreground">
            {selectedCruise.duration} days
          </p>
        </div>
      )}
      
      <Separator />
      
      <div>
        <h3 className="font-medium">Travelers</h3>
        <p>{passengers.adults} {passengers.adults === 1 ? "Adult" : "Adults"}</p>
        {passengers.children > 0 && (
          <p>{passengers.children} {passengers.children === 1 ? "Child" : "Children"}</p>
        )}
      </div>
      
      {cabinType && selectedCabin && (
        <>
          <Separator />
          <div>
            <h3 className="font-medium">Cabin Type</h3>
            <p>{selectedCabin.name}</p>
            <p className="text-sm text-muted-foreground">${selectedCabin.price} per person</p>
          </div>
        </>
      )}
      
      <Separator />
      
      <div>
        <h3 className="font-medium">Price Details</h3>
        <div className="flex justify-between mt-2">
          <span>Cabin Price</span>
          <span>
            ${selectedCabin?.price || selectedCruise.startingPrice}
          </span>
        </div>
        <div className="flex justify-between mt-1">
          <span>Passengers</span>
          <span>x {Math.max(passengers.adults + passengers.children, 1)}</span>
        </div>
        <div className="flex justify-between mt-1">
          <span>Taxes & Fees</span>
          <span>$99</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${calculateTotal()}</span>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-md border border-amber-200 dark:border-amber-800">
        <div className="flex items-center text-amber-800 dark:text-amber-400">
          <Image 
            src="/images/pokeball-icon.png" 
            alt="Pokeball" 
            width={20} 
            height={20}
            className="mr-2"
          />
          <p className="text-sm">
            Earn PokéPoints with every booking! Members get exclusive access to rare Pokémon encounters.
          </p>
        </div>
      </div>
    </div>
  );
}
