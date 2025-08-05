import { cloneDeep } from "lodash";
import { sendModal } from "../state/modalMessages";
import { combatState, lootEntry, setState, state } from "../state/store";
import { initCombat } from "./combatMethods";

export const intro = () => {
	sendModal(
		"You approach the crack in the seal, a tangible pressure eminating from it. As you step through you feel resistance, until it suddenly gives way and you are on the other side. Around you is a lush field as far as the eye can see.",
	);
	sendModal(
		"As you take in your surroundings, you feel an energy wash over you. You feel empowered, like your physical limits are being expanded.",
	);
	sendModal(
		"You have gained Qi. Train your new power and learn to harness its strength!",
	);
};

export const beginnerBoss = () => {
	sendModal("You face the boss of the beginner area! Beat it to progress.");
	initCombat(
		["wanderingKnight"],
		[lootEntry("Axe", 100, 1, 1), lootEntry("Health Potion", 100, 5, 20)],
		1000,
		10000,
		() => () => {
			//console.trace();
			if (combatState.opponents.length === 0) {
				//console.log(combatState.opponents.length);
				//console.log("sequence");
				sendModal("You win!");
				sendModal("You may now find the next area.");
				setState("adventure", "areas", "VerdantFields", "unlocks", "bossBeaten", true)
			} else {
				sendModal("You lose! Try again!");
			}
		},
	);
};
