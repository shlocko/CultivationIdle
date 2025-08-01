import { type Component, Show, createMemo, For } from "solid-js";
import utils from "../styles/utils.module.css";
import { LootTable, actionButton, setAction, setArea, state } from "../state/store";
import { Combat } from "./Combat";
import { init } from "../functions/combatMethods";
import { getItem } from "../state/items";
import { VerdantFields } from "../areas/VerdantFields";

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
			<div class={(utils.container)}
				style={{
					"flex": "0 0 15rem",
				}}
			>
				<For each={Object.keys(state.adventure.areas).filter(key => state.adventure.areas[key].unlocked)}>
					{(item, i) => (
						<button classList={{
							[utils.btn]: true,
							[utils.btn_active]: state.adventure.location === item
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
			}}
				style={{
					"--flex": "0 0 15rem",
				}}
			>
				<h2> Adventure </h2>
				<p>
					{" "}
					Progress: {state.adventure.areas[state.adventure.location].tickCount}
					/500
				</p>
				<Show when={state.state === "Combat"}>
					<Combat />
				</Show>
				<Show when={state.state !== "Combat"}>
					<button
						class={`${utils.btn} ${utils.wide_top_auto}`}
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
					class={`${utils.btn} ${utils.wide_top_auto}`}
					classList={{
						[utils.btn_active]: state.action === "Adventure"
					}}
					onClick={() => {
						actionButton("Adventure");
					}}
				>
					<p> Adventure </p>
				</button>
			</div>

			<Show when={state.state !== "Combat"}>
				<div class={(utils.container)}
					style={{
						"flex": "0 0 20rem",
					}}
				>
					<p>Area Info</p>
				</div>
			</Show>
		</div>
	);
};
