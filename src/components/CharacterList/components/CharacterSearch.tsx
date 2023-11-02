import { debounce } from "debounce";
import { FC, useCallback, useRef, useState } from "react";
import { MdFilterAlt as FilterShowIcon, MdFilterAltOff as FilterHideIcon } from "react-icons/md";

import { CharacterFilters } from "@/lib/types/Character.types";

interface CharacterSearchProps {
  onChange(filters: CharacterFilters): void;
}

/**
 * Definición del componente `CharacterSearch`
 *
 * @name CharacterSearch
 * @description
 */
export const CharacterSearch: FC<CharacterSearchProps> = ({ onChange }) => {
  const [showAdvancedFilters, setShowAdvancedFilter] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const statusRef = useRef<HTMLInputElement>(null);
  const speciesRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLInputElement>(null);

  const handleInputChange = useCallback(() => {
    onChange({
      name: nameRef?.current?.value,
      status: statusRef?.current?.value,
      species: speciesRef?.current?.value,
      type: typeRef?.current?.value,
      gender: genderRef?.current?.value,
    });
  }, [onChange]);

  return (
    <>
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
      {showAdvancedFilters ? (
        <div className="flex flex-row flex-wrap">
          <div className="w-full xl:w-3/12 lg:w-4/12 md:w-6/12 p-2 mb-2">
            <label htmlFor="status" className="mb-2">
              Status
            </label>
            <input
              ref={statusRef}
              type="text"
              name="status"
              className="w-full p-2 border-2 border-zinc-700 hover:border-customBlue-500 focus-visible:border-customBlue-500 rounded text"
              placeholder="Search by status"
              onChange={debounce(handleInputChange, 500)}
            ></input>
          </div>
          <div className="w-full xl:w-3/12 lg:w-4/12 md:w-6/12 p-2 mb-2">
            <label htmlFor="species">Species</label>
            <input
              ref={speciesRef}
              type="text"
              name="species"
              className="w-full p-2 border-2 border-zinc-700 hover:border-customBlue-500 focus-visible:border-customBlue-500 rounded text"
              placeholder="Search by species"
              onChange={debounce(handleInputChange, 500)}
            ></input>
          </div>
          <div className="w-full xl:w-3/12 lg:w-4/12 md:w-6/12 p-2 mb-2">
            <label htmlFor="type">Type</label>
            <input
              ref={typeRef}
              type="text"
              name="type"
              className="w-full p-2 border-2 border-zinc-700 hover:border-customBlue-500 focus-visible:border-customBlue-500 rounded text"
              placeholder="Search by type"
              onChange={debounce(handleInputChange, 500)}
            ></input>
          </div>
          <div className="w-full xl:w-3/12 lg:w-4/12 md:w-6/12 p-2 mb-2">
            <label htmlFor="gender">Gender</label>
            <input
              ref={genderRef}
              type="text"
              name="gender"
              className="w-full p-2 border-2 border-zinc-700 hover:border-customBlue-500 focus-visible:border-customBlue-500 rounded text"
              placeholder="Search by gender"
              onChange={debounce(handleInputChange, 500)}
            ></input>
          </div>
        </div>
      ) : null}
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
    </>
  );
};
