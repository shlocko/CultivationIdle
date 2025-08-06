import { type Component } from "solid-js";
import utils from "../styles/utils.module.css";
import { setPause, load, persist, clear, state, bar } from "../state/store";

export const TickBar: Component = () => {
	return (
		<div class={(utils.tickBar)}>
			<progress
				class={(utils.bar)}
				max="100"
				value={bar()}>
			</progress>
		</div>
	);
};
