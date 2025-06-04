import Image from "next/image";
import Link from "next/link";
import { Cruise } from "@/data/cruises";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface CruiseCardProps {
  cruise: Cruise;
}

export function CruiseCard({ cruise }: CruiseCardProps) {
  return (
    <Card key={cruise.id} className="pb-6 pt-0 border-0 overflow-hidden transition-all hover:shadow-lg flex flex-col h-full">
      <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
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
          <span className="text-lg font-bold text-amber-600">
            ${cruise.startingPrice}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{cruise.shortDescription}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {cruise.highlights.slice(0, 3).map((highlight: string, index: number) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-full"
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
      <CardFooter className="mt-auto">
        <Button asChild className="w-full">
          <Link href={`/cruises/${cruise.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
