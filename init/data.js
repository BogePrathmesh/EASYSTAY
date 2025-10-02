const sampleListings = [
  {
    title: "Historic Canal House",
    description: "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?...",
    },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    category: "Iconic City",
    geometry: {
      type: "Point",
      coordinates: [4.9041, 52.3676] // Amsterdam
    }
  },
  {
    title: "Private Island Retreat",
    description: "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?...",
    },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
    category: "Boats",
    geometry: {
      type: "Point",
      coordinates: [178.0650, -17.7134] // Fiji
    }
  },
  {
    title: "Charming Cottage in the Cotswolds",
    description: "Escape to the picturesque Cotswolds in this quaint and charming cottage with a thatched roof.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602088113235-229c19758e9f?...",
    },
    price: 1200,
    location: "Cotswolds",
    country: "United Kingdom",
    category: "Farms",
    geometry: {
      type: "Point",
      coordinates: [-1.7836, 51.8436] // Cotswolds
    }
  },
  {
    title: "Historic Brownstone in Boston",
    description: "Step back in time in this elegant historic brownstone located in the heart of Boston.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1533619239233-6280475a633a?...",
    },
    price: 2200,
    location: "Boston",
    country: "United States",
    category: "Iconic City",
    geometry: {
      type: "Point",
      coordinates: [-71.0589, 42.3601] // Boston
    }
  },
  {
    title: "Beachfront Bungalow in Bali",
    description: "Relax on the sandy shores of Bali in this beautiful beachfront bungalow with a private pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602391833977-358a52198938?...",
    },
    price: 1800,
    location: "Bali",
    country: "Indonesia",
    category: "Amazing Pool",
    geometry: {
      type: "Point",
      coordinates: [115.1889, -8.4095] // Bali
    }
  },
  {
    title: "Mountain View Cabin in Banff",
    description: "Enjoy breathtaking mountain views from this cozy cabin in the Canadian Rockies.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb?...",
    },
    price: 1500,
    location: "Banff",
    country: "Canada",
    category: "Mountains",
    geometry: {
      type: "Point",
      coordinates: [-115.5728, 51.1784] // Banff
    }
  },
  {
    title: "Art Deco Apartment in Miami",
    description: "Step into the glamour of the 1920s in this stylish Art Deco apartment in South Beach.",
    image: {
      filename: "listingimage",
      url: "https://plus.unsplash.com/premium_photo-1670963964797-942df1804579?...",
    },
    price: 1600,
    location: "Miami",
    country: "United States",
    category: "Iconic City",
    geometry: {
      type: "Point",
      coordinates: [-80.1918, 25.7617] // Miami
    }
  },
  {
    title: "Tropical Villa in Phuket",
    description: "Escape to a tropical paradise in this luxurious villa with a private infinity pool in Phuket.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1470165301023-58dab8118cc9?...",
    },
    price: 3000,
    location: "Phuket",
    country: "Thailand",
    category: "Amazing Pool",
    geometry: {
      type: "Point",
      coordinates: [98.3903, 7.8804] // Phuket
    }
  },
  {
    title: "Historic Castle in Scotland",
    description: "Live like royalty in this historic castle in the Scottish Highlands. Explore the rugged beauty of the area.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98?...",
    },
    price: 4000,
    location: "Scottish Highlands",
    country: "United Kingdom",
    category: "Castles",
    geometry: {
      type: "Point",
      coordinates: [-4.2026, 57.3510] // Scottish Highlands
    }
  },
  {
    title: "Desert Oasis in Dubai",
    description: "Experience luxury in the middle of the desert in this opulent oasis in Dubai with a private pool.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1518684079-3c830dcef090?...",
    },
    price: 5000,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "Amazing Pool",
    geometry: {
      type: "Point",
      coordinates: [55.2708, 25.2048] // Dubai
    }
  },
  {
    title: "Rustic Log Cabin in Montana",
    description: "Unplug and unwind in this cozy log cabin surrounded by the natural beauty of Montana.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?...",
    },
    price: 1100,
    location: "Montana",
    country: "United States",
    category: "Mountains",
    geometry: {
      type: "Point",
      coordinates: [-110.3626, 46.8797] // Montana
    }
  },
  {
    title: "Beachfront Villa in Greece",
    description: "Enjoy the crystal-clear waters of the Mediterranean in this beautiful beachfront villa on a Greek island.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?...",
    },
    price: 2500,
    location: "Mykonos",
    country: "Greece",
    category: "Boats",
    geometry: {
      type: "Point",
      coordinates: [25.3333, 37.4500] // Mykonos
    }
  },
  {
    title: "Eco-Friendly Treehouse Retreat",
    description: "Stay in an eco-friendly treehouse nestled in the forest. It's the perfect escape for nature lovers.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?...",
    },
    price: 750,
    location: "Costa Rica",
    country: "Costa Rica",
    category: "Camping",
    geometry: {
      type: "Point",
      coordinates: [-84.0907, 9.9281] // Costa Rica
    }
  },
  {
    title: "Historic Cottage in Charleston",
    description: "Experience the charm of historic Charleston in this beautifully restored cottage with a private garden.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1587381420270-3e1a5b9e6904?...",
    },
    price: 1600,
    location: "Charleston",
    country: "United States",
    category: "Iconic City",
    geometry: {
      type: "Point",
      coordinates: [-79.9311, 32.7765] // Charleston
    }
  },
  {
    title: "Modern Apartment in Tokyo",
    description: "Explore the vibrant city of Tokyo from this modern and centrally located apartment.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?...",
    },
    price: 2000,
    location: "Tokyo",
    country: "Japan",
    category: "Iconic City",
    geometry: {
      type: "Point",
      coordinates: [139.6917, 35.6895] // Tokyo
    }
  },
  {
    title: "Lakefront Cabin in New Hampshire",
    description: "Spend your days by the lake in this cozy cabin in the scenic White Mountains of New Hampshire.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1578645510447-e20b4311e3ce?...",
    },
    price: 1200,
    location: "New Hampshire",
    country: "United States",
    category: "Mountains",
    geometry: {
      type: "Point",
      coordinates: [-71.5724, 43.6800] // New Hampshire
    }
  },
  {
    title: "Luxury Villa in the Maldives",
    description: "Indulge in luxury in this overwater villa in the Maldives with stunning views of the Indian Ocean.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?...",
    },
    price: 6000,
    location: "Maldives",
    country: "Maldives",
    category: "Boats",
    geometry: {
      type: "Point",
      coordinates: [73.2207, 3.2028] // Maldives
    }
  },
  {
    title: "Ski Chalet in Aspen",
    description: "Hit the slopes in style with this luxurious ski chalet in the world-famous Aspen ski resort.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?...",
    },
    price: 4000,
    location: "Aspen",
    country: "United States",
    category: "Mountains",
    geometry: {
      type: "Point",
      coordinates: [-106.8175, 39.1911] // Aspen
    }
  },
  {
    title: "Secluded Beach House in Costa Rica",
    description: "Escape to a secluded beach house on the Pacific coast of Costa Rica. Surf, relax, and unwind.",
    image: {
      filename: "listingimage",
      url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?...",
    },
    price: 1800,
    location: "Costa Rica",
    country: "Costa Rica",
    category: "Boats",
    geometry: {
      type: "Point",
      coordinates: [-85.6602, 10.0000] // Costa Rica coast
    }
  }

];

module.exports = { data: sampleListings };
