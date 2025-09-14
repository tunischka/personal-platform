export type ReviewCard = {
  id: string;
  rating: number;
  text: string;
  date?: string;
  images?: string[];
  place: {
    title: string;
    address?: string;
    url?: string;     // "Google Maps’te aç" butonu
    data_id?: string; // cid gibi
    lat?: number;
    lng?: number;
  };
};
