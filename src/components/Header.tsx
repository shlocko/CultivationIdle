import { type Component } from "solid-js";
import utils from "../styles/utils.module.css";
import header from "../styles/Header.module.css";
import quickInfo from "../styles/QuickInfo.module.css";
import { maxHealth, state } from "../state/store";
import { HealthBar } from "./HealthBar";
import { ManaBar } from "./ManaBar";

export const Header: Component = () => {

  return (
    <div
      class={`${utils.border} ${header.header}`}
    >
      header

      <div class={`${header.statContainer}`}>
        <div>
          <div class={quickInfo.statLabel}>
            <span>HP:</span><span> {state.health}/{maxHealth()}</span>
          </div>
          <HealthBar />
        </div>
        <div>
          <div class={quickInfo.statLabel}><span>Qi:</span> <span>{state.mana.toFixed(1)}/{state.maxMana.toFixed(1)}
          </span>
          </div>
          <ManaBar />
        </div>
      </div>
    </div>
  );
}
