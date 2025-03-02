import { cloneDeep } from "lodash";
import { sendModal } from "../state/modalMessages";
import { Area, combatState, lootEntry, setState, state } from "../state/store";
import { init } from "./combatMethods";

export const intro = () => {
	sendModal(
		"You are embarking down a new path, one of magic and danger. You must train yourself and advance to prepare for what lies ahead!",
	);
};

const test = () => {
	if (combatState.opponents.length === 0) {
		sendModal("You win!");
		sendModal("You may now find the next area.");
		if (
			state.adventure.areaBossesBeaten.indexOf("BeginnerArea" as Area) ===
			-1
		) {
			let arr = cloneDeep(state.adventure.areaBossesBeaten);
			arr.push("BeginnerArea");
			setState("adventure", "areaBossesBeaten", arr);
		}
	} else {
		sendModal("You lose! Try again!");
	}
};

export const beginnerBoss = () => {
	sendModal("You face the boss of the beginner area! Beat it to progress.");
	init(
		["wanderingKnight", "wanderingKnight", "wanderingKnight"],
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
				if (
					state.adventure.areaBossesBeaten.indexOf(
						"BeginnerArea" as Area,
					) === -1
				) {
					let arr = cloneDeep(state.adventure.areaBossesBeaten);
					arr.push("BeginnerArea");
					setState("adventure", "areaBossesBeaten", arr);
				}
			} else {
				sendModal("You lose! Try again!");
			}
		},
	);
};
