import { For, type Component, createSignal } from "solid-js";
import utils from "../styles/utils.module.css";
import { Technique, setState, state } from "../state/store";
import { techniques } from "../state/techniques";
import { closeModal } from "../state/modalMessages";

export const ChooseTechnique: Component = () => {
  const [chosen, setChosen] = createSignal(-1);
  return (
    <div class={utils.container}>
      <h3> Choose a technique: </h3>
      <For each={techniques[state.aspect as keyof typeof techniques]!}>
        {(item, i) => (
          <>
            <button
              classList={{
                [utils.btn]: true,
                [utils.btn_active]: chosen() === i(),
              }}
              onClick={() => {
                setChosen(i());
              }}
            >
              {item.name}
            </button>
          </>
        )}
      </For>
      <button
        class={utils.btn}
        onClick={() => {
          let arr = state.techniques.slice();
          arr.push(
            techniques[state.aspect as keyof typeof techniques]![
              chosen()
            ] as Technique,
          );
          setState("techniques", arr);
          closeModal();
        }}
      >
        <p> Select Technique </p>
      </button>
    </div>
  );
};
