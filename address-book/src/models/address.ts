export interface ApiAutoCompleteAddress {
  address: string;
  url: string;
  id: string;
}
export interface ApiFindAddress {
  latitude: number;
  longitude: number;
  addresses: string[];
}
export interface Address {
  uid: string;
  postcode: string;
  country: string;
  line_1: string;
  formatted_address: string[];
  town_or_city: string;
  latitude?: number;
  longitude?: number;
  thoroughfare?: string;
  building_name?: string;
  sub_building_name?: string;
  sub_building_number?: string;
  building_number?: string;
  line_2?: string;
  line_3?: string;
  line_4?: string;
  locality?: string;
  county?: string;
  district?: string;
  residential?: boolean;
}
