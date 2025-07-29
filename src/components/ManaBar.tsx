import { createMemo, type Component } from "solid-js";
import utils from "../styles/utils.module.css";
import manaBlue from "../assets/mana-blue.png";
import manaPurple from "../assets/mana-purple.png";
import starLong from "../assets/star-long.png"
import { state, rankInfo, maxHealth } from "../state/store";

export const ManaBar: Component = () => {
	const maxManaPercent = createMemo(() => (state.maxMana / rankInfo[state.rank].advMana) * 100)
	const manaPercent = createMemo(() => (state.mana / state.maxMana) * 100)
	console.log(maxManaPercent())
	return (
		<div class={utils.manabar}>
			<div style={{
				"position": "absolute",
				"top": "0",
				"left": "0",
				"z-index": "0",
				"background-image": `url(${starLong}), url(${manaBlue})`,
				"background-size": "100rem 100%",
				"background-repeat": "no-repeat",
				"width": `${maxManaPercent()}%`,
				"height": "100%",
				"transition": "width 0.3s ease-in-out",
			}}>
				<div style={{
					"position": "absolute",
					"top": "0",
					"left": "0",
					"z-index": "0",
					"background-image": ` url(${manaPurple})`,
					"background-size": "100rem 100%",
					"background-repeat": "no-repeat",
					"width": `${manaPercent()}%`,
					"height": "100%",
					"transition": "width 0.3s ease-in-out",
				}}>
				</div>
			</div>
			<div style={{
				"position": "absolute",
				"z-index": "2",
				"left": "50%",
				"transform": "translateX(-50%)",
				"bottom": "1rem",

				//"text-shadow": "-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff",

			}}>Mana: {state.mana.toFixed(1)}/{state.maxMana.toFixed(1)}/{rankInfo[state.rank].advMana}</div>
		</div >
	)
}
