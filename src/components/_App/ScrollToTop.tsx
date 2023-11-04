import { FC, useCallback, useEffect, useState } from "react";
import { ImArrowUp as ScrollToTopIcon } from "react-icons/im";

// Minimum px to scroll before showing button
const MIN_SCROLLING_PX = 200;

/**
 * Component for scrolling to top when scrolling down through the page
 */
export const ScrollToTop: FC = () => {
  // Flag to show or hide the button
  const [show, setShow] = useState(false);

  // Show only when scrolling more than MIN_SCROLLING_XP
  const handleScroll = useCallback(() => {
    setShow(document.documentElement.scrollTop > MIN_SCROLLING_PX);
  }, []);

  // Scroll when clicked
  const handleClick = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  // Add scroll listener to the page.
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Remove scroll listener when unmounting
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return show ? (
    <div
      className="float-right bottom-0 right-0 fixed cursor-pointer text-3xl p-3 bg-zinc-500 rounded-tl-lg"
      onClick={handleClick}
    >
      <ScrollToTopIcon className="text-zinc-800" />
    </div>
  ) : null;
};
