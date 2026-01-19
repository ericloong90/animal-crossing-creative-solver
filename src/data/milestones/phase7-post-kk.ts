import type { Milestone } from '@/types/milestone';

// ==========================================
// 2.0 FREE UPDATE MILESTONES (~25)
// These unlock after K.K. concert / 3-star rating
// ==========================================

const update2_0Milestones: Milestone[] = [
  // Kapp'n & Boat Tours
  {
    id: 'meet-kappn',
    title: "Meet Kapp'n",
    description: "The sea-faring turtle arrives at your island's pier.",
    category: 'npcs',
    phase: 7,
    prerequisites: ['kk-concert'],
    requirements: [
      { type: 'action', name: "Visit the pier and talk to Kapp'n" },
    ],
    tips: [
      "Kapp'n appears at your pier after reaching 3-star rating.",
      'He offers boat tours to mysterious islands.',
      'Tours cost 1,000 Nook Miles each.',
    ],
    isOptional: false,
  },
  {
    id: 'first-boat-tour',
    title: "Take First Kapp'n Boat Tour",
    description: 'Sail to a mysterious island with unique resources.',
    category: 'npcs',
    phase: 7,
    prerequisites: ['meet-kappn'],
    requirements: [
      { type: 'currency', name: 'Nook Miles', quantity: 1000 },
      { type: 'action', name: 'Complete a boat tour' },
    ],
    tips: [
      'Mystery islands can have different seasons and times of day.',
      'You may find rare flowers, crops, or gyroids.',
      'Some islands have star fragment trees or money rock islands.',
      'One boat tour per real-world day.',
    ],
    isOptional: false,
  },
  {
    id: 'find-gyroid-fragment',
    title: 'Find Your First Gyroid Fragment',
    description: 'Discover a buried gyroid fragment on a mystery island.',
    category: 'main-story',
    phase: 7,
    prerequisites: ['first-boat-tour'],
    requirements: [
      { type: 'action', name: 'Dig up a gyroid fragment on a mystery island' },
    ],
    tips: [
      'Look for star-shaped dig spots on mystery islands.',
      'Fragments need to be buried and watered to grow.',
      'Rain also works to grow gyroids.',
    ],
    isOptional: false,
  },
  {
    id: 'grow-first-gyroid',
    title: 'Grow Your First Gyroid',
    description: 'Plant and water a gyroid fragment to grow a full gyroid.',
    category: 'main-story',
    phase: 7,
    prerequisites: ['find-gyroid-fragment'],
    requirements: [
      { type: 'action', name: 'Bury the gyroid fragment on your island' },
      { type: 'action', name: 'Water the buried fragment' },
      { type: 'time', name: 'Wait until the next day' },
    ],
    tips: [
      'Gyroids make musical sounds and can be placed as furniture.',
      'There are 36 gyroid types with variations.',
      'Gyroids can be customized with Cyrus.',
    ],
    isOptional: false,
  },

  // Brewster & The Roost (2.0 version)
  {
    id: 'blathers-mentions-brewster',
    title: 'Blathers Mentions Brewster',
    description: 'Learn about Brewster from Blathers after completing the museum.',
    category: 'main-story',
    phase: 7,
    prerequisites: ['kk-concert'],
    requirements: [
      { type: 'action', name: 'Donate at least one item to each museum section' },
      { type: 'action', name: 'Talk to Blathers' },
    ],
    tips: [
      'You need fish, bugs, sea creatures, fossils, and art donated.',
      'Blathers will mention his friend Brewster unprompted.',
      'This triggers the quest to find Brewster.',
    ],
    isOptional: false,
  },
  {
    id: 'find-brewster-2',
    title: 'Find Brewster on Mystery Island',
    description: "Use Kapp'n's boat to find Brewster on a mystery island.",
    category: 'main-story',
    phase: 7,
    prerequisites: ['blathers-mentions-brewster', 'meet-kappn'],
    requirements: [
      { type: 'action', name: "Take a Kapp'n boat tour" },
      { type: 'action', name: 'Find and talk to Brewster' },
    ],
    tips: [
      'Brewster appears on one of your first boat tour islands.',
      'Talk to him to invite him to your museum.',
      'He will agree to open The Roost coffee shop.',
    ],
    isOptional: false,
  },
  {
    id: 'roost-opens-2',
    title: 'The Roost Opens',
    description: "Brewster's coffee shop opens in your museum!",
    category: 'buildings',
    phase: 7,
    prerequisites: ['find-brewster-2'],
    requirements: [
      { type: 'time', name: 'Wait for The Roost to be built', description: 'Usually 1-2 days' },
    ],
    tips: [
      'The Roost is in the museum, to the left of the main entrance.',
      'Coffee costs 200 Bells.',
      'Visit daily to build friendship with Brewster.',
    ],
    isOptional: false,
  },
  {
    id: 'brewster-rewards',
    title: 'Unlock Brewster Rewards',
    description: 'Build friendship with Brewster to unlock special items.',
    category: 'npcs',
    phase: 7,
    prerequisites: ['roost-opens-2'],
    requirements: [
      { type: 'action', name: 'Visit The Roost many times' },
      { type: 'action', name: 'Unlock takeaway coffee, siphons, and more' },
    ],
    tips: [
      '11+ visits: Takeaway coffee cup.',
      '30+ visits: Able to invite villagers for coffee.',
      '50+ visits: Brewster Gyroid.',
      'Try coffee with pigeon milk!',
    ],
    isOptional: true,
  },

  // Harvey's Island Plaza
  {
    id: 'harveys-plaza-invitation',
    title: "Harvey's Plaza Invitation",
    description: "Harriet invites you to visit Harvey's new plaza.",
    category: 'npcs',
    phase: 7,
    prerequisites: ['kk-concert'],
    requirements: [
      { type: 'action', name: 'Meet Harriet on your island' },
    ],
    tips: [
      "Harriet appears randomly on your island after K.K.'s concert.",
      "She'll invite you to visit Harvey's Island.",
      "The plaza has shops that need donations to unlock.",
    ],
    isOptional: false,
  },
  {
    id: 'visit-harveys-plaza',
    title: "Visit Harvey's Plaza",
    description: "Fly to Harvey's Island and discover the new plaza area.",
    category: 'npcs',
    phase: 7,
    prerequisites: ['harveys-plaza-invitation'],
    requirements: [
      { type: 'action', name: "Use the airport to visit Harvey's Island" },
      { type: 'action', name: 'Walk behind the photo studio to find the plaza' },
    ],
    tips: [
      'The plaza has 7 empty shops that NPCs can move into.',
      'Each shop costs 100,000 Bells to unlock.',
      'Donate to Lloid to fund each shop.',
    ],
    isOptional: false,
  },
  {
    id: 'unlock-harriet-shop',
    title: "Unlock Harriet's Salon",
    description: "Donate Bells to open Harriet's hair salon on Harvey's Plaza.",
    category: 'npcs',
    phase: 7,
    prerequisites: ['visit-harveys-plaza'],
    requirements: [
      { type: 'currency', name: 'Bells', quantity: 100000, description: 'Donated to Lloid' },
    ],
    tips: [
      'Harriet offers 11 new hairstyles not in Nook Miles.',
      'New hairstyles unlock as you visit more.',
      'These are permanent unlocks for the mirror at home.',
    ],
    isOptional: true,
  },
  {
    id: 'unlock-katrina-shop',
    title: "Unlock Katrina's Fortune Shop",
    description: "Donate Bells to open Katrina's fortune telling shop.",
    category: 'npcs',
    phase: 7,
    prerequisites: ['visit-harveys-plaza'],
    requirements: [
      { type: 'currency', name: 'Bells', quantity: 100000, description: 'Donated to Lloid' },
    ],
    tips: [
      'Katrina tells your daily fortune for 1,000 Bells.',
      'Bad luck can be cleansed for 10,000 Bells.',
      'Friendship fortunes affect villager relationships.',
    ],
    isOptional: true,
  },
  {
    id: 'unlock-cyrus-reese-shop',
    title: "Unlock Reese & Cyrus's Shop",
    description: 'Donate Bells to bring the alpaca customization duo to the plaza.',
    category: 'npcs',
    phase: 7,
    prerequisites: ['visit-harveys-plaza'],
    requirements: [
      { type: 'currency', name: 'Bells', quantity: 100000, description: 'Donated to Lloid' },
    ],
    tips: [
      'Cyrus can customize items you cannot customize yourself.',
      'Includes Nook Miles items and special furniture.',
      'Great for matching items to your island theme.',
    ],
    isOptional: true,
  },
  {
    id: 'unlock-kicks-shop',
    title: "Unlock Kicks's Shop",
    description: 'Donate Bells to give Kicks a permanent shoe shop.',
    category: 'npcs',
    phase: 7,
    prerequisites: ['visit-harveys-plaza'],
    requirements: [
      { type: 'currency', name: 'Bells', quantity: 100000, description: 'Donated to Lloid' },
    ],
    tips: [
      'Access shoes, bags, and accessories daily.',
      'No longer need to wait for Kicks to visit.',
      'Great for completing outfit collections.',
    ],
    isOptional: true,
  },
  {
    id: 'unlock-saharah-shop',
    title: "Unlock Saharah's Shop",
    description: 'Donate Bells to give Saharah a permanent rug shop.',
    category: 'npcs',
    phase: 7,
    prerequisites: ['visit-harveys-plaza'],
    requirements: [
      { type: 'currency', name: 'Bells', quantity: 100000, description: 'Donated to Lloid' },
    ],
    tips: [
      'Buy rugs, mysterious wallpapers, and flooring daily.',
      'Saharah exchange tickets still work here.',
      'Easier access to rare wall/floor patterns.',
    ],
    isOptional: true,
  },
  {
    id: 'unlock-leif-shop',
    title: "Unlock Leif's Shop",
    description: 'Donate Bells to give Leif a permanent garden shop.',
    category: 'npcs',
    phase: 7,
    prerequisites: ['visit-harveys-plaza'],
    requirements: [
      { type: 'currency', name: 'Bells', quantity: 100000, description: 'Donated to Lloid' },
    ],
    tips: [
      'Buy shrubs, flowers, and vegetable starts daily.',
      'Leif also sells weed removal services.',
      'Essential for the new cooking feature.',
    ],
    isOptional: true,
  },
  {
    id: 'unlock-redd-shop',
    title: "Unlock Redd's Shop",
    description: "Donate Bells to give Redd a permanent art shop (he's trustworthy now).",
    category: 'npcs',
    phase: 7,
    prerequisites: ['visit-harveys-plaza'],
    requirements: [
      { type: 'currency', name: 'Bells', quantity: 100000, description: 'Donated to Lloid' },
    ],
    tips: [
      'Redd sells art and furniture daily.',
      'Art can still be fake - check carefully!',
      'Much easier to complete the art collection.',
    ],
    isOptional: true,
  },
  {
    id: 'complete-harveys-plaza',
    title: "Complete Harvey's Plaza",
    description: 'Unlock all 7 NPC shops on Harvey\'s Island.',
    category: 'npcs',
    phase: 7,
    prerequisites: [
      'unlock-harriet-shop',
      'unlock-katrina-shop',
      'unlock-cyrus-reese-shop',
      'unlock-kicks-shop',
      'unlock-saharah-shop',
      'unlock-leif-shop',
      'unlock-redd-shop',
    ],
    requirements: [
      { type: 'currency', name: 'Total Bells donated', quantity: 700000 },
    ],
    tips: [
      'All 7 NPCs are now available daily!',
      'Great convenience for completing collections.',
      'Harriet unlocks new hairstyles over time.',
    ],
    isOptional: true,
  },

  // Cooking & Farming
  {
    id: 'learn-cooking',
    title: 'Learn to Cook',
    description: 'Unlock the cooking feature and get your first recipes.',
    category: 'cooking',
    phase: 7,
    prerequisites: ['kk-concert'],
    requirements: [
      { type: 'action', name: 'Buy the "Be a Chef! DIY Recipes+" from Nook\'s Cranny' },
    ],
    tips: [
      'Costs 2,980 Bells from Nook\'s Cranny cabinet.',
      'Also available via Nook Miles (for 1,500 miles).',
      'Unlocks basic cooking recipes and kitchen use.',
    ],
    isOptional: false,
  },
  {
    id: 'grow-first-vegetables',
    title: 'Grow Your First Vegetables',
    description: 'Plant and harvest vegetable crops for cooking.',
    category: 'cooking',
    phase: 7,
    prerequisites: ['learn-cooking'],
    requirements: [
      { type: 'item', name: 'Vegetable starts from Leif', quantity: 1 },
      { type: 'action', name: 'Plant and water vegetables' },
      { type: 'action', name: 'Harvest fully grown crops' },
    ],
    tips: [
      'Crops: tomatoes, carrots, potatoes, sugarcane, wheat, pumpkins.',
      'Water daily for maximum yield (3 per plant).',
      'Crops regrow after harvesting!',
    ],
    isOptional: false,
  },
  {
    id: 'cook-first-dish',
    title: 'Cook Your First Dish',
    description: 'Use a kitchen or stove to cook a recipe.',
    category: 'cooking',
    phase: 7,
    prerequisites: ['learn-cooking'],
    requirements: [
      { type: 'item', name: 'Kitchen or cooking appliance' },
      { type: 'item', name: 'Ingredients for a recipe' },
      { type: 'action', name: 'Cook a dish' },
    ],
    tips: [
      'Interact with any kitchen furniture to cook.',
      'Cooked food can be eaten or displayed.',
      'Some recipes require specific ingredients.',
    ],
    isOptional: false,
  },

  // Ordinances & Island Features
  {
    id: 'unlock-ordinances',
    title: 'Unlock Island Ordinances',
    description: 'Isabelle now offers ordinances to customize island life.',
    category: 'main-story',
    phase: 7,
    prerequisites: ['kk-concert'],
    requirements: [
      { type: 'action', name: 'Talk to Isabelle about ordinances' },
    ],
    tips: [
      'Costs 20,000 Bells to enact an ordinance.',
      'Beautiful Island: Fewer weeds, more flowers.',
      'Bell Boom: Higher buy/sell prices.',
      'Early Bird/Night Owl: Shifts shop hours.',
    ],
    isOptional: false,
  },
  {
    id: 'enact-first-ordinance',
    title: 'Enact Your First Ordinance',
    description: 'Choose and implement an island ordinance.',
    category: 'main-story',
    phase: 7,
    prerequisites: ['unlock-ordinances'],
    requirements: [
      { type: 'currency', name: 'Bells', quantity: 20000 },
      { type: 'action', name: 'Select an ordinance from Isabelle' },
    ],
    tips: [
      'Takes effect the next day.',
      'Can be changed anytime (with another fee).',
      'Beautiful Island is popular for maintenance.',
    ],
    isOptional: true,
  },
  {
    id: 'group-stretching',
    title: 'Join Group Stretching',
    description: 'Participate in the daily stretching exercise with villagers.',
    category: 'main-story',
    phase: 7,
    prerequisites: ['kk-concert'],
    requirements: [
      { type: 'action', name: 'Use the tape player in the plaza' },
    ],
    tips: [
      'Available from 5 AM to midnight.',
      'Villagers join in when you start.',
      'Follow the button prompts for exercise.',
      'Unlocks Nook Miles achievement.',
    ],
    isOptional: true,
  },

  // Storage & Home Features
  {
    id: 'place-storage-shed',
    title: 'Place a Storage Shed',
    description: 'Access your home storage from anywhere on the island.',
    category: 'house',
    phase: 7,
    prerequisites: ['kk-concert'],
    requirements: [
      { type: 'action', name: 'Purchase Storage Shed from Nook Miles (6,000 miles)' },
      { type: 'action', name: 'Place the shed outside' },
    ],
    tips: [
      'Access your full home storage outside.',
      'Great for gardening and decorating.',
      'Multiple sheds can be placed.',
    ],
    isOptional: true,
  },
  {
    id: 'place-abd-terminal',
    title: 'Place an ABD Terminal',
    description: 'Access your bank account from anywhere on the island.',
    category: 'house',
    phase: 7,
    prerequisites: ['kk-concert'],
    requirements: [
      { type: 'action', name: 'Purchase ABD from Nook Miles (9,900 miles)' },
      { type: 'action', name: 'Place the terminal outside' },
    ],
    tips: [
      'Access your savings without visiting Resident Services.',
      'Check your Nook Miles balance too.',
      'Convenient for frequent players.',
    ],
    isOptional: true,
  },
  {
    id: 'ceiling-decor',
    title: 'Decorate Your Ceiling',
    description: 'Unlock the ability to hang items from your ceiling.',
    category: 'house',
    phase: 7,
    prerequisites: ['kk-concert'],
    requirements: [
      { type: 'action', name: 'Enter decoration mode in your house' },
      { type: 'action', name: 'Press up on d-pad to access ceiling' },
    ],
    tips: [
      'Ceiling items include lights, mobiles, and hanging plants.',
      'Each room has a ceiling slot limit.',
      'Great for adding atmosphere to rooms.',
    ],
    isOptional: true,
  },
  {
    id: 'home-storage-expansion',
    title: 'Expand Home Storage to Maximum',
    description: 'Upgrade your home storage to 5,000 slots.',
    category: 'house',
    phase: 7,
    prerequisites: ['house-fully-upgraded'],
    requirements: [
      { type: 'currency', name: 'Bells', quantity: 500000, description: 'Storage upgrade' },
      { type: 'action', name: 'Talk to Tom Nook about storage' },
    ],
    tips: [
      'Requires fully upgraded house first.',
      'Storage increases from 2,400 to 5,000.',
      'Essential for collectors!',
    ],
    isOptional: true,
  },
];

