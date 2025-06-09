"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Search, MapPin, X, Filter, Clock, ChevronDown } from 'lucide-react'; // Removed Chevron icons
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { useEffect, useState } from 'react';
import { useCruiseFilters } from '@/hooks/useCruiseFilters';

export function CruiseSearchFilter() {
  const {
    searchTerm,
    setSearchTerm,
    regionFilter,
    setRegionFilter,
    durationFilter,
    setDurationFilter,
    allRegions,
    clearFilters,
    hasActiveFilters,
  } = useCruiseFilters();

  const [isMobile, setIsMobile] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false); // State for expandable section

  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-r from-card to-card/90 backdrop-blur-sm border border-border/50 rounded-xl shadow-lg mb-8 overflow-hidden"
    >
      <div className="p-1">
        {/* Mobile Header */}
        {isMobile && (
          <div 
            className="flex items-center justify-between p-4 cursor-pointer"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <div className="flex items-center">
              <Filter className="h-5 w-5 mr-2 text-primary" />
              <h3 className="font-semibold">Search & Filter</h3>
              {hasActiveFilters && (
                <span className="ml-2 px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                  Active Filters
                </span>
              )}
            </div>
            <motion.div
              animate={{ rotate: isFilterOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </motion.div>
          </div>
        )}

        <AnimatePresence>
          {(!isMobile || isFilterOpen) && (
            <motion.div
              initial={isMobile ? { height: 0, opacity: 0 } : { height: 'auto', opacity: 1 }}
              animate={isMobile ? { height: 'auto', opacity: 1 } : { height: 'auto', opacity: 1 }}
              exit={isMobile ? { height: 0, opacity: 0 } : { height: 'auto', opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className={`p-6 pt-${isMobile ? '0' : '6'}`}>
                {/* Search bar and toggle button */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex-1">
                    <Label htmlFor="cruise-search" className="text-sm font-medium text-muted-foreground flex items-center mb-2">
                      <Search className="h-4 w-4 mr-2 text-primary" />
                      Search Cruises
                    </Label>
                    <div className="relative">
                      <Input
                        id="cruise-search"
                        type="text"
                        placeholder="e.g., 'Kanto Queen', 'Safari Zone'"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pr-8 py-5 border border-gray-200 dark:border-gray-700"
                      />
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm('')}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  {!isMobile && ( // Show toggle button only on non-mobile
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 mt-auto" // Align with input bottom
                          onClick={() => setIsExpanded(!isExpanded)}
                        >
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronDown className="size-8" />
                          </motion.div>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>expand more</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>

                {/* Expandable filter section */}
                <AnimatePresence>
                  {isExpanded && !isMobile && ( // Show expandable section only when expanded and not mobile
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-6 md:flex md:flex-row md:gap-x-4 md:w-full mb-4"> {/* Container for region and duration filters */}
                        <div className="md:flex-1"> {/* Region filter takes half width */}
                          <Label htmlFor="region-filter" className="text-sm font-medium text-muted-foreground flex items-center mb-2">
                            <MapPin className="h-4 w-4 mr-2 text-primary" />
                            Filter by Region
                          </Label>
                          <Select value={regionFilter} onValueChange={setRegionFilter}>
                            <SelectTrigger id="region-filter" className="w-full py-5 border border-gray-200 dark:border-gray-700">
                              <SelectValue placeholder="All Regions" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Regions</SelectItem>
                              {allRegions.map((region) => (
                                <SelectItem key={region} value={region}>
                                  {region}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="md:flex-1"> {/* Duration filter takes half width */}
                          <Label htmlFor="duration-filter" className="text-sm font-medium text-muted-foreground flex items-center mb-2">
                            <Clock className="h-4 w-4 mr-2 text-primary" />
                            Filter by Duration
                          </Label>
                          <Select value={durationFilter} onValueChange={(value) => setDurationFilter(value)}>
                            <SelectTrigger id="duration-filter" className="w-full py-5 border border-gray-200 dark:border-gray-700">
                              <SelectValue placeholder="All Durations" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Durations</SelectItem>
                              <SelectItem value="1-7">1-7 Days</SelectItem>
                              <SelectItem value="8-14">8-14 Days</SelectItem>
                              <SelectItem value="15+">15+ Days</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex items-end gap-3 md:w-full"> {/* Clear filters button takes full width */}
                        <Button
                          variant="ghost"
                          onClick={clearFilters}
                          disabled={!hasActiveFilters}
                          className={`flex-1 md:flex-none gap-2 text-muted-foreground hover:text-foreground transition-opacity duration-150 ${
                            hasActiveFilters ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                          }`}
                        >
                          <X className="h-4 w-4" />
                          <span>Clear filters</span>
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {isMobile && ( // Show all filters stacked on mobile
                   <div className="grid grid-cols-1 gap-6">
                     <div className="md:flex-1"> {/* Region filter takes half width */}
                       <Label htmlFor="region-filter" className="text-sm font-medium text-muted-foreground flex items-center mb-2">
                         <MapPin className="h-4 w-4 mr-2 text-primary" />
                         Filter by Region
                       </Label>
                       <Select value={regionFilter} onValueChange={setRegionFilter}>
                         <SelectTrigger id="region-filter" className="w-full py-5 border border-gray-200 dark:border-gray-700">
                           <SelectValue placeholder="All Regions" />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="all">All Regions</SelectItem>
                           {allRegions.map((region) => (
                             <SelectItem key={region} value={region}>
                               {region}
                             </SelectItem>
                           ))}
                         </SelectContent>
                       </Select>
                     </div>

                     <div className="md:flex-1"> {/* Duration filter takes half width */}
                       <Label htmlFor="duration-filter" className="text-sm font-medium text-muted-foreground flex items-center mb-2">
                         <Clock className="h-4 w-4 mr-2 text-primary" />
                         Filter by Duration
                       </Label>
                       <Select value={durationFilter} onValueChange={(value) => setDurationFilter(value)}>
                         <SelectTrigger id="duration-filter" className="w-full py-5 border border-gray-200 dark:border-gray-700">
                           <SelectValue placeholder="All Durations" />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="all">All Durations</SelectItem>
                           <SelectItem value="1-7">1-7 Days</SelectItem>
                           <SelectItem value="8-14">8-14 Days</SelectItem>
                           <SelectItem value="15+">15+ Days</SelectItem>
                         </SelectContent>
                       </Select>
                     </div>

                     <div className="flex items-end gap-3 md:w-full"> {/* Clear filters button takes full width */}
                       <Button
                         variant="ghost"
                         onClick={clearFilters}
                         disabled={!hasActiveFilters}
                         className={`flex-1 md:flex-none gap-2 text-muted-foreground hover:text-foreground transition-opacity duration-150 ${
                           hasActiveFilters ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                         }`}
                       >
                         <X className="h-4 w-4" />
                         <span>Clear filters</span>
                       </Button>
                     </div>
                   </div>
                )}

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
