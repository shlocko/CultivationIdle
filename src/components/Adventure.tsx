import { type Component, createSignal, Show } from "solid-js";
import utils from "../styles/utils.module.css";
import { Template } from "./Template";
import { setAction, setState, state } from "../state/store";
import { sendModal } from "../state/modalMessages";
import styles from "../styles/Combat.module.css";
import { Combat } from "./Combat";

export const Adventure: Component = () => {
  return (
    <>
      <Template>
        <h2> Adventure </h2>
        <Show when={state.action === "Combat"}>
          <Combat />
        </Show>
        <button
          class={(utils.btn, utils.top_auto)}
          onClick={() => {
            setAction("Adventure");
          }}
        >
          <p> Adventure </p>
        </button>
      </Template>
    </>
  );
};
