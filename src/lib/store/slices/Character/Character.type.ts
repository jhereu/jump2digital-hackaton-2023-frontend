import { Location } from "@/lib/store/slices/Location/Location.type";

export interface Character {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharacterFilters {
  name?: Character["name"];
  status?: Lowercase<Character["status"]>;
  species?: Character["species"];
  type?: Character["type"];
  gender?: Lowercase<Character["gender"]>;
}
