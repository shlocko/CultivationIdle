import { Switch, type Component, Match } from "solid-js";
import utils from "../styles/utils.module.css";
import { Meditate } from "./Meditate";
import { Train } from "./Train";
import { getLocation, state } from "../state/store";
import { VerdantFieldsCamp } from "./VerdantFieldsCamp";
import { areas } from "../areas/area";
import { A } from "@solidjs/router";
import { sendTravel } from "../state/modalMessages";

export const Main: Component = () => {
	return (
		<>
			<div classList={{
				[utils.row_container]: true
			}}>
				<div classList={{ [utils.container]: true }}>
					<Meditate />
					<Train />
				</div>
				<div
					style={{
						"display": "flex",
						"flex-direction": "column",
					}}>
					<div classList={{ [utils.container]: true }}>
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
						classList={{
							[utils.wide_top_auto]: true,
							[utils.btn]: true,
						}}
						onClick={() => { sendTravel() }}
					>
						<p>Travel</p>
					</button>
				</div>
			</div >
		</>
	);
};
