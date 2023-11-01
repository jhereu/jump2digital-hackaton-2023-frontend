import { debounce } from "debounce";
import { FC, useRef } from "react";

import { CharacterFilters } from "@/lib/store/slices/Character/Character.type";

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
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = () => {
    onChange({
      name: inputRef?.current?.value,
    });
  };

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        className="w-full mb-20 p-2 border-2 border-zinc-700 hover:border-customBlue-500 focus-visible:border-customBlue-500 rounded text"
        placeholder="Start typing to search"
        onChange={debounce(handleInputChange, 500)}
      ></input>
    </>
  );
};
