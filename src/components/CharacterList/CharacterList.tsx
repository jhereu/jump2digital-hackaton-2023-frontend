import { FC, useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { CharacterCard } from "@/components/CharacterCard/CharacterCard";
import { CharacterCardSkeleton } from "@/components/CharacterCard/CharacterCardSkeleton";
import { getCharacters } from "@/lib/api/chartacters.api";
import { Character, CharacterFilters } from "@/lib/types/Character.types";

import { CharacterListEmpty } from "./CharacterListEmpty";
import { CharacterListSearch } from "./CharacterListSearch";

// Number of skeleton cards to show when loading
const SKELETON_CARDS_COUNT = 5;

// Static array of N skeleton cards
const skeletonCards = [...Array(SKELETON_CARDS_COUNT)].map((_, i) => (
  <CharacterCardSkeleton key={`character-skeleton-${i}`} />
));

/**
 * Component for the list of characters.
 * It includes search bar and results.
 */
export const CharacterList: FC = () => {
  // Pagination statuses
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  // Advanced filters
  const [filters, setFilters] = useState<CharacterFilters>({});

  // Displayed data for infinite scrolling. Includes current page results and previous pages
  const [data, setData] = useState<Character[]>([]);

  // Function to fetch data based on current page and filters
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

  // When filters change, set page to 1 and fetch again
  const handleFilterChanged = useCallback(
    (filters: CharacterFilters) => {
      fetchData(1, filters);
    },
    [fetchData],
  );

  // On first load, fetch page 1 without filters
  useEffect(() => {
    fetchData(1, {});
  }, [fetchData]);

  // Results content
  const content = useMemo(() => {
    if (data.length === 0) {
      // If no data but still loading, show more skeleton cards to preserve aspect ratio
      if (isLoading) {
        return (
          <>
            {skeletonCards}
            {skeletonCards}
          </>
        );
      }

      // If no loading but no data, show the empty data page
      return <CharacterListEmpty search={filters.name} />;
    }

    // Show a CharacterCard for each result
    return data.map((character) => (
      <CharacterCard
        key={`character-id-${character.id}`}
        character={character}
      />
    ));
  }, [data, filters.name, isLoading]);

  return (
    <>
      <CharacterListSearch onChange={handleFilterChanged} />

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
