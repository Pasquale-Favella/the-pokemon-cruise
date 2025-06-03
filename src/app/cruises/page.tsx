import Image from "next/image";
import Link from "next/link";
import { cruises } from "@/data/cruises";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingForm } from "@/components/booking-form";

export default function CruisesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Presentation Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Explore Our Pokemon Cruises</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover unique cruise experiences inspired by the world of Pokemon. 
          Each cruise offers a different adventure through iconic Pokemon regions.
        </p>
      </div>
      
      {/* Booking Form Section */}
      <section className="mb-12">
        <div className="max-w-6xl mx-auto">
          <BookingForm />
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cruises.map((cruise) => (
          <Card key={cruise.id} className="overflow-hidden transition-all hover:shadow-lg">
            <div className="relative h-48 w-full overflow-hidden">
              <Image 
                src={cruise.images[0] || "/images/cruise-placeholder.jpg"}
                alt={cruise.name}
                fill
                className="object-cover transition-transform hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{cruise.name}</CardTitle>
                  <CardDescription>{cruise.region} Region</CardDescription>
                </div>
                <span className="text-lg font-bold text-primary">
                  ${cruise.startingPrice}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{cruise.shortDescription}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {cruise.highlights.slice(0, 3).map((highlight, index) => (
                  <span 
                    key={index} 
                    className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                  >
                    {highlight}
                  </span>
                ))}
                {cruise.highlights.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                    +{cruise.highlights.length - 3} more
                  </span>
                )}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="mr-4">{cruise.duration} days</span>
                <span>{cruise.itinerary.length} ports</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/cruises/${cruise.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
