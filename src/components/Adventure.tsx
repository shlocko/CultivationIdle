import { type Component, Show, createMemo } from "solid-js";
import utils from "../styles/utils.module.css";
import { LootTable, setAction, state } from "../state/store";
import { Combat } from "./Combat";
import { init } from "../functions/combatMethods";
import { getItem } from "../state/items";
import { beginnerArea } from "../state/beginnerArea";

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
			<h2> Adventure </h2>
			<p>
				{" "}
				Progress: {state.adventure.areaTickCounts[state.adventure.area]}
				/500
			</p>
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
		</>
	);
};
