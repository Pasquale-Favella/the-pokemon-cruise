import { atom } from 'jotai';
import { cruises as allCruisesData, Cruise, Port } from '@/data/cruises'; // Consolidated Cruise import, added Port
import { atomWithStorage } from 'jotai/utils';

// Define the booking state types
export interface BookingState {
  cruiseId: string | null;
  region: string | null;
  dates: {
    startDate: Date | null;
    endDate: Date | null;
  };
  passengers: {
    adults: number;
    children: number;
  };
  cabinType: string | null;
}

// Create the initial booking state
const initialBookingState: BookingState = {
  cruiseId: null,
  region: null,
  dates: {
    startDate: null,
    endDate: null,
  },
  passengers: {
    adults: 2,
    children: 0,
  },
  cabinType: null,
};

// Create atoms with storage to persist state in localStorage
export const bookingAtom = atomWithStorage<BookingState>(
  'pokemon-cruise-booking',
  initialBookingState
);

// Derived atoms for specific parts of the booking state
export const cruiseIdAtom = atom(
  (get) => get(bookingAtom).cruiseId,
  (get, set, cruiseId: string | null) => {
    set(bookingAtom, { ...get(bookingAtom), cruiseId });
  }
);

export const regionAtom = atom(
  (get) => get(bookingAtom).region,
  (get, set, region: string | null) => {
    set(bookingAtom, { ...get(bookingAtom), region });
  }
);

export const datesAtom = atom(
  (get) => get(bookingAtom).dates,
  (get, set, dates: { startDate: Date | null; endDate: Date | null }) => {
    set(bookingAtom, { ...get(bookingAtom), dates });
  }
);

export const passengersAtom = atom(
  (get) => get(bookingAtom).passengers,
  (get, set, passengers: { adults: number; children: number }) => {
    set(bookingAtom, { ...get(bookingAtom), passengers });
  }
);

export const cabinTypeAtom = atom(
  (get) => get(bookingAtom).cabinType,
  (get, set, cabinType: string | null) => {
    set(bookingAtom, { ...get(bookingAtom), cabinType });
  }
);

// Helper derived atoms
export const totalPassengersAtom = atom(
  (get) => {
    const { adults, children } = get(bookingAtom).passengers;
    return adults + children;
  }
);

// Reset booking function
export const resetBookingAtom = atom(
  null,
  (_, set) => {
    set(bookingAtom, initialBookingState);
  }
);

// Initialize booking with partial values
export interface InitialBookingValues {
  cruiseId?: string | null;
  region?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  adults?: number;
  children?: number;
  cabinType?: string | null;
}

export const initializeBookingAtom = atom(
  null,
  (get, set, initialValues: InitialBookingValues) => {
    const currentBooking = get(bookingAtom);
    
    // Update only the provided values
    const updatedBooking: BookingState = {
      ...currentBooking,
      cruiseId: initialValues.cruiseId ?? currentBooking.cruiseId,
      region: initialValues.region ?? currentBooking.region,
      dates: {
        startDate: initialValues.startDate ?? currentBooking.dates.startDate,
        endDate: initialValues.endDate ?? currentBooking.dates.endDate,
      },
      passengers: {
        adults: initialValues.adults ?? currentBooking.passengers.adults,
        children: initialValues.children ?? currentBooking.passengers.children,
      },
      cabinType: initialValues.cabinType ?? currentBooking.cabinType,
    };
    
    set(bookingAtom, updatedBooking);
  }
);

// Atoms for Cruise Search Filter on cruises page
export const cruiseSearchTermAtom = atom('');
export const cruiseRegionFilterAtom = atom('all'); // 'all' means 'All Regions'

export const allCruiseRegionsAtom = atom((get) => {
  const regions = new Set<string>();
  allCruisesData.forEach(cruise => regions.add(cruise.region));
  return Array.from(regions);
});

export const filteredCruisesAtom = atom((get) => {
  const searchTerm = get(cruiseSearchTermAtom).toLowerCase();
  const selectedRegion = get(cruiseRegionFilterAtom);

  return allCruisesData.filter(cruise => {
    const matchesRegion = selectedRegion === 'all' || cruise.region === selectedRegion;

    const matchesSearchTerm = !searchTerm ||
      cruise.name.toLowerCase().includes(searchTerm) ||
      cruise.shortDescription.toLowerCase().includes(searchTerm) ||
      cruise.region.toLowerCase().includes(searchTerm) || 
      cruise.highlights.some(h => h.toLowerCase().includes(searchTerm)) ||
      cruise.itinerary.some(stop => stop.port.name.toLowerCase().includes(searchTerm));

    return matchesRegion && matchesSearchTerm;
  });
});
