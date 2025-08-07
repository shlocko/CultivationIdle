import { Component, For, createSignal } from "solid-js";
import utils from "../styles/utils.module.css"
import { setState, state, travel } from "../state/store";
import { AreaName, areas } from "../areas/area";

export const Travel: Component = () => {
	const [selection, setSelection] = createSignal<AreaName | undefined>()
	return (
		<div classList={{
			[utils.container]: true,
			[utils.wide]: true,
		}}>
			<h2>Choose a destination:</h2>
			<h4>Current location: {state.adventure.location}</h4>
			<For each={Object.keys(areas).filter((area) => state.adventure.areas[area as AreaName].unlocked && area !== state.adventure.location && !areas[area as AreaName].subArea)}>
				{(area) => (
					<button classList={{
						[utils.btn]: true,
						[utils.btn_active]: selection() === area,
					}}
						onClick={() => setSelection(area as AreaName)}>
						{area}: {areas[area as AreaName].travelTo} ticks
					</button>
				)}
			</For>
			<button classList={{
				[utils.btn]: true,
			}}
				onClick={() => {
					travel(selection()!, areas[selection()!].travelTo!)

					const arr = state.modalMessages.slice();
					arr.shift();
					setState("modalMessages", arr);
				}}
				disabled={selection() === undefined}
			>
				Travel
			</button>
		</div>
	)
}
