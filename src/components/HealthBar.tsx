import { type Component } from "solid-js";
import utils from "../styles/utils.module.css";
import { state, rankInfo, maxHealth } from "../state/store";

export const HealthBar: Component = () => {
	console.log(1 + (state.health / maxHealth()) * 16);
	return (
		<div
			classList={{
				[utils.healthbar]: true,
				[utils.text_outline]: true,
			}}
			style={{
				"background-image": `url("/CultivationIdle/health${Math.floor(18 - (1 + (state.health / Math.max(maxHealth(), 1)) * 16)) + ".png"}"), url("/CultivationIdle/healthbar.png")`,
				"background-size": "15rem 4rem",
				"background-repeat": "no-repeat",
			}}
		>
			<div
				style={
					{
						//"text-shadow": "-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff",
					}
				}
			>
				{state.health}/{maxHealth()}
			</div>
		</div >
	);
};
