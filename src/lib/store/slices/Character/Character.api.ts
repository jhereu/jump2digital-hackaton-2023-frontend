import { BASE_URL, CHARACTER_SLUG_URL } from "@/config/urls";
import {
  ApiPaginationParams,
  ApiPaginationResponse,
} from "@/lib/store/shared/ApiPagination";
import {
  Character,
  CharacterFilters,
} from "@/lib/store/slices/Character/Character.type";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const characterApi = createApi({
  reducerPath: "characterApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getCharacterById: builder.query<Character, Character["id"]>({
      query: (id) => `${CHARACTER_SLUG_URL}/${id}`,
    }),
    getCharacters: builder.query<
      ApiPaginationResponse<Character>,
      ApiPaginationParams<CharacterFilters>
    >({
      query: (params) => {
        const urlParams = Object.entries({
          page: (params.page || 1).toString(),
          ...params.filters,
        })
          .reduce((memo, [key, value]) => {
            return [...memo, `${key}=${value}`];
          }, [] as string[])
          .join("&");

        return `${CHARACTER_SLUG_URL}?${urlParams}`;
      },
    }),
  }),
});

export const { useGetCharacterByIdQuery, useGetCharactersQuery } = characterApi;
