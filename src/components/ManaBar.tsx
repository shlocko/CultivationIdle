import { type Component } from "solid-js";
import utils from "../styles/utils.module.css";
import { state, rankInfo, maxHealth } from "../state/store";

export const ManaBar: Component = () => {
	return (
		<div class={utils.manabar} style={{
		}}>
			<div>Mana: {state.mana}/{state.maxMana}/{rankInfo[state.rank].advMana}</div>
		</div>
	)
}
