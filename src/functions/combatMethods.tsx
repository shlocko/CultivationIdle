import { cloneDeep } from "lodash";
import { Enemies, Enemy, enemyList } from "../state/enemies";
import {
	LootCollection,
	LootTable,
	State,
	changeState,
	combatState,
	damageFromWeapon,
	damageThorns,
	damageToArea,
	damageToTarget,
	manaGainFromTechniques,
	setAction,
	setCombatState,
	setState,
	state,
	targetsIncreasingTargetCount,
	tickMana,
} from "../state/store";
import toast from "solid-toast";

export const effectMultiplier = (mult: number) => {
	return Math.pow(mult, 2);
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

const dealIncreasingTargetDamage = () => {
	//console.log("increasing target");
	combatState.opponents.forEach((enemy, ei) => {
		state.techniques.forEach((technique, ti) => {
			if (
				technique.effect === "increasingTargetCountDamage" &&
				targetsIncreasingTargetCount(technique.multiplier).find(
					(element) => element === ei,
				) !== undefined
			) {
				if (technique.active || technique.onGoing) {
					setCombatState(
						"opponents",
						ei,
						"health",
						(hp) =>
							hp -
							technique.magnitude *
								effectMultiplier(technique.multiplier),
					);
				}
			} else if (
				technique.effect === "increasingTargetCountCloneWeapon" &&
				targetsIncreasingTargetCount(technique.multiplier + 1).find(
					(element) => element === ei,
				) !== undefined
			) {
				if (
					(technique.active || technique.onGoing) &&
					ei !== combatState.activeEnemy
				) {
					//console.log(`weapon multi`);
					setCombatState(
						"opponents",
						ei,
						"health",
						(hp) => hp - damageFromWeapon(),
					);
				}
			}
		});
	});
};

export const pickLoot = (table: LootTable): LootCollection => {
	let collection = table.map((item) => {
		let roll = Math.random() * 100 + 1;
		if (roll >= item.chance) {
			let amt =
				Math.floor(Math.random() * (item.max - item.min + 1)) +
				item.min;
			return { name: item.item.name, count: amt };
		}
	});
	collection = collection.filter((item) => item !== null);
	return collection as LootCollection;
};

export const init = (
	enemies: Enemies[],
	loot: LootTable,
	coinMin: number,
	coinMax: number,
	returnFunction?: () => void,
) => {
	let arr = [] as Enemy[];
	enemies.forEach((e, i) => {
		arr.push(cloneDeep(enemyList[e]));
	});
	if (returnFunction) {
		setCombatState("returnFunction", returnFunction);
	} else {
		setCombatState("returnFunction", undefined);
	}
	setCombatState("opponents", arr);
	setCombatState("returnState", state.state);
	setCombatState("loot", loot);
	setCombatState("coinMin", coinMin);
	setCombatState("coinMax", coinMax);
	setCombatState("returnState", state.state);
	setState("combat", "turn", 0);
	changeState("Combat");
	state.techniques.forEach((e, i) => {
		setState("techniques", i, "active", false);
		setState("techniques", i, "onGoing", false);
		setState("techniques", i, "aggregateEffect", 0);
	});
};

export const endTurn = () => {
	dealTargetDamage();
	dealAreaDamage();
	dealIncreasingTargetDamage();
	setState("mana", (mana) => mana - tickMana());
	setState("maxMana", (mana) => mana + manaGainFromTechniques());
	toast("Damage dealt");
	setState("combat", "turn", 1);
	state.techniques.forEach((e, i) => {
		if (e.active && e.continuous) {
			setState("techniques", i, "onGoing", true);
		}
		if (e.effect === "buildingPhysicalBonus") {
			if (e.active || e.onGoing) {
				setState(
					"techniques",
					i,
					"aggregateEffect",
					(ae) => ae + e.magnitude * effectMultiplier(e.multiplier),
				);
			} else {
				setState("techniques", i, "aggregateEffect", 0);
			}
		}
	});
	state.techniques.forEach((e, i) => {
		setState("techniques", i, "active", false);
	});
};

export const enemyTurn = () => {
	combatState.opponents.forEach((enemy, ei) => {
		setCombatState("opponents", ei, "health", (hp) => hp - damageThorns());
		setState("health", (hp) => hp - enemy.damage);
	});
	    setState("combat", "turn", 0);
};
