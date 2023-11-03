import {
    FaBiohazard as DiseaseSpeciesIcon, FaDog as AnimalSpeciesIcon,
    FaDragon as MythologicalCreatureSpeciesIcon, FaPoo as PoopyButtholeSpeciesIcon,
    FaRobot as RobotSpeciesIcon
} from "react-icons/fa";
import { GiFrankensteinCreature as CronenbergSpeciesIcon } from "react-icons/gi";
import { IoIosMan as HumanSpeciesIcon } from "react-icons/io";
import { PiAlienFill as AlienSpeciesIcon } from "react-icons/pi";

import { Character } from "@/lib/types/Character.types";

import type { FC, ReactNode } from "react";

interface CharacterCardSpeciesTagProps {
  species: Character["species"];
  type?: Character["type"];
}

const dictionary: Record<
  Character["species"],
  {
    Icon: ReactNode;
    containerClasses: string;
    text?: string;
  } | null
> = {
  Human: {
    Icon: (
      <HumanSpeciesIcon className="inline-block" style={{ marginTop: -5 }} />
    ),
    containerClasses: "text-orange-900 bg-orange-300",
  },
  Humanoid: {
    Icon: (
      <HumanSpeciesIcon className="inline-block" style={{ marginTop: -5 }} />
    ),
    containerClasses: "text-orange-900 bg-orange-300",
  },
  Alien: {
    Icon: (
      <AlienSpeciesIcon className="inline-block" style={{ marginTop: -5 }} />
    ),
    containerClasses: "text-green-900 bg-customGreen-500",
  },
  "Mythological Creature": {
    Icon: (
      <MythologicalCreatureSpeciesIcon
        className="inline-block"
        style={{ marginTop: -3 }}
      />
    ),
    containerClasses: "text-purple-900 bg-purple-300",
    text: "Mythological",
  },
  Robot: {
    Icon: (
      <RobotSpeciesIcon className="inline-block" style={{ marginTop: -3 }} />
    ),
    containerClasses: "text-zinc-900 bg-zinc-300",
  },
  Animal: {
    Icon: (
      <AnimalSpeciesIcon className="inline-block" style={{ marginTop: -3 }} />
    ),
    containerClasses: "text-rose-900 bg-rose-300",
  },
  Disease: {
    Icon: (
      <DiseaseSpeciesIcon className="inline-block" style={{ marginTop: -3 }} />
    ),
    containerClasses: "text-yellow-900 bg-yellow-300",
  },
  Cronenberg: {
    Icon: (
      <CronenbergSpeciesIcon
        className="inline-block"
        style={{ marginTop: -3 }}
      />
    ),
    containerClasses: "text-teal-900 bg-teal-300",
  },
  Poopybutthole: {
    Icon: (
      <PoopyButtholeSpeciesIcon
        className="inline-block"
        style={{ marginTop: -3 }}
      />
    ),
    containerClasses: "text-amber-900 bg-amber-300",
  },
};

export const CharacterCardSpeciesTag: FC<CharacterCardSpeciesTagProps> = (
  props,
) => {
  const data = dictionary[props.species];

  if (!data) {
    return null;
  }

  const text = props.species;
  let title = `Species: ${props.species}`;

  if (props.type) {
    // text += `/${props.type}`;
    title += `, Type: ${props.type}`;
  }

  return (
    <span
      title={title}
      className={`${data.containerClasses || ""} rounded px-1 text-sm mx-1`}
    >
      {data.Icon} {data.text || text}
    </span>
  );
};
