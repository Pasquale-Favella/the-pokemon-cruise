"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Cruise } from '@/data/cruises';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, MapPin, Calendar, Ship, Compass } from 'lucide-react';

interface InteractiveItineraryProps {
  cruise: Cruise;
  activeDay?: number;
  onDaySelect?: (day: number) => void;
}

export function InteractiveItinerary({ cruise, activeDay: externalActiveDay, onDaySelect }: InteractiveItineraryProps) {
  // Use external activeDay if provided, otherwise use internal state
  const [internalActiveDay, setInternalActiveDay] = useState(1);
  const [direction, setDirection] = useState(0);
  
  // Determine which activeDay to use (external or internal)
  const activeDay = externalActiveDay !== undefined ? externalActiveDay : internalActiveDay;
  
  // Function to update active day that notifies parent component
  const updateActiveDay = (day: number) => {
    setInternalActiveDay(day);
    if (onDaySelect) {
      onDaySelect(day);
    }
  };
  
  const currentDay = cruise.itinerary.find(day => day.day === activeDay);
  
  const goToNextDay = () => {
    if (activeDay < cruise.itinerary.length) {
      setDirection(1);
      updateActiveDay(activeDay + 1);
    }
  };
  
  const goToPrevDay = () => {
    if (activeDay > 1) {
      setDirection(-1);
      updateActiveDay(activeDay - 1);
    }
  };

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  // Timeline dot variants
  const dotVariants = {
    inactive: { scale: 1, backgroundColor: "#e2e8f0" },
    active: { scale: 1.3, backgroundColor: "#FF9C34" }
  };

  // Activity item variants
  const activityVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4
      }
    })
  };

  return (
    <div className="relative">
      {/* Timeline Navigation */}
      <div className="mb-8 relative">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Cruise Itinerary</h3>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={goToPrevDay} 
              disabled={activeDay === 1}
              className="h-8 w-8 rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={goToNextDay} 
              disabled={activeDay === cruise.itinerary.length}
              className="h-8 w-8 rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Timeline dots */}
        <div className="relative flex justify-between items-center mb-2">
          <div className="absolute h-1 bg-gray-200 w-full top-1/2 transform -translate-y-1/2 z-0"></div>
          {cruise.itinerary.map((day) => (
            <motion.button
              key={day.day}
              className="relative z-10 flex flex-col items-center"
              onClick={() => {
                setDirection(day.day > activeDay ? 1 : -1);
                updateActiveDay(day.day);
              }}
            >
              <motion.div 
                className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center cursor-pointer"
                variants={dotVariants}
                animate={activeDay === day.day ? "active" : "inactive"}
                transition={{ duration: 0.3 }}
              >
                {activeDay === day.day && (
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-white"
                    layoutId="activeDot"
                  />
                )}
              </motion.div>
              <span className={`text-xs mt-1 ${activeDay === day.day ? 'font-bold' : ''}`}>
                Day {day.day}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Day Content with Animation */}
      <div className="relative overflow-hidden">
        <AnimatePresence custom={direction} initial={false} mode="wait">
          <motion.div
            key={activeDay}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-full"
          >
            {currentDay && (
              <Card className="pt-0 border-0 overflow-hidden">
                <div className="relative h-48 w-full overflow-hidden rounded-t-xl">
                  <Image 
                    src={currentDay.port.image || "/images/port-placeholder.jpg"}
                    alt={currentDay.port.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                    <div className="flex items-center text-white mb-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium bg-amber-500/90 text-white px-2 py-0.5 rounded-full">
                        Day {currentDay.day}
                      </span>
                    </div>
                    <div className="flex items-center text-white">
                      <MapPin className="w-4 h-4 mr-1 text-amber-400" />
                      <h4 className="text-xl font-bold">{currentDay.port.name}</h4>
                    </div>
                  </div>
                </div>
                
                <CardContent className="px-6 pt-6 pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center mb-2">
                        <Ship className="w-4 h-4 mr-2 text-amber-500" />
                        <h5 className="font-medium">Port Description</h5>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{currentDay.port.description}</p>
                      

                    </div>
                    
                    <div>
                      <h5 className="font-medium mb-3">Today's Activities:</h5>
                      <div className="space-y-2">
                        {currentDay.activities.map((activity, index) => (
                          <motion.div 
                            key={index}
                            custom={index}
                            variants={activityVariants}
                            initial="hidden"
                            animate="visible"
                            className="flex items-start bg-amber-50 dark:bg-amber-950/20 p-2 rounded-md"
                          >
                            <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-800 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                              <span className="text-xs font-bold text-amber-600 dark:text-amber-300">{index + 1}</span>
                            </div>
                            <p className="text-sm">{activity}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Day Navigation Pills */}
      <div className="flex justify-center mt-6 gap-1">
        {cruise.itinerary.map((day) => (
          <button
            key={day.day}
            onClick={() => {
              setDirection(day.day > activeDay ? 1 : -1);
              updateActiveDay(day.day);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              activeDay === day.day 
                ? 'bg-amber-500 w-6' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to day ${day.day}`}
          />
        ))}
      </div>
    </div>
  );
}
