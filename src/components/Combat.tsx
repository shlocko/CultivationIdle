import { Show, type Component, Switch, Match, For, JSXElement } from "solid-js";
import utils from "../styles/utils.module.css";
import { Template } from "./Template";
import {
  opponent,
  setAction,
  setPause,
  setState,
  state,
  tick,
  tickMana,
} from "../state/store";
import { sendModal } from "../state/modalMessages";

export const Combat: Component = () => {
  return (
    <>
      <Template>
        <h2> Adventure </h2>
        <Switch>
          <Match when={state.action !== "Combat"}>
            <button
              class={(utils.btn, utils.top_auto)}
              onClick={() => setAction("Combat")}
            >
              <p>Venture Forth</p>
            </button>
          </Match>
          <Match when={state.combat.turn === 1}>
            <h2> Opponent's Turn </h2>
            <p class={utils.top_auto}> Opponent: {opponent.health} HP. </p>
            <p> Mana per turn: {tickMana()} </p>
            <button
              class={utils.btn}
              onClick={() => {
                setPause(false);
              }}
            >
              <p>Next</p>
            </button>
          </Match>
          <Match when={state.combat.turn === 0}>
            <h2> Your Turn </h2>
            <p class={utils.top_auto}> Opponent: {opponent.health} HP. </p>
            <p> Mana per turn: {tickMana()} </p>
            <For each={state.techniques}>
              {(item, i) => (
                <button
                  classList={{
                    [utils.btn]: true,
                    [utils.btn_active]: item.active,
                  }}
                  onClick={() => {
                    setState("techniques", i(), "active", (a) => !a);
                  }}
                >
                  {item.name}
                </button>
              )}
            </For>
            <button
              class={utils.btn}
              onClick={() => {
                if (tickMana() <= state.mana) {
                  setPause(false);
                } else {
                  sendModal("You are out of mana!");
                }
              }}
            >
              <p>Continue</p>{" "}
            </button>
          </Match>
        </Switch>
      </Template>
    </>
  );
};
