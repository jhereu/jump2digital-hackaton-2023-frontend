import { ApiPaginationParams, ApiPaginationResponse } from "@/lib/types/ApiPagination.types";
import { Character, CharacterFilters } from "@/lib/types/Character.types";

import { GRAPHQL_URL } from "./config";

export const GET_CHARACTERS_QUERY = `
  query GetCharacters($page: Int!, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        pages
        count
      }
      results {
        id
        name
        status
        species
        type
        gender
        origin {
          id
          name
        }
        location {
          id
          name
        }
        image
        episode {
          id
          name
          episode
        }
      }
    }
  }
`;

export async function getCharacters(
  params: ApiPaginationParams<CharacterFilters>,
): Promise<ApiPaginationResponse<Character>> {
  const response: { data: { characters: ApiPaginationResponse<Character> } } =
    await fetch(GRAPHQL_URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        operationName: "GetCharacters",
        query: GET_CHARACTERS_QUERY,
        variables: params,
      }),
    }).then((res) => res.json());

  return response.data.characters;
}
