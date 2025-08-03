import { type Component, Show, For } from "solid-js";
import utils from "../styles/utils.module.css";
import { state, setState, setAction, actionButton, } from "../state/store";
import { ChooseAspect } from "./ChooseAspect";

export const Meditate: Component = () => {
	return (

		<div class={utils.meditate}>
			<Show when={state.meditationTechniques.length > 0}>
				<select value={state.activeMeditationTechnique} onChange={(e) => setState("activeMeditationTechnique", Number(e.target.value))} style={{
					"line-height": "4rem",
					"text-align": "center",
					"font-size": "1.4rem",
					"flex-grow": "10",
				}}
					class={utils.dropdown}
				>
					<For each={state.meditationTechniques}>
						{(item, i) => (
							<option value={i()}>{item.name}</option>
						)}
					</For>
				</select >
			</Show>
			<button
				class={`${utils.btn}`}
				classList={{
					[utils.btn_active]: state.action === "Meditate"
				}}
				style={{
					"flex-grow": "1",
					"min-width": "15rem"
				}}
				onClick={() => {
					actionButton("Meditate");
				}}
			>
				<p>Meditate</p>
			</button>{" "}
		</div>
	);
};
