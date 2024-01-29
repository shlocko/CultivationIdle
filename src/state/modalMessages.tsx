import { ChooseAspect } from "../components/ChooseAspect";
import { ChooseTechnique } from "../components/chooseTechnique";
import { setPause, setState } from "./store";

export const closeModal = () => {
  setState("modalMessage", undefined);
  setPause(false);
};

export const modalChooseTechniqe = () => {
  setState("modalMessage", <ChooseTechnique />);
};

export const modalChooseAspect = () => {
  setState("modalMessage", <ChooseAspect />);
};

export const sendModal = (message: string) => {
  setState(
    "modalMessage",
    <>
      <p> {message} </p>

      <button
        onClick={() => {
          setState("modalMessage", undefined);
        }}
      >
        <p>Close</p>
      </button>
    </>,
  );
};

export const testModal = (
  <>
    <p> Hello </p>

    <button
      onClick={() => {
        setState("modalMessage", undefined);
      }}
    >
      close
    </button>
  </>
);

export const advanceModal = (
  <>
    <p> rankInf </p>

    <button
      onClick={() => {
        setState("modalMessage", undefined);
      }}
    >
      close
    </button>
  </>
);
