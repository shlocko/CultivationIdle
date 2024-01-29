import { type Component } from "solid-js";
import { setPause, setState, state } from "./store";
import utils from "../styles/utils.module.css";
import { hashKey } from "@solidjs/router/dist/data/cache";

export const sendModal = (content: string) => {
  let msg = {
    type: "test",
    content: content,
    buttonEffect: "next",
  } as modalMessage;
  let arr = state.modalMessages.slice();
  arr.push(msg);
  setState("modalMessages", arr);
};

export const TextModal: Component<{
  content: string;
  buttonEffect: string;
}> = (props) => {
  return (
    <>
      <p> {props.content} </p>
      <button
        class={utils.btn}
        onClick={() => {
          if (props.buttonEffect === "next") {
            let arr = state.modalMessages.slice();
            arr.shift();
            setState("modalMessages", arr);
          }
        }}
      >
        Next
      </button>
    </>
  );
};

export type modalMessage = {
  type: string;
  content: string;
  buttonEffect: string;
};
