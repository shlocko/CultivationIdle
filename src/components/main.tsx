import { Switch, type Component, Match } from "solid-js";
import utils from "../styles/utils.module.css";
import { Meditate } from "./Meditate";
import { Train } from "./Train";
import { getLocation, state } from "../state/store";
import { VerdantFieldsCamp } from "./VerdantFieldsCamp";
import { areas } from "../areas/area";
import { A } from "@solidjs/router";
import { sendTravel } from "../state/modalMessages";
import { QuickInfo } from "./QuickInfo";

export const Main: Component = () => {
	return (
		<div classList={{
			[utils.wrapperMain]: true
		}}>
			<div class={`${utils.container} ${utils.border} ${utils.innerBackground}`}>
				<Meditate />
				<Train />
			</div>
			<div
				style={{
					"display": "flex",
					"flex-direction": "column",
					"gap": "1rem",
				}}>
				<div class={`${utils.container} ${utils.border} ${utils.innerBackground}`}>
					<h1>{state.adventure.location}</h1>
					<A classList={{
						[utils.btn]: true,
						[utils.wide]: true,
					}}
						href="/adventure">
						<p>Adventure</p>
					</A>
					<Switch>
						<Match when={state.adventure.location === "VerdantFields"}>
							<VerdantFieldsCamp />
						</Match>
					</Switch>
				</div>
				<button
					class={`${utils.wide_top_auto} ${utils.btn} ${utils.bg}`}
					onClick={() => { sendTravel() }}
				>
					<p>Travel</p>
				</button>
			</div>
		</div >
	);
};
