import { Component, Match, Switch } from "solid-js"
import { sendShop } from "../state/modalMessages"
import { greenrestShop } from "../state/shops"
import utils from "../styles/utils.module.css"
import { state } from "../state/store"

export const VerdantFieldsCamp: Component = () => {

	return (
		<div class={utils.container_no_border}>
			<h2> {state.adventure.areas.VerdantFields.unlocks.town ? "Greenrest" : "VerdantFields Camp"} </h2>
			<Switch>
				<Match when={state.adventure.areas.VerdantFields.unlocks.town}>
					<button
						classList={{
							[utils.btn]: true,
							[utils.wide]: true,
						}}
						onClick={() => { sendShop(greenrestShop) }}> Shop </button>
				</Match>
			</Switch>
		</div>
	)
}
