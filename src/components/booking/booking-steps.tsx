"use client";

import Image from "next/image";
import { 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  CalendarIcon, // Renamed from Calendar to avoid conflict if 'Calendar' component is used
  Users, 
  Ship,
  CreditCardIcon, // For Card Number
  CalendarDaysIcon, // For Expiry Date
  LockIcon, // For CVC
  ShieldCheckIcon // For Silph Co. text
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CabinSelector } from "@/components/booking/cabin-selector";
// import { type CabinType } from "@/data/cruises"; // No longer directly used for getCabinDetails type
import { BookingForm } from "@/components/booking-form";
// import { getAllRegions, getCruisesByRegion, getCruiseById, cruises, type Cruise, type CabinType as CruiseCabinType } from "@/data/cruises"; // Handled by hook
import { useBookingStepper } from "@/hooks/use-booking-stepper"; // Import the new hook and steps constant

interface BookingStepsProps {
  initialCruiseId?: string;
}

export function BookingSteps({ initialCruiseId }: BookingStepsProps) {
  const {
    currentStep,
    currentStepIndex,
    steps,
    isFormValid,
    formErrors,
    selectedCruise,
    handleNextStep,
    handlePreviousStep,
    handleCompleteBooking,
    calculatePriceBreakdown,
  } = useBookingStepper({ initialCruiseId });

  const priceBreakdown = calculatePriceBreakdown();

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
                    <CalendarIcon className="mr-2 h-5 w-5" />
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
            
            {currentStep === "payment" && selectedCruise && priceBreakdown && (
              <div className="space-y-6">
                {/* Card 1: Payment Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="text-center py-4 border-b border-dashed dark:border-gray-700 mb-6">
                      <Image src="/images/pokeball-payment.svg" alt="Payment Pokeball" width={72} height={72} className="mx-auto mb-3 opacity-90" />
                      <div className="flex items-center justify-center text-sm text-muted-foreground">
                        <ShieldCheckIcon className="w-4 h-4 mr-2 text-green-500" />
                        <span>Secure payment processing by <strong>Silph Co. Financial</strong>.</span>
                      </div>
                    </div>
                    
                    <div className="space-y-5"> {/* Demo Payment Form Fields Container - increased spacing slightly */}
                      <div>
                        <Label htmlFor="cardNumber" className="text-sm font-medium">Card Number</Label>
                        <div className="relative mt-1">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <CreditCardIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </div>
                          <Input id="cardNumber" placeholder="•••• •••• •••• ••••" className="pl-10" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                        <div className="md:col-span-3">
                          <Label htmlFor="expiryDate" className="text-sm font-medium">Expiry Date</Label>
                          <div className="relative mt-1">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <CalendarDaysIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <Input id="expiryDate" placeholder="MM / YY" className="pl-10" />
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="cvc" className="text-sm font-medium">CVC / CVV</Label>
                          <div className="relative mt-1">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <LockIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </div>
                            <Input id="cvc" placeholder="•••" className="pl-10" />
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardHolder" className="text-sm font-medium">Cardholder Name</Label>
                        <Input id="cardHolder" placeholder="Ash Ketchum" className="mt-1" />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <Checkbox id="saveCard" className="border-2 border-gray-400 dark:border-gray-500 data-[state=checked]:border-primary" />
                      <Label htmlFor="saveCard" className="text-sm font-medium text-foreground/90 cursor-pointer">
                        Securely save this card for future PokéMart purchases.
                      </Label>
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-muted-foreground">Or pay with:</h4>
                        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-1">
                            <Button variant="outline" className="flex-1 py-3 hover:bg-muted/50 transition-colors duration-150">
                                <Image src="/images/meowth-pay.svg" alt="Meowth Pay" width={22} height={22} className="mr-2 opacity-90"/> Meowth Pay
                            </Button>
                            <Button variant="outline" className="flex-1 py-3 hover:bg-muted/50 transition-colors duration-150">
                                <Image src="/images/porygon-pay.svg" alt="Porygon Pay" width={22} height={22} className="mr-2 opacity-90"/> Porygon Pay
                            </Button>
                        </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Card 2: Price Breakdown */}
                <Card>
                  <CardHeader>
                      <CardTitle>Final Price Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {priceBreakdown && selectedCruise ? (
                      <div className="space-y-1 py-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Adult Fare (x{priceBreakdown.numberOfAdults})</span>
                          <span>${priceBreakdown.rawAdultFare.toFixed(2)} / person</span>
                        </div>
                        {priceBreakdown.numberOfChildren > 0 && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Child Fare (x{priceBreakdown.numberOfChildren})</span>
                            <span>${priceBreakdown.childFarePerPerson.toFixed(2)} / person (60% off)</span>
                          </div>
                        )}
                        <div className="flex justify-between font-medium">
                          <span className="text-muted-foreground">Total Cruise Fare</span>
                          <span>${priceBreakdown.totalCruiseFare.toFixed(2)}</span>
                        </div>

                        {priceBreakdown.cabinName && priceBreakdown.cabinName !== "N/A" && (
                          <div className="flex justify-between mt-1">
                            <span className="text-muted-foreground flex items-center">
                              Cabin ({priceBreakdown.cabinName})
                              {priceBreakdown.cabinCapacity && priceBreakdown.cabinCapacity > 0 && (
                                <span className="ml-1 text-xs flex items-center">
                                  (<Image src="/images/pokeball-icon.svg" alt="Capacity" width={12} height={12} className="mr-1 opacity-75 inline-block" />
                                  Max {priceBreakdown.cabinCapacity})
                                </span>
                              )}
                            </span>
                            <span>${priceBreakdown.cabinPrice.toFixed(2)}</span>
                          </div>
                        )}
                        <Separator className="my-2" />
                        <div className="flex justify-between font-semibold">
                          <span className="text-muted-foreground">Subtotal (Cruise + Cabin)</span>
                          <span>${priceBreakdown.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Taxes & Fees</span>
                          <span>${priceBreakdown.taxesAndFees.toFixed(2)}</span>
                        </div>
                        <Separator className="my-2" />
                        <div className="flex justify-between font-bold text-base pt-1">
                          <span>Total</span>
                          <span>${priceBreakdown.total.toFixed(2)}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Select your cruise options to see the final price breakdown.</p>
                    )}
                    {/* The Separator and Total might be duplicated if the above doesn't replace the entire old block correctly. 
                        The intention is for the above block to fully replace the old summary including its own total. 
                        If there's a total line remaining below this from the old code, it should be removed by adjusting TargetContent.*/}
                  </CardContent>
                </Card>
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
    </div>
  );
}
