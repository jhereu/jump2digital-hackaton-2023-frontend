import { CHARACTER_BASE_URL } from "@/config/urls";
import {
  ApiPaginationParams,
  ApiPaginationResponse,
} from "@/lib/types/ApiPagination.types";
import { Character, CharacterFilters } from "@/lib/types/Character.types";

export async function getCharacters(
  params: ApiPaginationParams<CharacterFilters>,
): Promise<ApiPaginationResponse<Character>> {
  const urlParams = Object.entries({
    page: (params.page || 1).toString(),
    ...params.filters,
  })
    .reduce((memo, [key, value]) => {
      return [...memo, `${key}=${value}`];
    }, [] as string[])
    .join("&");

  return fetch(`${CHARACTER_BASE_URL}?${urlParams}`).then((res) => res.json());
}
