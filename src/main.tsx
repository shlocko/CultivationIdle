import { createSignal, type Component, Show, For } from "solid-js";
import utils from "./styles/utils.module.css";
import {
  state,
  setState,
  canAdvance,
  advance,
  setAction,
  inventoryRemove,
  inventoryAdd,
  load,
  persist,
} from "./store";
import { Template } from "./Template";
import { ChooseAspect } from "./ChooseAspect";
import toast from "solid-toast";
import Modal from "@lutaok/solid-modal";
import { testModal } from "./modalMessages";

export const Main: Component = () => {
  const [isModalOpen, setIsModalOpen] = createSignal(false);
  return (
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
  );
};
