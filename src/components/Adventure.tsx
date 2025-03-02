import { type Component, Show, createMemo, For } from "solid-js";
import utils from "../styles/utils.module.css";
import { LootTable, setAction, setArea, state } from "../state/store";
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
		<div class={(utils.row_container)}>
			<div class={(utils.container)}>
				<For each={state.adventure.unlockedAreas}>
					{(item, i) => (
						<button classList={{
							[utils.btn]: true,
							[utils.btn_active]: state.adventure.area === item
						}}
							onClick={() => {
								setArea(item)
							}}
						>
							{item}
						</button>
					)}
				</For>
			</div>
			<div classList={{
				[utils.container]: true,
			}}>
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
						class={(utils.btn, utils.wide_top_auto)}
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
					class={(utils.btn, utils.wide_top_auto)}
					onClick={() => {
						setAction("Adventure");
					}}
				>
					<p> Adventure </p>
				</button>
			</div>
		</div>
	);
};
