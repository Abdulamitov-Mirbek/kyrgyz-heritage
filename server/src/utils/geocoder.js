const axios = require('axios');

class Geocoder {
  constructor() {
    this.apiKey = process.env.GOOGLE_MAPS_API_KEY;
    this.baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json';
  }

  async geocodeAddress(address) {
    try {
      if (!this.apiKey) {
        console.warn('No Google Maps API key provided. Using fallback geocoding.');
        return this.fallbackGeocode(address);
      }

      const response = await axios.get(this.baseUrl, {
        params: {
          address: address,
          key: this.apiKey
        }
      });

      if (response.data.status === 'OK' && response.data.results.length > 0) {
        const result = response.data.results[0];
        return {
          coordinates: [
            result.geometry.location.lng,
            result.geometry.location.lat
          ],
          formattedAddress: result.formatted_address,
          placeId: result.place_id,
          components: this.parseAddressComponents(result.address_components)
        };
      } else {
        throw new Error(`Geocoding failed: ${response.data.status}`);
      }
    } catch (error) {
      console.error('Geocoding error:', error.message);
      return this.fallbackGeocode(address);
    }
  }

  async reverseGeocode(lng, lat) {
    try {
      if (!this.apiKey) {
        console.warn('No Google Maps API key provided. Using fallback reverse geocoding.');
        return this.fallbackReverseGeocode(lng, lat);
      }

      const response = await axios.get(this.baseUrl, {
        params: {
          latlng: `${lat},${lng}`,
          key: this.apiKey
        }
      });

      if (response.data.status === 'OK' && response.data.results.length > 0) {
        const result = response.data.results[0];
        return {
          formattedAddress: result.formatted_address,
          placeId: result.place_id,
          components: this.parseAddressComponents(result.address_components)
        };
      } else {
        throw new Error(`Reverse geocoding failed: ${response.data.status}`);
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error.message);
      return this.fallbackReverseGeocode(lng, lat);
    }
  }

  parseAddressComponents(components) {
    const parsed = {
      streetNumber: '',
      route: '',
      locality: '',
      administrativeArea: '',
      country: '',
      postalCode: ''
    };

    components.forEach(component => {
      const types = component.types;

      if (types.includes('street_number')) {
        parsed.streetNumber = component.long_name;
      } else if (types.includes('route')) {
        parsed.route = component.long_name;
      } else if (types.includes('locality')) {
        parsed.locality = component.long_name;
      } else if (types.includes('administrative_area_level_1')) {
        parsed.administrativeArea = component.long_name;
      } else if (types.includes('country')) {
        parsed.country = component.long_name;
      } else if (types.includes('postal_code')) {
        parsed.postalCode = component.long_name;
      }
    });

    return parsed;
  }

  // Fallback methods for when no API key is available
  fallbackGeocode(address) {
    console.log('Using fallback geocoding for:', address);
    // Return a default location (you might want to use a free geocoding service here)
    return {
      coordinates: [0, 0],
      formattedAddress: address,
      placeId: null,
      components: {
        streetNumber: '',
        route: '',
        locality: '',
        administrativeArea: '',
        country: '',
        postalCode: ''
      }
    };
  }

  fallbackReverseGeocode(lng, lat) {
    console.log('Using fallback reverse geocoding for:', lng, lat);
    return {
      formattedAddress: `Location at ${lat}, ${lng}`,
      placeId: null,
      components: {
        streetNumber: '',
        route: '',
        locality: '',
        administrativeArea: '',
        country: '',
        postalCode: ''
      }
    };
  }

  // Calculate distance between two points (Haversine formula)
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in km
    return distance;
  }

  deg2rad(deg) {
    return deg * (Math.PI/180);
  }
}

module.exports = new Geocoder();