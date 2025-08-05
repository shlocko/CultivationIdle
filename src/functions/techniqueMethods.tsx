import { state, setState, maxHealth, Technique } from "../state/store";

export const techniqueCustomEffect = {
	// Fire techniques
	test: (technique: Technique) => { },
};


export type EffectType =
	| "damage"
	| "heal"
	| "ongoingAreaDamage"
	| "enhanceWeapon"
	| "buildingPhysicalBonus"
	| "thorns"
	| "increasingTargetCountDamage"
	| "increasingTargetCountCloneWeapon";


export const meditationTechniqueEffect = {
	manaregen: (level: number) => {
		if (state.mana < state.maxMana) {
			setState("mana", (m) => m + Math.pow(2, level));
		}
	},
	healthregen: (level: number) => {
		if (state.health < maxHealth()) {
			setState("health", (h) => h + 4 * level);
		}
	},
	mixedregen: (level: number) => {
		if (state.mana < state.maxMana) {
			setState("mana", (m) => m + 2 * level);
		}
		if (state.health < maxHealth()) {
			setState("health", (h) => h + 2 * level);
		}
	},
};
