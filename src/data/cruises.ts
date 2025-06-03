import { StaticImageData } from "next/image";

// Import images (we'll add these to the public folder)
// These are placeholder imports - we'll need to add the actual images

export interface Port {
  name: string;
  description: string;
  coordinates: [number, number]; // [latitude, longitude]
  activities: string[];
  image?: string;
}

export interface CabinType {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  amenities: string[];
  images: string[];
}

export interface Cruise {
  id: string;
  name: string;
  region: string;
  description: string;
  shortDescription: string;
  highlights: string[];
  startingPrice: number;
  duration: number; // in days
  itinerary: {
    day: number;
    port: Port;
    activities: string[];
  }[];
  cabinTypes: CabinType[];
  images: string[];
  amenities: string[];
  mapImage: string; // Path to the Pokemon-themed map image
  featured: boolean;
}

export const cruises: Cruise[] = [
  {
    id: "ss-anne-kanto",
    name: "S.S. Anne Luxury Voyage",
    region: "Kanto",
    description: "Experience the legendary S.S. Anne, the most luxurious cruise ship in the Kanto region. This iconic vessel offers a perfect blend of elegance and adventure as you sail around the beautiful coastline of Kanto. Visit historic ports like Vermilion City and Cinnabar Island, with opportunities to explore ancient Pokemon habitats and participate in exclusive trainer workshops.",
    shortDescription: "The legendary luxury cruise around Kanto's most iconic coastal cities.",
    highlights: [
      "VIP tour of the Vermilion City Gym",
      "Exclusive access to the Cinnabar Island Research Lab",
      "Pokemon catching contest in Safari Zone waters",
      "Gourmet dining featuring Chef Siebold's signature dishes"
    ],
    startingPrice: 2500,
    duration: 7,
    itinerary: [
      {
        day: 1,
        port: {
          name: "Vermilion City",
          description: "The beautiful coastal city known for its sunset views and bustling harbor.",
          coordinates: [35.6895, 139.6917],
          activities: ["Vermilion Gym Tour", "Harbor Market Shopping"]
        },
        activities: ["Embarkation", "Welcome Dinner", "Sunset Deck Party"]
      },
      {
        day: 2,
        port: {
          name: "Seafoam Islands",
          description: "A mysterious island chain home to rare water and ice-type Pokemon.",
          coordinates: [34.9, 138.6],
          activities: ["Cave Exploration", "Ice Pokemon Spotting"]
        },
        activities: ["Guided Cave Tour", "Ice Sculpture Workshop", "Evening Legends Storytelling"]
      },
      {
        day: 3,
        port: {
          name: "Cinnabar Island",
          description: "A volcanic island with hot springs and a famous Pokemon research laboratory.",
          coordinates: [33.8, 140.1],
          activities: ["Hot Springs Visit", "Pokemon Lab Tour"]
        },
        activities: ["Volcano Hiking", "Research Lab VIP Tour", "Hot Spring Relaxation"]
      },
      {
        day: 4,
        port: {
          name: "Pallet Town Bay",
          description: "A peaceful coastal area near the famous starting point for many Pokemon trainers.",
          coordinates: [35.2, 139.9],
          activities: ["Oak Laboratory Visit", "Trainer School Workshop"]
        },
        activities: ["Professor Oak's Special Lecture", "Beginner Trainer Workshop", "Beach Barbecue"]
      },
      {
        day: 5,
        port: {
          name: "Safari Zone Coast",
          description: "The coastal area of the famous Safari Zone, known for its diverse Pokemon.",
          coordinates: [36.1, 140.2],
          activities: ["Safari Boat Tour", "Fishing Competition"]
        },
        activities: ["Pokemon Watching Expedition", "Fishing Tournament", "Safari-themed Dinner"]
      },
      {
        day: 6,
        port: {
          name: "Cerulean Cape",
          description: "A romantic cape north of Cerulean City with spectacular ocean views.",
          coordinates: [36.5, 140.5],
          activities: ["Lighthouse Tour", "Romantic Sunset Viewing"]
        },
        activities: ["Water Pokemon Show", "Lighthouse Tour", "Farewell Gala Dinner"]
      },
      {
        day: 7,
        port: {
          name: "Vermilion City",
          description: "Return to the beautiful coastal city of Vermilion.",
          coordinates: [35.6895, 139.6917],
          activities: ["Souvenir Shopping", "City Tour"]
        },
        activities: ["Disembarkation", "Optional City Tour"]
      }
    ],
    cabinTypes: [
      {
        id: "interior-ss-anne",
        name: "Pokeball Cabin",
        description: "Cozy interior cabin with all essential amenities for the budget-conscious traveler.",
        price: 2500,
        capacity: 2,
        amenities: ["Queen bed", "Private bathroom", "TV", "Mini fridge"],
        images: ["/images/cabins/pokeball-cabin-1.jpg", "/images/cabins/pokeball-cabin-2.jpg"]
      },
      {
        id: "oceanview-ss-anne",
        name: "Great Ball Suite",
        description: "Comfortable cabin with a window offering beautiful ocean views.",
        price: 3200,
        capacity: 2,
        amenities: ["Queen bed", "Private bathroom", "Ocean view window", "TV", "Mini fridge", "Sitting area"],
        images: ["/images/cabins/greatball-suite-1.jpg", "/images/cabins/greatball-suite-2.jpg"]
      },
      {
        id: "balcony-ss-anne",
        name: "Ultra Ball Deluxe",
        description: "Spacious cabin with a private balcony to enjoy the sea breeze and stunning views.",
        price: 4000,
        capacity: 3,
        amenities: ["King bed", "Private bathroom", "Private balcony", "TV", "Mini bar", "Sitting area", "Room service"],
        images: ["/images/cabins/ultraball-deluxe-1.jpg", "/images/cabins/ultraball-deluxe-2.jpg"]
      },
      {
        id: "suite-ss-anne",
        name: "Master Ball Royal Suite",
        description: "The ultimate luxury experience with a separate living area, premium amenities, and the best views on the ship.",
        price: 6000,
        capacity: 4,
        amenities: ["King bed", "Separate living room", "Jacuzzi bathroom", "Large private balcony", "Premium TV", "Full bar", "Dining area", "Butler service", "Priority boarding"],
        images: ["/images/cabins/masterball-suite-1.jpg", "/images/cabins/masterball-suite-2.jpg"]
      }
    ],
    images: [
      "/images/cruises/ss-anne-1.jpg",
      "/images/cruises/ss-anne-2.jpg",
      "/images/cruises/ss-anne-3.jpg",
      "/images/cruises/ss-anne-4.jpg"
    ],
    amenities: [
      "Multiple restaurants and bars",
      "Swimming pools",
      "Pokemon battle arena",
      "Spa and wellness center",
      "Fitness center",
      "Theater with live shows",
      "Casino",
      "Shopping promenade",
      "Pokemon daycare center"
    ],
    mapImage: "/images/maps/kanto-cruise-map.jpg",
    featured: true
  },
  {
    id: "aqua-marina-johto",
    name: "Aqua Marina Johto Explorer",
    region: "Johto",
    description: "Discover the rich traditions and natural beauty of the Johto region aboard the elegant Aqua Marina. This cruise takes you on a journey through time, visiting ancient temples, historic lighthouses, and vibrant port cities. Experience the unique culture of Johto through traditional performances, local cuisine, and guided excursions to sacred sites.",
    shortDescription: "Journey through Johto's rich history and cultural landmarks.",
    highlights: [
      "Traditional tea ceremony at Ecruteak City",
      "Whirl Islands expedition with Lugia watching opportunity",
      "Night lantern festival in Olivine City",
      "Exclusive tour of the Shining Lighthouse"
    ],
    startingPrice: 2200,
    duration: 6,
    itinerary: [
      {
        day: 1,
        port: {
          name: "New Bark Town Harbor",
          description: "A small, peaceful harbor known as the 'Town where the winds of new beginnings blow'.",
          coordinates: [34.5, 136.9],
          activities: ["Wind Chime Festival", "Professor Elm's Laboratory Tour"]
        },
        activities: ["Embarkation", "Welcome Ceremony", "Wind and Water Show"]
      },
      {
        day: 2,
        port: {
          name: "Cherrygrove Bay",
          description: "A picturesque bay surrounded by cherry blossom trees when in season.",
          coordinates: [34.3, 137.1],
          activities: ["Cherry Blossom Viewing (seasonal)", "Guide Gent's Tour"]
        },
        activities: ["Guided Nature Walk", "Cherry Blossom Tea Party (seasonal)", "Stargazing"]
      },
      {
        day: 3,
        port: {
          name: "Whirl Islands",
          description: "A group of four islands with strong whirlpools and complex cave systems.",
          coordinates: [33.9, 137.8],
          activities: ["Whirlpool Watching", "Cave Exploration"]
        },
        activities: ["Lugia Watching Expedition", "Cave Adventure Tour", "Whirlpool Legends Dinner"]
      },
      {
        day: 4,
        port: {
          name: "Olivine City",
          description: "A bustling port city famous for its steel industry and historic lighthouse.",
          coordinates: [33.6, 138.2],
          activities: ["Lighthouse Tour", "Steel Works Visit"]
        },
        activities: ["Glitter Lighthouse Exclusive Tour", "Amphy Meet and Greet", "Night Lantern Festival"]
      },
      {
        day: 5,
        port: {
          name: "Cianwood Peninsula",
          description: "A remote peninsula known for its medicinal herbs and martial arts traditions.",
          coordinates: [33.2, 137.5],
          activities: ["Pharmacy Tour", "Cliff Safari"]
        },
        activities: ["Medicinal Herb Workshop", "Martial Arts Demonstration", "Cliff-side Meditation"]
      },
      {
        day: 6,
        port: {
          name: "New Bark Town Harbor",
          description: "Return to the peaceful harbor where your journey began.",
          coordinates: [34.5, 136.9],
          activities: ["Souvenir Shopping", "Farewell Ceremony"]
        },
        activities: ["Disembarkation", "Optional Wind Farm Tour"]
      }
    ],
    cabinTypes: [
      {
        id: "interior-aqua-marina",
        name: "Chikorita Cabin",
        description: "Comfortable interior cabin with fresh, nature-inspired decor.",
        price: 2200,
        capacity: 2,
        amenities: ["Queen bed", "Private bathroom", "TV", "Mini fridge"],
        images: ["/images/cabins/chikorita-cabin-1.jpg", "/images/cabins/chikorita-cabin-2.jpg"]
      },
      {
        id: "oceanview-aqua-marina",
        name: "Bayleef Vista Room",
        description: "Bright and airy cabin with a window overlooking the beautiful Johto waters.",
        price: 2800,
        capacity: 2,
        amenities: ["Queen bed", "Private bathroom", "Ocean view window", "TV", "Mini fridge", "Sitting area"],
        images: ["/images/cabins/bayleef-vista-1.jpg", "/images/cabins/bayleef-vista-2.jpg"]
      },
      {
        id: "balcony-aqua-marina",
        name: "Meganium Terrace Suite",
        description: "Elegant cabin with a private balcony perfect for enjoying the sea breeze and scenic views.",
        price: 3500,
        capacity: 3,
        amenities: ["King bed", "Private bathroom", "Private balcony", "TV", "Mini bar", "Sitting area"],
        images: ["/images/cabins/meganium-terrace-1.jpg", "/images/cabins/meganium-terrace-2.jpg"]
      },
      {
        id: "suite-aqua-marina",
        name: "Ho-Oh Celestial Suite",
        description: "Luxurious suite with panoramic views, separate living area, and premium amenities.",
        price: 5000,
        capacity: 4,
        amenities: ["King bed", "Separate living room", "Luxury bathroom", "Large private balcony", "Premium TV", "Bar area", "Dining area", "Concierge service"],
        images: ["/images/cabins/ho-oh-suite-1.jpg", "/images/cabins/ho-oh-suite-2.jpg"]
      }
    ],
    images: [
      "/images/cruises/aqua-marina-1.jpg",
      "/images/cruises/aqua-marina-2.jpg",
      "/images/cruises/aqua-marina-3.jpg"
    ],
    amenities: [
      "Traditional Johto restaurant",
      "Tea ceremony room",
      "Hot springs bath",
      "Meditation deck",
      "Cultural performance theater",
      "Pokemon grooming salon",
      "Library of Johto legends",
      "Herbal wellness center"
    ],
    mapImage: "/images/maps/johto-cruise-map.jpg",
    featured: true
  },
  {
    id: "hoenn-seafarer",
    name: "Hoenn Seafarer Adventure",
    region: "Hoenn",
    description: "Embark on an exciting adventure through the diverse Hoenn region, known for its unique mix of land and sea environments. The Hoenn Seafarer takes you on an unforgettable journey from the volcanic activity of Lavaridge to the tropical paradise of Mossdeep. Perfect for nature enthusiasts and those seeking variety in their Pokemon journey.",
    shortDescription: "Navigate Hoenn's diverse environments from volcanic areas to tropical islands.",
    highlights: [
      "Underwater exploration near Sootopolis City",
      "Hot spring experience at Lavaridge Town port",
      "Space Center exclusive tour at Mossdeep City",
      "Safari adventure at the special marine Safari Zone"
    ],
    startingPrice: 2800,
    duration: 8,
    itinerary: [
      {
        day: 1,
        port: {
          name: "Slateport City",
          description: "A lively market city with a famous shipyard and beach.",
          coordinates: [31.5, 130.5],
          activities: ["Market Shopping", "Oceanic Museum Visit"]
        },
        activities: ["Embarkation", "Welcome Feast", "Beach Party"]
      },
      {
        day: 2,
        port: {
          name: "Dewford Island",
          description: "A small island with a fighting dojo and famous for its rough waves.",
          coordinates: [30.8, 131.0],
          activities: ["Granite Cave Exploration", "Surfing Lessons"]
        },
        activities: ["Cave Treasure Hunt", "Fighting-Type Pokemon Workshop", "Bonfire Night"]
      },
      {
        day: 3,
        port: {
          name: "Lavaridge Coast",
          description: "The coastal area near the volcanic town famous for its healing hot springs.",
          coordinates: [31.2, 130.8],
          activities: ["Hot Springs Bath", "Mt. Chimney Observation"]
        },
        activities: ["Volcanic Sand Therapy", "Hot Spring Onsen Experience", "Fire Pokemon Show"]
      },
      {
        day: 4,
        port: {
          name: "Fortree Riverside",
          description: "The river port near the unique tree-house city built among the canopy.",
          coordinates: [31.8, 131.2],
          activities: ["Treehouse Village Tour", "Birdwatching"]
        },
        activities: ["Canopy Walk", "Flying Pokemon Air Show", "Riverside Picnic"]
      },
      {
        day: 5,
        port: {
          name: "Lilycove Harbor",
          description: "A cultural hub with a famous department store and contest hall.",
          coordinates: [32.1, 131.8],
          activities: ["Department Store Shopping", "Contest Spectacular Viewing"]
        },
        activities: ["Pokemon Contest Workshop", "Art Museum Tour", "Gourmet Food Tasting"]
      },
      {
        day: 6,
        port: {
          name: "Mossdeep City",
          description: "An island city famous for its space center and psychic gym.",
          coordinates: [32.4, 132.2],
          activities: ["Space Center Tour", "Psychic Show"]
        },
        activities: ["Space Center VIP Tour", "Psychic Pokemon Demonstration", "Star Observation Night"]
      },
      {
        day: 7,
        port: {
          name: "Sootopolis City",
          description: "A city built in the crater of an extinct volcano, with a unique lake in the center.",
          coordinates: [32.0, 131.5],
          activities: ["Cave of Origin Viewing", "Underwater Exploration"]
        },
        activities: ["Underwater Submarine Tour", "Ancient Legends Lecture", "Crystal Cave Dinner"]
      },
      {
        day: 8,
        port: {
          name: "Slateport City",
          description: "Return to the lively market city where your journey began.",
          coordinates: [31.5, 130.5],
          activities: ["Souvenir Shopping", "Beach Relaxation"]
        },
        activities: ["Disembarkation", "Optional Market Tour"]
      }
    ],
    cabinTypes: [
      {
        id: "interior-hoenn-seafarer",
        name: "Mudkip Cabin",
        description: "Cozy interior cabin with water-themed decor.",
        price: 2800,
        capacity: 2,
        amenities: ["Queen bed", "Private bathroom", "TV", "Mini fridge"],
        images: ["/images/cabins/mudkip-cabin-1.jpg", "/images/cabins/mudkip-cabin-2.jpg"]
      },
      {
        id: "oceanview-hoenn-seafarer",
        name: "Marshtomp Panorama Room",
        description: "Comfortable cabin with a large window offering panoramic ocean views.",
        price: 3500,
        capacity: 2,
        amenities: ["Queen bed", "Private bathroom", "Panoramic window", "TV", "Mini fridge", "Sitting area"],
        images: ["/images/cabins/marshtomp-room-1.jpg", "/images/cabins/marshtomp-room-2.jpg"]
      },
      {
        id: "balcony-hoenn-seafarer",
        name: "Swampert Veranda Suite",
        description: "Spacious cabin with a private veranda offering unobstructed views of the Hoenn waters.",
        price: 4200,
        capacity: 3,
        amenities: ["King bed", "Private bathroom", "Private veranda", "TV", "Mini bar", "Lounge area"],
        images: ["/images/cabins/swampert-suite-1.jpg", "/images/cabins/swampert-suite-2.jpg"]
      },
      {
        id: "suite-hoenn-seafarer",
        name: "Rayquaza Sky Suite",
        description: "Premium suite located on the top deck with panoramic views, luxury amenities, and personalized service.",
        price: 5800,
        capacity: 4,
        amenities: ["King bed", "Separate living room", "Luxury bathroom with jacuzzi", "Wraparound private balcony", "Premium entertainment system", "Full bar", "Dining area", "Personal butler"],
        images: ["/images/cabins/rayquaza-suite-1.jpg", "/images/cabins/rayquaza-suite-2.jpg"]
      }
    ],
    images: [
      "/images/cruises/hoenn-seafarer-1.jpg",
      "/images/cruises/hoenn-seafarer-2.jpg",
      "/images/cruises/hoenn-seafarer-3.jpg",
      "/images/cruises/hoenn-seafarer-4.jpg"
    ],
    amenities: [
      "Multiple themed restaurants",
      "Outdoor and indoor pools",
      "Water slide and water park area",
      "Rock climbing wall",
      "Mini golf course",
      "Pokemon battle facilities",
      "Dive center for underwater excursions",
      "Kids club with Pokemon activities",
      "Spa with volcanic stone treatments"
    ],
    mapImage: "/images/maps/hoenn-cruise-map.jpg",
    featured: false
  }
];

export const getFeaturedCruises = (): Cruise[] => {
  return cruises.filter(cruise => cruise.featured);
};

export const getCruiseById = (id: string): Cruise | undefined => {
  return cruises.find(cruise => cruise.id === id);
};

export const getCruisesByRegion = (region: string): Cruise[] => {
  return cruises.filter(cruise => cruise.region === region);
};

export const getAllRegions = (): string[] => {
  return [...new Set(cruises.map(cruise => cruise.region))];
};
