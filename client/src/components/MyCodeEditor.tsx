import { Editor } from "prism-react-editor";
import { BasicSetup } from "prism-react-editor/setups";

// Adding the JSX grammar
import "prism-react-editor/prism/languages/jsx";

// Adds comment toggling and auto-indenting for JSX
import "prism-react-editor/languages/jsx";

import "prism-react-editor/layout.css";

import "prism-react-editor/layout.css";
import "prism-react-editor/scrollbar.css";
import "prism-react-editor/search.css";
import "prism-react-editor/themes/vs-code-dark.css";

// Required by the basic setup
import "prism-react-editor/search.css";

interface Props {
  hidden: boolean;
  lang: string;
  placeholder: string;
}

export default function MyCodeEditor({ hidden, lang, placeholder }: Props) {
  const styles = {
    display: hidden ? "none" : "block",
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    class: "brutalButton",
  };

  return (
    <Editor
      language={lang}
      wordWrap
      value={placeholder}
      textareaProps={{
        placeholder: "Enter your code",
        name: "editor",
        "aria-label": "Code editor",
      }}
      style={styles}
    >
      {(editor: any) => <BasicSetup editor={editor} />}
    </Editor>
  );
}
