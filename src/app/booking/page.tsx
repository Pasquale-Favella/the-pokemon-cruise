"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { getCruiseById } from "@/data/cruises";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookingSteps } from "@/components/booking/booking-steps";
import { BookingSummaryWidget } from "@/components/booking/booking-summary-widget";

const steps = [
  { id: "cruise", title: "Select Cruise" },
  { id: "cabin", title: "Choose Cabin" },
  { id: "passengers", title: "Passenger Details" },
  { id: "payment", title: "Payment" },
  { id: "summary", title: "Summary" },
];

export default function BookingPage() {
  const searchParams = useSearchParams();
  const initialCruiseId = searchParams.get("cruise");
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Book Your Pokemon Cruise</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Complete the steps below to secure your spot on an unforgettable Pokemon adventure.
        </p>
        <div className="mt-6 flex justify-center">
          <Image 
            src="/images/pokeball-divider.png" 
            alt="Pokeball divider" 
            width={120} 
            height={40}
            className="opacity-70"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BookingSteps initialCruiseId={initialCruiseId || undefined} />
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <BookingSummaryWidget />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
