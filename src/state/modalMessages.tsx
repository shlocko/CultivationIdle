import { For, type Component, createSignal, createEffect } from "solid-js";
import { Aspect, Technique, aspects, setPause, setState, state } from "./store";
import utils from "../styles/utils.module.css";
import modalStyles from "../styles/Modal.module.css";
import { techniques } from "./techniques";

export const sendModal = (content: string) => {
  let msg = {
    type: "Text",
    content: content,
  } as TextModal;
  let arr = state.modalMessages.slice();
  arr.push(msg);
  setState("modalMessages", arr);
};

export const sendChoice = <T extends { name: string }>(
  store: string,
  items: Array<T>,
) => {
  let msg = {
    type: "Choose",
    store: store,
    items: items,
  } as ChooseModalState;

  //console.log(items);
  let arr = state.modalMessages.slice();
  arr.push(msg);
  //console.log(arr);
  setState("modalMessages", arr);
};

export const sendTechniqueChoice = () => {
  let msg = {
    type: "ChooseTechnique",
  } as ChooseTechniqueModal;
  let arr = state.modalMessages.slice();
  arr.push(msg);
  setState("modalMessages", arr);
};

export const sendAspectChoice = () => {
  let msg = {
    type: "ChooseAspect",
  } as ChooseAspectModal;
  let arr = state.modalMessages.slice();
  arr.push(msg);
  setState("modalMessages", arr);
};

export const testModalList = <T extends { name: string }>(arr: Array<T>) => {
  if (arr[0]) {
    console.log(arr[0].name);
  }
};

export const ModalChooseTechnique: Component = () => {
  const [choice, setChoice] = createSignal(-1);
  let techniqueList = techniques[state.aspect as keyof typeof techniques];
  return (
    <>
      <p> Choose </p>
      <For each={techniqueList}>
        {(item, i) => {
          return (
            <>
              <button
                classList={{
                  [utils.btn]: true,
                  [modalStyles.btn_choice]: true,
                  [utils.btn_active]: choice() === i(),
                }}
                onClick={() => {
                  setChoice(i());
                }}
              >
                <p>{item.name}</p>
              </button>
            </>
          );
        }}
      </For>

      <button
        class={utils.btn}
        onClick={() => {
          if (choice() >= 0) {
            let techniquesKnown = state.techniques.slice();
            techniquesKnown.push(techniqueList[choice()] as Technique);
            setState("techniques", techniquesKnown);
            let arr = state.modalMessages.slice();
            arr.shift();
            setState("modalMessages", arr);
          }
        }}
      >
        <p>Choose</p>
      </button>
    </>
  );
};

export const ModalChooseAspect: Component = () => {
  const [choice, setChoice] = createSignal(-1);
  return (
    <div class={utils.container}>
      <p> Choose </p>
      <For each={aspects}>
        {(item, i) => {
          return (
            <>
              <button
                classList={{
                  [utils.btn]: true,
                  [modalStyles.btn_choice]: true,
                  [utils.btn_active]: choice() === i(),
                }}
                onClick={() => {
                  setChoice(i());
                }}
              >
                <p>{item}</p>
              </button>
            </>
          );
        }}
      </For>

      <button
        class={utils.btn}
        onClick={() => {
          if (choice() >= 0) {
            setState("aspect", aspects[choice()] as Aspect);
            let arr = state.modalMessages.slice();
            arr.shift();
            setState("modalMessages", arr);
          }
        }}
      >
        <p>Choose</p>
      </button>
    </div>
  );
};

export const ModalMessage: Component = () => {
  let msg = state.modalMessages[0];
  if (msg.type === "Text") {
    let message = msg as TextModal;
    return (
      <>
        <p> {message.content} </p>
        <button
          class={utils.btn}
          onClick={() => {
            let arr = state.modalMessages.slice();
            arr.shift();
            setState("modalMessages", arr);
          }}
        >
          Next
        </button>
      </>
    );
  } else if (msg.type === "Choose") {
  } else if (msg.type === "ChooseTechnique") {
    return <ModalChooseTechnique />;
  } else if (msg.type === "ChooseAspect") {
    return <ModalChooseAspect />;
  }
};

export type ModalMessageType =
  | TextModal
  | ChooseModalState
  | ChooseTechniqueModal
  | ChooseAspectModal;

export type TextModal = {
  type: "Text";
  content: string;
};

export type ChooseModalState = {
  type: "Choose";
  store: string;
  items: any[];
};

export type ChooseTechniqueModal = {
  type: "ChooseTechnique";
};

export type ChooseAspectModal = {
  type: "ChooseAspect";
};
