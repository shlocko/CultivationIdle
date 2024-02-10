import { cloneDeep } from "lodash";
import { Enemies, Enemy, enemyList } from "../state/enemies";
import {
	State,
	changeState,
	combatState,
	damageToArea,
	damageToTarget,
	setCombatState,
	setOpponent,
	setState,
	state,
} from "../state/store";
import toast from "solid-toast";

export const effectMultiplier = (mult: number) => {
	//return 5 * Math.pow(mult + 10, 0.5779) - 19;
	return Math.pow(mult, 0.9);
};

const dealTargetDamage = () => {
	setCombatState(
		"opponents",
		combatState.activeEnemy,
		"health",
		(hp) => hp - damageToTarget(),
	);
};

const dealAreaDamage = () => {
	combatState.opponents.forEach((e, i) => {
		setCombatState("opponents", i, "health", (hp) => hp - damageToArea());
	});
};

export const init = (enemies: Enemies[]) => {
	let arr = [] as Enemy[];
	enemies.forEach((e, i) => {
		arr.push(cloneDeep(enemyList[e]));
	});
	setCombatState("opponents", arr);
	setCombatState("returnState", state.state);
	console.log(combatState.opponents[combatState.activeEnemy]);
	changeState("Combat");
	state.techniques.forEach((e, i) => {
		setState("techniques", i, "active", false);
		setState("techniques", i, "onGoing", false);
	});
};

export const endTurn = () => {
	dealTargetDamage();
	dealAreaDamage();
	toast("Damage dealt");
	setState("combat", "turn", 1);
	state.techniques.forEach((e, i) => {
		if (e.active && e.continuous) {
			setState("techniques", i, "onGoing", true);
		}
	});
	state.techniques.forEach((e, i) => {
		setState("techniques", i, "active", false);
	});
};

export const enemyTurn = () => {
	setState("health", (hp) => hp - 5);
	setState("combat", "turn", 0);
};
