import type { FC } from "react";
import BurpingRickImage from "@/assets/images/burping_rick.jpg";

export interface CharacterListEmptyProps {
  search?: string;
}

const burp = <span className="text-zinc-500 italic">*burp*</span>;

/**
 * Component for displaying the empty character search page.
 * It show a burping Rick mocking the user.
 */
export const CharacterListEmpty: FC<CharacterListEmptyProps> = (props) => {
  return (
    <div className="flex flex-col gap-10 text-center">
      <img src={BurpingRickImage} alt="Burping Rick" />
      <div className="text-2xl flex flex-col">
        {props.search ? (
          <span>
            What the fuck is{" "}
            <span className="font-bold underline">{props.search}</span>, Morty?{" "}
            {burp} Grow some balls!
          </span>
        ) : (
          <span>
            What the fuck is this search, Morty? {burp} Grow some balls!
          </span>
        )}
      </div>
    </div>
  );
};
