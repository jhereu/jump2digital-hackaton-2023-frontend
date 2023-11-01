import { FC } from "react";

export const Footer: FC = () => {
  return (
    <div className="text-center text-zinc-400 text-sm mt-20">
      <p>
        Made with 👽 by{" "}
        <a
          href="https://www.linkedin.com/in/jordihereuayo/"
          target="_blank"
          className="font-bold text-customGreen-500 hover:underline hover:text-customBlue-500"
        >
          Jordi Hereu Mayo
        </a>{" "}
        for{" "}
        <a
          href="https://jump2digital.site/es/hackathon/"
          target="_blank"
          className=" text-customGreen-500 hover:underline hover:text-customBlue-500"
        >
          Jump2Digital Hackaton 2023
        </a>
      </p>
    </div>
  );
};
