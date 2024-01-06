import { ImageKitFileT } from "@/lib/imageKit";

export type Params<T> = T;

export type UpdateMethod<T> = {
  method?: "UPDATE" | "CREATE";
  data?: T;
};

export type MethodT = "UPDATE" | "DELETE" | "CREATE" | "";

export type ArangoDataT = {
  _key?: string;
};

export type Slug = { slug?: string };

export type StatusT = "AVAILABLE" | "DRAFT" | "BOOKED";
export type CurrencyT = "IDR" | "AUD" | "USD" | "THB" | "SGD" | "EUR" | "GBP";

export type SlugMeta = {
  params?: { slug?: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export type FacilitySummary = {
  minBath?: number;
  maxBath?: number;
  minBed?: number;
  maxBed?: number;
};

export type Facility = {
  bed?: number;
  bath?: number;
};

export type HotelContatctT = {
  instagram?: string;
  instagramUrl?: string;
  facebook?: string;
  facebookUrl?: string;
  whatsapp?: string;
  whatsappName?: string;
  youtube?: string;
  youtubeUrl?: string;
  tiktok?: string;
  tiktokUrl?: string;
  twitter?: string;
  twitterUrl?: string;
};

export type HotelT = {
  contact?: HotelContatctT;
  summary?: FacilitySummary;
  name?: string;
  description?: string;
  image?: Array<ImageKitFileT>;
  location?: LocationT;
  status?: StatusT;
  category?: CategoryT;
  currency?: CurrencyT;
  room?: Array<RoomT>;
} & ArangoDataT &
  Slug;

export type CategoryT = {
  name?: string;
} & ArangoDataT &
  Slug;

export type RoomTypeT = {
  name?: string;
} & ArangoDataT;

export type LocationT = {
  name?: string;
  description?: string;
} & ArangoDataT &
  Slug;

export type RoomT = {
  customer?: SecureFormT;
  hotel?: HotelT;
  name?: string;
  description?: string;
  image?: Array<ImageKitFileT>;
  status?: StatusT;
  type?: RoomTypeT;
  price?: number;
  facilities?: Array<string>;
} & ArangoDataT &
  Slug &
  Facility;

export type SecureFormT = {
  username?: string;
  checkIn?: string;
  checkOut?: string;
  guest?: number;
  email?: string;
  phone?: string;
};
export type BookingT = {
  knowing?: boolean;
  currency?: CurrencyT;
  amount?: number;
  transactionUrl?: string;
  hotel?: HotelT;
  room?: RoomT;
} & ArangoDataT &
  SecureFormT;

export type BlogT = {
  description: string;
  title: string;
  slug: string;
  html: string;
} & ArangoDataT;
