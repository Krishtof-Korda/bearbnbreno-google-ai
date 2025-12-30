
export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface ItineraryResponse {
  title: string;
  days: {
    day: number;
    activity: string;
    highlights: string[];
  }[];
  tips: string[];
}
