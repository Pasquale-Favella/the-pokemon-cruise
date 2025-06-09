import { useAtom } from 'jotai';
import { cruiseSearchTermAtom, cruiseRegionFilterAtom, allCruiseRegionsAtom, cruiseDurationFilterAtom } from '@/store/booking-atoms';

export function useCruiseFilters() {
  const [searchTerm, setSearchTerm] = useAtom(cruiseSearchTermAtom);
  const [regionFilter, setRegionFilter] = useAtom(cruiseRegionFilterAtom);
  const [durationFilter, setDurationFilter] = useAtom(cruiseDurationFilterAtom);
  const [allRegions] = useAtom(allCruiseRegionsAtom);

  const clearFilters = () => {
    setSearchTerm('');
    setRegionFilter('all');
    setDurationFilter('all');
  };

  const hasActiveFilters = searchTerm || regionFilter !== 'all' || durationFilter !== 'all';

  return {
    searchTerm,
    setSearchTerm,
    regionFilter,
    setRegionFilter,
    durationFilter,
    setDurationFilter,
    allRegions,
    clearFilters,
    hasActiveFilters,
  };
}
