import { type Component, Switch, Match, For, createSignal } from "solid-js";
import utils from "../styles/utils.module.css";
import {
	activeTechniqueCount,
	changeState,
	clearNotOngoing,
	combatState,
	damageIncreasingTargetCount,
	damageThorns,
	damageToArea,
	damageToTarget,
	hasItem,
	manaGainFromTechniques,
	setAction,
	setCombatState,
	setState,
	state,
	tickMana,
} from "../state/store";
import { sendModal } from "../state/modalMessages";
import styles from "../styles/Combat.module.css";
import { endTurn, enemyTurn } from "../functions/combatMethods";
import { CombatEnemyCard } from "./CombatEnemyCard";
import { CombatActionsCard } from "./CombatActionsCard";
import { A } from "@solidjs/router";

export const [actionChoice, setActionChoice] = createSignal(-1);
export const [combatLog, setCombatLog] = createSignal<string[]>([])
export const Combat: Component = () => {
	return (
		<>
			<div class={utils.enemies_container}>
				<For each={combatState.opponents}>
					{(item, i) => (
						<>
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
								<CombatEnemyCard {...item} />
							</button>
						</>
					)}
				</For>
			</div>
			<div
				style={{
					"display": "flex",
					"width": "100%",
					"flex-grow": "1",
				}}
			>
				<Switch>
					<Match when={state.combat.turn === 1}>
						<h2> Opponent's Turn </h2>
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
						<div class={utils.combat_card}>
							<CombatActionsCard />
						</div>
						<div classList={{
							[utils.container]: true,
							[utils.combat_card]: true,
						}}>
							<div
								class={utils.container}
								style={{
									"flex-grow": "1",
									"overflow-y": "scroll",
									"height": "10rem",
									"display": "flex",
									"flex-direction": "column-reverse",
								}}>
								<For each={combatLog()}>
									{(item, i) => (
										<>
											{item}
											<br />
										</>

									)}
								</For>
							</div>
							<div
								style={{
									"flex-grow": "1",
								}}>
								Mana per turn: {tickMana().toFixed(2)} <br />
								Damage to target: {damageToTarget().toFixed(2)} <br />
								Damage to area: {damageToArea().toFixed(2)} <br />
								Thorns Damage: {damageThorns().toFixed(2)} <br />
								Increasing target Damage:{" "}
								{damageIncreasingTargetCount().toFixed(2)}{" "} <br />
								Max Mana Gain: {manaGainFromTechniques().toFixed(2)} <br />
								<button
									class={utils.btn}
									onClick={() => {
										if (actionChoice() === 1 && !hasItem("Health Potion")) {
											sendModal("You do not have any Health Potions.")
										} else if (actionChoice() === 2 && !hasItem("Mana Potion")) {
											sendModal("You do not have any Mana Potions.")
										} else if (tickMana() >= state.mana) {
											sendModal("You don't have enough mana!");
										} else {
											endTurn();
										}
									}}
								>
									<p>Continue</p>{" "}
								</button>
								<A
									class={utils.btn}
									onClick={() => {
										changeState("Tick");
										setState("adventure", "currentRun", (cr) => cr - 1)
										setAction("Meditate");
									}}
									href="/"
								>
									Flee
								</A>
							</div>
						</div>
					</Match>
				</Switch>
			</div>
		</>
	);
};
