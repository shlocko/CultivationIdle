import { Component, For } from "solid-js";
import utils from "../styles/utils.module.css"
import { state } from "../state/store";
import { AreaName, areas } from "../areas/area";

export const Travel: Component = () => {
	return (
		<div classList={{
			[utils.container]: true,
		}}>
			<h2>Choose a destination:</h2>
			<h4>Current location: {state.adventure.location}</h4>
			<For each={Object.keys(areas).filter((area) => state.adventure.areas[area as AreaName].unlocked && area !== state.adventure.location && areas[area as AreaName].type === "normal")}>
				{(area) => (
					<p>{area}</p>
				)}
			</For>

		</div>
	)
}
