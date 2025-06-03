"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Users, 
  Ship, 
  Bed, 
  CreditCard
} from "lucide-react";
import { useBookingForm } from "@/hooks/use-booking";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CabinSelector } from "@/components/booking/cabin-selector";
import { BookingForm } from "@/components/booking-form";
import { getAllRegions, getCruisesByRegion, getCruiseById, cruises } from "@/data/cruises";

const steps = [
  { id: "details", title: "Trip Details", icon: Ship },
  { id: "cabin", title: "Cabin", icon: Bed },
  { id: "payment", title: "Payment", icon: CreditCard },
];

interface BookingStepsProps {
  initialCruiseId?: string;
}

export function BookingSteps({ initialCruiseId }: BookingStepsProps) {
  const [currentStep, setCurrentStep] = useState("details");
  
  const {
    region, setRegion,
    cruiseId, setCruiseId,
    dates, setDates,
    passengers, setPassengers,
    cabinType, setCabinType,
    resetBooking,
    initializeBooking
  } = useBookingForm();
  
  const [isFormValid, setIsFormValid] = useState(false);

  // Initialize booking and set initial step based on preselected values
  useEffect(() => {
    if (initialCruiseId) {
      const selectedCruise = getCruiseById(initialCruiseId);
      if (selectedCruise) {
        // Initialize booking state with cruise info
        initializeBooking({
          cruiseId: initialCruiseId,
          region: selectedCruise.region
        });
        
        // Stay on details step since it now includes destination, dates and travelers
        setCurrentStep("details");
      }
    }
  }, [initialCruiseId, initializeBooking]);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  
  // Get current step index
  const currentStepIndex = steps.findIndex(step => step.id === currentStep);
  
  // Validate current step
  useEffect(() => {
    const errors: string[] = [];
    let valid = false;
    
    switch(currentStep) {
      case "details":
        // Validate all trip details (destination, dates, travelers)
        const hasCruise = !!cruiseId;
        const hasDates = !!dates.startDate && !!dates.endDate;
        const hasValidPassengers = passengers.adults > 0;
        
        valid = hasCruise && hasDates && hasValidPassengers;
        
        if (!hasCruise) errors.push("Please select a cruise");
        if (!hasDates) errors.push("Please select your travel dates");
        if (!hasValidPassengers) errors.push("At least one adult is required");
        break;
      case "cabin":
        valid = !!cabinType;
        if (!cabinType) errors.push("Please select a cabin type");
        break;
      case "payment":
        // In a real app, this would validate payment details
        valid = true;
        break;
    }
    
    setIsFormValid(valid);
    setFormErrors(errors);
  }, [currentStep, cruiseId, dates, passengers, cabinType]);
  
  // Handle next step
  const handleNextStep = () => {
    if (!isFormValid) return;
    
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < steps.length) {
      setCurrentStep(steps[nextIndex].id);
    }
  };
  
  // Handle previous step
  const handlePreviousStep = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(steps[prevIndex].id);
    }
  };
  
  // Handle booking completion
  const handleCompleteBooking = () => {
    // In a real app, this would submit the booking
    alert("Booking completed! Your Pokemon adventure awaits!");
    resetBooking();
    setCurrentStep("destination");
  };
  
  // Get selected cruise details
  const selectedCruise = cruiseId ? getCruiseById(cruiseId) : null;
  
  // Format date range for display
  const formatDateRange = () => {
    if (!dates.startDate) return 'Not selected';
    if (!dates.endDate) return format(dates.startDate, 'MMM d, yyyy');
    return `${format(dates.startDate, 'MMM d, yyyy')} - ${format(dates.endDate, 'MMM d, yyyy')}`;
  };
  
  // Get cabin details
  const getCabinDetails = () => {
    if (!cabinType) return { name: 'Not selected', price: 0 };
    
    switch(cabinType) {
      case 'standard':
        return { name: 'Standard Cabin', price: 799 };
      case 'deluxe':
        return { name: 'Deluxe Suite', price: 1299 };
      case 'premium':
        return { name: 'Master Trainer Suite', price: 1999 };
      default:
        return { name: 'Not selected', price: 0 };
    }
  };
  
  // Calculate cabin subtotal (before taxes and fees)
  const calculateCabinSubtotal = () => {
    if (!cabinType || !selectedCruise) return 0;
    
    const cabinDetails = getCabinDetails();
    const totalPassengers = passengers.adults + passengers.children;
    const duration = selectedCruise.duration || 7;
    
    // Base cabin cost calculation
    const baseCabinCost = cabinDetails.price * totalPassengers;
    
    // Apply duration factor to cabin cost
    const adjustedCabinCost = baseCabinCost * (duration / 7);
    
    return Math.round(adjustedCabinCost);
  };
  
  // Calculate total price
  const calculateTotal = () => {
    if (!cabinType || !selectedCruise) return 0;
    
    // Get subtotal
    const subtotal = calculateCabinSubtotal();
    
    // Fixed taxes and fees
    const taxesAndFees = 99;
    
    // Calculate total
    return subtotal + taxesAndFees;
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <ol className="flex items-center w-full">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = step.id === currentStep;
            const isCompleted = steps.findIndex(s => s.id === currentStep) > index;
            const isLast = index === steps.length - 1;
            
            return (
              <li 
                key={step.id} 
                className={`flex items-center ${isLast ? '' : 'w-full'}`}
              >
                <div className="flex flex-col items-center">
                  {/* Step circle */}
                  <div 
                    className={`flex items-center justify-center w-8 h-8 rounded-full lg:h-10 lg:w-10 shrink-0 ${
                      isActive 
                        ? 'bg-primary text-white' 
                        : isCompleted 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <StepIcon className="h-4 w-4" />
                    )}
                  </div>
                  
                  {/* Step title */}
                  <span 
                    className={`mt-2 text-xs ${
                      isActive 
                        ? 'text-primary font-medium' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                
                {/* Connecting line */}
                {!isLast && (
                  <div 
                    className={`flex-1 h-0.5 mx-2 ${isCompleted ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </div>
      
      {/* Main Content */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            {(() => {
              const StepIcon = steps.find(s => s.id === currentStep)?.icon || Ship;
              return <StepIcon className="mr-2 h-5 w-5 text-primary" />;
            })()}
            {steps.find(s => s.id === currentStep)?.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {/* Step Content */}
          <div className="min-h-[300px]">
            {currentStep === "details" && (
              <div className="space-y-6">                
                {/* Destination Section */}
                <div>
                  <div className="flex items-center mb-2 text-blue-500">
                    <MapPin className="mr-2 h-5 w-5" />
                    <span className="text-gray-700 dark:text-gray-300">Destination</span>
                  </div>
                  <BookingForm 
                    hideSteps={true} 
                    hideLabels={true} 
                    initialStep="destination" 
                  />
                </div>
                
                {/* Dates Section */}
                <div className="mt-6">
                  <div className="flex items-center mb-2 text-blue-500">
                    <Calendar className="mr-2 h-5 w-5" />
                    <span className="text-gray-700 dark:text-gray-300">Travel Dates</span>
                  </div>
                  <BookingForm 
                    hideSteps={true} 
                    hideLabels={true} 
                    initialStep="dates" 
                  />
                </div>
                
                {/* Travelers Section */}
                <div className="mt-6">
                  <div className="flex items-center mb-2 text-blue-500">
                    <Users className="mr-2 h-5 w-5" />
                    <span className="text-gray-700 dark:text-gray-300">Travelers</span>
                  </div>
                  <BookingForm 
                    hideSteps={true} 
                    hideLabels={true} 
                    initialStep="travelers" 
                  />
                </div>
              </div>
            )}
            
            {currentStep === "cabin" && (
              <CabinSelector />
            )}
            
            {currentStep === "payment" && (
              <div className="space-y-6">
                <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 mr-3">
                      <Image
                        src="/images/pokeball-icon.png"
                        alt="Pokeball"
                        width={32}
                        height={32}
                        className="animate-spin-slow"
                      />
                    </div>
                    <h3 className="text-lg font-semibold">Demo Mode</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This is a demo application. No actual payment will be processed.
                    In a real application, this step would include a secure payment form.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Booking Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cruise:</span>
                      <span className="font-medium">{selectedCruise?.name || 'Not selected'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Region:</span>
                      <span className="font-medium">{region || 'Not selected'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dates:</span>
                      <span className="font-medium">{formatDateRange()}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Travelers:</span>
                      <span className="font-medium">
                        {passengers.adults} {passengers.adults === 1 ? 'Adult' : 'Adults'}
                        {passengers.children > 0 && `, ${passengers.children} ${passengers.children === 1 ? 'Child' : 'Children'}`}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cabin Type:</span>
                      <span className="font-medium">{getCabinDetails().name}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cabin Cost:</span>
                      <span className="font-medium">${getCabinDetails().price}/person</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Cabin Cost:</span>
                      <span className="font-medium">${getCabinDetails().price * (passengers.adults + passengers.children)} (${getCabinDetails().price} × {passengers.adults + passengers.children})</span>
                    </div>
                    
                    <Separator />
                    
                    {/* Price Breakdown */}
                    <div className="space-y-2 py-2">
                      <h4 className="text-sm font-semibold">Price Breakdown</h4>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Base Cabin Cost:</span>
                        <span>${getCabinDetails().price} × {passengers.adults + passengers.children} travelers</span>
                      </div>
                      
                      {selectedCruise?.duration && selectedCruise.duration !== 7 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Duration Adjustment:</span>
                          <span>{selectedCruise.duration} days ({(selectedCruise.duration / 7).toFixed(1)}× factor)</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-sm font-medium">
                        <span>Cabin Subtotal:</span>
                        <span>${calculateCabinSubtotal()}</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Taxes & Fees:</span>
                        <span>$99</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between font-bold pt-2">
                      <span>Total:</span>
                      <span>${calculateTotal()}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Error Messages */}
          {formErrors.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <ul className="text-sm text-red-600 dark:text-red-400 pl-5 list-disc">
                {formErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePreviousStep}
            disabled={currentStepIndex === 0}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          {currentStepIndex < steps.length - 1 ? (
            <Button
              onClick={handleNextStep}
              disabled={!isFormValid}
              className="bg-primary hover:bg-primary/90"
            >
              Continue
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleCompleteBooking}
              className="bg-amber-500 hover:bg-amber-600 text-white"
            >
              Complete Booking
              <Check className="ml-2 h-4 w-4" />
            </Button>
          )}
        </CardFooter>
      </Card>
      
      {/* Pokemon-themed decoration */}
      <div className="flex justify-center mt-8">
        <div className="flex space-x-4">
          {["pikachu", "bulbasaur", "charmander", "squirtle"].map((pokemon) => (
            <div key={pokemon} className="w-12 h-12 relative opacity-70 hover:opacity-100 transition-opacity">
              <Image
                src={`/images/pokemon/${pokemon}.png`}
                alt={pokemon}
                width={48}
                height={48}
                onError={(e) => {
                  // Fallback if image doesn't exist
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
