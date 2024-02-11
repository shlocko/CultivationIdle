import { cloneDeep } from "lodash";
import { Enemies, Enemy, enemyList } from "../state/enemies";
import {
	LootCollection,
	LootTable,
	State,
	changeState,
	combatState,
	damageToArea,
	damageToTarget,
	manaGainFromTechniques,
	setCombatState,
	setOpponent,
	setState,
	state,
	tickMana,
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

export const pickLoot = (table: LootTable): LootCollection => {
	let collection = table.map((item) => {
		let roll = Math.random() * 100 + 1;
		if (roll >= item.chance) {
			let amt =
				Math.floor(Math.random() * (item.max - item.min + 1)) +
				item.min;
			return { name: item.name, count: amt! };
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
) => {
	let arr = [] as Enemy[];
	enemies.forEach((e, i) => {
		arr.push(cloneDeep(enemyList[e]));
	});
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
	});
};

export const endTurn = () => {
	dealTargetDamage();
	dealAreaDamage();
	setState("mana", (mana) => mana - tickMana());
	setState("maxMana", (mana) => mana + manaGainFromTechniques());
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
	combatState.opponents.forEach((e) => {
		setState("health", (hp) => hp - e.damage);
	});
	setState("combat", "turn", 0);
};
