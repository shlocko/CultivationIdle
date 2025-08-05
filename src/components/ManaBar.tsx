import { createMemo, type Component } from "solid-js";
import utils from "../styles/utils.module.css";
import { state, rankInfo, maxHealth } from "../state/store";

export const ManaBar: Component = () => {
	const maxManaPercent = createMemo(
		() => (state.maxMana / rankInfo[state.rank].advMana) * 100,
	);
	const manaPercent = createMemo(() => (state.mana / state.maxMana) * 100);
	console.log(maxManaPercent());
	return (
		<div classList={{
			[utils.manabar]: true,
			[utils.text_outline]: true,
		}}>
			<div
				style={{
					position: "absolute",
					top: "0",
					left: "0",
					"z-index": "0",
					"background-image": `url("/CultivationIdle/mana-purple.png")`,
					"background-size": "200rem 100%",
					"background-repeat": "no-repeat",
					width: `100%`,
					height: "100%",
					transition: "width 0.3s ease-in-out",
					filter: "grayscale(1) opacity(0.4)",
				}}
			/>
			<div
				style={{
					position: "absolute",
					top: "0",
					left: "0",
					"z-index": "0",
					"background-image": `url("/CultivationIdle/mana-purple.png")`,
					"background-size": "200rem 100%",
					"background-repeat": "no-repeat",
					width: `${maxManaPercent()}%`,
					height: "100%",
					transition: "width 0.3s ease-in-out",
				}}
			>
				<div
					style={{
						position: "absolute",
						top: "0",
						left: "0",
						"z-index": "0",
						"background-image": ` url("/CultivationIdle/mana-blue.png")`,
						"background-size": "200rem 100%",
						"background-repeat": "no-repeat",
						width: `${manaPercent()}%`,
						height: "100%",
						transition: "width 0.3s ease-in-out",
					}}
				/>
			</div>
			<div
				style={{
					position: "absolute",
					"z-index": "2",
					left: "50%",
					transform: "translateX(-50%)",
					bottom: "1rem",

					//"text-shadow": "-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff",
				}}
			>
				Qi: {state.mana.toFixed(1)}/{state.maxMana.toFixed(1)}/
				{rankInfo[state.rank].advMana}
			</div>
		</div>
	);
};
