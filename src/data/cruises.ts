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
          activities: ["Vermilion Gym Tour", "Harbor Market Shopping"],
          image: "https://picsum.photos/seed/ss-anne-kanto-Vermilion-City-1/400/300"
        },
        activities: ["Embarkation", "Welcome Dinner", "Sunset Deck Party"]
      },
      {
        day: 2,
        port: {
          name: "Seafoam Islands",
          description: "A mysterious island chain home to rare water and ice-type Pokemon.",
          coordinates: [34.9, 138.6],
          activities: ["Cave Exploration", "Ice Pokemon Spotting"],
          image: "https://picsum.photos/seed/ss-anne-kanto-Seafoam-Islands-2/400/300"
        },
        activities: ["Guided Cave Tour", "Ice Sculpture Workshop", "Evening Legends Storytelling"]
      },
      {
        day: 3,
        port: {
          name: "Cinnabar Island",
          description: "A volcanic island with hot springs and a famous Pokemon research laboratory.",
          coordinates: [33.8, 140.1],
          activities: ["Hot Springs Visit", "Pokemon Lab Tour"],
          image: "https://picsum.photos/seed/ss-anne-kanto-Cinnabar-Island-3/400/300"
        },
        activities: ["Volcano Hiking", "Research Lab VIP Tour", "Hot Spring Relaxation"]
      },
      {
        day: 4,
        port: {
          name: "Pallet Town Bay",
          description: "A peaceful coastal area near the famous starting point for many Pokemon trainers.",
          coordinates: [35.2, 139.9],
          activities: ["Oak Laboratory Visit", "Trainer School Workshop"],
          image: "https://picsum.photos/seed/ss-anne-kanto-Pallet-Town-Bay-4/400/300"
        },
        activities: ["Professor Oak's Special Lecture", "Beginner Trainer Workshop", "Beach Barbecue"]
      },
      {
        day: 5,
        port: {
          name: "Safari Zone Coast",
          description: "The coastal area of the famous Safari Zone, known for its diverse Pokemon.",
          coordinates: [36.1, 140.2],
          activities: ["Safari Boat Tour", "Fishing Competition"],
          image: "https://picsum.photos/seed/ss-anne-kanto-Safari-Zone-Coast-5/400/300"
        },
        activities: ["Pokemon Watching Expedition", "Fishing Tournament", "Safari-themed Dinner"]
      },
      {
        day: 6,
        port: {
          name: "Cerulean Cape",
          description: "A romantic cape north of Cerulean City with spectacular ocean views.",
          coordinates: [36.5, 140.5],
          activities: ["Lighthouse Tour", "Romantic Sunset Viewing"],
          image: "https://picsum.photos/seed/ss-anne-kanto-Cerulean-Cape-6/400/300"
        },
        activities: ["Water Pokemon Show", "Lighthouse Tour", "Farewell Gala Dinner"]
      },
      {
        day: 7,
        port: {
          name: "Vermilion City",
          description: "Return to the beautiful coastal city of Vermilion.",
          coordinates: [35.6895, 139.6917],
          activities: ["Souvenir Shopping", "City Tour"],
          image: "https://picsum.photos/seed/ss-anne-kanto-Vermilion-City-7/400/300"
        },
        activities: ["Disembarkation", "Optional City Tour"]
      }
    ],
    cabinTypes: [
      {
        id: "interior-kanto-ss-anne",
        name: "Standard Interior Cabin",
        description: "A comfortable and cozy cabin with all essential amenities for a relaxing voyage.",
        price: 2500,
        capacity: 2,
        amenities: ["Twin beds (convertible to queen)", "Private bathroom with shower", "Desk", "Television", "Safe"],
        images: ["https://picsum.photos/seed/cabins-kanto-interior-1/800/600", "https://picsum.photos/seed/cabins-kanto-interior-2/800/600"]
      },
      {
        id: "oceanview-kanto-ss-anne",
        name: "Oceanview Stateroom",
        description: "Enjoy scenic sea views from your stateroom, equipped with a picture window.",
        price: 3200,
        capacity: 3,
        amenities: ["Queen bed", "Sofa bed", "Private bathroom with shower", "Picture window", "Desk", "Television", "Safe", "Mini-fridge"],
        images: ["https://picsum.photos/seed/cabins-kanto-oceanview-1/800/600", "https://picsum.photos/seed/cabins-kanto-oceanview-2/800/600"]
      },
      {
        id: "suite-kanto-ss-anne",
        name: "Captain's Suite",
        description: "Luxurious and spacious suite with a private balcony and premium amenities.",
        price: 4500,
        capacity: 4,
        amenities: ["King bed", "Separate living area with sofa bed", "Private balcony", "Whirlpool bathtub", "Walk-in closet", "Priority embarkation/disembarkation", "Concierge service"],
        images: ["https://picsum.photos/seed/cabins-kanto-suite-1/800/600", "https://picsum.photos/seed/cabins-kanto-suite-2/800/600"]
      }
    ],
    images: [
      "https://picsum.photos/seed/cruises-kanto-ssanne-1/800/600",
      "https://picsum.photos/seed/cruises-kanto-ssanne-2/800/600",
      "https://picsum.photos/seed/cruises-kanto-ssanne-3/800/600",
      "https://picsum.photos/seed/cruises-kanto-ssanne-4/800/600"
    ],
    amenities: [
      "Grand Ballroom for events",
      "Multiple gourmet restaurants",
      "Luxury spa and wellness center",
      "Onboard Pokemon battle arena",
      "Casino and entertainment lounge",
      "Duty-free shopping boutiques",
      "Swimming pool and sundeck",
      "Kids and teens clubs"
    ],
    mapImage: "https://picsum.photos/seed/maps-kanto-cruise-map/1024/768",
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
          activities: ["Wind Chime Festival", "Professor Elm's Laboratory Tour"],
          image: "https://picsum.photos/seed/aqua-marina-johto-New-Bark-Town-Harbor-1/400/300"
        },
        activities: ["Embarkation", "Welcome Ceremony", "Wind and Water Show"]
      },
      {
        day: 2,
        port: {
          name: "Cherrygrove Bay",
          description: "A picturesque bay surrounded by cherry blossom trees when in season.",
          coordinates: [34.3, 137.1],
          activities: ["Cherry Blossom Viewing (seasonal)", "Guide Gent's Tour"],
          image: "https://picsum.photos/seed/aqua-marina-johto-Cherrygrove-Bay-2/400/300"
        },
        activities: ["Guided Nature Walk", "Cherry Blossom Tea Party (seasonal)", "Stargazing"]
      },
      {
        day: 3,
        port: {
          name: "Whirl Islands",
          description: "A group of four islands with strong whirlpools and complex cave systems.",
          coordinates: [33.9, 137.8],
          activities: ["Whirlpool Watching", "Cave Exploration"],
          image: "https://picsum.photos/seed/aqua-marina-johto-Whirl-Islands-3/400/300"
        },
        activities: ["Lugia Watching Expedition", "Cave Adventure Tour", "Whirlpool Legends Dinner"]
      },
      {
        day: 4,
        port: {
          name: "Olivine City",
          description: "A bustling port city famous for its steel industry and historic lighthouse.",
          coordinates: [33.6, 138.2],
          activities: ["Lighthouse Tour", "Steel Works Visit"],
          image: "https://picsum.photos/seed/aqua-marina-johto-Olivine-City-4/400/300"
        },
        activities: ["Glitter Lighthouse Exclusive Tour", "Amphy Meet and Greet", "Night Lantern Festival"]
      },
      {
        day: 5,
        port: {
          name: "Cianwood Peninsula",
          description: "A remote peninsula known for its medicinal herbs and martial arts traditions.",
          coordinates: [33.2, 137.5],
          activities: ["Pharmacy Tour", "Cliff Safari"],
          image: "https://picsum.photos/seed/aqua-marina-johto-Cianwood-Peninsula-5/400/300"
        },
        activities: ["Medicinal Herb Workshop", "Martial Arts Demonstration", "Cliff-side Meditation"]
      },
      {
        day: 6,
        port: {
          name: "New Bark Town Harbor",
          description: "Return to the peaceful harbor where your journey began.",
          coordinates: [34.5, 136.9],
          activities: ["Souvenir Shopping", "Farewell Ceremony"],
          image: "https://picsum.photos/seed/aqua-marina-johto-New-Bark-Town-Harbor-6/400/300"
        },
        activities: ["Disembarkation", "Optional Wind Farm Tour"]
      }
    ],
    cabinTypes: [
      {
        id: "traveler-johto-aqua-marina",
        name: "Traveler's Cabin",
        description: "A practical and comfortable cabin for explorers of the Johto region.",
        price: 2200,
        capacity: 2,
        amenities: ["Twin beds", "Private bathroom", "TV", "Storage space"],
        images: ["https://picsum.photos/seed/cabins-johto-traveler-1/800/600", "https://picsum.photos/seed/cabins-johto-traveler-2/800/600"]
      },
      {
        id: "coastalview-johto-aqua-marina",
        name: "Coastal View Cabin",
        description: "Cabin with a window offering views of Johto's beautiful coastlines.",
        price: 2900,
        capacity: 2,
        amenities: ["Double bed", "Private bathroom", "Picture window", "TV", "Mini fridge"],
        images: ["https://picsum.photos/seed/cabins-johto-coastal-1/800/600", "https://picsum.photos/seed/cabins-johto-coastal-2/800/600"]
      },
      {
        id: "serene-suite-johto-aqua-marina",
        name: "Serene Suite",
        description: "Spacious suite with traditional Johto decor and a private balcony.",
        price: 4000,
        capacity: 4,
        amenities: ["Queen bed", "Sofa bed", "Private bathroom with traditional bath", "Private balcony", "TV", "Tea ceremony set", "Sitting area"],
        images: ["https://picsum.photos/seed/cabins-johto-serene-1/800/600", "https://picsum.photos/seed/cabins-johto-serene-2/800/600"]
      }
    ],
    images: [
      "https://picsum.photos/seed/cruises-johto-aqua-marina-1/800/600",
      "https://picsum.photos/seed/cruises-johto-aqua-marina-2/800/600",
      "https://picsum.photos/seed/cruises-johto-aqua-marina-3/800/600"
    ],
    amenities: [
      "Traditional Tea Room",
      "Pokemon Contest Hall (miniature)",
      "Bell Tower replica observation deck",
      "Kimono rental and photoshoot service",
      "Johto-style gardens",
      "Local artisan craft shops"
    ],
    mapImage: "https://picsum.photos/seed/maps-johto-cruise-map/1024/768",
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
          activities: ["Market Shopping", "Oceanic Museum Visit"],
          image: "https://picsum.photos/seed/hoenn-tropical-seafarer-Slateport-City-1/400/300"
        },
        activities: ["Embarkation", "Welcome Feast", "Beach Party"]
      },
      {
        day: 2,
        port: {
          name: "Dewford Island",
          description: "A small island with a fighting dojo and famous for its rough waves.",
          coordinates: [30.8, 131.0],
          activities: ["Granite Cave Exploration", "Surfing Lessons"],
          image: "https://picsum.photos/seed/hoenn-tropical-seafarer-Dewford-Town-2/400/300"
        },
        activities: ["Cave Treasure Hunt", "Fighting-Type Pokemon Workshop", "Bonfire Night"]
      },
      {
        day: 3,
        port: {
          name: "Lavaridge Coast",
          description: "The coastal area near the volcanic town famous for its healing hot springs.",
          coordinates: [31.2, 130.8],
          activities: ["Hot Springs Bath", "Mt. Chimney Observation"],
          image: "https://picsum.photos/seed/hoenn-tropical-seafarer-Lavaridge-Coast-3/400/300"
        },
        activities: ["Volcanic Sand Therapy", "Hot Spring Onsen Experience", "Fire Pokemon Show"]
      },
      {
        day: 4,
        port: {
          name: "Fortree Riverside",
          description: "The river port near the unique tree-house city built among the canopy.",
          coordinates: [31.8, 131.2],
          activities: ["Treehouse Village Tour", "Birdwatching"],
          image: "https://picsum.photos/seed/hoenn-tropical-seafarer-Fortree-Riverside-4/400/300"
        },
        activities: ["Canopy Walk", "Flying Pokemon Air Show", "Riverside Picnic"]
      },
      {
        day: 5,
        port: {
          name: "Lilycove Harbor",
          description: "A cultural hub with a famous department store and contest hall.",
          coordinates: [32.1, 131.8],
          activities: ["Department Store Shopping", "Contest Spectacular Viewing"],
          image: "https://picsum.photos/seed/hoenn-tropical-seafarer-Lilycove-City-5/400/300"
        },
        activities: ["Pokemon Contest Workshop", "Art Museum Tour", "Gourmet Food Tasting"]
      },
      {
        day: 6,
        port: {
          name: "Mossdeep City",
          description: "An island city famous for its space center and psychic gym.",
          coordinates: [32.4, 132.2],
          activities: ["Space Center Tour", "Psychic Show"],
          image: "https://picsum.photos/seed/hoenn-tropical-seafarer-Mossdeep-City-6/400/300"
        },
        activities: ["Space Center VIP Tour", "Psychic Pokemon Demonstration", "Star Observation Night"]
      },
      {
        day: 7,
        port: {
          name: "Sootopolis City",
          description: "A city built in the crater of an extinct volcano, with a unique lake in the center.",
          coordinates: [32.0, 131.5],
          activities: ["Cave of Origin Viewing", "Underwater Exploration"],
          image: "https://picsum.photos/seed/hoenn-tropical-seafarer-Sootopolis-City-7/400/300"
        },
        activities: ["Underwater Submarine Tour", "Ancient Legends Lecture", "Crystal Cave Dinner"]
      },
      {
        day: 8,
        port: {
          name: "Slateport City",
          description: "Return to the lively market city where your journey began.",
          coordinates: [31.5, 130.5],
          activities: ["Souvenir Shopping", "Beach Relaxation"],
          image: "https://picsum.photos/seed/hoenn-tropical-seafarer-Slateport-City-8/400/300"
        },
        activities: ["Disembarkation", "Optional Market Tour"]
      }
    ],
    cabinTypes: [
      {
        id: "island-hoenn-seafarer",
        name: "Island Cabin",
        description: "A cozy cabin perfect for adventurers exploring Hoenn's diverse islands.",
        price: 2800,
        capacity: 2,
        amenities: ["Twin beds", "Private bathroom", "TV", "Gear storage"],
        images: ["https://picsum.photos/seed/cabins-hoenn-island-1/800/600", "https://picsum.photos/seed/cabins-hoenn-island-2/800/600"]
      },
      {
        id: "panorama-hoenn-seafarer",
        name: "Aqua Panorama Cabin",
        description: "Cabin with large windows offering panoramic views of Hoenn's waters.",
        price: 3600,
        capacity: 3,
        amenities: ["Queen bed", "Pull-out sofa", "Private bathroom", "Panoramic window", "TV", "Mini bar"],
        images: ["https://picsum.photos/seed/cabins-hoenn-panorama-1/800/600", "https://picsum.photos/seed/cabins-hoenn-panorama-2/800/600"]
      },
      {
        id: "explorer-suite-hoenn-seafarer",
        name: "Explorer's Suite",
        description: "Luxurious suite with a private balcony, perfect for the avid Hoenn explorer.",
        price: 5200,
        capacity: 4,
        amenities: ["King bed", "Living area with sofa bed", "Private balcony with ocean view", "Deluxe bathroom", "Binoculars for Pokemon spotting", "Research desk"],
        images: ["https://picsum.photos/seed/cabins-hoenn-explorer-1/800/600", "https://picsum.photos/seed/cabins-hoenn-explorer-2/800/600"]
      }
    ],
    images: [
      "https://picsum.photos/seed/cruises-hoenn-seafarer-1/800/600",
      "https://picsum.photos/seed/cruises-hoenn-seafarer-2/800/600",
      "https://picsum.photos/seed/cruises-hoenn-seafarer-3/800/600",
      "https://picsum.photos/seed/cruises-hoenn-seafarer-4/800/600"
    ],
    amenities: [
      "Underwater Observation Lounge",
      "Volcano-themed Spa (non-active)",
      "Weather Institute Deck",
      "Secret Base Design Workshop",
      "Tropical Juice Bar",
      "Dive shop for excursions"
    ],
    mapImage: "https://picsum.photos/seed/maps-hoenn-cruise-map/1024/768",
    featured: false
  },
  {
    id: "glacial-explorer-sinnoh",
    name: "Glacial Explorer Sinnoh",
    region: "Sinnoh",
    description: "Embark on an epic adventure through the diverse and majestic Sinnoh region. From the snowy peaks of Mt. Coronet to the mysterious Distortion World, this cruise offers unparalleled experiences. Explore ancient ruins, witness breathtaking natural phenomena, and encounter unique Pokémon native to Sinnoh.",
    shortDescription: "Explore Sinnoh's majestic mountains, lakes, and ancient mysteries.",
    highlights: [
      "Excursion to the summit of Mt. Coronet",
      "Visit to the Spear Pillar and Hall of Origin (simulated)",
      "Canalave City Library tour with ancient myths",
      "Stargazing night at Lake Verity"
    ],
    startingPrice: 2800,
    duration: 8,
    itinerary: [
      {
        day: 1,
        port: {
          name: "Canalave City",
          description: "A historic port city with a famous library and access to Iron Island.",
          coordinates: [46.1523, 140.7407], 
          activities: ["Canalave Library Tour", "Iron Island Ferry Trip"],
          image: "https://picsum.photos/seed/glacial-explorer-sinnoh-Canalave-City-1/400/300"
        },
        activities: ["Embarkation", "Welcome Gala", "Sinnoh Myths & Legends Presentation"]
      },
      {
        day: 2,
        port: {
          name: "Snowpoint City",
          description: "A remote, snow-covered city known for its Ice-type Gym and access to Lake Acuity.",
          coordinates: [45.4215, 141.0000], 
          activities: ["Snowpoint Temple Visit", "Ice Sculpting Class"],
          image: "https://picsum.photos/seed/glacial-explorer-sinnoh-Snowpoint-City-2/400/300"
        },
        activities: ["Guided Tour of Snowpoint Temple", "Optional Ice-type Pokemon Interaction", "Aurora Borealis Viewing (weather permitting)"]
      },
      {
        day: 3,
        port: {
          name: "Sunyshore City",
          description: "A sunny coastal city famous for its solar panels and the Vista Lighthouse.",
          coordinates: [42.9667, 144.3667], 
          activities: ["Vista Lighthouse Climb", "Solar Panel Farm Tour"],
          image: "https://picsum.photos/seed/glacial-explorer-sinnoh-Sunyshore-City-3/400/300"
        },
        activities: ["Beach Day & Water Sports", "Electric Pokemon Showcase", "Sunyshore Market Exploration"]
      },
      {
        day: 4,
        port: {
          name: "Fight Area (Battle Zone)",
          description: "An island dedicated to Pokemon battling, with challenging trainers and facilities.",
          coordinates: [44.5000, 142.5000], 
          activities: ["Battle Tower Challenge (spectator)", "Tropical Pokemon Photography"],
          image: "https://picsum.photos/seed/glacial-explorer-sinnoh-Fight-Area-Battle-Zone-4/400/300"
        },
        activities: ["Pokemon Battle Tournament (onboard)", "Strategy Workshops", "Survival Island Skills Demo"]
      },
      {
        day: 5,
        port: {
          name: "Celestic Town",
          description: "An ancient town with a shrine dedicated to Sinnoh's legendary Pokemon.",
          coordinates: [43.7833, 142.3667], 
          activities: ["Celestic Ruins Exploration", "Sinnoh History Lecture"],
          image: "https://picsum.photos/seed/glacial-explorer-sinnoh-Celestic-Town-5/400/300"
        },
        activities: ["Guided Tour of Celestic Ruins", "Traditional Sinnoh Craft Workshop", "Stargazing from the Deck"]
      },
      {
        day: 6,
        port: {
          name: "Pastoria City",
          description: "A city known for the Great Marsh and its unique Pokemon.",
          coordinates: [43.0620, 141.3544], 
          activities: ["Great Marsh Safari Tour", "Berry Picking"],
          image: "https://picsum.photos/seed/glacial-explorer-sinnoh-Pastoria-City-6/400/300"
        },
        activities: ["Great Marsh Bug Catching Contest (simulated)", "Water Pokemon Parade", "Pastoria-themed Dinner"]
      },
      {
        day: 7,
        port: {
          name: "Mt. Coronet Foothills",
          description: "Access point to explore the lower trails of Sinnoh's iconic mountain range.",
          coordinates: [43.5000, 142.0000], 
          activities: ["Guided Hike", "Cave Exploration (beginner level)"],
          image: "https://picsum.photos/seed/glacial-explorer-sinnoh-Mt-Coronet-Foothills-7/400/300"
        },
        activities: ["Mt. Coronet Scenic Viewing", "Rock Climbing Wall Challenge", "Farewell Dinner & Show"]
      },
      {
        day: 8,
        port: {
          name: "Canalave City",
          description: "Return to Canalave City.",
          coordinates: [46.1523, 140.7407],
          activities: ["Souvenir Shopping", "Last-minute Sightseeing"],
          image: "https://picsum.photos/seed/glacial-explorer-sinnoh-Canalave-City-8/400/300"
        },
        activities: ["Disembarkation", "Optional Transfer to Jubilife City"]
      }
    ],
    cabinTypes: [
      {
        id: "interior-sinnoh-glacial",
        name: "Explorer Cabin",
        description: "A cozy cabin perfect for adventurers, with all essential amenities.",
        price: 2800,
        capacity: 2,
        amenities: ["Twin beds", "Private bathroom", "TV", "Storage space for gear"],
        images: ["https://picsum.photos/seed/cabins-explorer-sinnoh-1/800/600", "https://picsum.photos/seed/cabins-explorer-sinnoh-2/800/600"]
      },
      {
        id: "summitview-sinnoh-glacial",
        name: "Summit View Cabin",
        description: "Cabin with a window offering views of the passing landscapes and mountains.",
        price: 3500,
        capacity: 2,
        amenities: ["Queen bed", "Private bathroom", "Picture window", "TV", "Mini fridge", "Desk"],
        images: ["https://picsum.photos/seed/cabins-summitview-sinnoh-1/800/600", "https://picsum.photos/seed/cabins-summitview-sinnoh-2/800/600"]
      },
      {
        id: "legendary-sinnoh-glacial",
        name: "Legendary Suite",
        description: "Spacious suite with a private balcony, themed after Sinnoh's legendary Pokemon.",
        price: 5000,
        capacity: 4,
        amenities: ["King bed", "Sofa bed", "Private bathroom with tub", "Private balcony", "TV", "Mini bar", "Sitting area", "Themed decor"],
        images: ["https://picsum.photos/seed/cabins-legendary-sinnoh-1/800/600", "https://picsum.photos/seed/cabins-legendary-sinnoh-2/800/600"]
      }
    ],
    images: [
      "https://picsum.photos/seed/cruises-sinnoh-glacial-1/800/600",
      "https://picsum.photos/seed/cruises-sinnoh-glacial-2/800/600",
      "https://picsum.photos/seed/cruises-sinnoh-glacial-3/800/600",
      "https://picsum.photos/seed/cruises-sinnoh-glacial-4/800/600"
    ],
    amenities: [
      "Heated indoor pool",
      "Observation deck with telescopes",
      "Pokemon research lab",
      "Ice skating rink (seasonal)",
      "Multiple dining options",
      "Lecture hall for guest speakers",
      "Library with Sinnoh lore",
      "Fitness center and spa"
    ],
    mapImage: "https://picsum.photos/seed/maps-sinnoh-cruise-map/1024/768",
    featured: true
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
