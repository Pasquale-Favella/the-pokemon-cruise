"use client";

import { useAtom } from 'jotai';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cruiseSearchTermAtom, cruiseRegionFilterAtom, allCruiseRegionsAtom } from '@/store/booking-atoms';
import { Label } from '@/components/ui/label';
import { Search, MapPin, X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function CruiseSearchFilter() {
  const [searchTerm, setSearchTerm] = useAtom(cruiseSearchTermAtom);
  const [regionFilter, setRegionFilter] = useAtom(cruiseRegionFilterAtom);
  const [allRegions] = useAtom(allCruiseRegionsAtom);
  const [isMobile, setIsMobile] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Check if mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const clearFilters = () => {
    setSearchTerm('');
    setRegionFilter('all');
  };

  const hasActiveFilters = searchTerm || regionFilter !== 'all';

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
                <div className="grid grid-cols-1 gap-6 md:flex md:flex-row md:gap-x-4 items-end">
                  <div className="relative md:flex-1">
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
                        className="w-full pl-10 pr-8 py-5"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
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
                  
                  <div className="md:w-64">
                    <Label htmlFor="region-filter" className="text-sm font-medium text-muted-foreground flex items-center mb-2">
                      <MapPin className="h-4 w-4 mr-2 text-primary" />
                      Filter by Region
                    </Label>
                    <Select value={regionFilter} onValueChange={setRegionFilter}>
                      <SelectTrigger id="region-filter" className="w-full py-5">
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

                  <div className="flex items-end gap-3">
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
                    {isMobile && (
                      <Button 
                        onClick={() => setIsFilterOpen(false)}
                        className="flex-1"
                      >
                        Apply
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
