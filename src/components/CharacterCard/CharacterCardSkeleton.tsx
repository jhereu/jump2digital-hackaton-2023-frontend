import { FC } from "react";

export const CharacterCardSkeleton: FC = () => {
  return (
    <div className="animate-pulse group w-64 bg-zinc-600 border-2 border-zinc-800 m-5 rounded-2xl cursor-pointer text-center pb-3">
      <div className="rounded-t-2xl w-full content-center mb-5 bg-zinc-500 h-64" />

      <div className="px-5 text-center">
        <div className="h-4 bg-zinc-500 rounded-full w-36 mx-auto mb-3" />
        <div className="h-3 bg-zinc-500 rounded-full w-20 mx-auto mb-2" />

        <div className="flex flex-row gap-2 w-full justify-center">
          <div className="h-4 w-4 bg-zinc-500 rounded-full mb-3" />
          <div className="h-4 bg-zinc-500 rounded-full w-28 mb-3" />
        </div>
        <div className="flex flex-row gap-2 w-full justify-center">
          <div className="h-5 bg-zinc-500 rounded-full w-20 mb-2" />
          <div className="h-5 bg-zinc-500 rounded-full w-16 mb-2" />
        </div>
      </div>
    </div>
  );
};
