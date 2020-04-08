import * as React from "react";
import Dropzone, {
  IPreviewProps,
  IFileWithMeta,
  StatusValue,
} from "react-dropzone-uploader";
import { CSSTransition } from "react-transition-group";

import { randomInt } from "../../utils";

import "./UploadDropzone.scss";
import 'react-toastify/dist/ReactToastify.css';
import "react-dropzone-uploader/dist/styles.css";

import { TransitionStatus } from "react-transition-group/Transition";

const target = "https://httpbin.org/post";

const YESSES = [
  "po",
  "bai",
  "ды",
  "da",
  "да",
  "si",
  "Da",
  "Ano",
  "Ja",
  "Ja",
  "jah",
  "Joo",
  "Oui",
  "Si",
  "Ja",
  "Ναί",
  "Igen",
  "Já",
  "yes",
  "sì",
  "jā",
  "taip",
  "Да",
  "iva",
  "ja",
  "tak",
  "sim",
  "da",
  "да",
  "да",
  "Áno",
  "ja",
  "sí",
  "ja",
  "так",
  "ie",
  "יאָ",
  "այո",
  "bəli",
  "হাঁ",
  "是",
  "是",
  "დიახ",
  "હા",
  "हाँ",
  "yog",
  "はい",
  "ಹೌದು",
  "иә",
  "បាទ",
  "예",
  "yes",
  "സമ്മതം",
  "होय",
  "Тийм",
  "ээ",
  "ဟုတ်ကဲ့",
  "हो",
  "ඔව්",
  "ҳа",
  "ஆம்",
  "అవును",
  "ใช่",
  "Evet",
  "جی",
  "ہاں",
  "ha",
  "Vâng",
  "نعم",
  "فعلا",
  "כן",
  "بله",
  "ja",
  "inde",
  "a",
  "ee",
  "e",
  "haa",
  "ndiyo",
  "bẹẹni",
  "yebo",
  "oo",
  "oo",
  "iya",
  "nih",
  "ya",
  "Eny",
  "yes",
  "ae",
  "jes",
  "repons",
  "lan",
  "se",
  "wi",
  "etiam",
];

const CloseButton: React.FC<{onClick: () => void}> = ({onClick}) => {
  return <div className="centered-content upload-close-button" onClick={onClick}>
    X {/* TODO Use the correct icon here */}
  </div>
};

const AnimatedYes: React.FC<{
  direction: number;
  startingOpacity: number;
  endOpacity: number;
  endFontSize: number;
  xOffset: number;
  yesContent: string;
}> = ({
  direction,
  startingOpacity,
  endOpacity,
  endFontSize,
  xOffset,
  yesContent,
}) => {
  const [inProp, setInProp] = React.useState(false);

  const defaultStyle: React.CSSProperties = {
    fontSize: "12px",
    opacity: startingOpacity,
    transform: `rotate(${direction}deg) translateY(0px) translateX(${xOffset}px)`,
    transition: "all 2500ms linear",
    visibility: "hidden",
  };

  const completedAnimation: React.CSSProperties = {
    transform: `rotate(${direction}deg) translateY(-350px) translateX(0px)`,
    opacity: endOpacity,
    fontSize: endFontSize,
    visibility: "visible",
  };

  const transitionStyles: {
    [key in TransitionStatus]?: React.CSSProperties;
  } = {
    entering: completedAnimation,
    entered: {
      ...completedAnimation,
      transition: "all 750ms linear",
      opacity: 0,
      visibility: "hidden",
    },
  };

  // Timeout because otherwise CSS Transition doesn't register the change.
  // Too little timeout and it's fucked up from the beginning. 50 seems good
  setTimeout(() => setInProp(true), 50);

  return (
    <CSSTransition in={inProp} timeout={2500}>
      {(state) => (
        <div style={{ ...defaultStyle, ...transitionStyles[state] }} className="upload-fountain-yes">
          {yesContent}
        </div>
      )}
    </CSSTransition>
  );
};

