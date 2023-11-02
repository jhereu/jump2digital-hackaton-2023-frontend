import { FC, useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { getCharacters } from "@/lib/api/chartacters.api";
import { Character, CharacterFilters } from "@/lib/types/Character.types";

import { CharacterCard } from "./CharacterCard";
import { CharacterCardSkeleton } from "./CharacterCardSkeleton";
import { CharacterSearch } from "./CharacterSearch";

interface CharacterListProps {
  search?: string;
}

const SKELETON_CARDS_COUNT = 6;

const skeletonCards = [...Array(SKELETON_CARDS_COUNT)].map((_, i) => (
  <CharacterCardSkeleton key={`character-skeleton-${i}`} />
));

/**
 * Definición del componente `CharacterList`
 */
export const CharacterList: FC<CharacterListProps> = () => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [filters, setFilters] = useState<CharacterFilters>({});
  const [data, setData] = useState<Character[]>([]);

  const fetchData = useCallback(
    async (newPage: number, newFilters: CharacterFilters) => {
      const response = await getCharacters({
        page: newPage,
        filters: newFilters,
      });
      setFilters(newFilters);
      setData((prevData) =>
        newPage === 1 ? response.results : [...prevData, ...response.results],
      );
      setPage(newPage);
      setLastPage(response.info.pages);
    },
    [],
  );

  const handleFilterChanged = useCallback(
    (filters: CharacterFilters) => {
      fetchData(1, filters);
    },
    [fetchData],
  );

  useEffect(() => {
    fetchData(1, {});
  }, [fetchData]);

  return (
    <>
      <CharacterSearch onChange={handleFilterChanged} />
      <InfiniteScroll
        dataLength={data.length}
        next={() => {
          fetchData(page + 1, filters);
        }}
        hasMore={page < lastPage}
        loader={
          <div className="flex flex-wrap justify-center">{skeletonCards}</div>
        }
      >
        <div className="flex flex-wrap justify-center">
          {data.map((character) => (
            <CharacterCard
              key={`character-id-${character.id}`}
              character={character}
            />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
};
