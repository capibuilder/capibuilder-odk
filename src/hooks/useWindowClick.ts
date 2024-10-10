/**
 * This is a custom React hook that adds an event listener for a click on the window and calls a
 * provided callback function when the window is clicked.
 * @param {any} callback - a function that will be called when the window is clicked.
 */
import { useEffect } from "react";

const useWindowClick = (callback: any) => {
  useEffect(() => {
    const handleClick = (event: any) => {
      if (event.target === window) {
        // Call the provided callback function when the window is clicked
        callback();
      }
    };

    // Add event listener for 'click' event on the window
    window.addEventListener("click", handleClick);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [callback]);
};

export default useWindowClick;
