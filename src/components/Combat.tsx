import {
	Show,
	type Component,
	Switch,
	Match,
	For,
	JSXElement,
	createSignal,
} from "solid-js";
import utils from "../styles/utils.module.css";
import { Template } from "./Template";
import {
	activeTechniqueCount,
	changeState,
	clearNotOngoing,
	combatState,
	damageToArea,
	damageToTarget,
	opponent,
	resetActiveTechniques,
	setAction,
	setCombatState,
	setPause,
	setState,
	state,
	tick,
	tickMana,
} from "../state/store";
import { sendModal } from "../state/modalMessages";
import styles from "../styles/Combat.module.css";
import { endTurn, enemyTurn } from "../functions/combatMethods";

export const [actionChoice, setActionChoice] = createSignal(-1);
export const Combat: Component = () => {
	return (
		<>
			<For each={combatState.opponents}>
				{(item, i) => (
					<>
						<p>
							{" "}
							{item.name}: {item.health} HP{" "}
							<button
								classList={{
									[utils.btn]: true,
									[utils.btn_active]:
										combatState.activeEnemy === i(),
								}}
								onClick={() => {
									setCombatState("activeEnemy", i());
								}}
							>
								Target
							</button>
						</p>
					</>
				)}
			</For>
			<Switch>
				<Match when={state.combat.turn === 1}>
					<h2> Opponent's Turn </h2>
					<p class={utils.top_auto}>
						{" "}
						Opponent: {opponent.health} HP.{" "}
					</p>
					<p> Mana per turn: {tickMana()} </p>
					<button
						class={utils.btn}
						onClick={() => {
							enemyTurn();
						}}
					>
						<p>Next</p>
					</button>
				</Match>
				<Match when={state.combat.turn === 0}>
					<h2> Your Turn </h2>
					<p class={utils.top_auto}> </p>
					<p> Mana per turn: {tickMana().toFixed(2)} </p>
					<p> Damage to target: {damageToTarget()} </p>
					<p> Damage to area: {damageToArea()} </p>
					<div class={styles.action_container}>
						<div class={styles.action_col}></div>
						<div class={styles.action_col}>
							<For each={state.techniques}>
								{(item, i) => (
									<div>
										<button
											classList={{
												[utils.btn]: true,
												[utils.btn_active]: item.active,
												[utils.btn_ongoing]:
													item.onGoing,
											}}
											onClick={() => {
												if (item.onGoing) {
													setState(
														"techniques",
														i(),
														"onGoing",
														false,
													);
												} else {
													if (
														activeTechniqueCount() <
															Math.ceil(
																state.rank / 3,
															) &&
														!item.active
													) {
														setState(
															"techniques",
															i(),
															"active",
															true,
														);
													} else {
														setState(
															"techniques",
															i(),
															"active",
															false,
														);
													}
												}
												setActionChoice(-1);
											}}
										>
											{item.name} x{item.multiplier}
										</button>
										<button
											class={utils.btn}
											onClick={() => {
												setState(
													"techniques",
													i(),
													"multiplier",
													(n) => n + 1,
												);
											}}
										>
											{" "}
											+{" "}
										</button>
										<button
											class={utils.btn}
											onClick={() => {
												setState(
													"techniques",
													i(),
													"multiplier",
													(n) => n - 1,
												);
											}}
										>
											{" "}
											-{" "}
										</button>
									</div>
								)}
							</For>
						</div>
						<div class={styles.action_col}>
							<button
								classList={{
									[utils.btn]: true,
									[utils.btn_active]: actionChoice() === 1,
								}}
								onClick={() => {
									setActionChoice(1);
									clearNotOngoing();
								}}
							>
								Health Potion
							</button>
							<button
								classList={{
									[utils.btn]: true,
									[utils.btn_active]: actionChoice() === 2,
								}}
								onClick={() => {
									setActionChoice(2);
									clearNotOngoing();
								}}
							>
								Mana Potion
							</button>
							<button
								classList={{
									[utils.btn]: true,
									[utils.btn_active]: actionChoice() === 3,
								}}
								onClick={() => {
									setActionChoice(3);
									clearNotOngoing();
								}}
							>
								Punch
							</button>
						</div>
						<div class={styles.action_col}></div>
					</div>
					<button
						class={utils.btn}
						onClick={() => {
							if (tickMana() <= state.mana) {
								endTurn();
							} else {
								sendModal("You are out of mana!");
							}
						}}
					>
						<p>Continue</p>{" "}
					</button>
				</Match>
			</Switch>
			<button
				class={utils.btn}
				onClick={() => {
					changeState("Tick");
					setAction("Meditate");
				}}
			>
				Flee
			</button>
		</>
	);
};
