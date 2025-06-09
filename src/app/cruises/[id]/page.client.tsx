'use client';

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CruiseMap } from "@/components/cruise-map";
import { InteractiveItinerary } from "@/components/interactive-itinerary";
import { Cruise } from "@/data/cruises";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Client component for interactive parts
const CruiseDetailClient = ({ cruise }: { cruise: Cruise }) => {

  const [activeDay, setActiveDay] = useState(1);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="relative h-[300px] md:h-[400px] lg:h-[500px] w-full rounded-lg overflow-hidden mb-8">
        <Image
          src={cruise.images[0] || "/images/cruise-placeholder.jpg"}
          alt={cruise.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">{cruise.name}</h1>
          <p className="text-xl text-white/90">{cruise.region} Region • {cruise.duration} Days</p>
        </div>
      </div>

      {/* Cruise Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
            <h2 className="text-2xl font-bold mb-4">About This Cruise</h2>
            <p>{cruise.description}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Highlights</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cruise.highlights.map((highlight, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 mt-1 text-amber-600">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Onboard Amenities</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {cruise.amenities.map((amenity, index) => (
                <li key={index} className="flex items-start">
                  <span className="mr-2 mt-1 text-amber-600">•</span>
                  <span>{amenity}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">Starting from</p>
                <p className="text-3xl font-bold text-amber-600">${cruise.startingPrice}</p>
                <p className="text-sm text-muted-foreground">per person</p>
              </div>
              <Button asChild className="w-full mb-4 bg-amber-500 hover:bg-amber-600 text-white">
                <Link href={`/booking?cruise=${cruise.id}`}>Book Now</Link>
              </Button>
              <div className="text-sm text-muted-foreground text-center">
                <p>No booking fees • Free cancellation</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs for Itinerary and Cabins */}
      <Tabs defaultValue="itinerary" className="mb-12">
          <div className="flex justify-center">
            <TabsList className="inline-flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
              <TabsTrigger value="itinerary" className="px-4 sm:px-5 py-3 -mb-px border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:border-amber-500 data-[state=active]:text-amber-600 data-[state=inactive]:border-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-gray-700 data-[state=inactive]:hover:border-gray-300 dark:data-[state=inactive]:hover:text-gray-300 dark:data-[state=inactive]:hover:border-gray-500">Itinerary</TabsTrigger>
              <TabsTrigger value="cabins" className="px-4 sm:px-5 py-3 -mb-px border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:border-amber-500 data-[state=active]:text-amber-600 data-[state=inactive]:border-transparent data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-gray-700 data-[state=inactive]:hover:border-gray-300 dark:data-[state=inactive]:hover:text-gray-300 dark:data-[state=inactive]:hover:border-gray-500">Cabin Options</TabsTrigger>
            </TabsList>
          </div>
        <TabsContent value="itinerary" className="pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <InteractiveItinerary
                cruise={cruise}
                activeDay={activeDay}
                onDaySelect={setActiveDay}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Interactive Map</h3>
              <div className="bg-muted rounded-lg overflow-hidden h-[400px] md:h-[500px]">
                <CruiseMap
                  cruise={cruise}
                  activeDay={activeDay}
                  onDaySelect={setActiveDay}
                />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="cabins" className="pt-6">
          <h3 className="text-xl font-bold mb-4">Available Cabin Types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cruise.cabinTypes.map((cabin) => (
              <Card key={cabin.id} className="pt-0 border-0 overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                  <Image
                    src={cabin.images[0] || "/images/cabin-placeholder.jpg"}
                    alt={cabin.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-lg font-bold">{cabin.name}</h4>
                      <p className="text-sm text-muted-foreground">Up to {cabin.capacity} guests</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-amber-600">${cabin.price}</p>
                      <p className="text-xs text-muted-foreground">per person</p>
                    </div>
                  </div>
                  <p className="text-sm mb-4">{cabin.description}</p>
                  <div className="mb-4">
                    <h5 className="text-sm font-medium mb-2">Amenities:</h5>
                    <div className="flex flex-wrap gap-2">
                      {cabin.amenities.slice(0, 4).map((amenity, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-1 bg-muted rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                      {cabin.amenities.length > 4 && (
                        <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full">
                          +{cabin.amenities.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <Link href={`/booking?cruise=${cruise.id}&cabin=${cabin.id}`}>Select This Cabin</Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Gallery */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Cruise Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cruise.images.map((image, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={image || "/images/cruise-placeholder.jpg"}
                alt={`${cruise.name} - Image ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary/10 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Embark on This Adventure?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Book your spot on the {cruise.name} and explore the {cruise.region} region like never before!
        </p>
        <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
          <Link href={`/booking?cruise=${cruise.id}`}>Book This Cruise</Link>
        </Button>
      </div>
    </div>
  );
};

export default CruiseDetailClient;