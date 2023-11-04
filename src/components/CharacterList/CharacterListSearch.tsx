import { debounce } from "debounce";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { MdFilterAlt as FilterShowIcon, MdFilterAltOff as FilterHideIcon } from "react-icons/md";

import { CharacterFilters } from "@/lib/types/Character.types";

interface CharacterListSearchProps {
  onChange(filters: CharacterFilters): void;
}

/**
 * Definición del componente `CharacterSearch`
 *
 * @name CharacterSearch
 * @description
 */
export const CharacterListSearch: FC<CharacterListSearchProps> = ({
  onChange,
}) => {
  const [showAdvancedFilters, setShowAdvancedFilter] = useState(false);
  const [filters, setFilters] = useState<CharacterFilters>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);
  const speciesRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);

  const handleInputChange = useCallback(() => {
    const newFilters = {
      name: nameRef?.current?.value,
      status: statusRef?.current?.value,
      species: speciesRef?.current?.value,
      type: typeRef?.current?.value,
      gender: genderRef?.current?.value,
    };

    setFilters(newFilters);
    onChange(newFilters);
  }, [onChange]);

  const advancedFilters = useMemo(() => {
    if (!showAdvancedFilters) {
      return null;
    }

    const refs = {
      Status: statusRef,
      Species: speciesRef,
      Type: typeRef,
      Gender: genderRef,
    };

    const filters = Object.entries(refs).map(([name, ref]) => {
      const lowercaseName = name.toLowerCase();

      return (
        <div
          key={`filter-${lowercaseName}-input`}
          className="w-full xl:w-3/12 lg:w-4/12 md:w-6/12 p-2 mb-2"
        >
          <label htmlFor={lowercaseName} className="mb-2">
            {name}
          </label>
          <input
            ref={ref}
            type="text"
            name={lowercaseName}
            className="w-full p-2 border-2 border-zinc-700 hover:border-customBlue-500 focus-visible:border-customBlue-500 rounded text"
            placeholder={`Search by ${lowercaseName}`}
            onChange={debounce(
              () =>
                setFilters({
                  name: nameRef?.current?.value,
                  status: statusRef?.current?.value,
                  species: speciesRef?.current?.value,
                  type: typeRef?.current?.value,
                  gender: genderRef?.current?.value,
                }),
              500,
            )}
          ></input>
        </div>
      );
    });

    return <div className="flex flex-row flex-wrap">{filters}</div>;
  }, [showAdvancedFilters]);

  const displayedFilterText = useMemo(() => {
    const notNullFilters = Object.entries(filters).filter(([, val]) =>
      Boolean(val),
    );

    if (notNullFilters.length === 0) {
      return null;
    }

    return (
      <div className="w-full text-center mt-4 text-zinc-500">
        Filters —{" "}
        {notNullFilters.map(([key, val]) => {
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
    );
  }, [filters]);

  return (
    <div className="mb-10">
      <div className="p-2 mb-2">
        {showAdvancedFilters ? (
          <label htmlFor="name" className="mb-2">
            Name
          </label>
        ) : null}
        <input
          ref={nameRef}
          name="name"
          type="text"
          className="w-full p-2 border-2 border-zinc-700 hover:border-customBlue-500 focus-visible:border-customBlue-500 rounded text"
          placeholder="Search by name"
          onChange={debounce(handleInputChange, 500)}
        ></input>
      </div>

      {advancedFilters}

      <button
        className="text-sm px-4 text-customGreen-500 hover:underline hover:text-customBlue-500"
        onClick={() => setShowAdvancedFilter(!showAdvancedFilters)}
      >
        {showAdvancedFilters ? (
          <span className="flex flex-row">
            <FilterHideIcon className="block mt-1 mr-1" />{" "}
            <span>Hide advanced filters, Morty</span>
          </span>
        ) : (
          <span className="flex flex-row">
            <FilterShowIcon className="block mt-1 mr-1" />{" "}
            <span>Show advanced filters, Morty</span>
          </span>
        )}
      </button>

      {displayedFilterText}
    </div>
  );
};
