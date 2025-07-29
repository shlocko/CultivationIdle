import { type Component } from "solid-js";
import healthBar1 from "../assets/health1.png"
import healthBar from "../assets/healthbar.png"
import utils from "../styles/utils.module.css";
import { state, rankInfo, maxHealth } from "../state/store";

export const HealthBar: Component = () => {
	const images = import.meta.glob("/src/assets/health*.png", { eager: true });

	const imageList = Object.entries(images).map(([path, mod]) => {
		const typedMod = mod as { default: string }
		return {
			name: path.split("/").pop(),
			src: typedMod.default,
		}
	});
	console.log(1 + (state.health / maxHealth()) * 16)
	return (
		<div class={utils.healthbar} style={{
			"background-image": `url(${imageList.find((img) => img.name === "health" + Math.floor(18 - (1 + (state.health / maxHealth()) * 16)) + ".png")?.src}), url(${healthBar})`,
			"background-size": "15rem 4rem",
			"background-repeat": "no-repeat",
		}}>
			<div style={{
				//"text-shadow": "-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff",
			}}>{state.health}/{maxHealth()}</div>
		</div>
	)
}
