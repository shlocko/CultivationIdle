import { setPause, setState } from "./store";

export const closeModal = () => {
  setState("modalMessage", undefined);
  setPause(false);
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
        close
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
    <p> </p>

    <button
      onClick={() => {
        setState("modalMessage", undefined);
      }}
    >
      close
    </button>
  </>
);
