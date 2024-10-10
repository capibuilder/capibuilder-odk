import { useState } from "react";

const useClipboard = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: any) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1500); // Reset copied state after 1.5 seconds
      })
      .catch(error => {
        console.error("Failed to copy to clipboard:", error);
      });
  };

  return { copied, copyToClipboard };
};

export default useClipboard;
