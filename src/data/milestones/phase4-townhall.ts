import type { Milestone } from '@/types/milestone';

export const phase4Milestones: Milestone[] = [
  {
    id: 'resident-services-upgrade-announced',
    title: 'Resident Services Upgrade Announced',
    description: 'Tom Nook announces that Resident Services will be upgraded to a proper building.',
    category: 'buildings',
    phase: 4,
    prerequisites: ['report-to-nook-plots-done', 'villager-5-moves-in'],
    requirements: [
      { type: 'action', name: 'Talk to Tom Nook' },
    ],
    tips: [
      'The upgrade is automatic once you have 5 villagers and completed plots.',
      'Resident Services will be closed during construction.',
    ],
    commonIssues: [
      {
        symptom: 'Tom Nook won\'t mention the upgrade',
        cause: 'Not all villagers have moved in yet',
        solution: 'Wait for all 5 villagers to actually move into their houses - one moves in per day.',
      },
    ],
    isOptional: false,
  },
  {
    id: 'resident-services-construction',
    title: 'Resident Services Under Construction',
    description: 'The tent is being replaced with a proper town hall.',
    category: 'buildings',
    phase: 4,
    prerequisites: ['resident-services-upgrade-announced'],
    requirements: [
      { type: 'time', name: 'Wait one day' },
    ],
    tips: [
      'You cannot access the ABD or talk to Tom Nook during construction.',
      'The drop box at Nook\'s Cranny still works.',
      'Use this day to gather resources and catch creatures.',
    ],
    isOptional: false,
  },
  {
    id: 'resident-services-opens',
    title: 'New Resident Services Opens',
    description: 'The upgraded Resident Services building is now open!',
    category: 'buildings',
    phase: 4,
    prerequisites: ['resident-services-construction'],
    requirements: [
      { type: 'time', name: 'Construction complete' },
    ],
    tips: [
      'You now have a permanent ABD machine inside.',
      'Island evaluations are now available.',
      'Tom Nook offers new development options.',
    ],
    isOptional: false,
  },
  {
    id: 'meet-isabelle',
    title: 'Meet Isabelle',
    description: 'Isabelle joins your island as the new assistant!',
    category: 'main-story',
    phase: 4,
    prerequisites: ['resident-services-opens'],
    requirements: [
      { type: 'action', name: 'Visit the new Resident Services' },
    ],
    tips: [
      'Isabelle handles island evaluations and announcements.',
      'She can also change your island tune and flag.',
      'Talk to her about island evals to track your rating.',
    ],
    isOptional: false,
  },
  {
    id: 'first-island-evaluation',
    title: 'Get Your First Island Evaluation',
    description: 'Ask Isabelle to evaluate your island\'s appeal.',
    category: 'island-rating',
    phase: 4,
    prerequisites: ['meet-isabelle'],
    requirements: [
      { type: 'action', name: 'Talk to Isabelle about island evals' },
    ],
    tips: [
      'Your goal is to reach 3 stars to unlock Island Designer.',
      'Isabelle gives hints about what to improve.',
      'Development items (fences, furniture) and nature both count.',
    ],
    isOptional: false,
  },
  {
    id: 'campsite-kit-received',
    title: 'Receive Campsite Kit',
    description: 'Tom Nook provides a kit to build a campsite for visitors.',
    category: 'buildings',
    phase: 4,
    prerequisites: ['meet-isabelle'],
    requirements: [
      { type: 'action', name: 'Talk to Tom Nook about "What should I do?"' },
    ],
    tips: [
      'The campsite is required to progress.',
      'Visiting campers can be invited to live on your island.',
    ],
    commonIssues: [
      {
        symptom: 'Tom Nook won\'t give campsite kit',
        cause: 'Haven\'t talked to him after Resident Services upgrade',
        solution: 'Make sure to visit the new Resident Services and talk to Tom Nook specifically.',
      },
    ],
    isOptional: false,
  },
  {
    id: 'place-campsite',
    title: 'Place the Campsite',
    description: 'Choose a location for your island\'s campsite.',
    category: 'buildings',
    phase: 4,
    prerequisites: ['campsite-kit-received'],
    requirements: [
      { type: 'action', name: 'Place campsite kit' },
    ],
    tips: [
      'The campsite takes up a 4x4 space.',
      'Place it somewhere scenic for visitors!',
      'Construction takes one day.',
    ],
    isOptional: false,
  },
  {
    id: 'campsite-opens',
    title: 'Campsite Opens',
    description: 'Your campsite is ready for visitors!',
    category: 'buildings',
    phase: 4,
    prerequisites: ['place-campsite'],
    requirements: [
      { type: 'time', name: 'Wait one day' },
    ],
    tips: [
      'A special villager will visit soon.',
      'You must invite this first camper to continue.',
    ],
    isOptional: false,
  },
  {
    id: 'first-camper-visits',
    title: 'First Campsite Visitor',
    description: 'A villager is camping at your campsite!',
    category: 'villagers',
    phase: 4,
    prerequisites: ['campsite-opens'],
    requirements: [
      { type: 'time', name: 'Wait for camper (1-3 days)' },
    ],
    tips: [
      'This first camper must be invited - you cannot refuse.',
      'They will always be a smug personality type.',
      'Talk to them multiple times to convince them to move in.',
    ],
    commonIssues: [
      {
        symptom: 'Camper keeps saying no',
        cause: 'Need to talk to them multiple times',
        solution: 'Keep talking! They\'ll eventually agree. Sometimes you need to win a card game.',
      },
    ],
    isOptional: false,
  },
  {
    id: 'villager-6-moves-in',
    title: 'Villager #6 Moves In',
    description: 'Your first camper has moved to the island!',
    category: 'villagers',
    phase: 4,
    prerequisites: ['first-camper-visits'],
    requirements: [
      { type: 'action', name: 'Invite the camper' },
      { type: 'time', name: 'Wait for move-in' },
    ],
    tips: [
      'Tom Nook will provide a plot for this villager.',
      'You can now sell plots to get more villagers.',
      'Use Nook Miles Tickets to find villagers on mystery islands.',
    ],
    isOptional: false,
  },
  {
    id: 'unlock-land-sales',
    title: 'Unlock Land Sales',
    description: 'You can now sell plots of land for more villagers!',
    category: 'villagers',
    phase: 4,
    prerequisites: ['villager-6-moves-in'],
    requirements: [
      { type: 'action', name: 'Talk to Tom Nook about infrastructure' },
    ],
    tips: [
      'Each plot costs 10,000 bells.',
      'After placing a plot, you have until 5 AM to find a villager.',
      'If you don\'t invite someone, a random villager moves in.',
    ],
    isOptional: false,
  },
  {
    id: 'unlock-infrastructure',
    title: 'Unlock Infrastructure Options',
    description: 'Tom Nook now offers bridges and inclines for bells.',
    category: 'buildings',
    phase: 4,
    prerequisites: ['meet-isabelle'],
    requirements: [
      { type: 'action', name: 'Talk to Tom Nook about infrastructure' },
    ],
    tips: [
      'Bridges and inclines range from 98,000 to 228,000 bells.',
      'You can only build one at a time.',
      'Villagers can contribute to construction via the donation gyroid.',
    ],
    isOptional: false,
  },
  {
    id: 'build-incline',
    title: 'Build an Incline',
    description: 'Construct a permanent way to access cliffs.',
    category: 'buildings',
    phase: 4,
    prerequisites: ['unlock-infrastructure'],
    requirements: [
      { type: 'currency', name: 'Bells', quantity: 98000, description: 'Minimum for wooden incline' },
    ],
    tips: [
      'Inclines provide permanent cliff access - no more ladders needed!',
      'Choose a style that matches your island theme.',
      'Consider placement carefully - moving costs bells.',
    ],
    isOptional: true,
  },
];
