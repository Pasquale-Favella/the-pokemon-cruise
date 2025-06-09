import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingSteps } from "@/components/booking/booking-steps";
import { BookingSummaryWidget } from "@/components/booking/booking-summary-widget";

export default async function BookingPage({ params }: { params: Promise<{ cruise?: string }> }) {

  const resolvedParams = await params;
  const initialCruiseId = resolvedParams.cruise;
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Book Your Pokemon Cruise</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Complete the steps below to secure your spot on an unforgettable Pokemon adventure.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BookingSteps initialCruiseId={initialCruiseId} />
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
