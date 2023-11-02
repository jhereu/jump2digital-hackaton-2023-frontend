import { Character } from "@/lib/types/Character.types";

import type { FC, ReactNode } from "react";

interface CharacterStatusTagProps {
  status: Character["status"];
}

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

export const CharacterStatusTag: FC<CharacterStatusTagProps> = (props) => {
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
