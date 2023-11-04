// import { BsQuestionCircleFill as GenderUnknownIcon } from "react-icons/bs";
import { FaGenderless as GenderGenderlessIcon } from "react-icons/fa";
import { TbGenderFemale as GenderFemaleIcon, TbGenderMale as GenderMaleIcon } from "react-icons/tb";

import { Character } from "@/lib/types/Character.types";

import type { FC, ReactNode } from "react";

interface CharacterCardGenderTagProps {
  gender: Character["gender"];
}

/**
 * Dictionary to map genders to icons and classNames
 */
const dictionary: Record<
  Character["gender"],
  {
    Icon: ReactNode;
    containerClasses: string;
    text?: string;
  } | null
> = {
  Male: {
    Icon: <GenderMaleIcon className="inline-block" style={{ marginTop: -5 }} />,
    containerClasses: "text-blue-900 bg-blue-300",
  },
  Female: {
    Icon: (
      <GenderFemaleIcon className="inline-block" style={{ marginTop: -3 }} />
    ),
    containerClasses: "text-pink-900 bg-pink-300",
  },
  Genderless: {
    Icon: (
      <GenderGenderlessIcon
        className="inline-block"
        style={{ marginTop: -5 }}
      />
    ),
    containerClasses: "text-purple-900 bg-purple-300",
  },
  unknown: null,
};

/**
 * Component to display a Gender tag with colors and icon in a CharacterCard
 */
export const CharacterCardGenderTag: FC<CharacterCardGenderTagProps> = ({
  gender,
}) => {
  const data = dictionary[gender];

  if (!data) {
    return null;
  }

  const { Icon, containerClasses } = data;

  return (
    <>
      <span
        title={`Gender: ${gender}`}
        className={`${containerClasses || ""} rounded px-1 text-sm mx-1`}
      >
        {Icon} {data.text || gender}
      </span>
    </>
  );
};
