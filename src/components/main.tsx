import { type Component } from "solid-js";
import utils from "../styles/utils.module.css";
import { Meditate } from "./Meditate";
import { Train } from "./Train";

export const Main: Component = () => {
	return (
		<>
			<div classList={{
				[utils.row_container]: true
			}}>
				<div classList={{ [utils.container]: true }}><Meditate /></div>
				<div classList={{ [utils.container]: true }}><Train /></div>
			</div>
		</>
	);
};
