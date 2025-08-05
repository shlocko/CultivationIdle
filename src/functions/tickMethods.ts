import {
	sendAspectChoice,
	sendMeditationTechniqueChoice,
	sendModal,
	sendTechniqueChoice,
} from "../state/modalMessages";
import {
	setState,
	state,
	canAdvance,
	advance,
	maxHealth,
	setAction,
	getLocation,
	getPassiveManaRegen,
	getPassiveHealthRegen,
} from "../state/store";
import { meditationTechniqueEffect } from "./techniqueMethods";
import { VerdantFields } from "../areas/VerdantFields";
import { createMemo } from "solid-js";
import { areas } from "../areas/area";
import { combatLog } from "../components/Combat";

// Happens every tick
export const perTick = () => {
	console.log(getPassiveManaRegen())
	setState("mana", (m) => m + getPassiveManaRegen());
	setState("health", (h) => h + getPassiveHealthRegen())
	if (state.health > maxHealth()) {
		setState("health", maxHealth());
	}

	// Check for advancement
	if (canAdvance()) {
		advance();
	}
};

export const trainTick = () => {
	if (state.mana >= getPassiveManaRegen() * 3) {
		const num: number = state.trainingTechnique;
		setState("mana", (mana) => mana - getPassiveManaRegen() * 3);
		setState("maxMana", (max) => max + getPassiveManaRegen() / 2);
		if (
			state.trainingTechnique >= 0 &&
			state.techniques[num].mastery < 10000
		) {
			setState("techniques", num, "mastery", (x) => x + 1);
		}
	} else {
		setAction("Meditate")
	}
};

export const meditateTick = () => {
	if (
		state.meditationTechniques.length > 0 &&
		state.activeMeditationTechnique >= 0
	) {
		meditationTechniqueEffect[
			state.meditationTechniques[state.activeMeditationTechnique]
				.id as keyof typeof meditationTechniqueEffect
		](state.meditationTechniques[state.activeMeditationTechnique].level);
	}
	if (state.health >= maxHealth() && state.mana >= state.maxMana && state.train.active === true) {
		setAction("Train")
	}
};

export const adventureTick = () => {
	let location = state.adventure.location
	if (state.adventure.subLocation) {
		location = state.adventure.subLocation
	}
	console.log("adventure");
	const eventRoll = Math.random() * 100 + 1;
	console.log(eventRoll);
	setState("adventure", "areas", location, "tickCount", (tc) => tc + 1);
	setState("adventure", "currentRun", (cr) => cr + 1)
	if (state.adventure.currentRun > state.adventure.areas[getLocation()].longestRun) {
		setState("adventure", "areas", getLocation(), "longestRun", state.adventure.currentRun)
	}
	if (eventRoll >= 99) {
		// Epic Event
		const pick = Math.floor(
			Math.random() * areas[location].epicEvents.length,
		);
		if (areas[location].epicEvents[pick].isUnlocked()) {
			/*sendModal(
				`You encounter ${areas[state.adventure.location].rareEvents[pick].name}!`,
			);*/
			areas[location].epicEvents[pick].activation();
		}
	} else if (eventRoll >= 95) {
		// Rare Event
		const pick = Math.floor(
			Math.random() * areas[location].rareEvents.length,
		);
		if (areas[location].rareEvents[pick].isUnlocked()) {
			/*sendModal(
				`You encounter ${areas[state.adventure.location].rareEvents[pick].name}!`,
			);*/
			areas[location].rareEvents[pick].activation();
		}
	} else if (eventRoll >= 80) {
		// Uncommon Event
		const pick = Math.floor(
			Math.random() * areas[location].uncommonEvents.length,
		);
		console.log(pick);
		if (areas[location].uncommonEvents[pick].isUnlocked()) {
			/*sendModal(
				`You encounter ${areas[state.adventure.location].uncommonEvents[pick].name}!`,
			);*/
			areas[location].uncommonEvents[pick].activation();
		}
	} else if (eventRoll >= 30) {
		// Common Event
		console.log("roll");
		let pick = Math.floor(
			Math.random() * areas[location].commonEvents.length,
		);
		console.log(pick);
		if (areas[location].commonEvents[pick].isUnlocked()) {
			/*sendModal(
				`You encounter ${areas[state.adventure.location].commonEvents[pick].name}!`,
			);*/
			areas[location].commonEvents[pick].activation();
		}
	}
};

export const perCombatRound = () => {

	setState("mana", (m) => m + getPassiveManaRegen());
	setState("health", (h) => h + getPassiveHealthRegen())
	if (state.health > maxHealth()) {
		setState("health", maxHealth());
	}
	if (state.mana > state.maxMana) {
		setState("mana", state.maxMana);
	}
	combatLog().push(`You regained ${getPassiveManaRegen()} mana and ${getPassiveHealthRegen()} health between rounds.`)
}
