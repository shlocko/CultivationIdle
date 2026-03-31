import { type Component } from "solid-js";
import utils from "../styles/utils.module.css";
import quickInfo from "../styles/QuickInfo.module.css";
import { state, rankInfo, clear, maxHealth } from "../state/store";
import { HealthBar } from "./HealthBar";
import { ManaBar } from "./ManaBar";
import { A } from "@solidjs/router";

export const QuickInfo: Component = () => {
	return (
		<div class={`${utils.quickinfo} ${utils.border} ${utils.innerBackground}`}>


			<span> Rank: {rankInfo[state.rank].name}</span>
			<span> Next rank: {rankInfo[state.rank].advMana} </span>
			<A class={utils.btn} href="/inventory">
				<p>Inventory</p>
			</A>
			<button
				class={utils.btn}
				onClick={() => {
					clear();
					window.location.reload()
				}}
			>
				<p>Clear Local Data</p>
			</button>
		</div>
	)
};
