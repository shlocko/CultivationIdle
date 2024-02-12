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

// To be entiruely reworked
/* export const combatTick = () => {
    setPause(true);
    console.log(enemyList);
    if (opponent.health <= 0 || !opponent.alive) {
        setOpponent("health", 0);
        setOpponent("alive", false);
        sendLoot(opponent.loot);
        addCoins(opponent.coinMin, opponent.coinMax);
        setState("action", state.previousAction);
        state.techniques.forEach((e, i) => {
            setState("techniques", i, "active", false);
            setState("techniques", i, "onGoing", false);
        });
        setPause(false);
    } else if (state.health <= 0) {
        sendModal("You lost! Meditate on your failures, and try again!");
        setState("action", "Meditate");
        setPause(false);
    } else {
        if (state.combat.turn === 0) {
            setState("weaponDamageBuff", 0);
            state.techniques.forEach((e, i) => {
                if (e.onGoing) {
                    setState(
                        "maxMana",
                        (m) => m + 0.3 * effectMultiplier(e.multiplier),
                    );
                    console.log("ongoing");
                    useTechnique(e);
                }
            });
            if (choice() === -1) {
                state.techniques.forEach((e, i) => {
                    if (e.active) {
                        setState(
                            "maxMana",
                            (m) => m + 0.3 * effectMultiplier(e.multiplier),
                        );
                        //setState("mana", (m) => m - tickMana());
                        console.log(e.effect);
                        useTechnique(e);
                        setState("techniques", i, "active", false);
                    }
                });
            } else if (choice() >= 0) {
                switch (choice()) {
                    case 1:
                        if (hasItem("Health Potion")) {
                            inventoryRemoveQuantity("Health Potion", 1);
                            setState("health", (h) => h + 10);
                        }
                        break;
                    case 2:
                        if (hasItem("Mana Potion")) {
                            inventoryRemoveQuantity("Mana Potion", 1);
                            setState("mana", (h) => h + 20);
                        }
                        break;
                    case 3:
                        const buff = state.weaponDamageBuff;
                        console.log(`buff: ${buff}`);
                        setOpponent("health", (h) => h - (5 + buff));
                        setState("weaponDamageBuff", 0);
                        break;
                }
            }
            setState("combat", "turn", 1);
        } else if (state.combat.turn === 1) {
            setState("health", (hp) => hp - opponent.damage);
            setState("combat", "turn", 0);
        } else {
            setState("combat", "turn", 0);
        }
    }
};*/

export const adventureTick = () => {
	console.log("adventure");
	const eventRoll = Math.random() * 100 + 1;
	console.log(eventRoll);
	if (state.adventure.area === "BeginnerArea") {
		if (eventRoll >= 95) {
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
		} else if (eventRoll >= 30) {
			const pick = Math.floor(
				Math.random() * beginnerArea.commonEvents.length,
			);
			if (beginnerArea.commonEvents[pick].isUnlocked()) {
				sendModal(
					`You encounter ${beginnerArea.commonEvents[pick].name}!`,
				);
				beginnerArea.commonEvents[pick].activation();
			}
		}
	}
};
