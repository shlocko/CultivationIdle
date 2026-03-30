import { type Component } from "solid-js";
import statBar from "../styles/StatBar.module.css";
import { state, rankInfo, maxHealth } from "../state/store";

export const HealthBar: Component = () => {
	return (
		<div
			class={statBar.statBar}
			>
			<div
				class={`${statBar.statBarFill} ${statBar.hpBar}`}
				style={{
					width: `${(state.health / maxHealth())*100}%`,
					height: "100%",
					transition: "width 0.3s ease-in-out",
				}}
			>
			</div>
		</div>
	);
};
