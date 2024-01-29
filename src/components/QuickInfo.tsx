import { type Component } from "solid-js";
import utils from "../styles/utils.module.css";
import { state, rankInfo } from "../state/store";

export const QuickInfo: Component = () => {
  return (
    <div class={utils.quickinfo}>
      <p>
        Mana: {state.mana.toFixed(1)} of {state.maxMana.toFixed(1)}
      </p>
      <p> Rank: {rankInfo[state.rank].name} </p>
      <p> Action: {state.action} </p>
      <p> Next Advancement: {rankInfo[state.rank].advMana} </p>
      <p> Aspect: {state.aspect ? state.aspect : "Pure"} </p>
      <p> HP: {state.health} </p>
    </div>
  );
};
