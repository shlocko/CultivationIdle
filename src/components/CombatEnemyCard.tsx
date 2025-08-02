import { Component } from "solid-js"
import utils from "../styles/utils.module.css";
import { combatState, state } from "../state/store"
import { Enemy } from "../state/enemies"

export const CombatEnemyCard: Component<Enemy> = (props) => {

	return (
		<div class={utils.enemy_card}>
			<p>{props.name}</p>
			<p>HP: {props.health}</p>
			<p>DMG: {props.damage}</p>
		</div>
	)

}
