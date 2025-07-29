import { type Component, Show, For } from "solid-js";
import utils from "../styles/utils.module.css";
import { state, setState, setAction, } from "../state/store";
import { ChooseAspect } from "./ChooseAspect";

export const Meditate: Component = () => {
	return (
		<>
			<Show when={!state.aspect && state.rank >= 1}>
				<ChooseAspect />
			</Show>
			<For each={state.meditationTechniques}>
				{(item, i) => (
					<button
						classList={{
							[utils.btn]: true,
							[utils.wide]: true,
							[utils.btn_active]:
								i() === state.activeMeditationTechnique,
						}}
						onClick={() => {
							setState("activeMeditationTechnique", i());
						}}
					>
						<p> {item.name} </p>
					</button>
				)}
			</For>

			<button
				class={`${utils.btn} ${utils.wide_top_auto}`}
				classList={{
					[utils.btn_active]: state.action === "Meditate"
				}}
				onClick={() => setAction("Meditate")}
			>
				<p>Meditate</p>
			</button>
		</>
	);
};
