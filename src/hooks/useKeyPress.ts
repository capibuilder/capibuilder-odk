import { useEffect } from "react";

type key =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z"
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "F1"
  | "F2"
  | "F3"
  | "F4"
  | "F5"
  | "F6"
  | "F7"
  | "F8"
  | "F9"
  | "F10"
  | "F11"
  | "F12"
  | "Escape"
  | "Enter"
  | "Tab"
  | "Backspace"
  | "Shift"
  | "Ctrl"
  | "Alt"
  | "Caps Lock"
  | "Space"
  | "ArrowUp"
  | "ArrowDown"
  | "ArrowLeft"
  | "ArrowRight"
  | "PageUp"
  | "PageDown"
  | "Home"
  | "End"
  | "Insert"
  | "ShiftLeft"
  | "ShiftRight"
  | "ControlLeft"
  | "ControlRight"
  | "AltLeft"
  | "AltRight"
  | "MetaLeft"
  | "MetaRight"
  | "VolumeUp"
  | "VolumeDown"
  | "VolumeMute"
  | "Play"
  | "Pause"
  | "Stop"
  | "Next"
  | "Previous"
  | "MediaTrackNext"
  | "MediaTrackPrevious"
  | "MediaStop"
  | "MediaPlayPause"
  | "/";

/**
 * This function listens for a key press event and triggers a callback function if the pressed key
 * matches the specified key(s).
 * @param {key | key[]} key - The key parameter is either a single key or an array of keys that the
 * function should listen for. It represents the keyboard key(s) that the user needs to press to
 * trigger the callback function.
 * @param callback - The `callback` parameter is a function that will be executed when the specified
 * key or keys are pressed. It does not take any arguments and its return value is not used.
 */
function useKeyPress(key: key | key[], callback: () => void) {
  useEffect(() => {
    function handleKeyPress(event: any) {
      const keys = Array.isArray(key) ? key : [key];
      if (keys.includes(event.key)) {
        callback();
      }
    }

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [key, callback]);
}

export default useKeyPress;
