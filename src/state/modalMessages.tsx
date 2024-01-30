import { For, type Component } from "solid-js";
import { setPause, setState, state } from "./store";
import utils from "../styles/utils.module.css";

export const sendModal = (content: string) => {
  let msg = {
    type: "Text",
    content: content,
  } as TextModal;
  let arr = state.modalMessages.slice();
  arr.push(msg);
  setState("modalMessages", arr);
};

export const sendChoice = (store: string, items: any[]) => {
  let msg = {
    type: "Choose",
    store: store,
    items: items,
  } as ChooseModalState;
  let arr = state.modalMessages.slice();
  arr.push(msg);
  setState("modalMessages", arr);
};

export const ModalMessage: Component<TextModal | ChooseModalState> = () => {
  let message = state.modalMessages[0];
  if (message.type === "Text") {
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
  } else if (message.type === "Choose") {
    return (
      <>
        <p> Choose </p>
        <For each={message.items}>
          {(item, i) => {
            console.log(item);
            return <p> {item} </p>;
          }}
        </For>

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
  }
};

export type ModalMessageType = TextModal | ChooseModalState;

export type TextModal = {
  type: "Text";
  content: string;
};

export type ChooseModalState = {
  type: "Choose";
  store: string;
  items: any[];
};
