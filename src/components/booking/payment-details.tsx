"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface PaymentDetailsForm {
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  billingAddress: string;
}

interface PaymentDetailsProps {
  paymentDetails: PaymentDetailsForm;
  onChange: (paymentDetails: PaymentDetailsForm) => void;
}

export function PaymentDetails({ paymentDetails, onChange }: PaymentDetailsProps) {
  const handleChange = (field: keyof PaymentDetailsForm, value: string) => {
    onChange({
      ...paymentDetails,
      [field]: value,
    });
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-medium mb-2">Payment Information</h3>
        <p className="text-sm text-muted-foreground">
          Enter your payment details to secure your booking. All information is encrypted and secure.
        </p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardName">Name on Card</Label>
              <Input
                id="cardName"
                value={paymentDetails.cardName}
                onChange={(e) => handleChange("cardName", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={(e) => handleChange("cardNumber", formatCardNumber(e.target.value))}
                maxLength={19}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date (MM/YY)</Label>
                <Input
                  id="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={(e) => handleChange("expiryDate", formatExpiryDate(e.target.value))}
                  maxLength={5}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="password"
                  value={paymentDetails.cvv}
                  onChange={(e) => handleChange("cvv", e.target.value.replace(/\D/g, ""))}
                  maxLength={4}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="billingAddress">Billing Address</Label>
              <Textarea
                id="billingAddress"
                value={paymentDetails.billingAddress}
                onChange={(e) => handleChange("billingAddress", e.target.value)}
                rows={3}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-muted p-4 rounded-lg">
        <h4 className="font-medium mb-2">Payment Security</h4>
        <p className="text-sm text-muted-foreground">
          Your payment information is encrypted and processed securely. We do not store your full card details.
          For this demo, no actual payment will be processed.
        </p>
      </div>
    </div>
  );
}
