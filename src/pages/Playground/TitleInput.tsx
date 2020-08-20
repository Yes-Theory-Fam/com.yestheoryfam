import * as React from "react";
import { saveCaretPosition } from "./cursorManipUtil";

const colourTitle = (value: string): { black: string; blue: string } => {
  const bluePercentage = 0.2;
  const blueAbsolute = Math.floor(value.length * bluePercentage);
  const splitS = `.* (.*?[a-zA-Z0-9 .!]{${blueAbsolute}})$`;
  const split = RegExp(splitS);

  const [, blue = ""] = split.exec(value) || [, ""];
  const lastIndex = value.lastIndexOf(blue);
  const black = value.substring(0, lastIndex);

  return { black, blue };
};

// TODO Placeholder
// TODO Prevent flickering when in inline div
// TODO Fix empty content breaking the entire thing for some reason
// TODO Delete next to blue start kills everything...
const TitleInput: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const divRef = React.useRef() as React.RefObject<HTMLDivElement>;
  const restoreRef = React.useRef(() => {});

  const onInput = () => {
    const divText = divRef.current?.innerText || "";
    const restore = saveCaretPosition(divRef.current);
    restoreRef.current = restore;
    onChange(divText);
  };

  const { black, blue } = colourTitle(value);

  // Noop on first render, restores using the saved restore function on subsequent renders
  // setTimeout to delay the execution to after the return and render of the component to make sure
  // setting the cursor actually works
  setTimeout(() => restoreRef.current());

  return (
    // We can safely suppress the warning as any changes to the content of the div are caught through listeners on the div
    // Which cause a state change upstream which in turn causes React to fully rerender this component and sorting out
    // divergences between virtual and actual DOM
    <div
      id="title-input"
      className="titleInput"
      ref={divRef}
      onInput={onInput}
      contentEditable
      spellCheck={false}
      suppressContentEditableWarning
      style={{ cursor: "text" }}
    >
      <div className="blog-title">
        {black}
        <div className="inline-blue">{blue}</div>
      </div>
    </div>
  );
};

const Title: React.FC<{ value: string }> = ({ value }) => {
  const { black, blue } = colourTitle(value);
  return (
    <div className="blog-title">
      {black}
      <div className="inline-blue">{blue}</div>
    </div>
  );
};

interface NoEdit {
  editable?: false;
  value: string;
  onChange?: undefined;
}

interface Edit {
  editable: true;
  value: string;
  onChange: (value: string) => void;
}

type TitleProps = NoEdit | Edit;

const ArbitraryTitle: React.FC<TitleProps> = (props) => {
  const isEdit = (props: TitleProps): props is Edit => !!props.editable;

  return isEdit(props) ? (
    <TitleInput value={props.value} onChange={props.onChange} />
  ) : (
    <Title value={props.value} />
  );
};

export default ArbitraryTitle;
