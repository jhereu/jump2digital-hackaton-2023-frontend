import { Character } from "@/lib/types/Character.types";

import type { FC, ReactNode } from "react";

interface CharacterCardStatusTagProps {
  status: Character["status"];
}

/**
 * Dictionary to map status to icons and classNames
 */
const dictionary: Record<
  Character["status"],
  {
    Icon?: ReactNode;
    containerClasses?: string;
    text?: string;
  } | null
> = {
  Alive: {
    Icon: "🟢",
  },
  Dead: {
    Icon: "🔴",
  },
  unknown: {
    Icon: "🟡",
    text: "Unknown status",
  },
};

/**
 * Component to display a Status tag with colors and icon in a CharacterCard
 */
export const CharacterCardStatusTag: FC<CharacterCardStatusTagProps> = (
  props,
) => {
  const data = dictionary[props.status];

  if (!data) {
    return null;
  }

  return (
    <p
      title={props.status}
      className={`${data.containerClasses || ""} rounded px-1 text-sm mx-1`}
    >
      {data.Icon} {data.text || props.status}
    </p>
  );
};
