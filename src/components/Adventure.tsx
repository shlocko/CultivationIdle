import { type Component, createSignal, Show } from "solid-js";
import utils from "../styles/utils.module.css";
import { Template } from "./Template";
import { setAction, setState, state } from "../state/store";
import { sendModal } from "../state/modalMessages";
import styles from "../styles/Combat.module.css";
import { Combat } from "./Combat";
import { init } from "../functions/combatMethods";

export const Adventure: Component = () => {
	return (
		<>
			<Template>
				<h2> Adventure </h2>
				<Show when={state.state === "Combat"}>
					<Combat />
				</Show>
				<Show when={state.state !== "Combat"}>
					<button
						class={(utils.btn, utils.top_auto)}
						onClick={() => {
							init([
								"bandit",
								"bandit",
								"bandit",
								"bear",
								"bear",
								"waderingKnight",
							]);
						}}
					>
						<p>test</p>
					</button>
				</Show>
				<button
					class={(utils.btn, utils.top_auto)}
					onClick={() => {
						setAction("Adventure");
					}}
				>
					<p> Adventure </p>
				</button>
			</Template>
		</>
	);
};
