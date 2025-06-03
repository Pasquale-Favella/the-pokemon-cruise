import Image from "next/image";
import Link from "next/link";
import { getFeaturedCruises } from "@/data/cruises";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BookingForm } from "@/components/booking-form";

export default function Home() {
  const featuredCruises = getFeaturedCruises();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-blue-600 text-white">
        {/* Background image */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img 
            src="/images/hero-background.png" 
            alt="Pokemon ocean background" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-center">
            Embark on a Pokemon Adventure at Sea
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mb-10 text-white text-center">
            Discover unique cruise experiences inspired by the world of Pokemon. Explore iconic regions, meet legendary trainers, and create unforgettable memories.
          </p>
          {/* Buttons removed as requested */}
        </div>
        
      </section>

      {/* Pokemon-themed Booking Form */}
      <section className="relative z-20 bg-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20 max-w-6xl">
          <BookingForm />
        </div>
      </section>

      {/* Featured Cruises Section */}
      <section className="pt-16 pb-16 md:pt-24 md:pb-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Cruises</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our most popular Pokemon-themed cruise experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCruises.map((cruise) => (
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
                  <div className="flex flex-wrap gap-2">
                    {cruise.highlights.slice(0, 2).map((highlight, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                    {cruise.highlights.length > 2 && (
                      <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                        +{cruise.highlights.length - 2} more
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant="pokeblue">
                    <Link href={`/cruises/${cruise.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="secondary" size="lg">
              <Link href="/cruises">View All Cruises</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Regions Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Pokemon Regions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the unique beauty and adventure of each Pokemon region
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative h-64 rounded-lg overflow-hidden group">
              <Image 
                src="/images/kanto-region.jpg" 
                alt="Kanto Region" 
                fill 
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Kanto</h3>
                <p className="text-sm mb-4">The classic region where it all began</p>
                <Button asChild variant="pokeorange" size="sm">
                  <Link href="/cruises?region=kanto">Explore Cruises</Link>
                </Button>
              </div>
            </div>

            <div className="relative h-64 rounded-lg overflow-hidden group">
              <Image 
                src="/images/johto-region.jpg" 
                alt="Johto Region" 
                fill 
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Johto</h3>
                <p className="text-sm mb-4">A land of tradition and mythology</p>
                <Button asChild variant="pokeorange" size="sm">
                  <Link href="/cruises?region=johto">Explore Cruises</Link>
                </Button>
              </div>
            </div>

            <div className="relative h-64 rounded-lg overflow-hidden group">
              <Image 
                src="/images/hoenn-region.jpg" 
                alt="Hoenn Region" 
                fill 
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Hoenn</h3>
                <p className="text-sm mb-4">A region of diverse environments</p>
                <Button asChild variant="pokeorange" size="sm">
                  <Link href="/cruises?region=hoenn">Explore Cruises</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Set Sail?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Book your dream Pokemon cruise adventure today and create memories that will last a lifetime.
          </p>
          <Button asChild size="lg" variant="pokeorange">
            <Link href="/booking">Book Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