const YesFountain: React.FC = () => {
  const [activeWords, setActiveWords] = React.useState<Array<React.ReactNode>>(
    []
  );

  // Using useRef to create a mutable object that is retained between renders
  // And more importantly not prone to the issue with closures.
  // This is effectively kept the same as the activeWords state but contains
  // the correct value in the setTimeout closure.
  const unclosuredWords = React.useRef(activeWords);

  const createAnimatedYes = (): React.ReactNode => {
    const direction = randomInt(-40, 41);
    const startingOpacity = Math.random() / 2;
    const endOpacity = Math.random() * 2;
    const endFontSize = Math.round(Math.random() * 30) + 15;
    const yesChoice = randomInt(0, YESSES.length);
    const xOffset = randomInt(-10, 10);

    return (
      <AnimatedYes
        direction={direction}
        startingOpacity={startingOpacity}
        endOpacity={endOpacity}
        endFontSize={endFontSize}
        xOffset={xOffset}
        yesContent={YESSES[yesChoice]}
        key={Math.random().toString()}
      />
    );
  };

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const newYes = createAnimatedYes();
      const newActives = Array.from(activeWords);
      newActives.push(newYes);
      setActiveWords(newActives);
      unclosuredWords.current = newActives;

      setTimeout(() => {
        const newYes = Array.from(unclosuredWords.current);
        newYes.shift();
        setActiveWords(newYes);
        unclosuredWords.current = newYes;
      }, 3250);
    }, 150);

    return () => clearInterval(intervalId);
  });

  return (
    <div className="column-center upload-fountain">
      {activeWords}
    </div>
  );
};

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  const styleBlue: React.CSSProperties = {
    width: `${progress}%`,
  };

  const styleGray: React.CSSProperties = {
    width: `${100 - progress}%`,
  };

  return (
    <div className="row upload-progress">
      <div style={styleBlue} className="upload-progress-bar blue" />
      <div style={styleGray} className="upload-progress-bar gray" />
    </div>
  );
};

// The Fountain has to be passed in as full component because the Preview is rerendered with each percentage change
// therefore resetting the fountain
const Preview: React.FC<IPreviewProps & { Fountain: React.ReactNode }> = ({
  meta: { percent, name },
  Fountain,
}) => {
  return (
    <div className="column-center upload-preview">
      {Fountain}
      Uploading {name}...
      <ProgressBar progress={percent} />
    </div>
  );
};

const InputContent: React.FC<{ rejected: boolean }> = ({ rejected }) => {
  if (rejected) {
    return (
      <div className="centered-content upload-input-rejected">
        Image files only!
      </div>
    );
  }

  return (
    <div className="column-center upload-input">
      <div className="centered-content upload-input-icon">
        icon
      </div>
      <div>
        Drag file here or{" "}
        <div className="inline-blue upload-input-browse">
          browse locally
        </div>
      </div>
    </div>
  );
};

const FullModal: React.FC<{onClose: () => void}> = ({onClose}) => {
  const handleChangeStatus = (
    { meta, remove }: IFileWithMeta,
    status: StatusValue
  ) => {
    if (status === "headers_received") {
      remove();
    } else if (status === "aborted") {
      console.log(`${meta.name} failed to upload!`);
    }
  };

  const Fountain = <YesFountain />;

  return (
    <div style={{ height: "100%", width: "100%" }} className="column-center">
      <CloseButton onClick={onClose} />
      <div className="upload-header">
        Please upload your photo
      </div>

      <Dropzone
        accept="image/*"
        multiple={false}
        autoUpload
        maxFiles={1}
        getUploadParams={() => ({ url: target })}
        inputContent={(_, extra) => <InputContent rejected={extra.reject} />}
        PreviewComponent={(args) => <Preview {...args} Fountain={Fountain} />}
        onChangeStatus={handleChangeStatus}
        addClassNames={{dropzone: "upload-dropzone", dropzoneReject: "upload-dropzone-reject"}}
      />
    </div>
  );
};

export default FullModal;
