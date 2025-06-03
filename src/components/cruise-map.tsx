"use client";

import { useEffect, useRef, useState } from "react";
import { Cruise } from "@/data/cruises";
import dynamic from "next/dynamic";

interface CruiseMapProps {
  cruise: Cruise;
  activeDay?: number;
  onDaySelect?: (day: number) => void;
}

// Use a client-side only component for the map
function MapComponent({ cruise, activeDay = 1, onDaySelect }: CruiseMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{[key: number]: any}>({});
  const L = useRef<any>(null);

  // Load Leaflet dynamically only on client side
  useEffect(() => {
    // Import Leaflet dynamically
    const loadLeaflet = async () => {
      try {
        const leaflet = await import('leaflet');
        L.current = leaflet.default;
 await import('leaflet/dist/leaflet.css' as any);
        setIsMapLoaded(true);
      } catch (error) {
        console.error('Error loading Leaflet:', error);
      }
    };
    
    loadLeaflet();
    
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Initialize and update map when Leaflet is loaded
  useEffect(() => {
    if (!isMapLoaded || !L.current || !mapRef.current) return;
    
    // If map already initialized, clean it up
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Fix Leaflet icon issues
    const fixLeafletIcon = () => {
      delete (L.current.Icon.Default.prototype as any)._getIconUrl;
      L.current.Icon.Default.mergeOptions({
        iconRetinaUrl: "/images/map/marker.png",
        iconUrl: "/images/map/marker.png",
        shadowUrl: "/images/map/marker.png",
      });
    };
    
    fixLeafletIcon();

    // Create custom Pokemon-themed icon
    const pokemonIcon = L.current.icon({
      iconUrl: "/images/map/marker.png",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    // Initialize map
    const map = L.current.map(mapRef.current, {
      center: [35.6895, 139.6917], // Default center (Kanto region)
      zoom: 7,
      zoomControl: true,
      attributionControl: false,
    });

    // Add Pokemon-themed tile layer
    L.current.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add custom styling overlay to make it more Pokemon-themed
    L.current.tileLayer.wms("", {
      format: "image/png",
      transparent: true,
      opacity: 0.3,
    }).addTo(map);

    // Extract coordinates from itinerary
    const coordinates = cruise.itinerary.map(day => day.port.coordinates);
    
    // If we have coordinates, create a path
    if (coordinates.length > 0) {
      // Create polyline for the cruise route
      const cruisePath = L.current.polyline(coordinates, {
        color: "#3B82F6", // Blue color
        weight: 4,
        opacity: 0.7,
        dashArray: "10, 10",
        lineCap: "round",
      }).addTo(map);

      // Add markers for each port
      cruise.itinerary.forEach((day, index) => {
        const marker = L.current.marker(day.port.coordinates, { icon: pokemonIcon })
          .addTo(map)
          .bindPopup(`
            <div style="width: 280px; padding: 10px; font-family: Arial, sans-serif;">
              <div style="background-color: #3B82F6; color: white; padding: 8px; margin: -10px -10px 10px -10px; border-radius: 4px 4px 0 0;">
                <h3 style="margin: 0; font-size: 16px; text-align: center;">Day ${day.day}: ${day.port.name}</h3>
              </div>
              
              <p style="margin: 0 0 10px 0; font-size: 14px; line-height: 1.4;">${day.port.description}</p>
              
              <div style="margin-bottom: 10px; background-color: #f8f9fa; border-left: 3px solid #3B82F6; padding: 8px;">
                <div style="font-size: 13px; color: #666;">
                  <div style="display: flex; margin-bottom: 4px;">
                    <span style="width: 20px; text-align: center;">📍</span>
                    <span><strong>Port:</strong> ${day.port.name}</span>
                  </div>
                  <div style="display: flex; margin-bottom: 4px;">
                    <span style="width: 20px; text-align: center;">🕒</span>
                    <span><strong>Day:</strong> ${day.day} of ${cruise.duration}</span>
                  </div>
                  <div style="display: flex;">
                    <span style="width: 20px; text-align: center;">🚢</span>
                    <span><strong>Region:</strong> ${cruise.region}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 style="margin: 0 0 5px 0; font-size: 14px; color: #E53E3E; border-bottom: 1px solid #eee; padding-bottom: 3px;">
                  Today's Activities:
                </h4>
                <ul style="margin: 0; padding: 0 0 0 20px; font-size: 13px;">
                  ${day.activities.map(activity => `<li>${activity}</li>`).join("")}
                </ul>
              </div>
            </div>
          `);
        
        // Store marker reference
        markersRef.current[day.day] = marker;
        
        // Add click handler to notify parent component
        marker.on('click', () => {
          if (onDaySelect) {
            onDaySelect(day.day);
          }
        });
        
        // Open the active day's popup by default
        if (day.day === activeDay) {
          marker.openPopup();
        }
      });

      // Fit the map to show all markers
      map.fitBounds(cruisePath.getBounds(), {
        padding: [50, 50],
      });
    }

    mapInstanceRef.current = map;
  }, [cruise, isMapLoaded, activeDay, onDaySelect]);
  
  // Effect to handle activeDay changes
  useEffect(() => {
    if (isMapLoaded && mapInstanceRef.current && markersRef.current[activeDay]) {
      const marker = markersRef.current[activeDay];
      marker.openPopup();
      
      // Center map on the active marker
      mapInstanceRef.current.panTo(marker.getLatLng(), {
        animate: true,
        duration: 0.5
      });
    }
  }, [activeDay, isMapLoaded]);
  

  
  return (
    <div className="w-full h-full bg-muted rounded-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
        </div>
      )}
    </div>
  );
}

// Dynamically import the map component with SSR disabled
const CruiseMapWithNoSSR = dynamic(
  () => Promise.resolve(MapComponent),
  { ssr: false }
);

// Export the client-side only version of the map
export function CruiseMap(props: CruiseMapProps) {
  return <CruiseMapWithNoSSR {...props} />;

  // The return statement is now in the MapComponent
}
