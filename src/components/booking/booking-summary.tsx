"use client";

import Image from "next/image";
import { Cruise } from "@/data/cruises";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface BookingSummaryProps {
  bookingData: {
    cruiseId: string;
    cabinId: string;
    passengers: {
      firstName: string;
      lastName: string;
      age: string;
      email: string;
      phone: string;
    }[];
    paymentDetails: {
      cardName: string;
      cardNumber: string;
      expiryDate: string;
      cvv: string;
      billingAddress: string;
    };
    totalPrice: number;
  };
  cruise: Cruise;
}

export function BookingSummary({ bookingData, cruise }: BookingSummaryProps) {
  const selectedCabin = cruise.cabinTypes.find(c => c.id === bookingData.cabinId);
  
  const calculateTotal = () => {
    const cabinPrice = selectedCabin?.price || cruise.startingPrice;
    const passengerCount = Math.max(bookingData.passengers.length, 1);
    const taxesAndFees = 99;
    
    // Direct calculation: cabin price × number of travelers + taxes and fees
    // No duration adjustment as per updated requirements
    return (cabinPrice * passengerCount) + taxesAndFees;
  };

  const total = calculateTotal();
  
  // Mask card number for security
  const maskCardNumber = (cardNumber: string) => {
    const last4 = cardNumber.slice(-4);
    return `**** **** **** ${last4}`;
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h3 className="text-xl font-medium text-center mb-2">Booking Summary</h3>
        <p className="text-sm text-muted-foreground text-center">
          Please review your booking details before confirming.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="relative h-16 w-16 overflow-hidden rounded">
                <Image
                  src={cruise.images[0] || "/images/cruise-placeholder.jpg"}
                  alt={cruise.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="font-bold">{cruise.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {cruise.duration} days • {cruise.region} Region
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Cabin Details</h4>
              {selectedCabin ? (
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span>Cabin Type:</span>
                  <span className="font-medium">{selectedCabin.name}</span>
                  <span>Capacity:</span>
                  <span className="font-medium">Up to {selectedCabin.capacity} guests</span>
                  <span>Price per person:</span>
                  <span className="font-medium">${selectedCabin.price}</span>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No cabin selected</p>
              )}
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Passenger Information</h4>
              <div className="space-y-3">
                {bookingData.passengers.map((passenger, index) => (
                  <div key={index} className="text-sm">
                    <p className="font-medium">
                      {index === 0 ? "Primary Passenger" : `Passenger ${index + 1}`}
                    </p>
                    <p>
                      {passenger.firstName} {passenger.lastName} • Age: {passenger.age}
                    </p>
                    {index === 0 && (
                      <p className="text-muted-foreground">
                        {passenger.email} • {passenger.phone}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Payment Information</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span>Card Holder:</span>
                <span className="font-medium">{bookingData.paymentDetails.cardName}</span>
                <span>Card Number:</span>
                <span className="font-medium">
                  {maskCardNumber(bookingData.paymentDetails.cardNumber)}
                </span>
                <span>Expiry Date:</span>
                <span className="font-medium">{bookingData.paymentDetails.expiryDate}</span>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Price Breakdown</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Cabin Price:</span>
                  <span>${selectedCabin?.price || cruise.startingPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Passengers:</span>
                  <span>x {bookingData.passengers.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Fees:</span>
                  <span>$99</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${total}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-medium mb-2">Booking Terms</h4>
        <p className="text-sm text-muted-foreground">
          By confirming this booking, you agree to the Pokemon Cruise terms and conditions.
          This is a demo application and no actual booking will be made.
        </p>
      </div>
    </div>
  );
}
