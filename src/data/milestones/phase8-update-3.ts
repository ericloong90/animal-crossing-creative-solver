import type { Milestone } from '@/types/milestone';

// ==========================================
// 3.0 UPDATE MILESTONES (January 2026)
// Free update + Nintendo Switch 2 enhancements
// ==========================================

export const phase8Milestones: Milestone[] = [
  // Kapp'n's Resort Hotel
  {
    id: 'hotel-announcement',
    title: "Kapp'n's Hotel Announcement",
    description: "Kapp'n announces he's opening a resort hotel at your island's dock.",
    category: 'main-story',
    phase: 8,
    prerequisites: ['meet-kappn'],
    requirements: [
      { type: 'action', name: "Talk to Kapp'n after updating to version 3.0" },
    ],
    tips: [
      'The hotel is attached to your existing island dock.',
      "Kapp'n's entire family helps run the hotel.",
      'This is the flagship feature of the 3.0 update.',
    ],
    isOptional: false,
  },
  {
    id: 'hotel-opens',
    title: "Kapp'n's Resort Hotel Opens",
    description: 'The resort hotel is now open for guests!',
    category: 'buildings',
    phase: 8,
    prerequisites: ['hotel-announcement'],
    requirements: [
      { type: 'time', name: 'Wait for construction to complete' },
    ],
    tips: [
      'The hotel has multiple floors to explore.',
      'Find a store selling exclusive items inside.',
      'Mannequins let you dress up and try outfits.',
    ],
    isOptional: false,
  },
  {
    id: 'hotel-first-guest',
    title: 'Welcome Your First Hotel Guest',
    description: 'A villager or visitor checks into your resort hotel.',
    category: 'npcs',
    phase: 8,
    prerequisites: ['hotel-opens'],
    requirements: [
      { type: 'action', name: 'Have a guest check into the hotel' },
    ],
    tips: [
      'Guests can be villagers or special visitors.',
      "Check the hotel lobby to see who's staying.",
      'Guests may give you gifts or recipes.',
    ],
    isOptional: false,
  },
  {
    id: 'hotel-decorate-room',
    title: 'Decorate a Hotel Guest Room',
    description: "Use the front desk to customize a guest room's decor.",
    category: 'dlc',
    phase: 8,
    prerequisites: ['hotel-opens'],
    requirements: [
      { type: 'action', name: 'Access guest room decoration at the front desk' },
      { type: 'action', name: 'Complete a room design' },
    ],
    tips: [
      'Similar to Happy Home Paradise decorating.',
      'Different themes attract different guests.',
      'Your HHP skills carry over here!',
    ],
    isOptional: true,
  },
  {
    id: 'hotel-shop-purchase',
    title: 'Shop at the Hotel Store',
    description: "Buy exclusive items from the hotel's gift shop.",
    category: 'npcs',
    phase: 8,
    prerequisites: ['hotel-opens'],
    requirements: [
      { type: 'action', name: 'Purchase an item from the hotel store' },
    ],
    tips: [
      "Kapp'n's family members run the shop.",
      'Exclusive resort-themed items available.',
      'Inventory changes regularly.',
    ],
    isOptional: true,
  },
  {
    id: 'hotel-mannequin',
    title: 'Try the Hotel Mannequins',
    description: 'Use mannequins in the hotel to preview outfits.',
    category: 'npcs',
    phase: 8,
    prerequisites: ['hotel-opens'],
    requirements: [
      { type: 'action', name: 'Interact with a hotel mannequin' },
      { type: 'action', name: 'Try on an outfit combination' },
    ],
    tips: [
      'Great for planning outfit combinations.',
      'See how clothes look before buying.',
      'Save favorite outfits for later.',
    ],
    isOptional: true,
  },
  {
    id: 'meet-kappn-family',
    title: "Meet Kapp'n's Entire Family",
    description: "Interact with all of Kapp'n's family members at the hotel.",
    category: 'npcs',
    phase: 8,
    prerequisites: ['hotel-opens'],
    requirements: [
      { type: 'action', name: "Talk to Kapp'n's wife" },
      { type: 'action', name: "Talk to Kapp'n's daughter Leila" },
      { type: 'action', name: "Talk to Kapp'n's mother" },
    ],
    tips: [
      'Each family member has a role in the hotel.',
      "They share stories about Kapp'n.",
      'Building relationships unlocks dialogue.',
    ],
    isOptional: true,
  },

  // Resetti's Reset Service
  {
    id: 'meet-resetti',
    title: 'Meet Mr. Resetti',
    description: 'The famous mole returns to offer his Reset Service.',
    category: 'npcs',
    phase: 8,
    prerequisites: ['kk-concert'],
    requirements: [
      { type: 'action', name: 'Find Resetti on your island after updating' },
    ],
    tips: [
      'Resetti is a beloved series character returning.',
      'He no longer yells at you for resetting!',
      'Now he helps clean up your island instead.',
    ],
    isOptional: false,
  },
  {
    id: 'reset-service-unlock',
    title: 'Unlock the Reset Service',
    description: "Resetti explains his new Reset Service for island cleanup.",
    category: 'npcs',
    phase: 8,
    prerequisites: ['meet-resetti'],
    requirements: [
      { type: 'action', name: 'Listen to Resetti explain the Reset Service' },
    ],
    tips: [
      'The Reset Service helps clean specific areas.',
      'Great for undoing terraforming mistakes.',
      'Can remove placed items in bulk.',
    ],
    isOptional: false,
  },
  {
    id: 'first-reset-service',
    title: 'Use the Reset Service',
    description: 'Have Resetti clean up an area of your island.',
    category: 'npcs',
    phase: 8,
    prerequisites: ['reset-service-unlock'],
    requirements: [
      { type: 'action', name: 'Select an area to reset' },
      { type: 'action', name: 'Confirm the cleanup' },
    ],
    tips: [
      'Choose areas carefully - changes are permanent!',
      'Items are returned to your storage.',
      'Terraforming can be undone in the selected area.',
    ],
    isOptional: true,
  },

  // Expanded Storage
  {
    id: 'storage-upgrade-7000',
    title: 'Expand Storage to 7,000',
    description: 'Purchase the first new storage expansion.',
    category: 'house',
    phase: 8,
    prerequisites: ['home-storage-expansion'],
    requirements: [
      { type: 'currency', name: 'Bells', quantity: 700000, description: 'Storage upgrade cost' },
      { type: 'action', name: 'Talk to Tom Nook about storage' },
    ],
    tips: [
      'Requires the 5,000 storage upgrade first.',
      'Now you can store trees, shrubs, and flowers!',
      'Great for seasonal item hoarders.',
    ],
    isOptional: true,
  },
  {
    id: 'storage-upgrade-9000',
    title: 'Expand Storage to 9,000 (Maximum)',
    description: 'Purchase the final storage expansion.',
    category: 'house',
    phase: 8,
    prerequisites: ['storage-upgrade-7000'],
    requirements: [
      { type: 'currency', name: 'Bells', quantity: 900000, description: 'Final storage upgrade cost' },
      { type: 'action', name: 'Talk to Tom Nook about storage' },
    ],
    tips: [
      'Maximum possible storage in the game.',
      '9,000 items should be plenty!',
      'Trees and plants count toward storage now.',
    ],
    isOptional: true,
  },

  // Slumber Islands
  {
    id: 'slumber-islands-unlock',
    title: 'Unlock Slumber Islands',
    description: 'Learn about the new Slumber Islands feature.',
    category: 'main-story',
    phase: 8,
    prerequisites: ['kk-concert'],
    requirements: [
      { type: 'action', name: 'Requires Nintendo Switch Online membership' },
      { type: 'action', name: 'Access Slumber Islands from the menu' },
    ],
    tips: [
      'Design and save up to 3 dream islands.',
      'Play with friends online on your designs.',
      'Different from regular Dream Addresses.',
    ],
    isOptional: true,
  },
  {
    id: 'slumber-island-create',
    title: 'Create Your First Slumber Island',
    description: 'Design and save a Slumber Island.',
    category: 'main-story',
    phase: 8,
    prerequisites: ['slumber-islands-unlock'],
    requirements: [
      { type: 'action', name: 'Enter Slumber Island design mode' },
      { type: 'action', name: 'Save your island design' },
    ],
    tips: [
      'Start with a template or blank island.',
      'Use items from your catalog.',
      'Share with friends for online play.',
    ],
    isOptional: true,
  },
  {
    id: 'slumber-island-multiplayer',
    title: 'Play Slumber Island with Friends',
    description: 'Invite friends to play on your Slumber Island online.',
    category: 'villagers',
    phase: 8,
    prerequisites: ['slumber-island-create'],
    requirements: [
      { type: 'action', name: 'Host or join a Slumber Island session' },
      { type: 'action', name: 'Play with at least one friend' },
    ],
    tips: [
      'Great for mini-games and hangouts.',
      'Changes on Slumber Islands are temporary.',
      'Up to 12 players on Switch 2!',
    ],
    isOptional: true,
  },

  // Zelda Collaboration Villagers
  {
    id: 'zelda-villager-scan',
    title: 'Scan a Zelda amiibo',
    description: 'Use a Legend of Zelda amiibo to unlock special villagers.',
    category: 'villagers',
    phase: 8,
    prerequisites: ['kk-concert'],
    requirements: [
      { type: 'item', name: 'Compatible Zelda series amiibo' },
      { type: 'action', name: 'Scan the amiibo at the Nook Stop or campsite' },
    ],
    tips: [
      'Two new villagers based on Tears of the Kingdom characters.',
      'Requires physical or card amiibo.',
      'They have unique dialogue and homes.',
    ],
    isOptional: true,
  },
  {
    id: 'zelda-villager-invite',
    title: 'Invite a Zelda Villager',
    description: 'Have a Zelda collaboration villager move to your island.',
    category: 'villagers',
    phase: 8,
    prerequisites: ['zelda-villager-scan'],
    requirements: [
      { type: 'action', name: 'Have an open plot available' },
      { type: 'action', name: 'Invite the villager to move in' },
    ],
    tips: [
      'Their homes have Zelda-themed interiors.',
      'Unique catchphrases and personalities.',
      'Collect both collaboration villagers!',
    ],
    isOptional: true,
  },

  // Nintendo Switch 2 Exclusive Features
  {
    id: 'switch2-upgrade',
    title: 'Upgrade to Nintendo Switch 2 Edition',
    description: 'Purchase and activate the Switch 2 enhanced version.',
    category: 'main-story',
    phase: 8,
    prerequisites: ['kk-concert'],
    requirements: [
      { type: 'item', name: 'Nintendo Switch 2 console' },
      { type: 'currency', name: 'Upgrade cost', quantity: 499, description: '$4.99 upgrade fee' },
    ],
    tips: [
      '$4.99 upgrade for existing Switch 1 owners.',
      'Includes enhanced graphics and new features.',
      'Your save data transfers over.',
    ],
    isOptional: true,
  },
  {
    id: 'switch2-4k-mode',
    title: 'Experience 4K Resolution',
    description: 'Play in stunning 4K resolution on TV mode.',
    category: 'main-story',
    phase: 8,
    prerequisites: ['switch2-upgrade'],
    requirements: [
      { type: 'item', name: '4K TV or monitor' },
      { type: 'action', name: 'Play in TV mode' },
    ],
    tips: [
      '4K resolution in docked TV mode.',
      'Game still runs at 30fps but more stable.',
      'See your island in beautiful detail!',
    ],
    isOptional: true,
  },
  {
    id: 'switch2-mouse-controls',
    title: 'Try Mouse Controls',
    description: 'Use a mouse for precise decoration and terraforming.',
    category: 'tools',
    phase: 8,
    prerequisites: ['switch2-upgrade'],
    requirements: [
      { type: 'item', name: 'USB or Bluetooth mouse' },
      { type: 'action', name: 'Connect mouse and use in-game' },
    ],
    tips: [
      'Much easier furniture placement.',
      'Precise terraforming control.',
      'Great for detailed island design work.',
    ],
    isOptional: true,
  },
  {
    id: 'switch2-megaphone',
    title: 'Use the In-Game Megaphone',
    description: "Use your Switch 2's microphone to call villagers.",
    category: 'tools',
    phase: 8,
    prerequisites: ['switch2-upgrade'],
    requirements: [
      { type: 'action', name: "Speak a villager's name into the microphone" },
    ],
    tips: [
      "Call out a villager's name to find them.",
      "Uses Switch 2's built-in microphone.",
      'Nostalgic feature from earlier AC games!',
    ],
    isOptional: true,
  },
  {
    id: 'switch2-12-player',
    title: 'Host 12-Player Online Session',
    description: 'Play online with up to 12 friends simultaneously.',
    category: 'villagers',
    phase: 8,
    prerequisites: ['switch2-upgrade'],
    requirements: [
      { type: 'action', name: 'Host or join a 12-player session' },
      { type: 'action', name: 'Have 9+ players connected' },
    ],
    tips: [
      'Up from 8 players on original Switch.',
      'Great for big island parties!',
      'All players need Switch 2 for 12-player mode.',
    ],
    isOptional: true,
  },
  {
    id: 'switch2-cameraplay',
    title: 'Use CameraPlay Feature',
    description: 'Explore the new CameraPlay photography mode.',
    category: 'tools',
    phase: 8,
    prerequisites: ['switch2-upgrade'],
    requirements: [
      { type: 'action', name: 'Access CameraPlay from the NookPhone' },
      { type: 'action', name: 'Take a photo using CameraPlay' },
    ],
    tips: [
      'Enhanced camera controls and filters.',
      'New photo editing options.',
      'Share directly to social media.',
    ],
    isOptional: true,
  },

  // Completion Milestones
  {
    id: 'hotel-fully-decorated',
    title: 'Fully Decorate All Hotel Rooms',
    description: 'Complete the decoration of all guest rooms in the hotel.',
    category: 'dlc',
    phase: 8,
    prerequisites: ['hotel-decorate-room'],
    requirements: [
      { type: 'action', name: 'Decorate all available guest rooms' },
    ],
    tips: [
      'Each room can have a different theme.',
      'Attracts a variety of guests.',
      'Show off your interior design skills!',
    ],
    isOptional: true,
  },
  {
    id: 'all-slumber-islands',
    title: 'Create All 3 Slumber Islands',
    description: 'Design and save all three Slumber Island slots.',
    category: 'main-story',
    phase: 8,
    prerequisites: ['slumber-island-create'],
    requirements: [
      { type: 'action', name: 'Create and save 3 Slumber Islands' },
    ],
    tips: [
      'Try different themes for each island.',
      'Share codes with the community.',
      'Great for different types of mini-games.',
    ],
    isOptional: true,
  },
  {
    id: 'both-zelda-villagers',
    title: 'Collect Both Zelda Villagers',
    description: 'Have both Legend of Zelda collaboration villagers visit or live on your island.',
    category: 'villagers',
    phase: 8,
    prerequisites: ['zelda-villager-invite'],
    requirements: [
      { type: 'action', name: 'Scan and meet both Zelda villagers' },
    ],
    tips: [
      'Requires two different Zelda amiibo.',
      'They have unique interactions together.',
      'Complete your Zelda collection!',
    ],
    isOptional: true,
  },
];
