import { FC, useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { CharacterCard } from "@/components/CharacterCard/CharacterCard";
import { CharacterCardSkeleton } from "@/components/CharacterCard/CharacterCardSkeleton";
import { getCharacters } from "@/lib/api/chartacters.api";
import { Character, CharacterFilters } from "@/lib/types/Character.types";

import { CharacterListEmpty } from "./CharacterListEmpty";
import { CharacterListSearch } from "./CharacterListSearch";

const SKELETON_CARDS_COUNT = 5;

/**
 * Static array of CharacterCard
 */
const skeletonCards = [...Array(SKELETON_CARDS_COUNT)].map((_, i) => (
  <CharacterCardSkeleton key={`character-skeleton-${i}`} />
));

export const CharacterList: FC = () => {
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [filters, setFilters] = useState<CharacterFilters>({});
  const [data, setData] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(
    async (newPage: number, newFilters: CharacterFilters) => {
      setIsLoading(true);
      const response = await getCharacters({
        page: newPage,
        filter: newFilters,
      });
      setFilters(newFilters);
      setData((prevData) =>
        newPage === 1 ? response.results : [...prevData, ...response.results],
      );
      setPage(newPage);
      setLastPage(response.info.pages);
      setIsLoading(false);
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

  const content = useMemo(() => {
    if (data.length === 0) {
      if (isLoading) {
        return skeletonCards;
      }

      return <CharacterListEmpty search={filters.name} />;
    }

    return data.map((character) => (
      <CharacterCard
        key={`character-id-${character.id}`}
        character={character}
      />
    ));
  }, [data, filters.name, isLoading]);

  return (
    <>
      <CharacterListSearch className="mb-10" onChange={handleFilterChanged} />

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
        <div className="flex flex-wrap justify-center">{content}</div>
      </InfiniteScroll>
    </>
  );
};
