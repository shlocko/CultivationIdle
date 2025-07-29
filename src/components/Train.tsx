import { createSignal, type Component, For } from "solid-js";
import { state, setState, setAction } from "../state/store";
import utils from "../styles/utils.module.css";
import { Template } from "./Template";

export const Train: Component = () => {
	return (
		<>
			<For each={state.techniques}>
				{(item, i) => (
					<button
						classList={{
							[utils.btn]: true,
							[utils.wide]: true,
							[utils.btn_active]: i() === state.trainingTechnique,
						}}
						onClick={() => {
							setState("trainingTechnique", i());
						}}
					>
						<p>
							{" "}
							{item.name}: {item.mastery}/3000{" "}
						</p>
					</button>
				)}
			</For>
			<button
				class={`${utils.btn} ${utils.wide_top_auto}`}
				onClick={() => {
					setAction("Train");
				}}
			>
				<p>Train</p>
			</button>{" "}
		</>
	);
};
