import type { Milestone } from '@/types/milestone';

export const phase2Milestones: Milestone[] = [
  {
    id: 'upgrade-to-house',
    title: 'Upgrade Tent to House',
    description: 'Pay off your Nook Miles debt and upgrade your tent to a proper house.',
    category: 'house',
    phase: 2,
    prerequisites: ['unlock-nook-miles'],
    requirements: [
      { type: 'currency', name: 'Bells', quantity: 98000 },
      { type: 'action', name: 'Talk to Tom Nook about your home' },
    ],
    tips: [
      'Your house upgrade happens overnight after paying.',
      'You\'ll have access to storage (80 slots initially).',
      'Sell items at Nook\'s Cranny for better prices than the drop box.',
    ],
    commonIssues: [
      {
        symptom: 'Tom Nook won\'t offer house upgrade',
        cause: 'Haven\'t paid off the initial 5,000 Nook Miles',
        solution: 'Pay off the miles debt first, then talk to Tom Nook about "What should I do?"',
      },
    ],
    isOptional: false,
  },
  {
    id: 'donate-15-items',
    title: 'Donate 15 Items to Blathers',
    description: 'Help Blathers gather enough specimens to justify a real museum.',
    category: 'main-story',
    phase: 2,
    prerequisites: ['meet-blathers'],
    requirements: [
      { type: 'creature', name: 'Fish, bugs, or fossils', quantity: 15 },
    ],
    tips: [
      'Fossils count! Dig up the star-shaped cracks and get them assessed.',
      'Night creatures are different from day creatures.',
      'Visit mystery islands with Nook Miles Tickets for more creatures.',
    ],
    isOptional: false,
  },
  {
    id: 'museum-construction',
    title: 'Museum Under Construction',
    description: 'The museum begins construction after donating 15 items.',
    category: 'buildings',
    phase: 2,
    prerequisites: ['donate-15-items'],
    requirements: [
      { type: 'time', name: 'Wait one day' },
    ],
    tips: [
      'Blathers won\'t be available during construction.',
      'Save up donations for when he returns.',
      'The museum opens the day after construction begins.',
    ],
    isOptional: false,
  },
  {
    id: 'museum-opens',
    title: 'Museum Opens',
    description: 'The full museum is now open! Explore all the exhibits.',
    category: 'buildings',
    phase: 2,
    prerequisites: ['museum-construction'],
    requirements: [
      { type: 'time', name: 'Wait for construction to finish' },
    ],
    tips: [
      'The museum has sections for fish, bugs, fossils, and later art.',
      'Donated creatures appear in the exhibits - watch them!',
      'Blathers is now available 24/7 for donations and assessments.',
    ],
    isOptional: false,
  },
  {
    id: 'meet-mabel',
    title: 'Meet Mabel',
    description: 'Mabel the hedgehog visits your island to sell clothes.',
    category: 'main-story',
    phase: 2,
    prerequisites: ['upgrade-to-house'],
    requirements: [
      { type: 'action', name: 'Find Mabel in the plaza' },
      { type: 'currency', name: 'Purchase from Mabel', quantity: 5000, description: 'Buy at least 5,000 bells worth of items across her visits' },
    ],
    tips: [
      'Mabel appears randomly in the plaza.',
      'Buy something each time she visits to unlock the Able Sisters shop.',
      'She sells different items each visit.',
    ],
    isOptional: true,
  },
  {
    id: 'nooks-cranny-request',
    title: 'Receive Nook\'s Cranny Request',
    description: 'Timmy asks you to help build a proper shop.',
    category: 'buildings',
    phase: 2,
    prerequisites: ['upgrade-to-house'],
    requirements: [
      { type: 'action', name: 'Talk to Timmy in Resident Services' },
    ],
    tips: [
      'This triggers after your house upgrade.',
      'You\'ll need to gather materials for the shop.',
    ],
    commonIssues: [
      {
        symptom: 'Timmy won\'t ask about the shop',
        cause: 'Haven\'t upgraded from tent to house yet',
        solution: 'Pay off your tent loan and upgrade to a house first.',
      },
    ],
    isOptional: false,
  },
  {
    id: 'gather-nooks-materials',
    title: 'Gather Materials for Nook\'s Cranny',
    description: 'Collect the materials Timmy needs to build the shop.',
    category: 'buildings',
    phase: 2,
    prerequisites: ['nooks-cranny-request'],
    requirements: [
      { type: 'item', name: 'Wood', quantity: 30 },
      { type: 'item', name: 'Softwood', quantity: 30 },
      { type: 'item', name: 'Hardwood', quantity: 30 },
      { type: 'item', name: 'Iron nugget', quantity: 30 },
    ],
    tips: [
      'Iron nuggets come from hitting rocks with a shovel or axe.',
      'Each rock gives up to 8 items per day - dig holes behind you to prevent knockback!',
      'Visit mystery islands for more rocks and trees.',
      'You can get wood from trees on mystery islands too.',
    ],
    commonIssues: [
      {
        symptom: 'Can\'t find enough iron nuggets',
        cause: 'Only hitting your island\'s rocks',
        solution: 'Use Nook Miles Tickets to visit mystery islands - each island has rocks with materials.',
      },
      {
        symptom: 'Only getting 1-3 items from rocks',
        cause: 'Being knocked back between hits',
        solution: 'Dig 2-3 holes behind yourself before hitting the rock to prevent knockback.',
      },
    ],
    isOptional: false,
  },
  {
    id: 'place-nooks-cranny',
    title: 'Place Nook\'s Cranny Location',
    description: 'Choose where to build the shop and place the construction kit.',
    category: 'buildings',
    phase: 2,
    prerequisites: ['gather-nooks-materials'],
    requirements: [
      { type: 'action', name: 'Receive construction kit from Timmy' },
      { type: 'action', name: 'Place the kit on your island' },
    ],
    tips: [
      'The shop cannot be moved for free, so choose carefully.',
      'Consider placing it near Resident Services for convenience.',
      'Construction takes one day.',
    ],
    isOptional: false,
  },
  {
    id: 'nooks-cranny-opens',
    title: 'Nook\'s Cranny Opens',
    description: 'The shop is complete! Now you can buy and sell items more easily.',
    category: 'buildings',
    phase: 2,
    prerequisites: ['place-nooks-cranny'],
    requirements: [
      { type: 'time', name: 'Wait one day for construction' },
    ],
    tips: [
      'The shop is open 8 AM - 10 PM.',
      'The drop-off box is available 24/7 but pays 20% less.',
      'Check the cabinet for DIY recipes, tools, and more.',
      'The "hot item" of the day sells for double!',
    ],
    isOptional: false,
  },
  {
    id: 'buy-wet-suit',
    title: 'Buy a Wet Suit',
    description: 'Purchase a wet suit to swim in the ocean.',
    category: 'tools',
    phase: 2,
    prerequisites: ['nooks-cranny-opens'],
    requirements: [
      { type: 'currency', name: 'Bells', quantity: 3000 },
    ],
    tips: [
      'Check Nook\'s Cranny cabinet for the wet suit.',
      'You can also order one from the Nook Shopping app.',
      'Swimming lets you catch sea creatures for the museum.',
    ],
    isOptional: true,
  },
  {
    id: 'first-bridge-unlock',
    title: 'Tom Nook Mentions Bridges',
    description: 'After Nook\'s Cranny opens, Tom Nook starts talking about island development.',
    category: 'main-story',
    phase: 2,
    prerequisites: ['nooks-cranny-opens'],
    requirements: [
      { type: 'action', name: 'Talk to Tom Nook about "What should I do?"' },
    ],
    tips: [
      'This unlocks the next phase of island development.',
      'Tom Nook will discuss inviting more villagers.',
    ],
    isOptional: false,
  },
];
