import { Episode } from "@/lib/types/Episode.types";
import { Location } from "@/lib/types/Location.types";

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
  episode: Episode[];
  url: string;
  created: string;
}

export interface CharacterFilters {
  name?: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
}
