"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getCruiseById } from "@/data/cruises";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Steps, Step } from "@/components/ui/steps";
import { CruiseSelection } from "@/components/booking/cruise-selection";
import { CabinSelection } from "@/components/booking/cabin-selection";
import { PassengerDetails } from "@/components/booking/passenger-details";
import { PaymentDetails } from "@/components/booking/payment-details";
import { BookingSummary } from "@/components/booking/booking-summary";

const steps = [
  { id: "cruise", title: "Select Cruise" },
  { id: "cabin", title: "Choose Cabin" },
  { id: "passengers", title: "Passenger Details" },
  { id: "payment", title: "Payment" },
  { id: "summary", title: "Summary" },
];

export default function BookingPage() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [bookingData, setBookingData] = useState({
    cruiseId: "",
    cabinId: "",
    passengers: [{ firstName: "", lastName: "", age: "", email: "", phone: "" }],
    paymentDetails: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      billingAddress: "",
    },
    totalPrice: 0,
  });

  // Initialize booking data from URL parameters
  useEffect(() => {
    const cruiseId = searchParams.get("cruise");
    const cabinId = searchParams.get("cabin");
    
    if (cruiseId) {
      setBookingData(prev => ({ ...prev, cruiseId }));
      
      // If both cruise and cabin are provided, start at passenger details step
      if (cabinId) {
        setBookingData(prev => ({ ...prev, cabinId }));
        setCurrentStep(2); // Passenger details step
      } else {
        setCurrentStep(1); // Cabin selection step
      }
    }
  }, [searchParams]);

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const updateBookingData = (data: Partial<typeof bookingData>) => {
    setBookingData(prev => ({ ...prev, ...data }));
  };

  const selectedCruise = bookingData.cruiseId ? getCruiseById(bookingData.cruiseId) : null;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Book Your Pokemon Cruise</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Complete the steps below to secure your spot on an unforgettable Pokemon adventure.
        </p>
      </div>

      <div className="mb-8">
        <Steps currentStep={currentStep} className="mb-12">
          {steps.map((step, index) => (
            <Step key={step.id} title={step.title} completed={index < currentStep} />
          ))}
        </Steps>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{steps[currentStep].title}</CardTitle>
              <CardDescription>
                {currentStep === 0 && "Select a cruise for your Pokemon adventure"}
                {currentStep === 1 && "Choose a cabin type for your journey"}
                {currentStep === 2 && "Enter details for all passengers"}
                {currentStep === 3 && "Enter your payment information"}
                {currentStep === 4 && "Review your booking details"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentStep === 0 && (
                <CruiseSelection 
                  selectedCruiseId={bookingData.cruiseId}
                  onSelect={(cruiseId) => updateBookingData({ cruiseId })}
                />
              )}
              {currentStep === 1 && selectedCruise && (
                <CabinSelection 
                  cruise={selectedCruise}
                  selectedCabinId={bookingData.cabinId}
                  onSelect={(cabinId) => updateBookingData({ cabinId })}
                />
              )}
              {currentStep === 2 && (
                <PassengerDetails 
                  passengers={bookingData.passengers}
                  onChange={(passengers) => updateBookingData({ passengers })}
                />
              )}
              {currentStep === 3 && (
                <PaymentDetails 
                  paymentDetails={bookingData.paymentDetails}
                  onChange={(paymentDetails) => updateBookingData({ paymentDetails })}
                />
              )}
              {currentStep === 4 && selectedCruise && (
                <BookingSummary 
                  bookingData={bookingData}
                  cruise={selectedCruise}
                />
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext}>
                  Continue
                </Button>
              ) : (
                <Button onClick={() => alert("Booking confirmed! Thank you for choosing Pokemon Cruise.")}>
                  Confirm Booking
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedCruise ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Selected Cruise</h3>
                    <p>{selectedCruise.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedCruise.duration} days • {selectedCruise.region} Region</p>
                  </div>
                  
                  <Separator />
                  
                  {bookingData.cabinId && (
                    <div>
                      <h3 className="font-medium">Cabin Type</h3>
                      <p>
                        {selectedCruise.cabinTypes.find(c => c.id === bookingData.cabinId)?.name || "Not selected"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {bookingData.passengers.length} {bookingData.passengers.length === 1 ? "passenger" : "passengers"}
                      </p>
                    </div>
                  )}
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium">Price Details</h3>
                    <div className="flex justify-between mt-2">
                      <span>Cabin Price</span>
                      <span>
                        ${bookingData.cabinId ? 
                          (selectedCruise.cabinTypes.find(c => c.id === bookingData.cabinId)?.price || 0) : 
                          selectedCruise.startingPrice}
                      </span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Passengers</span>
                      <span>x {Math.max(bookingData.passengers.length, 1)}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Taxes & Fees</span>
                      <span>$99</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>
                        ${bookingData.cabinId ? 
                          ((selectedCruise.cabinTypes.find(c => c.id === bookingData.cabinId)?.price || 0) * 
                            Math.max(bookingData.passengers.length, 1) + 99) : 
                          (selectedCruise.startingPrice + 99)}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">Please select a cruise to see the booking summary.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
