import { FC, useMemo, useState } from "react";

import { useGetCharactersQuery } from "@/lib/store/slices/Character/Character.api";

import CharacterCard from "./CharacterCard";

// import styles from '../styles.module.less';

/**
 * Props del componente `CharacterList`
 */
export type CharacterListSafeProps = CharacterListProps & typeof defaultProps;

export interface CharacterListProps {
  search?: string;
}

const defaultProps = {};

/**
 * Definición del componente `CharacterList`
 */
const CharacterList: FC<CharacterListSafeProps> = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetCharactersQuery({
    page,
  });

  const isFirstPage = !data?.info.prev;
  const isLastPage = !data?.info.next;

  const content = useMemo(() => {
    if (isLoading) {
      return "Loading...";
    }

    if (!data) {
      return "Empty data";
    }

    return (
      <>
        <ul>
          {data.results.map((character) => {
            return <CharacterCard key={character.id} character={character} />;
          })}
        </ul>
      </>
    );
  }, [data, isLoading]);

  return (
    <>
      {content}
      <button onClick={() => setPage(page - 1)} disabled={isFirstPage}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)} disabled={isLastPage}>
        Next
      </button>
    </>
  );
};

CharacterList.defaultProps = defaultProps;

/**
 * Exportación del componente `CharacterList`
 */
export default CharacterList as FC<CharacterListProps>;
