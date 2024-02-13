import { type Component, createSignal, Show } from "solid-js";
import utils from "../styles/utils.module.css";
import { Template } from "./Template";
import { LootTable, setAction, setState, state } from "../state/store";
import { sendModal } from "../state/modalMessages";
import styles from "../styles/Combat.module.css";
import { Combat } from "./Combat";
import { init } from "../functions/combatMethods";
import { getItem } from "../state/items";

export const Adventure: Component = () => {
	let testTable: LootTable = [
		{
			item: getItem("Health Potion"),
			min: 1,
			max: 5,
			chance: 50,
		},
	];
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
							init(
								[
									"wanderingKnight",
									"wanderingKnight",
									"wanderingKnight",
									"wanderingKnight",
								],
								testTable,
								10,
								100,
							);
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
