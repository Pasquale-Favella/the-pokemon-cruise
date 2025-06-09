import { useAtom } from 'jotai';
import {
  bookingAtom,
  cruiseIdAtom,
  regionAtom,
  datesAtom,
  passengersAtom,
  cabinTypeAtom,
  resetBookingAtom,
  totalPassengersAtom,
  initializeBookingAtom,
} from '@/store/booking-atoms';

// Hook for accessing the entire booking state
export function useBooking() {
  const [booking, setBooking] = useAtom(bookingAtom);
  const [, resetBooking] = useAtom(resetBookingAtom);

  return {
    booking,
    setBooking,
    resetBooking,
  };
}

// Hook for cruise selection
export function useCruiseSelection() {
  const [cruiseId, setCruiseId] = useAtom(cruiseIdAtom);
  const [region, setRegion] = useAtom(regionAtom);

  return {
    cruiseId,
    setCruiseId,
    region,
    setRegion,
  };
}

// Hook for date selection
export function useDateSelection() {
  const [dates, setDates] = useAtom(datesAtom);

  const setDateRange = (startDate: Date | null, endDate: Date | null) => {
    setDates({ startDate, endDate });
  };

  return {
    dates,
    setDates,
    setDateRange,
  };
}

// Hook for passenger selection
export function usePassengers() {
  const [passengers, setPassengers] = useAtom(passengersAtom);
  const [totalPassengers] = useAtom(totalPassengersAtom);

  const setAdults = (adults: number) => {
    if (adults >= 1 && adults <= 10) {
      setPassengers({ ...passengers, adults });
    }
  };

  const setChildren = (children: number) => {
    if (children >= 0 && children <= 10) {
      setPassengers({ ...passengers, children });
    }
  };

  return {
    passengers,
    setPassengers,
    totalPassengers,
    setAdults,
    setChildren,
  };
}

// Hook for cabin selection
export function useCabinSelection() {
  const [cabinType, setCabinType] = useAtom(cabinTypeAtom);

  return {
    cabinType,
    setCabinType,
  };
}

// Combined hook for booking form
export function useBookingForm() {
  const { cruiseId, setCruiseId, region, setRegion } = useCruiseSelection();
  const { dates, setDates, setDateRange } = useDateSelection();
  const { passengers, setPassengers, setAdults, setChildren } = usePassengers();
  const { cabinType, setCabinType } = useCabinSelection();
  const { resetBooking } = useBooking();
  const [, initializeBooking] = useAtom(initializeBookingAtom);

  return {
    cruiseId,
    setCruiseId,
    region,
    setRegion,
    dates,
    setDates,
    setDateRange,
    passengers,
    setPassengers,
    setAdults,
    setChildren,
    cabinType,
    setCabinType,
    resetBooking,
    initializeBooking,
  };
}