// ==========================================
// HAPPY HOME PARADISE DLC MILESTONES (~35)
// Uses vacation-homes requirement for progression
// ==========================================

const hhpMilestones: Milestone[] = [
  // Getting Started (0-2 homes)
  {
    id: 'hhp-arrival',
    title: 'Arrive at the HHP Archipelago',
    description: 'Take the seaplane to begin your Happy Home Paradise career.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['kk-concert'],
    requirements: [
      { type: 'action', name: 'Purchase Happy Home Paradise DLC' },
      { type: 'action', name: 'Talk to Tom Nook about the job opportunity' },
      { type: 'action', name: 'Visit the airport and fly to HHP' },
    ],
    tips: [
      'HHP is a paid DLC ($24.99) or included with Nintendo Switch Online expansion.',
      'Available after the K.K. Slider concert.',
      'You become a vacation home designer!',
    ],
    isOptional: true,
  },
  {
    id: 'hhp-first-home',
    title: 'Design Your First Vacation Home',
    description: 'Complete your first vacation home design for a client.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-arrival'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 1 },
    ],
    tips: [
      "Match furniture to the client's requested theme.",
      'Use the handbook to see their preferences.',
      'Interior and exterior both matter!',
    ],
    isOptional: true,
  },
  {
    id: 'hhp-unlock-photos',
    title: 'Unlock Vacation Home Photos',
    description: 'Take photos of your completed vacation homes.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-first-home'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 2 },
    ],
    tips: [
      'Photos are saved to your album.',
      'Great for sharing your designs!',
      'Photos appear in your portfolio.',
    ],
    isOptional: true,
  },

  // Early Progression (3-6 homes)
  {
    id: 'hhp-pro-decorating-license',
    title: 'Earn Pro Decorating License',
    description: 'Unlock advanced decoration features.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-unlock-photos'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 3 },
    ],
    tips: [
      'Unlocks hanging items on walls from the back.',
      'More precise furniture placement.',
      'Can use with accent walls.',
    ],
    isOptional: true,
  },
  {
    id: 'hhp-polishing',
    title: 'Unlock Polishing Effects',
    description: 'Add special effects to furniture with polishing.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-pro-decorating-license'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 4 },
    ],
    tips: [
      'Effects include sparkles, butterflies, petals, and more.',
      'Use the polish feature while decorating.',
      'Different effects unlock over time.',
    ],
    isOptional: true,
  },
  {
    id: 'hhp-school-facility',
    title: 'Unlock the School Facility',
    description: 'Build and design a school for the archipelago.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-polishing'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 6 },
    ],
    tips: [
      'The school is your first facility project.',
      'Assign up to 5 villagers as students/teachers.',
      'Unlock school-themed furniture.',
    ],
    isOptional: true,
  },

  // Mid Progression (7-12 homes)
  {
    id: 'hhp-amiibo-scanner',
    title: 'Unlock amiibo Scanner',
    description: 'Use amiibo cards to invite specific villagers.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-school-facility'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 7 },
    ],
    tips: [
      'Scan any Animal Crossing amiibo card.',
      'Design homes for your favorite villagers.',
      'Also works with special character amiibo.',
    ],
    isOptional: true,
  },
  {
    id: 'hhp-partition-walls',
    title: 'Unlock Partition Walls',
    description: 'Divide rooms with customizable partition walls.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-amiibo-scanner'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 8 },
    ],
    tips: [
      'Create separate areas within a room.',
      'Partitions can be customized with different styles.',
      'Great for creating cozy spaces.',
    ],
    isOptional: true,
  },
  {
    id: 'hhp-cafe-facility',
    title: 'Unlock the Cafe Facility',
    description: 'Build and design a cafe for the archipelago.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-partition-walls'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 12 },
    ],
    tips: [
      'Assign villagers to work at the cafe.',
      'Customize the interior and exterior.',
      'Villagers will hang out there!',
    ],
    isOptional: true,
  },

  // Advanced Features (13-20 homes)
  {
    id: 'hhp-counters-pillars',
    title: 'Unlock Counters & Pillars',
    description: 'Use counters and pillars for advanced interior design.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-cafe-facility'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 15 },
    ],
    tips: [
      'Counters work like tables but look built-in.',
      'Pillars add architectural detail.',
      'Both can be customized with patterns.',
    ],
    isOptional: true,
  },
  {
    id: 'hhp-soundscapes',
    title: 'Unlock Soundscapes',
    description: 'Add ambient sounds to vacation homes.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-counters-pillars'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 17 },
    ],
    tips: [
      'Choose background audio for each room.',
      'Options include nature sounds, music, and more.',
      'Really enhances the atmosphere!',
    ],
    isOptional: true,
  },
  {
    id: 'hhp-restaurant-facility',
    title: 'Unlock the Restaurant Facility',
    description: 'Build and design a restaurant for the archipelago.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-soundscapes'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 20 },
    ],
    tips: [
      'Assign villagers to work at the restaurant.',
      'Different from the cafe - more formal.',
      'Great for dinner party themes.',
    ],
    isOptional: true,
  },

  // Late Progression (21-30 homes)
  {
    id: 'hhp-lighting-effects',
    title: 'Unlock Advanced Lighting',
    description: 'Control room lighting and add dramatic effects.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-restaurant-facility'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 23 },
    ],
    tips: [
      'Adjust brightness and color of room lighting.',
      'Create moody or bright atmospheres.',
      'Works with the time of day setting.',
    ],
    isOptional: true,
  },
  {
    id: 'hhp-hospital-facility',
    title: 'Unlock the Hospital Facility',
    description: 'Build and design a hospital for the archipelago.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-lighting-effects'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 25 },
    ],
    tips: [
      'Assign villagers as doctors and patients.',
      'Unlock medical-themed furniture.',
      'Fun for roleplay scenarios!',
    ],
    isOptional: true,
  },
  {
    id: 'hhp-room-size',
    title: 'Unlock Room Size Adjustment',
    description: 'Change the size of rooms in vacation homes.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-hospital-facility'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 28 },
    ],
    tips: [
      'Make rooms bigger or smaller.',
      'Affects the layout significantly.',
      'Great for specific design visions.',
    ],
    isOptional: true,
  },

  // Full Catalog & Mastery (30+ homes)
  {
    id: 'hhp-full-catalog',
    title: 'Unlock Full Furniture Catalog',
    description: 'Access every furniture item when designing.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-room-size'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 30 },
    ],
    tips: [
      'No more furniture limitations!',
      'Access items you haven\'t collected yet.',
      'This is the ultimate design freedom.',
    ],
    isOptional: true,
  },
  {
    id: 'hhp-apparel-shop',
    title: 'Open the Apparel Shop',
    description: 'Unlock a clothing shop on the archipelago.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-full-catalog'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 33 },
    ],
    tips: [
      'Buy exclusive HHP clothing.',
      'Dress up before visiting clients.',
      'New items rotate regularly.',
    ],
    isOptional: true,
  },
  {
    id: 'hhp-villager-renovations',
    title: 'Unlock Villager Home Renovations',
    description: 'Redesign villager homes on your own island!',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-apparel-shop'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 35 },
    ],
    tips: [
      'Talk to villagers at home to offer renovations.',
      'Use all your HHP skills on your island.',
      'Finally fix those ugly starter homes!',
    ],
    isOptional: true,
  },
  {
    id: 'hhp-bring-features-home',
    title: 'Bring HHP Features to Your Island',
    description: 'Use polishing, partition walls, and more on your own island.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-villager-renovations'],
    requirements: [
      { type: 'action', name: 'Use HHP features in your own home' },
    ],
    tips: [
      'Polishing works in your own home.',
      'Partition walls can be used on your island.',
      'Soundscapes can be added to your rooms.',
      'Counter and pillar placement works at home too.',
    ],
    isOptional: true,
  },

  // Roommate & DJ Features
  {
    id: 'hhp-roommates',
    title: 'Unlock Roommate Feature',
    description: 'Assign two villagers to share a vacation home.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-first-home'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 5 },
    ],
    tips: [
      'Pair villagers who get along.',
      'Both contribute to the design theme.',
      'Great for creating shared spaces.',
    ],
    isOptional: true,
  },
  {
    id: 'hhp-dj-kk',
    title: 'Unlock DJ K.K.',
    description: 'DJ K.K. arrives to perform at the archipelago.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-cafe-facility'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 14 },
    ],
    tips: [
      'DJ K.K. performs at the cafe.',
      'Plays special DJ remixes of songs.',
      'A fun addition to your work breaks!',
    ],
    isOptional: true,
  },

  // Additional Unlocks
  {
    id: 'hhp-poki-shop',
    title: 'Unlock Poki Exchange',
    description: 'Earn Poki currency for designing homes.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-first-home'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 2 },
    ],
    tips: [
      'Poki is earned for each completed home.',
      'Use Poki to buy items at the HHP shop.',
      'Items can be brought back to your island.',
    ],
    isOptional: true,
  },
  {
    id: 'hhp-souvenir-chocolates',
    title: 'Unlock Souvenir Chocolates',
    description: 'Receive chocolate gifts from happy clients.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-school-facility'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 10 },
    ],
    tips: [
      'Clients may gift you souvenir chocolates.',
      'These are special decorative items.',
      'Collect them all!',
    ],
    isOptional: true,
  },
  {
    id: 'hhp-niko-ladder',
    title: 'Unlock Permanent Ladder (Niko)',
    description: 'Niko teaches you to craft a permanent ladder.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-cafe-facility'],
    requirements: [
      { type: 'action', name: 'Complete DIY tasks with Niko' },
      { type: 'action', name: 'Learn the wooden ladder set-up kit recipe' },
    ],
    tips: [
      'Talk to Niko in the staff room.',
      'He gives you materials to gather.',
      'Creates placeable ladders on your island!',
    ],
    isOptional: true,
  },
  {
    id: 'hhp-niko-vines',
    title: 'Unlock Vine Climbing Recipes',
    description: 'Learn to craft vine items from Niko.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-niko-ladder'],
    requirements: [
      { type: 'action', name: 'Complete more DIY tasks with Niko' },
    ],
    tips: [
      'Vines can be found on mystery islands.',
      'Craft decorative vine furniture.',
      'Glowing moss items too!',
    ],
    isOptional: true,
  },

  // Mastery Goals
  {
    id: 'hhp-30-homes',
    title: 'Design 30 Vacation Homes',
    description: 'Complete 30 vacation home designs.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-first-home'],
    requirements: [
      { type: 'vacation-homes', name: 'Vacation homes designed', quantity: 30 },
    ],
    tips: [
      'Major milestone for unlocking everything.',
      'You\'re a master designer now!',
      'Keep going for more rewards.',
    ],
    isOptional: true,
  },
  {
    id: 'hhp-all-facilities',
    title: 'Build All Facilities',
    description: 'Complete the school, cafe, restaurant, and hospital.',
    category: 'dlc',
    phase: 7,
    prerequisites: ['hhp-school-facility', 'hhp-cafe-facility', 'hhp-restaurant-facility', 'hhp-hospital-facility'],
    requirements: [
      { type: 'action', name: 'Design all four facility types' },
    ],
    tips: [
      'Each facility has unique furniture unlocks.',
      'Villagers will use these facilities.',
      'You can redesign them anytime.',
    ],
    isOptional: true,
  },
];

// Combine all Phase 7 milestones
export const phase7Milestones: Milestone[] = [
  ...update2_0Milestones,
  ...hhpMilestones,
];
