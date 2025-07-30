import { type Component, Show, For } from "solid-js";
import utils from "../styles/utils.module.css";
import { state, setState, setAction, } from "../state/store";
import { ChooseAspect } from "./ChooseAspect";

export const Meditate: Component = () => {
	return (

		<div class={utils.meditate}>
			<select value={state.activeMeditationTechnique} onChange={(e) => setState("activeMeditationTechnique", Number(e.target.value))} style={{
				"line-height": "4rem",
				"text-align": "center",
				"font-size": "1.4rem",
				"flex-grow": "1",
			}}
				class={utils.dropdown}
			>
				<For each={state.meditationTechniques}>
					{(item, i) => (
						<option value={i()}>{item.name}</option>
					)}
				</For>
			</select >
			<button
				class={`${utils.btn}`}
				classList={{
					[utils.btn_active]: state.action === "Meditate"
				}}
				style={{
					"flex-grow": "0",
					"min-width": "15rem"
				}}
				onClick={() => {
					setAction("Meditate");
				}}
			>
				<p>Meditate</p>
			</button>{" "}
		</div>
	);
};
