import { Editor, PrismEditor } from "prism-react-editor";
import { BasicSetup } from "prism-react-editor/setups";

// Adding the JSX grammar
import "prism-react-editor/prism/languages/jsx";

// Adds comment toggling and auto-indenting for JSX
import "prism-react-editor/languages/jsx";
import "prism-react-editor/prism/languages/tsx";

import "prism-react-editor/layout.css";

import "prism-react-editor/layout.css";
import "prism-react-editor/scrollbar.css";
import "prism-react-editor/search.css";
import "prism-react-editor/themes/vs-code-dark.css";

// Required by the basic setup
import "prism-react-editor/search.css";

import { Copy, Check } from "lucide-react";

import { useRef, useState } from "react";

interface Props {
  hidden: boolean;
  lang: string;
  placeholder: string;
  readOnly?: boolean;
  feed?: boolean;
}

export default function MyCodeEditor({
  hidden,
  lang,
  placeholder,
  readOnly,
  feed,
}: Props) {
  const codeRef = useRef<PrismEditor | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const styles = {
    display: hidden ? "none" : "block",
    width: "100%",
    height: "100%",
    minHeight: feed ? "" : "40vh", // needs to change dyanmically for differnent height on new post and feed
    maxHeight: "40vh",
    padding: "0.75rem",
    backgroundColor: "black",
    borderRadius: "0.25rem",
  };

  const copyToClipboard = async () => {
    if (codeRef.current?.textarea) {
      // Select the content
      codeRef.current.textarea.select();
      codeRef.current.textarea.setSelectionRange(0, 99999); // For mobile devices
      // Copy the text inside the textarea
      try {
        codeRef.current.textarea?.blur();
        await navigator.clipboard.writeText(codeRef.current.value);
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    } else {
      return new Error("Undefined");
    }
  };

  return (
    <div className="relative">
      <div className="absolute top-3 right-0 z-50 m-1 mr-4 p-1 border border-zinc-100 bg-black rounded cursor-pointer hover:scale-105 transtion-all duration-150">
        {copySuccess ? (
          <Check size={20} color="white" />
        ) : (
          <Copy size={20} color="white" onClick={copyToClipboard} />
        )}
      </div>
      <Editor
        language={lang}
        wordWrap
        value={placeholder}
        readOnly={readOnly}
        textareaProps={{
          placeholder: "Enter your code",
          name: "editor",
          "aria-label": "Code editor",
        }}
        ref={codeRef}
        style={styles}
      >
        {(editor: any) => <BasicSetup editor={editor} />}
      </Editor>
    </div>
  );
}
