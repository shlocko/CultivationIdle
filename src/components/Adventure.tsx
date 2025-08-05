import { type Component, Show, createMemo, For } from "solid-js";
import utils from "../styles/utils.module.css";
import { LootTable, actionButton, setAction, setArea, state } from "../state/store";
import { Combat } from "./Combat";
import { initCombat } from "../functions/combatMethods";
import { getItem } from "../state/items";
import { VerdantFields } from "../areas/VerdantFields";
import { areas } from "../areas/area";

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
				<For each={Object.keys(state.adventure.areas).filter(key => state.adventure.areas[key].unlocked && !areas[key].subArea)}>
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
				<Show when={state.state === "Combat"}>
					<Combat />
				</Show>
				<Show when={state.state !== "Combat"}>
					<h2> {state.adventure.subLocation || state.adventure.location} </h2>
					<p>
						{" "}
						Progress: {state.adventure.areas[state.adventure.subLocation || state.adventure.location].tickCount}
					</p>
					<button
						class={`${utils.btn} ${utils.wide_top_auto}`}
						onClick={() => {
							initCombat(
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
				</Show>
			</div>

			<Show when={state.state !== "Combat"}>
				<div class={(utils.container)}
					style={{
						"flex": "0 0 20rem",
					}}
				>
					<p>Area Info</p>
					<For each={Object.keys(state.adventure.areas).filter(key => state.adventure.areas[key].unlocked && areas[key].subArea && areas[key].subAreaTo === state.adventure.location)}>
						{(item, i) => (
							<button classList={{
								[utils.btn]: true,
								[utils.btn_active]: state.adventure.subLocation === item
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
			</Show>
		</div>
	);
};
