"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2 } from "lucide-react";

interface Passenger {
  firstName: string;
  lastName: string;
  age: string;
  email: string;
  phone: string;
}

interface PassengerDetailsProps {
  passengers: Passenger[];
  onChange: (passengers: Passenger[]) => void;
}

export function PassengerDetails({ passengers, onChange }: PassengerDetailsProps) {
  const handleAddPassenger = () => {
    onChange([
      ...passengers,
      { firstName: "", lastName: "", age: "", email: "", phone: "" },
    ]);
  };

  const handleRemovePassenger = (index: number) => {
    const newPassengers = [...passengers];
    newPassengers.splice(index, 1);
    onChange(newPassengers);
  };

  const handlePassengerChange = (index: number, field: keyof Passenger, value: string) => {
    const newPassengers = [...passengers];
    newPassengers[index] = {
      ...newPassengers[index],
      [field]: value,
    };
    onChange(newPassengers);
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Passenger Information</h3>
        <p className="text-sm text-muted-foreground">
          Please provide details for each passenger traveling on this cruise.
        </p>
      </div>

      {passengers.map((passenger, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium">
                {index === 0 ? "Primary Passenger" : `Passenger ${index + 1}`}
              </h4>
              {index > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemovePassenger(index)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`firstName-${index}`}>First Name</Label>
                <Input
                  id={`firstName-${index}`}
                  value={passenger.firstName}
                  onChange={(e) => handlePassengerChange(index, "firstName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`lastName-${index}`}>Last Name</Label>
                <Input
                  id={`lastName-${index}`}
                  value={passenger.lastName}
                  onChange={(e) => handlePassengerChange(index, "lastName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`age-${index}`}>Age</Label>
                <Input
                  id={`age-${index}`}
                  type="number"
                  min="0"
                  max="120"
                  value={passenger.age}
                  onChange={(e) => handlePassengerChange(index, "age", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`email-${index}`}>Email</Label>
                <Input
                  id={`email-${index}`}
                  type="email"
                  value={passenger.email}
                  onChange={(e) => handlePassengerChange(index, "email", e.target.value)}
                  required={index === 0}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor={`phone-${index}`}>Phone Number</Label>
                <Input
                  id={`phone-${index}`}
                  type="tel"
                  value={passenger.phone}
                  onChange={(e) => handlePassengerChange(index, "phone", e.target.value)}
                  required={index === 0}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        variant="outline"
        className="w-full"
        onClick={handleAddPassenger}
      >
        <PlusCircle className="h-4 w-4 mr-2" />
        Add Another Passenger
      </Button>
    </div>
  );
}
