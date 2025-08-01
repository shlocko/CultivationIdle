import { type Component } from "solid-js";
import utils from "../styles/utils.module.css";
import { state, rankInfo } from "../state/store";
import { HealthBar } from "./HealthBar";
import { ManaBar } from "./ManaBar";

export const QuickInfo: Component = () => {
	/*return (
		<div class={utils.quickinfo}>
			<p> HP: {state.health} </p>
			<p>
				Mana: {state.mana.toFixed(1)} of {state.maxMana.toFixed(1)}
			</p>
			<p> Rank: {rankInfo[state.rank].name}, {state.rank} </p>
			<p> Action: {state.action} </p>
			<p> Next Advancement: {rankInfo[state.rank].advMana} </p>
			<p> Aspect: {state.aspect ? state.aspect : "Pure"} </p>
			<p> Coins: {state.coins} </p>
			<p> State: {state.state} </p>
			<p> Prev State: {state.previousState} </p>
			<p> Weapon: {state.equippedWeapon?.name} </p>
		</div>
	);*/
	return (
		<div class={utils.quickinfo}>
			<div style={{
				"display": "flex",
				"flex-direction": "row",
				"column-gap": "1rem",
			}}>
				<HealthBar />
				<p> Level: {state.rank}</p>
			</div>
			<ManaBar />
		</div>
	)
};
