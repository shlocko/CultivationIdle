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
import { beginnerArea } from "../state/beginnerArea";
import { createMemo } from "solid-js";

// Happens every tick
export const perTick = () => {
	if (state.mana < state.maxMana) {
		setState("mana", (m) => m + state.passiveManaRegen);
	}
	if (state.mana > state.maxMana) {
		setState("mana", state.maxMana);
	}
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
	if (state.adventure.area === "BeginnerArea") {
		setState("adventure", "areaTickCounts", "BeginnerArea", (tc) => tc + 1);
		/*if (eventRoll >= 99) {
		} else if (eventRoll >= 95) {
			const pick = Math.floor(
				Math.random() * beginnerArea.rareEvents.length,
			);
			if (beginnerArea.rareEvents[pick].isUnlocked()) {
				sendModal(
					`You encounter ${beginnerArea.rareEvents[pick].name}!`,
				);
				beginnerArea.rareEvents[pick].activation();
			}
		} else if (eventRoll >= 80) {
			const pick = Math.floor(
				Math.random() * beginnerArea.uncommonEvents.length,
			);
			if (beginnerArea.uncommonEvents[pick].isUnlocked()) {
				sendModal(
					`You encounter ${beginnerArea.uncommonEvents[pick].name}!`,
				);
				beginnerArea.uncommonEvents[pick].activation();
			}
		} else*/ if (eventRoll >= 0) {
			console.log("roll");
			let pick = Math.floor(
				Math.random() * beginnerArea.commonEvents.length,
			);
			pick = 0;
			console.log(pick);
			if (beginnerArea.commonEvents[pick].isUnlocked()) {
				sendModal(
					`You encounter ${beginnerArea.commonEvents[pick].name}!`,
				);
				beginnerArea.commonEvents[pick].activation();
			}
		}
	}
};
