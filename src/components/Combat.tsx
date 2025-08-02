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
	opponent,
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

export const [actionChoice, setActionChoice] = createSignal(-1);
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
			<h2> Your Turn </h2>
			<p class={utils.top_auto}> </p>
			<p> Mana per turn: {tickMana().toFixed(2)} </p>
			<p> Damage to target: {damageToTarget()} </p>
			<p> Damage to area: {damageToArea()} </p>
			<p> Thorns Damage: {damageThorns()} </p>
			<p>
				{" "}
				Increasing target Damage:{" "}
				{damageIncreasingTargetCount()}{" "}
			</p>
			<p> Max Mana Gain: {manaGainFromTechniques()} </p>
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
						Attack
					</button>
				</div>
				<div class={styles.action_col}></div>
			</div>
			<button
				class={utils.btn}
				onClick={() => {
					if (actionChoice() === 1 && !hasItem("Health Potion")) {
						sendModal("You do not have any Health Potions.")
					} else if (actionChoice() === 2 && !hasItem("Mana Potion")) {
						sendModal("You do not have any Mana Potions.")
					} else if (tickMana() >= state.mana) {
						sendModal("You are out of mana!");
					} else {
						endTurn();
					}
				}}
			>
				<p>Continue</p>{" "}
			</button>
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
