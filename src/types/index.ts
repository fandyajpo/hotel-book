import { ImageKitFileT } from "@/lib/imageKit";

export type Params<T> = T;

export type UpdateMethod<T> = {
  method?: "UPDATE" | "CREATE";
  data?: T;
};

export type MethodT = "UPDATE" | "DELETE";

export type ArangoDataT = {
  _key?: string;
};

export type Slug = { slug?: string };

export type StatusT = "AVAILABLE" | "DRAFT" | "BOOKED";
export type CurrencyT = "IDR" | "AUD" | "USD" | "THB" | "SGD" | "EUR" | "GBP";

export type SlugMeta = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type HotelT = {
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
} & ArangoDataT &
  Slug;

export type RoomT = {
  hotel?: HotelT;
  name?: string;
  description?: string;
  image?: Array<ImageKitFileT>;
  status?: StatusT;
  type?: RoomTypeT;
  bed?: number;
  bath?: number;
  price?: number;
  facilities?: Array<string>;
} & ArangoDataT &
  Slug;

export type SecureFormT = {
  checkIn: string;
  checkOut: string;
  guest: number;
  email: string;
  phone: string;
  room?: RoomT;
};

export type BookingT = {
  amount: number;
  transactionUrl: string;
  hotel: HotelT;
  room: RoomT;
} & ArangoDataT &
  SecureFormT;
