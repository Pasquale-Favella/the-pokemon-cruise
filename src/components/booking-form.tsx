"use client";

import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Link from 'next/link';
import { CalendarIcon, Users, Ship, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { useBookingForm } from '@/hooks/use-booking';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { getAllRegions, cruises } from '@/data/cruises';
import Image from 'next/image';

interface BookingFormProps {
  hideSteps?: boolean;
  hideLabels?: boolean;
  enhancedLabels?: boolean;
  initialStep?: 'destination' | 'dates' | 'travelers';
}

export function BookingForm({ hideSteps = false, hideLabels = false, enhancedLabels = false, initialStep = 'destination' }: BookingFormProps) {
  const { 
    region, setRegion, 
    cruiseId, setCruiseId,
    dates, setDates,
    passengers, setAdults, setChildren,
    initializeBooking
  } = useBookingForm();
  const [isPassengersOpen, setIsPassengersOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  
  const regions = getAllRegions();

  // Handle passenger count changes
  const handleAdultsChange = (value: number) => {
    setAdults(value);
  };

  const handleChildrenChange = (value: number) => {
    setChildren(value);
  };

  // Format date range for display
  const formatDateRange = () => {
    if (!dates.startDate) return 'Select dates';
    if (!dates.endDate) return format(dates.startDate, 'MMM d, yyyy');
    return `${format(dates.startDate, 'MMM d, yyyy')} - ${format(dates.endDate, 'MMM d, yyyy')}`;
  };

  // Initialize booking and focus on the appropriate section based on initialStep
  useEffect(() => {
    // Initialize with defaults based on initial step
    if (initialStep === 'dates') {
      initializeBooking({ startDate: new Date() });
      setIsCalendarOpen(true);
    } else if (initialStep === 'travelers') {
      initializeBooking({ adults: 2, children: 0 });
      setIsPassengersOpen(true);
    }
  }, [initialStep, initializeBooking]);

  return (
    <Card className={`w-full max-w-6xl mx-auto overflow-hidden relative 
      border-2 border-amber-200 hover:border-amber-300 transition-colors duration-300
      ${hideSteps ? 'shadow-none border-0 p-0' : 'shadow-md'}`}>
      <CardContent className={`relative z-10 ${hideSteps ? 'p-0' : 'p-6'}`}>
        {/* Form Controls - Stacked on mobile, inline on larger screens */}
        <div className={`md:flex md:items-end md:space-x-4 ${hideSteps ? 'space-y-0' : 'space-y-4 md:space-y-0'}`}>
          {/* Only show destination selector if initialStep is destination or hideSteps is false */}
          {(initialStep === 'destination' || !hideSteps) && (
            <div className="flex-1">
            {!hideLabels && (
              <label className={`block font-medium text-gray-700 dark:text-gray-300 ${enhancedLabels ? 'text-lg mb-3 flex items-center' : 'text-sm mb-2'}`}>
                {enhancedLabels && <MapPin className="mr-2 h-5 w-5 text-primary" />}
                Destination
              </label>
            )}
            <Select 
              value={cruiseId || 'all-destinations'} 
              onValueChange={(value) => {
                if (value === 'all-destinations') {
                  setRegion(null);
                  setCruiseId(null);
                } else if (value.startsWith('region-')) {
                  const regionName = value.replace('region-', '');
                  setRegion(regionName);
                  setCruiseId(null);
                } else {
                  const cruise = cruises.find(c => c.id === value);
                  if (cruise) {
                    setRegion(cruise.region);
                    setCruiseId(value);
                  }
                }
              }}
            >
              <SelectTrigger className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-10 rounded-md">
                <div className="flex items-center">
                  <Ship className="w-4 h-4 mr-2 text-amber-500" />
                  <SelectValue placeholder="Select destination" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-destinations">Any Destination</SelectItem>
                {regions.map((r) => {
                  const regionCruises = cruises.filter(c => c.region === r);
                  return [
                    <SelectItem key={`region-${r}`} value={`region-${r}`} disabled className="font-semibold text-amber-600 bg-amber-50/50 dark:bg-amber-900/10 dark:text-amber-400">
                      {r} Region
                    </SelectItem>,
                    ...regionCruises.map((cruise) => (
                      <SelectItem key={cruise.id} value={cruise.id} className="pl-6">
                        {cruise.name}
                      </SelectItem>
                    ))
                  ];
                }).flat()}
              </SelectContent>
            </Select>
            </div>
          )}

          {/* Date Selection */}
          {(initialStep === 'dates' || !hideSteps) && (
            <div className="flex-1">
            {!hideLabels && (
              <label className={`block font-medium text-gray-700 dark:text-gray-300 ${enhancedLabels ? 'text-lg mb-3 flex items-center' : 'text-sm mb-2'}`}>
                {enhancedLabels && <CalendarIcon className="mr-2 h-5 w-5 text-primary" />}
                Travel Dates
              </label>
            )}
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-10 rounded-md font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-amber-500" />
                  <span>{formatDateRange()}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={{
                    from: dates.startDate || undefined,
                    to: dates.endDate || undefined,
                  }}
                  onSelect={(range) => {
                    setDates({
                      startDate: range?.from || null,
                      endDate: range?.to || null,
                    });
                    if (range?.to) {
                      setIsCalendarOpen(false);
                    }
                  }}
                  initialFocus
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
            </div>
          )}

          {/* Passengers Selection */}
          {(initialStep === 'travelers' || !hideSteps) && (
            <div className="flex-1">
            {!hideLabels && (
              <label className={`block font-medium text-gray-700 dark:text-gray-300 ${enhancedLabels ? 'text-lg mb-3 flex items-center' : 'text-sm mb-2'}`}>
                {enhancedLabels && <Users className="mr-2 h-5 w-5 text-primary" />}
                Travelers
              </label>
            )}
            <Popover open={isPassengersOpen} onOpenChange={setIsPassengersOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-10 rounded-md font-normal"
                >
                  <div className="flex items-center">
                    <Users className="mr-2 h-4 w-4 text-amber-500" />
                    <span>
                      {passengers.adults + passengers.children} {passengers.adults + passengers.children === 1 ? 'Traveler' : 'Travelers'}
                    </span>
                  </div>
                  {isPassengersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72 p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Adults</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Ages 18+</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => handleAdultsChange(passengers.adults - 1)}
                        disabled={passengers.adults <= 1}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{passengers.adults}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => handleAdultsChange(passengers.adults + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Children</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Ages 0-17</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => handleChildrenChange(passengers.children - 1)}
                        disabled={passengers.children <= 0}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{passengers.children}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={() => handleChildrenChange(passengers.children + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button 
                    className="w-full mt-2 bg-amber-500 hover:bg-amber-600 text-white"
                    onClick={() => setIsPassengersOpen(false)}
                  >
                    Apply
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            </div>
          )}

          {/* Search Button - Inline with inputs on md+ screens */}
          {!hideSteps && (
            <div className="md:flex-none">
            <Button 
              asChild
              className="w-full md:w-auto px-6 bg-amber-500 hover:bg-amber-600 text-white font-medium h-10 rounded-md"
            >
              <Link href={cruiseId ? `/cruises/${cruiseId}` : (region ? `/cruises?region=${region}` : "/cruises")}>
                  <span className="flex items-center">
                    <Image
                      src="/images/pokeball-icon.svg"
                      alt="Pokeball"
                      width={16}
                      height={16}
                      className="mr-2"
                    />
                    Search
                  </span>
              </Link>
            </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
