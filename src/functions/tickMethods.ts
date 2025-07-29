import {
	sendAspectChoice,
	sendMeditationTechniqueChoice,
	sendModal,
	sendTechniqueChoice,
} from "../state/modalMessages";
import {
	setState,
	state,
	opponent,
	setOpponent,
	canAdvance,
	advance,
	maxHealth,
} from "../state/store";
import { meditationTechniqueEffect } from "./techniqueMethods";
import { VerdantFields } from "../areas/VerdantFields";
import { createMemo } from "solid-js";
import { areas } from "../areas/area";

// Happens every tick
export const perTick = () => {
	setState("mana", (m) => m + state.passiveManaRegen);
	if (state.health > maxHealth()) {
		setState("health", maxHealth());
	}
	if (opponent.health <= 0) {
		setOpponent("health", 0);
	}

	// Check for advancement
	if (canAdvance()) {
		sendModal("You advance");
		if (state.aspect === undefined) {
			sendAspectChoice();
		}
		sendTechniqueChoice();
		sendMeditationTechniqueChoice();
		advance();
	}
};

export const trainTick = () => {
	if (state.mana >= 3) {
		const num: number = state.trainingTechnique;
		setState("mana", (mana) => mana - 3);
		setState("maxMana", (max) => max + 0.5);
		if (
			state.trainingTechnique >= 0 &&
			state.techniques[num].mastery < 10000
		) {
			setState("techniques", num, "mastery", (x) => x + 1);
		}
	} else {
		setState("action", "Meditate");
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
	} else if (state.mana < state.maxMana) {
		setState("mana", (mana) => mana + 1);
	}
	if (state.health < maxHealth()) {
		setState("health", (h) => h + 1);
	}
};

export const adventureTick = () => {
	console.log("adventure");
	const eventRoll = Math.random() * 100 + 1;
	console.log(eventRoll);
	setState("adventure", "areas", state.adventure.location, "tickCount", (tc) => tc + 1);
	if (eventRoll >= 99) {
	} else if (eventRoll >= 95) {
		const pick = Math.floor(
			Math.random() * areas[state.adventure.location].rareEvents.length,
		);
		if (areas[state.adventure.location].rareEvents[pick].isUnlocked()) {
			sendModal(
				`You encounter ${areas[state.adventure.location].rareEvents[pick].name}!`,
			);
			areas[state.adventure.location].rareEvents[pick].activation();
		}
	} else if (eventRoll >= 80) {
		const pick = Math.floor(
			Math.random() * areas[state.adventure.location].uncommonEvents.length,
		);
		console.log(pick);
		if (areas[state.adventure.location].uncommonEvents[pick].isUnlocked()) {
			sendModal(
				`You encounter ${areas[state.adventure.location].uncommonEvents[pick].name}!`,
			);
			areas[state.adventure.location].uncommonEvents[pick].activation();
		}
	} else if (eventRoll >= 0) {
		console.log("roll");
		let pick = Math.floor(
			Math.random() * areas[state.adventure.location].commonEvents.length,
		);
		//pick = 1;
		console.log(pick);
		if (areas[state.adventure.location].commonEvents[pick].isUnlocked()) {
			sendModal(
				`You encounter ${areas[state.adventure.location].commonEvents[pick].name}!`,
			);
			areas[state.adventure.location].commonEvents[pick].activation();
		}
	}
};
