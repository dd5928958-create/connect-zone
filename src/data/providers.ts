export interface Provider {
  id: string;
  name: string;
  job: string;
  location: string;
  description: string;
  fullDescription: string;
  services: string[];
  phone: string;
  image: string;
  isCertified: boolean;
  isFeatured: boolean;
  isPopular: boolean;
  responseTime: string;
  rating: number;
  reviewCount: number;
  reviews: Review[];
  category: string;
  availability: string;
  priceRange: string;
  isPublished: boolean;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export const categories = [
  "Tous",
  "Plomberie",
  "Électricité",
  "Menuiserie",
  "Coiffure",
  "Informatique",
  "Peinture",
  "Jardinage",
  "Ménage",
  "Réparation"
];

export const providers: Provider[] = [];

export const stats = {
  providersCount: 12000,
  requestsPerMonth: 45000,
  averageRating: 4.7,
  satisfactionRate: 96
};

export const getFeaturedProviders = () => providers.filter(p => p.isFeatured && p.isPublished);
export const getPopularProviders = () => providers.filter(p => p.isPopular && p.isPublished);
export const getCertifiedProviders = () => providers.filter(p => p.isCertified && p.isPublished);
export const getProvidersByCategory = (category: string) => 
  category === "Tous" 
    ? providers.filter(p => p.isPublished)
    : providers.filter(p => p.category === category && p.isPublished);
export const getProviderById = (id: string) => providers.find(p => p.id === id);
