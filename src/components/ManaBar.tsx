import { createMemo, type Component } from "solid-js";
import utils from "../styles/utils.module.css";
import statBar from "../styles/StatBar.module.css";
import { state, rankInfo, maxHealth } from "../state/store";

export const ManaBar: Component = () => {
	const maxManaPercent = createMemo(
		() => (state.maxMana / rankInfo[state.rank].advMana) * 100,
	);
	const manaPercent = createMemo(() => (state.mana / state.maxMana) * 100);
	return (
		<div
			class={statBar.statBar}
			>
			<div
				class={`${statBar.statBarFillNoShading} ${statBar.qiBar}`}
				style={{
					width: `${maxManaPercent()}%`,
					height: "100%",
					transition: "width 0.3s ease-in-out",
				}}
			>
				<div
				class={`${statBar.statBarFill} ${statBar.qiBarInner}`}
					style={{
						width: `${manaPercent()}%`,
						height: "100%",
						transition: "width 0.3s ease-in-out",
					}}
				>
				</div>
			</div>
		</div>
	);
};
