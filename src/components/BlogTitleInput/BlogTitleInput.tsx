import * as React from "react";
import ContentEditable from "react-contenteditable";

import "./BlogTitleInput.scss";

const colourTitle = (value: string): { black: string; blue: string } => {
  const bluePercentage = 0.2;
  const blueAbsolute = Math.floor(value.length * bluePercentage);
  const splitS = `.* (.*?.{${blueAbsolute}})$`;
  const split = RegExp(splitS);

  const [, blue = ""] = split.exec(value) || [, ""];
  const lastIndex = value.lastIndexOf(blue);
  const black = value.substring(0, lastIndex);

  return { black, blue };
};

const htmlToText = (html: string) => {
  const sneakyDiv = document.createElement("div");
  sneakyDiv.innerHTML = html;
  return sneakyDiv.innerText;
};

const EditableTitle: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  const displayedValue = htmlToText(value);
  const { black, blue } = colourTitle(displayedValue);
  const [hasFocus, setHasFocus] = React.useState(false);
  const editRef = React.useRef<HTMLDivElement>(null);

  const customTitle = (
    <div className="blog-title">
      {black}
      <div className="inline-blue">{blue}</div>
    </div>
  );

  const placeHolder = <div className="blog-title placeholder">Type your post's title here...</div>;

  const displayTitle = displayedValue || hasFocus ? customTitle : placeHolder;

  // nbsp hack required for firefox that places the cursor on contenteditable + text-align: center divs still on the far left
  // Placing an nbsp resolves this (see https://stackoverflow.com/a/16984412/6707985)
  // Given that the HTML is cleaned up for the display anyway, this doesn't cause additional issues.
  const nbsp = "\xa0";

  return (
    <div className="blog-title-edit">
      {displayTitle}
      <ContentEditable
        innerRef={editRef}
        html={displayedValue ? value : nbsp}
        contentEditable
        onChange={({ target: { value } }) => onChange(value)}
        onKeyDown={({ key }) => {
          if (key.toLowerCase() === "enter") editRef.current?.blur();
        }}
        onBlur={() => setHasFocus(false)}
        onFocus={() => setHasFocus(true)}
        className="blog-title blog-title-edit-input"
      />
    </div>
  );
};

const Title: React.FC<{ value: string }> = ({ value }) => {
  const { black, blue } = colourTitle(htmlToText(value));
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
    <EditableTitle value={props.value} onChange={props.onChange} />
  ) : (
    <Title value={props.value} />
  );
};

export default ArbitraryTitle;
