"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/images/logo.svg" 
              alt="Pokemon Cruise Logo" 
              width={70} 
              height={70}
              className="h-10 w-auto md:h-14"
            />
            <span className="hidden font-bold sm:inline-block">
              Pokemon Cruise
            </span>
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/booking"
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Book Now
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </div>
        
        <div className="hidden md:flex items-center justify-between flex-1">
          {/* Desktop navigation */}
          <nav className="flex items-center justify-center space-x-6 lg:space-x-8 mx-auto">
            <Link 
              href="/cruises" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Cruises
            </Link>
            <Link 
              href="/about" 
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              About
            </Link>
          </nav>
          
          {/* Desktop Book Now button */}
          <div className="flex items-center">
            <Link
              href="/booking"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown with animation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-background border-b shadow-lg overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div 
              className="container mx-auto px-4 py-4 flex flex-col space-y-4"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link 
                  href="/cruises" 
                  className="text-base font-medium transition-colors hover:text-primary py-2 border-b border-gray-100 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cruises
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                <Link 
                  href="/regions" 
                  className="text-base font-medium transition-colors hover:text-primary py-2 border-b border-gray-100 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Regions
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.2 }}
              >
                <Link 
                  href="/about" 
                  className="text-base font-medium transition-colors hover:text-primary py-2 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
