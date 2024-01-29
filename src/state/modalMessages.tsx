import { For, type Component } from "solid-js";
import { setPause, setState, state } from "./store";
import utils from "../styles/utils.module.css";
import { hashKey } from "@solidjs/router/dist/data/cache";

export const sendModal = (content: string) => {
  let msg = {
    type: "Text",
    content: content,
  } as TextModal;
  let arr = state.modalMessages.slice();
  arr.push(msg);
  setState("modalMessages", arr);
};

export const ChooseModal: Component<{
  content: string;
  buttonEffect: string;
}> = (props) => {
  return <></>;
};

export const ModalMessage: Component<TextModal | ChooseModalState> = () => {
  let props = state.modalMessages[0];
  if (props.type === "Text") {
    return (
      <>
        <p> {props.content} </p>
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
  } else if (props.type === "ChooseState") {
    return (
      <>
        <p> Choose </p>
        <For each={state[props.items as keyof typeof state] as []}>
          {(item, i) => <p> {item} </p>}
        </For>
      </>
    );
  }
};

export type ModalMessageType = "Text" | "Choose";

export type TextModal = {
  type: "Text";
  content: string;
};

export type ChooseModalState = {
  type: "ChooseState";
  items: string;
};

export type modalMessage =
  | {
      type: string;
      content: string;
      buttonEffect: string;
    }
  | {};
