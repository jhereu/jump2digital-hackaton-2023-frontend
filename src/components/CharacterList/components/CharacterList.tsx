import { FC, useCallback, useEffect, useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import BurpingRickImage from "@/assets/images/burping_rick.jpg";
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

const burp = <span className="text-zinc-500 italic">*burp*</span>;

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
        filter: newFilters,
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

  const filterTranslation = useMemo(() => {
    return Object.entries(filters).filter(([, val]) => Boolean(val));
  }, [filters]);

  return (
    <>
      <div className="mb-20">
        <CharacterSearch onChange={handleFilterChanged} />
        {filterTranslation.length > 0 ? (
          <div className="w-full text-center mt-4 text-zinc-500">
            Filters —{" "}
            {filterTranslation.map(([key, val]) => {
              return (
                <span
                  key={`filter-${key}`}
                  className="bg-zinc-700 rounded mr-3 px-2 py-1 text-zinc-400"
                >
                  <span className="underline">{key}</span> is{" "}
                  <span className="font-bold">{val}</span>
                </span>
              );
            })}
          </div>
        ) : null}
      </div>
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
          {data.length > 1 ? (
            data.map((character) => (
              <CharacterCard
                key={`character-id-${character.id}`}
                character={character}
              />
            ))
          ) : (
            <div className="flex flex-col gap-10 text-center">
              <img src={BurpingRickImage} alt="Burping Rick" />
              <div className="text-2xl flex flex-col">
                {filters.name ? (
                  <span>
                    What the fuck is{" "}
                    <span className="font-bold underline">{filters.name}</span>,
                    Morty? {burp} Grow some balls!
                  </span>
                ) : (
                  <span>
                    What the fuck is this search, Morty? {burp} Grow some balls!
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </InfiniteScroll>
    </>
  );
};
