"use client";

import Image from "next/image";
import Link from "next/link";
import { getFeaturedCruises } from "@/data/cruises";
import { Button } from "@/components/ui/button";
// Card components are no longer directly used here, they are in CruiseCard
import { BookingForm } from "@/components/booking-form";
import { CruiseCard } from "@/components/cruise-card"; // New CruiseCard component
import OceanWaves from '@/components/ui/ocean-waves';
import { useCruiseFilters } from "@/hooks/useCruiseFilters";

export default function Home() {
  const featuredCruises = getFeaturedCruises();
   const { setRegionFilter } = useCruiseFilters();

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
              <CruiseCard key={cruise.id} cruise={cruise} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild variant="pokeorange" size="lg">
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
                  <Link href="/cruises" onClick={() => setRegionFilter('Kanto')}>Explore Cruises</Link>
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
                  <Link href="/cruises" onClick={() => setRegionFilter('Johto')}>Explore Cruises</Link>
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
                  <Link href="/cruises" onClick={() => setRegionFilter('Hoenn')}>Explore Cruises</Link>
                </Button>
              </div>
            </div>

            <div className="relative h-64 rounded-lg overflow-hidden group">
              <Image 
                src="/images/sinnoh-region.png" 
                alt="Sinnoh Region" 
                fill 
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Sinnoh</h3>
                <p className="text-sm mb-4">An exotic land</p>
                <Button asChild variant="pokeorange" size="sm">
                  <Link href="/cruises" onClick={() => setRegionFilter('Sinnoh')}>Explore Cruises</Link>
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-primary text-primary-foreground pb-24 md:pb-32 lg:pb-40">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Set Sail?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Book your dream Pokemon cruise adventure today and create memories that will last a lifetime.
          </p>
          <Button asChild size="lg" variant="pokeorange">
            <Link href="/booking">Book Now</Link>
          </Button>
        </div>
        <OceanWaves />
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hear From Our Happy Trainers!</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              See what fellow adventurers are saying about their Pokémon cruise experience.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-card p-6 rounded-lg shadow-lg flex flex-col">
              <p className="text-card-foreground mb-4 italic flex-grow">
                "The Kanto cruise was an absolute dream! Seeing wild Pikachu in their natural habitat and battling alongside Gym Leader Brock was an unforgettable experience. Highly recommend!"
              </p>
              <div className="flex items-center mt-auto">
                <Image src="/images/testimonials/trainer-boy.png" alt="Trainer Ash" width={40} height={40} className="rounded-full mr-3" />
                <div>
                  <p className="font-semibold text-card-foreground">Bill</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    Trainer
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-card p-6 rounded-lg shadow-lg flex flex-col">
              <p className="text-card-foreground mb-4 italic flex-grow">
                "As a Pokémon Professor, I was thrilled with the research opportunities on the Hoenn voyage. The crew was knowledgeable, and the diversity of Pokémon encountered was astounding!"
              </p>
              <div className="flex items-center mt-auto">
                <Image src="/images/testimonials/researcher.png" alt="Professor Grey" width={40} height={40} className="rounded-full mr-3" />
                <div>
                  <p className="font-semibold text-card-foreground">Professor Grey</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    Researcher
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-card p-6 rounded-lg shadow-lg flex flex-col">
              <p className="text-card-foreground mb-4 italic flex-grow">
                "The luxury cabins and gourmet food were top-notch, but the real highlight was the Pokémon Contest Spectacular show! My Skitty and I even won a ribbon!"
              </p>
              <div className="flex items-center mt-auto">
                <Image src="/images/testimonials/trainer-girl.png" alt="Trainer Girl" width={40} height={40} className="rounded-full mr-3" />
                <div>
                  <p className="font-semibold text-card-foreground">Aurora</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    Trainer
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
