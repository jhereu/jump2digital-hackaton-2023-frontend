import { Character } from "@/lib/types/Character.types";

export interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
  residents: Character[];
  url: string;
  created: string;
}
