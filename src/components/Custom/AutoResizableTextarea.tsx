import React, {
  ChangeEvent,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";

interface AutoResizableTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  some?: string;
}

const AutoResizableTextarea: React.FC<AutoResizableTextareaProps> = props => {
  const { onChange, ...otherProps } = props;

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState<string>("");
  const [textareaHeight, setTextareaHeight] = useState<string | number>("auto");

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setText(value);

    // Adjust textarea height based on content
    if (textareaRef.current) {
      setTextareaHeight("auto");
      const computedHeight = textareaRef.current.scrollHeight;
      setTextareaHeight(computedHeight);
    }

    // Call the provided onChange function if exists
    if (onChange) {
      onChange(event);
    }
  };

  const resizeIt = () => {
    if (textareaRef.current) {
      setTextareaHeight("auto");
      const computedHeight = textareaRef.current.scrollHeight;
      setTextareaHeight(computedHeight);
    }
  };

  useEffect(() => {
    resizeIt();
  }, []);

  return (
    <textarea
      rows={1}
      id="textarea-label-value"
      ref={textareaRef}
      style={{ height: textareaHeight, minHeight: "25px" }}
      value={text}
      onChange={handleInputChange}
      onPaste={resizeIt}
      placeholder="Type something..."
      {...otherProps}
    />
  );
};

export default AutoResizableTextarea;
