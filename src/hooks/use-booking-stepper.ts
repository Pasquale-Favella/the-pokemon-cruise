"use client";

import { useState, useEffect, useCallback } from "react";
import { format, differenceInCalendarDays } from "date-fns";
import { useBookingForm } from "@/hooks/use-booking";
import { getCruiseById, type Cruise, type CabinType as CruiseCabinType } from "@/data/cruises";
import { Ship, Bed, CreditCard } from "lucide-react";

export const STEPS = [
  { id: "details", title: "Trip Details", icon: Ship },
  { id: "cabin", title: "Cabin", icon: Bed },
  { id: "payment", title: "Payment", icon: CreditCard },
];

export interface PriceBreakdown {
  adultFarePerPerson: number;
  childFarePerPerson: number;
  numberOfAdults: number;
  numberOfChildren: number;
  totalAdultFare: number;
  totalChildFare: number;
  totalCruiseFare: number;
  cabinName?: string;
  cabinPrice: number;
  cabinCapacity?: number;
  subtotal: number; // cruise fare + cabin cost
  taxesAndFees: number;
  total: number;
  rawAdultFare: number; // cruise.startingPrice (undiscounted adult price)
}

interface UseBookingStepperProps {
  initialCruiseId?: string;
}

export function useBookingStepper({ initialCruiseId }: UseBookingStepperProps = {}) {
  const [currentStep, setCurrentStep] = useState(STEPS[0].id);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [isFormValid, setIsFormValid] = useState(false);

  const {
    region, cruiseId, dates, passengers, cabinType,
    initializeBooking,
    // Need access to setters if validation requires auto-correction or if hook modifies them
    // For now, assume setters are used by components directly, hook reads values for validation
  } = useBookingForm();

  const selectedCruise = cruiseId ? getCruiseById(cruiseId) : null;

  useEffect(() => {
    if (initialCruiseId) {
      const preSelectedCruise = getCruiseById(initialCruiseId);
      if (preSelectedCruise) {
        initializeBooking({
          cruiseId: initialCruiseId,
          region: preSelectedCruise.region,
          // Potentially dates and passengers if available
        });
        // setCurrentStep(STEPS[0].id); // Already default
      }
    }
  }, [initialCruiseId, initializeBooking]);

  const getCabinDetails = useCallback((currentCruise: Cruise | null, currentCabinTypeId: string | null) => {
    if (!currentCruise || !currentCabinTypeId) {
      return { name: "N/A", price: 0, capacity: 0 };
    }
    const cabin = currentCruise.cabinTypes.find(ct => ct.id === currentCabinTypeId);
    return cabin ? { name: cabin.name, price: cabin.price, capacity: cabin.capacity } : { name: "N/A", price: 0, capacity: 0 };
  }, []);

  const calculatePriceBreakdown = useCallback((): PriceBreakdown | null => {
    if (!selectedCruise) return null;

    const adultFarePerPerson = selectedCruise.startingPrice;
    const childFarePerPerson = selectedCruise.startingPrice * 0.4; // 60% discount
    const numberOfAdults = passengers.adults;
    const numberOfChildren = passengers.children;

    const totalAdultFare = adultFarePerPerson * numberOfAdults;
    const totalChildFare = childFarePerPerson * numberOfChildren;
    const totalCruiseFare = totalAdultFare + totalChildFare;

    const cabinDetails = getCabinDetails(selectedCruise, cabinType);
    const cabinPrice = cabinDetails.price;
    
    const subtotal = totalCruiseFare + cabinPrice;
    const taxesAndFees = 99.00; // Fixed for now, as in original component
    const total = subtotal + taxesAndFees;

    return {
      adultFarePerPerson,
      childFarePerPerson,
      numberOfAdults,
      numberOfChildren,
      totalAdultFare,
      totalChildFare,
      totalCruiseFare,
      cabinName: cabinDetails.name,
      cabinPrice,
      cabinCapacity: cabinDetails.capacity,
      subtotal,
      taxesAndFees,
      total,
      rawAdultFare: selectedCruise.startingPrice,
    };
  }, [selectedCruise, passengers, cabinType, getCabinDetails]);

  const validateStep = useCallback(() => {
    const errors: string[] = [];
    let valid = false;
    const currentStepDetails = STEPS.find(s => s.id === currentStep);

    if (!currentStepDetails) {
        errors.push("Invalid booking step.");
        setIsFormValid(false);
        setFormErrors(errors);
        return;
    }

    switch(currentStepDetails.id) {
      case "details":
        const hasCruise = !!cruiseId;
        const hasDates = !!dates.startDate && !!dates.endDate;
        const hasValidPassengers = passengers.adults > 0;
        valid = hasCruise && hasDates && hasValidPassengers;
        if (!hasCruise) errors.push("Please select a cruise.");
        if (!hasDates) errors.push("Please select your travel dates.");
        if (!hasValidPassengers) errors.push("At least one adult is required.");

        if (valid && selectedCruise && dates.startDate && dates.endDate) { // Ensure basic validity before this check
          const selectedDurationInDays = differenceInCalendarDays(dates.endDate, dates.startDate) + 1;
          if (selectedCruise.duration !== selectedDurationInDays) {
            errors.push(`The selected date range (${selectedDurationInDays} days) does not match the cruise duration of ${selectedCruise.duration} days. Please adjust your selection.`);
            valid = false;
          }
        }
        break;
      case "cabin":
        valid = !!cabinType;
        if (!cabinType) {
          errors.push("Please select a cabin type.");
        } else if (selectedCruise) {
          const currentCabinDetails = getCabinDetails(selectedCruise, cabinType);
          const totalTravelers = passengers.adults + passengers.children;
          if (totalTravelers > 0 && currentCabinDetails.capacity < totalTravelers) {
            errors.push(`The selected cabin (${currentCabinDetails.name}) cannot accommodate ${totalTravelers} guests (max ${currentCabinDetails.capacity}). Please choose another cabin or adjust traveler numbers.`);
            valid = false;
          }
        }
        break;
      case "payment":
        // Placeholder for payment validation (e.g., card details, billing address)
        // For now, assume payment step is always valid once reached if previous steps are fine.
        valid = true; 
        // if (!isPaymentInfoValid) errors.push("Please enter valid payment information.");
        break;
      default:
        valid = false;
        errors.push("Unknown step.");
    }
    setIsFormValid(valid);
    setFormErrors(errors);
    return valid;
  }, [currentStep, cruiseId, dates, passengers, cabinType, selectedCruise, getCabinDetails]);

  useEffect(() => {
    validateStep();
  }, [currentStep, cruiseId, dates, passengers, cabinType, validateStep]);

  const currentStepIndex = STEPS.findIndex(step => step.id === currentStep);

  const handleNextStep = () => {
    if (validateStep() && currentStepIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[currentStepIndex + 1].id);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(STEPS[currentStepIndex - 1].id);
    }
  };

  const handleCompleteBooking = () => {
    if (validateStep()) {
      // In a real app, this would submit data to a backend
      console.log("Booking completed with data:", {
        cruiseId,
        region,
        dates,
        passengers,
        cabinType,
        totalPrice: calculatePriceBreakdown()?.total,
      });
      alert("Booking Successful! Thank you for choosing The Pokémon Cruise!");
      // Potentially reset booking state here or navigate to a confirmation page
      // resetBooking(); // Example: if resetBooking is available from useBookingForm and makes sense here
      // setCurrentStep(STEPS[0].id); // Reset to first step
    }
  };
  
  const formatDateRange = (dateInfo: { startDate: Date | null, endDate: Date | null }) => {
    if (!dateInfo.startDate || !dateInfo.endDate) return "N/A";
    return `${format(dateInfo.startDate, "MMM dd, yyyy")} - ${format(dateInfo.endDate, "MMM dd, yyyy")}`;
  };

  return {
    currentStep,
    currentStepIndex,
    steps: STEPS,
    isFormValid,
    formErrors,
    selectedCruise,
    passengers, // Exposing for direct use in UI if needed
    dates,      // Exposing for direct use in UI if needed
    cabinType,  // Exposing for direct use in UI if needed
    handleNextStep,
    handlePreviousStep,
    handleCompleteBooking,
    getCabinDetails, // Might be used by CabinSelector directly or by the step component
    calculatePriceBreakdown,
    formatDateRange,
  };
}
