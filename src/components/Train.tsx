import { createSignal, type Component, For } from "solid-js";
import { state, setState, setAction } from "../state/store";
import utils from "../styles/utils.module.css";
import { Template } from "./Template";

export const Train: Component = () => {
	return (
		<div class={utils.train}>
			<select value={state.trainingTechnique} onChange={(e) => setState("trainingTechnique", Number(e.target.value))} style={{
				"line-height": "4rem",
				"text-align": "center",
				"font-size": "1.4rem",
				"flex-grow": "1",
			}}
				class={utils.dropdown}
			>
				<For each={state.techniques}>
					{(item, i) => (
						<option value={i()}>{item.name}: {item.mastery}/3000</option>
					)}
				</For>
			</select >
			<button
				class={`${utils.btn}`}
				classList={{
					[utils.btn_active]: state.action === "Train"
				}}
				style={{
					"flex-grow": "0",
					"min-width": "15rem"
				}}
				onClick={() => {
					setAction("Train");
				}}
			>
				<p>Train</p>
			</button>{" "}
		</div>
	);
};
