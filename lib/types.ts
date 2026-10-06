export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
  available: boolean;
  ingredients?: string[];
};

export type MenuCategory = {
  id: string;
  name: string;
  icon: string;
};

export type Reel = {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl?: string;
  views: string;
  likes: string;
  category: string;
  date: string;
  description: string;
};

export type StoryCategory = {
  id: string;
  name: string;
  image: string;
  icon: string;
};

export type EventItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  capacity: string;
  services: string[];
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
};

export type Reservation = {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
};
