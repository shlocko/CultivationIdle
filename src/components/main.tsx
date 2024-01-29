import { createSignal, type Component, Show, For } from "solid-js";
import utils from "../styles/utils.module.css";
import { state, setState, setAction } from "../state/store";
import { Template } from "./Template";
import { ChooseAspect } from "./ChooseAspect";
import { testModal } from "../state/modalMessages";

export const Main: Component = () => {
  const [isModalOpen, setIsModalOpen] = createSignal(false);
  return (
    <>
      <Template>
        <button onClick={() => setState("modalMessage", testModal)}>
          show modal
        </button>
        <Show when={!state.aspect && state.rank >= 1}>
          <ChooseAspect />
        </Show>
        <button
          class={(utils.btn, utils.top_auto)}
          onClick={() => setAction("Meditate")}
        >
          <p>Meditate</p>
        </button>
      </Template>
    </>
  );
};
