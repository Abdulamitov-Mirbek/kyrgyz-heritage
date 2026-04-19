// Use ES module imports if your project uses "type": "module"
import axios from "axios";

class Geocoder {
  constructor() {
    this.apiKey = process.env.GOOGLE_MAPS_API_KEY;
    this.baseUrl = "https://maps.googleapis.com/maps/api/geocode/json";
  }

  async geocodeAddress(address) {
    try {
      // Since you don't have a Google Maps API key, always use fallback
      console.log("Geocoding address:", address);
      return this.fallbackGeocode(address);
    } catch (error) {
      console.error("Geocoding error:", error.message);
      return this.fallbackGeocode(address);
    }
  }

  async reverseGeocode(lng, lat) {
    try {
      console.log("Reverse geocoding:", lng, lat);
      return this.fallbackReverseGeocode(lng, lat);
    } catch (error) {
      console.error("Reverse geocoding error:", error.message);
      return this.fallbackReverseGeocode(lng, lat);
    }
  }

  parseAddressComponents(components) {
    const parsed = {
      streetNumber: "",
      route: "",
      locality: "",
      administrativeArea: "",
      country: "",
      postalCode: "",
    };

    if (!components) return parsed;

    components.forEach((component) => {
      const types = component.types;

      if (types.includes("street_number")) {
        parsed.streetNumber = component.long_name;
      } else if (types.includes("route")) {
        parsed.route = component.long_name;
      } else if (types.includes("locality")) {
        parsed.locality = component.long_name;
      } else if (types.includes("administrative_area_level_1")) {
        parsed.administrativeArea = component.long_name;
      } else if (types.includes("country")) {
        parsed.country = component.long_name;
      } else if (types.includes("postal_code")) {
        parsed.postalCode = component.long_name;
      }
    });

    return parsed;
  }

  // Fallback geocoding for Kyrgyzstan
  fallbackGeocode(address) {
    console.log("Using fallback geocoding for:", address);

    // Kyrgyzstan approximate center coordinates
    let coordinates = [74.5698, 42.8746]; // Bishkek default

    // Try to extract city/region from address for better accuracy
    const lowerAddress = address.toLowerCase();

    if (lowerAddress.includes("бишкек") || lowerAddress.includes("bishkek")) {
      coordinates = [74.5698, 42.8746];
    } else if (lowerAddress.includes("ош") || lowerAddress.includes("osh")) {
      coordinates = [72.7833, 40.5333];
    } else if (
      lowerAddress.includes("жалал-абад") ||
      lowerAddress.includes("jalal-abad")
    ) {
      coordinates = [73.0, 40.9333];
    } else if (
      lowerAddress.includes("каракол") ||
      lowerAddress.includes("karakol")
    ) {
      coordinates = [78.3833, 42.4833];
    } else if (
      lowerAddress.includes("нарын") ||
      lowerAddress.includes("naryn")
    ) {
      coordinates = [75.9833, 41.4333];
    } else if (
      lowerAddress.includes("талас") ||
      lowerAddress.includes("talas")
    ) {
      coordinates = [72.2333, 42.5167];
    } else if (
      lowerAddress.includes("батык") ||
      lowerAddress.includes("batken")
    ) {
      coordinates = [70.8167, 40.0667];
    } else if (
      lowerAddress.includes("иссык-куль") ||
      lowerAddress.includes("issyk-kul")
    ) {
      coordinates = [77.0, 42.4167];
    }

    return {
      coordinates: coordinates,
      formattedAddress: address,
      placeId: null,
      components: {
        streetNumber: "",
        route: "",
        locality: address.split(",")[0] || "",
        administrativeArea: address.split(",")[1] || "",
        country: "Кыргызстан",
        postalCode: "",
      },
    };
  }

  fallbackReverseGeocode(lng, lat) {
    console.log("Using fallback reverse geocoding for:", lng, lat);

    // Determine approximate location based on coordinates
    let city = "Бишкек";
    let region = "Чуйская область";

    // Rough bounds for Kyrgyz cities
    if (lng > 72.5 && lng < 73.0 && lat > 40.4 && lat < 40.7) {
      city = "Ош";
      region = "Ошская область";
    } else if (lng > 72.5 && lng < 73.5 && lat > 42.3 && lat < 42.6) {
      city = "Талас";
      region = "Таласская область";
    } else if (lng > 78.0 && lng < 78.5 && lat > 42.3 && lat < 42.6) {
      city = "Каракол";
      region = "Иссык-Кульская область";
    } else if (lng > 75.5 && lng < 76.5 && lat > 41.2 && lat < 41.6) {
      city = "Нарын";
      region = "Нарынская область";
    } else if (lng > 72.5 && lng < 73.5 && lat > 40.7 && lat < 41.1) {
      city = "Джалал-Абад";
      region = "Джалал-Абадская область";
    }

    return {
      formattedAddress: `${city}, ${region}, Кыргызстан`,
      placeId: null,
      components: {
        streetNumber: "",
        route: "",
        locality: city,
        administrativeArea: region,
        country: "Кыргызстан",
        postalCode: "",
      },
    };
  }

  // Calculate distance between two points (Haversine formula)
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}

// Export as singleton
export default new Geocoder();

// Also support CommonJS require
if (typeof module !== "undefined" && module.exports) {
  module.exports = new Geocoder();
}
