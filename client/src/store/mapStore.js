import { create } from 'zustand';

const useMapStore = create((set) => ({
  mapCenter: {
    lat: 42.8746,
    lng: 74.5698,
    zoom: 8
  },
  selectedSite: null,
  selectedSacredPlace: null,
  
  setMapCenter: (center) => set({ mapCenter: center }),
  
  setSelectedSite: (site) => set({ 
    selectedSite: site,
    selectedSacredPlace: site?.siteType === 'sacred' ? site : null
  }),
  
  setSelectedSacredPlace: (place) => set({ 
    selectedSacredPlace: place,
    selectedSite: place
  }),
  
  clearSelection: () => set({ 
    selectedSite: null, 
    selectedSacredPlace: null 
  }),
  
  flyToSite: (site) => {
    if (site?.location?.coordinates) {
      set({
        mapCenter: {
          lat: site.location.coordinates[1],
          lng: site.location.coordinates[0],
          zoom: 15
        },
        selectedSite: site,
        selectedSacredPlace: site?.siteType === 'sacred' ? site : null
      });
    }
  }
}));

export default useMapStore;