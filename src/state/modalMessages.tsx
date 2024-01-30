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

export const testModalList = <T extends { name: string }>(arr: Array<T>) => {
  if (arr[0]) {
    console.log(arr[0].name);
  }
};

export const ModalMessage: Component = () => {
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
            return <p> {item.name} </p>;
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
