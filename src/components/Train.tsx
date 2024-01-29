import { createSignal, type Component } from "solid-js";
import { state, setState, setAction } from "../state/store";
import utils from "../styles/utils.module.css";
import { Template } from "./Template";

export const Train: Component = () => {
  return (
    <>
      <Template>
        <button
          class={(utils.btn, utils.top_auto)}
          onClick={() => setAction("Train")}
        >
          <p>Train</p>
        </button>{" "}
      </Template>
    </>
  );
};
