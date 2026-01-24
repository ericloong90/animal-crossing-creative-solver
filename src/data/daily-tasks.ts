import type { DailyTask } from '@/types/daily-checklist';

export const DAILY_TASKS: DailyTask[] = [
  // Essential tasks
  {
    id: 'check-mail',
    name: 'Check Mailbox',
    description: 'Check your mailbox for letters, gifts, and ordered items',
    category: 'essential',
    icon: 'Mail',
    tips: ['Mom sends letters with gifts on certain dates', 'Ordered items arrive the next day'],
    isDefault: true,
  },
  {
    id: 'check-nook-shopping',
    name: 'Check Nook Shopping',
    description: 'Browse daily items in Nook Shopping terminal or app',
    category: 'essential',
    icon: 'ShoppingBag',
    tips: ['Special seasonal items appear here', 'Catalog items you want to buy later'],
    isDefault: true,
  },
  {
    id: 'check-visitors',
    name: 'Check for Visitors',
    description: 'Look for special visitors like Celeste, Redd, Flick, CJ, etc.',
    category: 'essential',
    icon: 'Users',
    tips: ['Visitors can appear anywhere on your island', 'Check the beach for Gulliver/Gullivarrr'],
    isDefault: true,
  },
  {
    id: 'check-recycling',
    name: 'Check Recycling Box',
    description: 'Check the recycling box in Resident Services for free items',
    category: 'essential',
    icon: 'Trash2',
    tips: ['Villagers sometimes leave furniture here', 'Items from moved-out villagers appear here'],
    isDefault: true,
  },

  // Income tasks
  {
    id: 'money-rock',
    name: 'Hit Money Rock',
    description: 'Find and hit the money rock for up to 16,100 bells',
    category: 'income',
    icon: 'Gem',
    tips: [
      'Dig holes behind you to prevent knockback',
      'Hit quickly to get all 8 bell bags',
      'Only one rock spawns bells each day',
    ],
    isDefault: true,
  },
  {
    id: 'money-tree',
    name: 'Plant Money Tree',
    description: 'Find the glowing spot and bury bells to grow a money tree',
    category: 'income',
    icon: 'TreeDeciduous',
    tips: [
      'Bury 10,000 bells for guaranteed 30,000 return',
      'Burying more has a 70% chance of only returning 30,000',
    ],
    isDefault: true,
  },
  {
    id: 'sell-turnips',
    name: 'Check Turnip Prices',
    description: 'Check morning and afternoon turnip prices at Nook\'s Cranny',
    category: 'income',
    icon: 'TrendingUp',
    tips: ['Prices change at noon', 'Track patterns to predict spikes'],
    isDefault: false,
  },
  {
    id: 'shake-trees',
    name: 'Shake Trees',
    description: 'Shake non-fruit trees for furniture, bells, and wasps',
    category: 'income',
    icon: 'TreeDeciduous',
    tips: [
      '2 furniture items drop daily from non-fruit trees',
      '5 wasp nests drop daily',
      'Hold net while shaking to catch wasps',
    ],
    isDefault: true,
  },
  {
    id: 'sell-hot-item',
    name: 'Craft Hot Item',
    description: 'Craft and sell the daily hot item for 2x bells',
    category: 'income',
    icon: 'Flame',
    tips: ['Check Nook\'s Cranny sign for the hot item', 'Stock up materials for profitable items'],
    isDefault: false,
  },

  // Progression tasks
  {
    id: 'fossil-hunt',
    name: 'Dig Up Fossils',
    description: 'Find and dig up 4-6 fossils around your island',
    category: 'progression',
    icon: 'Bone',
    tips: [
      '4 fossils spawn daily on your island',
      'Get them assessed at the museum',
      'Donate new ones, sell duplicates',
    ],
    isDefault: true,
  },
  {
    id: 'message-bottle',
    name: 'Find Message Bottle',
    description: 'Look for a message bottle on the beach with a DIY recipe',
    category: 'progression',
    icon: 'Scroll',
    tips: ['One spawns each day on a random beach spot', 'Check all beaches thoroughly'],
    isDefault: true,
  },
  {
    id: 'talk-villagers',
    name: 'Talk to Villagers',
    description: 'Talk to all your villagers to build friendship',
    category: 'social',
    icon: 'MessageCircle',
    tips: [
      'Villagers may give you DIY recipes or gifts',
      'Crafting villagers will share their recipe',
    ],
    isDefault: true,
  },
  {
    id: 'give-gifts',
    name: 'Give Villager Gifts',
    description: 'Give wrapped gifts to villagers for friendship points',
    category: 'social',
    icon: 'Gift',
    tips: [
      'Wrapped gifts give bonus friendship',
      'Fossils worth 2,500+ bells are good generic gifts',
      'Iron wall lamps are great gifts (2x1 iron nuggets)',
    ],
    isDefault: false,
  },
  {
    id: 'check-crafting',
    name: 'Check Crafting Villagers',
    description: 'Visit villagers who are crafting to learn new DIY recipes',
    category: 'progression',
    icon: 'Hammer',
    tips: [
      '3 villagers craft throughout the day',
      'Morning, afternoon, and evening crafting sessions',
    ],
    isDefault: true,
  },
  {
    id: 'nook-miles',
    name: 'Complete Nook Miles+',
    description: 'Complete daily Nook Miles+ tasks for bonus miles',
    category: 'progression',
    icon: 'Award',
    tips: ['Tasks refresh as you complete them', 'First 5 daily tasks give 2x miles'],
    isDefault: true,
  },

  // Collection tasks
  {
    id: 'catch-bugs',
    name: 'Catch New Bugs',
    description: 'Catch bugs to donate to the museum or sell',
    category: 'collection',
    icon: 'Bug',
    tips: ['Some bugs only appear at certain times', 'Check trees, flowers, and stumps'],
    isDefault: false,
  },
  {
    id: 'catch-fish',
    name: 'Catch New Fish',
    description: 'Fish in rivers, ponds, and ocean for new species',
    category: 'collection',
    icon: 'Fish',
    tips: ['Fish sizes vary by shadow', 'Pier-only fish need a specific spot'],
    isDefault: false,
  },
  {
    id: 'dive-creatures',
    name: 'Dive for Sea Creatures',
    description: 'Swim and dive to catch sea creatures',
    category: 'collection',
    icon: 'Waves',
    tips: ['Fast creatures need corner trapping', 'Pascal may appear when catching scallops'],
    isDefault: false,
  },
  {
    id: 'water-flowers',
    name: 'Water Flowers',
    description: 'Water your flowers to encourage breeding',
    category: 'collection',
    icon: 'Droplets',
    tips: ['Watered flowers have a sparkle effect', 'More visitors watering = higher breed chance'],
    isDefault: false,
  },
  {
    id: 'harvest-crops',
    name: 'Harvest Crops',
    description: 'Harvest and replant your vegetable crops',
    category: 'collection',
    icon: 'Carrot',
    tips: ['Crops regrow after 2 days if watered', 'Great for cooking recipes'],
    isDefault: false,
  },

  // Seasonal tasks
  {
    id: 'collect-seasonal',
    name: 'Collect Seasonal Materials',
    description: 'Gather seasonal crafting materials (cherry blossoms, mushrooms, etc.)',
    category: 'seasonal',
    icon: 'Leaf',
    tips: ['Seasonal items are only available for limited time', 'Stock up while you can'],
    isDefault: false,
  },
  {
    id: 'shoot-balloons',
    name: 'Pop Balloon Presents',
    description: 'Shoot down balloon presents with a slingshot',
    category: 'seasonal',
    icon: 'Target',
    tips: [
      'Balloons spawn every 5 minutes ending in 4 or 9',
      'Listen for the wind sound',
      'Seasonal DIYs come from balloons',
    ],
    isDefault: true,
  },
  {
    id: 'check-beach',
    name: 'Check Beach for Special Items',
    description: 'Look for shells, DIY bottles, and Gulliver/Gullivarrr',
    category: 'seasonal',
    icon: 'Shell',
    tips: ['Summer shells appear June-August (Northern)', 'Check for communicator parts if Gulliver is present'],
    isDefault: false,
  },
  {
    id: 'visit-mystery-island',
    name: 'Visit Mystery Island',
    description: 'Use a Nook Miles Ticket to visit a mystery island',
    category: 'progression',
    icon: 'Plane',
    tips: ['Great for finding new villagers', 'Farm resources and new fruits'],
    isDefault: false,
  },
  {
    id: 'kappn-island',
    name: 'Visit Kapp\'n Island',
    description: 'Take Kapp\'n\'s boat tour to a mysterious island (1,000 miles)',
    category: 'progression',
    icon: 'Anchor',
    tips: [
      'Once per day boat ride',
      'Can find rare seasonal items and star fragments',
      'Different weather and time of day possible',
    ],
    isDefault: false,
  },
];

// Get tasks that should be enabled by default
export function getDefaultEnabledTasks(): string[] {
  return DAILY_TASKS.filter((task) => task.isDefault).map((task) => task.id);
}

// Get task by ID
export function getTaskById(id: string): DailyTask | undefined {
  return DAILY_TASKS.find((task) => task.id === id);
}

// Get tasks grouped by category
export function getTasksByCategory(): Map<string, DailyTask[]> {
  const grouped = new Map<string, DailyTask[]>();
  for (const task of DAILY_TASKS) {
    const existing = grouped.get(task.category) || [];
    grouped.set(task.category, [...existing, task]);
  }
  return grouped;
}
