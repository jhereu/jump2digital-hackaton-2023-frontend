/**
 * Functions to fetch characters from public API via GraphQL
 */

import {
  ApiPaginationParams,
  ApiPaginationResponse,
} from "@/lib/types/ApiPagination.types";
import { Character, CharacterFilters } from "@/lib/types/Character.types";

export const GRAPHQL_URL = "https://rickandmortyapi.com/graphql";

export const CHARACTER_FRAGMENT = `
fragment CharacterInfo on Character {
  id
  name
  status
  species
  type
  gender
  origin {
    id
    name
    dimension
    type
  }
  location {
    id
    name
    dimension
    type
  }
  image
  episode {
    id
    name
    episode
  }
}

`;
export const GET_CHARACTERS_QUERY = `
  ${CHARACTER_FRAGMENT}
  query GetCharacters($page: Int!, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        pages
        count
      }
      results {
        ...CharacterInfo
      }
    }
  }
`;

export async function getCharacters(
  params: ApiPaginationParams<CharacterFilters>,
) {
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

export const GET_CHARACTER_QUERY = `
  ${CHARACTER_FRAGMENT}
  query GetCharacter($id: ID!) {
    character(id: $id) {
      ...CharacterInfo
    }
  }`;

export async function getCharacter(id: Character["id"]) {
  const response: { data: { character: Character } } = await fetch(
    GRAPHQL_URL,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        operationName: "GetCharacter",
        query: GET_CHARACTER_QUERY,
        variables: { id },
      }),
    },
  ).then((res) => res.json());

  return response.data.character;
}
