import { createSignal, type Component, Show, For } from "solid-js";
import utils from "../styles/utils.module.css";
import { state, setState, setAction,} from "../state/store";
import { Template } from "./Template";
import { ChooseAspect } from "./ChooseAspect";
import { sendModal } from "../state/modalMessages";

export const Main: Component = () => {
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
				class={(utils.btn, utils.top_auto)}
				onClick={() => setAction("Meditate")}
			>
				<p>Meditate</p>
			</button>
		</>
	);
};
