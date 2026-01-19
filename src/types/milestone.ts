export type MilestoneCategory =
  | 'main-story'
  | 'buildings'
  | 'house'
  | 'tools'
  | 'villagers'
  | 'island-rating';

export type Phase = 1 | 2 | 3 | 4 | 5 | 6;

export interface Requirement {
  type: 'item' | 'currency' | 'action' | 'creature' | 'time';
  name: string;
  quantity?: number;
  description?: string;
}

export interface CommonIssue {
  symptom: string;
  cause: string;
  solution: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  category: MilestoneCategory;
  phase: Phase;
  prerequisites: string[];
  requirements: Requirement[];
  tips: string[];
  commonIssues?: CommonIssue[];
  isOptional: boolean;
}

export interface ProgressState {
  completedMilestones: string[];
  lastUpdated: string;
}

export interface MilestoneStatus {
  milestone: Milestone;
  isCompleted: boolean;
  isAvailable: boolean;
  missingPrerequisites: string[];
}

export const PHASE_INFO: Record<Phase, { name: string; days: string; description: string }> = {
  1: { name: 'Island Arrival', days: '1-2', description: 'Set up your tent and get started' },
  2: { name: 'Early Development', days: '3-5', description: 'Build your house and Nook\'s Cranny' },
  3: { name: 'Expansion', days: '5-8', description: 'Welcome new villagers and build bridges' },
  4: { name: 'Town Hall', days: '8-12', description: 'Upgrade Resident Services and meet Isabelle' },
  5: { name: 'Island Designer', days: '12-30+', description: 'Reach 3 stars and unlock terraforming' },
  6: { name: 'Late Game', days: 'Ongoing', description: 'Unlock all shops and complete your island' },
};

export const CATEGORY_INFO: Record<MilestoneCategory, { name: string; icon: string; color: string }> = {
  'main-story': { name: 'Main Story', icon: 'BookOpen', color: 'amber' },
  'buildings': { name: 'Buildings', icon: 'Building2', color: 'orange' },
  'house': { name: 'House', icon: 'Home', color: 'blue' },
  'tools': { name: 'Tools & DIY', icon: 'Hammer', color: 'gray' },
  'villagers': { name: 'Villagers', icon: 'Users', color: 'pink' },
  'island-rating': { name: 'Island Rating', icon: 'Star', color: 'yellow' },
};
