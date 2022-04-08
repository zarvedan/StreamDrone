export default interface Flight {
  name: string;
  id_flight_request_site: number;
  max_speed: number;
  start_date: string;
  end_date: string;
  city: string;
  postal_code: string;
  activity_name: string;
  scenario_name: string;
  city_a: string;
  zip: string;
  address_line_1: string;
  street_number: string;
  latitude: number;
  longitude: number;
  id_flight_request_site_address: number;
}
