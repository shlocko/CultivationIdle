import { createSignal, type Component, Show, For } from "solid-js";
import utils from "../styles/utils.module.css";
import { state, setState, setAction } from "../state/store";
import { Template } from "./Template";
import { ChooseAspect } from "./ChooseAspect";
<<<<<<< HEAD
import { sendChoice, sendModal } from "../state/modalMessages";
=======
import { sendChoice, sendModal, testModalList } from "../state/modalMessages";
>>>>>>> afc4a9956d3155cba2b402ab6004e14610afa37e
import { techniques } from "../state/techniques";
//import { testModal } from "../state/modalMessages";

export const Main: Component = () => {
  const [isModalOpen, setIsModalOpen] = createSignal(false);
  return (
    <>
      <Template>
        <Show when={!state.aspect && state.rank >= 1}>
          <ChooseAspect />
        </Show>
        <button
          class={utils.btn}
          onClick={() => {
<<<<<<< HEAD
            sendChoice("techniques", techniques["Fire"]);
            console.log(techniques["Fire"]);
=======
            testModalList(techniques["Fire"]);
            sendChoice("techniques", techniques["Fire"]);
            //console.log(techniques["Fire"]);
>>>>>>> afc4a9956d3155cba2b402ab6004e14610afa37e
          }}
        >
          <p> Push! </p>
        </button>
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
