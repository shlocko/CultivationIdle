import {
  For,
  type Component,
  createSignal,
  createEffect,
  createMemo,
  Switch,
  Match,
  Show,
  onMount,
} from "solid-js";
import {
  Aspect,
  Technique,
  aspects,
  inventoryAdd,
  meditationTechniques,
  opponent,
  setOpponent,
  setState,
  state,
} from "./store";
import utils from "../styles/utils.module.css";
import modalStyles from "../styles/Modal.module.css";
import { techniques } from "./techniques";
import toast from "solid-toast";

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

  let arr = state.modalMessages.slice();
  arr.push(msg);
  setState("modalMessages", arr);
};

export const sendTechniqueChoice = () => {
  let msg = {
    type: "ChooseTechnique",
  } as ChooseTechniqueModal;
  let arr = state.modalMessages.slice();
  arr.push(msg);
  setState("modalMessages", arr);
};

export const sendMeditationTechniqueChoice = () => {
  let msg = {
    type: "ChooseMeditationTechnique",
  } as ChooseMeditationTechniqueModal;
  let arr = state.modalMessages.slice();
  arr.push(msg);
  setState("modalMessages", arr);
};

export const sendAspectChoice = () => {
  let msg = {
    type: "ChooseAspect",
  } as ChooseAspectModal;
  let arr = state.modalMessages.slice();
  arr.push(msg);
  setState("modalMessages", arr);
};

export const sendLoot = () => {
  let msg = {
    type: "Loot",
  } as LootModal;
  let arr = state.modalMessages.slice();
  arr.push(msg);
  setState("modalMessages", arr);
};

export const testModalList = <T extends { name: string }>(arr: Array<T>) => {
  if (arr[0]) {
    console.log(arr[0].name);
  }
};

export const ModalText: Component = () => {
  let text = (state.modalMessages[0] as TextModal).content;

  return (
    <>
      <p> {text} </p>
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
};

export const ModalChooseTechnique: Component = () => {
  const [choice, setChoice] = createSignal(-1);
  let techniqueList = techniques[state.aspect as keyof typeof techniques];
  return (
    <>
      <p> Choose </p>
      <For each={techniqueList}>
        {(item, i) => (
          <>
            <button
              classList={{
                [utils.btn]: true,
                [modalStyles.btn_choice]: true,
                [utils.btn_active]: choice() === i(),
              }}
              onClick={() => {
                setChoice(i());
              }}
            >
              <p>{item.name}</p>
            </button>
          </>
        )}
      </For>

      <button
        class={utils.btn}
        onClick={() => {
          if (choice() >= 0) {
            let techniquesKnown = state.techniques.slice();
            techniquesKnown.push(techniqueList[choice()] as Technique);
            setState("techniques", techniquesKnown);
          }
          let arr = state.modalMessages.slice();
          arr.shift();
          setState("modalMessages", arr);
        }}
      >
        <p>Choose</p>
      </button>
    </>
  );
};

export const ModalChooseMeditationTechnique: Component = () => {
  const [choice, setChoice] = createSignal(-1);
  let techniqueList = meditationTechniques;
  return (
    <>
      <p> Choose </p>
      <For each={techniqueList}>
        {(item, i) => (
          <>
            <button
              classList={{
                [utils.btn]: true,
                [modalStyles.btn_choice]: true,
                [utils.btn_active]: choice() === i(),
              }}
              onClick={() => {
                setChoice(i());
              }}
            >
              <p>{item.name}</p>
            </button>
          </>
        )}
      </For>

      <button
        class={utils.btn}
        onClick={() => {
          if (choice() >= 0) {
            let techniquesKnown = state.meditationTechniques.slice();
            techniquesKnown.push(techniqueList[choice()] as Technique);
            setState("meditationTechniques", techniquesKnown);
          }
          let arr = state.modalMessages.slice();
          arr.shift();
          setState("modalMessages", arr);
        }}
      >
        <p>Choose</p>
      </button>
    </>
  );
};

export const ModalChooseAspect: Component = () => {
  const [choice, setChoice] = createSignal(-1);
  return (
    <div class={utils.container}>
      <p> Choose </p>
      <For each={aspects}>
        {(item, i) => (
          <>
            <button
              classList={{
                [utils.btn]: true,
                [modalStyles.btn_choice]: true,
                [utils.btn_active]: choice() === i(),
              }}
              onClick={() => {
                setChoice(i());
              }}
            >
              <p>{item}</p>
            </button>
          </>
        )}
      </For>

      <button
        class={utils.btn}
        onClick={() => {
          if (choice() >= 0) {
            setState("aspect", aspects[choice()] as Aspect);
          }
          let arr = state.modalMessages.slice();
          arr.shift();
          setState("modalMessages", arr);
        }}
      >
        <p>Choose</p>
      </button>
    </div>
  );
};

export const ModalLoot: Component = () => {
  return (
    <div class={utils.container}>
      <p> Loot: </p>
      <For each={opponent.loot}>
        {(item, i) => {
          let chanceRoll = Math.floor(Math.random() * 100) + 1;
          setOpponent("loot", i(), "show", chanceRoll <= item.chance);
          let quantity =
            Math.floor(Math.random() * (item.max - item.min + 1)) + item.min;
          return (
            <Show when={item.show}>
              <button
                class={utils.btn}
                onClick={() => {
                  inventoryAdd(item.name, quantity);
                  toast(`${quantity} ${item.name} added`);
                  setOpponent("loot", i(), "show", false);
                }}
              >
                <p>
                  {" "}
                  {quantity} {item.name}{" "}
                </p>
              </button>
            </Show>
          );
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
        <p>Next</p>
      </button>
    </div>
  );
};

export const ModalMessage: Component = () => {
  //let msg = state.modalMessages[0];
  const [msg, setMsg] = createSignal(state.modalMessages[0]);

  // Update the message whenever state.modalMessages changes
  createEffect(() => {
    setMsg(state.modalMessages[0]);
  });
  return (
    <Switch>
      <Match when={msg().type === "Text"}>
        <ModalText />
      </Match>
      <Match when={msg().type === "ChooseTechnique"}>
        <ModalChooseTechnique />
      </Match>
      <Match when={msg().type === "ChooseAspect"}>
        <ModalChooseAspect />
      </Match>
      <Match when={msg().type === "ChooseMeditationTechnique"}>
        <ModalChooseMeditationTechnique />
      </Match>
      <Match when={msg().type === "Loot"}>
        <ModalLoot />
      </Match>
    </Switch>
  );
};

export type ModalMessageType =
  | TextModal
  | ChooseModalState
  | ChooseTechniqueModal
  | ChooseMeditationTechniqueModal
  | ChooseAspectModal
  | LootModal;

export type TextModal = {
  type: "Text";
  content: string;
};

export type ChooseModalState = {
  type: "Choose";
  store: string;
  items: any[];
};

export type ChooseTechniqueModal = {
  type: "ChooseTechnique";
};

export type ChooseAspectModal = {
  type: "ChooseAspect";
};

export type ChooseMeditationTechniqueModal = {
  type: "ChooseMeditationTechnique";
};

export type LootModal = {
  type: "Loot";
};
