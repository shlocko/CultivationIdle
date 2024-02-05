import { For, type Component } from "solid-js";
import { Template } from "./Template";
import utils from "../styles/utils.module.css";
import { inventoryAdd, setState, state } from "../state/store";
import { basicShop } from "../state/shops";
import toast from "solid-toast";

export const Shop: Component = () => {
  return (
    <Template>
      <h2> Shop </h2>
      <For each={basicShop}>
        {(item, i) => (
          <button
            class={utils.btn}
            onClick={() => {
              if (state.coins >= item.cost) {
                setState("coins", (c) => c - item.cost);
                inventoryAdd(item.item, 1);
                toast(`${item.item} purchased`);
              }
            }}
          >
            {item.item}
          </button>
        )}
      </For>
      <div class={utils.top_auto}></div>
    </Template>
  );
};
