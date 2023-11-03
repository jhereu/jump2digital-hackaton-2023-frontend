import { FC, useCallback, useEffect, useState } from "react";
import { ImArrowUp as ScrollToTopIcon } from "react-icons/im";

export interface ScrollToTopProps {}

export const ScrollToTop: FC<ScrollToTopProps> = () => {
  const [show, setShow] = useState(false);

  const handleScroll = useCallback(() => {
    setShow(document.documentElement.scrollTop > 200);
  }, []);

  const handleClick = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return show ? (
    <div
      className="float-right bottom-0 right-0 fixed cursor-pointer text-3xl p-3 bg-zinc-500"
      onClick={handleClick}
    >
      <ScrollToTopIcon className="text-zinc-800" />
    </div>
  ) : null;
};
