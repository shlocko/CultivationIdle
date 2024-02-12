import { state, setState, maxHealth, Technique } from "../state/store";

export const techniqueCustomEffect = {
	// Fire techniques
	test: (technique: Technique) => {},
};

// Old and to be removed
/*export const useTechnique = (technique: Technique) => {
    if (technique.effect) {
        techniqueEffects[technique.effect](technique);
    }
    if (technique.customEffect) {
        techniqueCustomEffect[technique.customEffect](technique);
    }
    const index = state.techniques.indexOf(technique);
    setState("techniques", index, "active", false);
};*/

export type EffectType =
	| "damage"
	| "heal"
	| "ongoingAreaDamage"
	| "enhanceWeapon"
	| "buildingPhysicalBonus";

// Old and to be removed
/*export const techniqueEffects = {
    damage: (technique: Technique) => {
        const multiplier = effectMultiplier(technique.multiplier);
        if (state.mana >= technique.currentCost) {
            setState("mana", (m) => m - technique.currentCost);
            setOpponent(
                "health",
                (hp) => hp - technique.magnitude * multiplier,
            );
        }
    },
    heal: (technique: Technique) => {
        const multiplier = effectMultiplier(technique.multiplier);
        if (state.mana >= technique.currentCost) {
            setState("mana", (m) => m - technique.currentCost);
            setState("health", (hp) => hp + technique.magnitude * multiplier);
        }
    },
    ongoingAreaDamage: (technique: Technique) => {
        const index = state.techniques.indexOf(technique);
        const multiplier = effectMultiplier(technique.multiplier);
        if (technique.active) {
            setState("techniques", index, "active", false);
            setState("techniques", index, "onGoing", true);
        }
        if (state.mana >= technique.currentCost) {
            setState("mana", (m) => m - technique.currentCost);
            setOpponent(
                "health",
                (hp) => hp - technique.magnitude * multiplier,
            );
        } else {
            setState("techniques", index, "onGoing", false);
        }
    },
    enhanceWeapon: (technique: Technique) => {
        const index = state.techniques.indexOf(technique);
        const multiplier = effectMultiplier(technique.multiplier);
        if (technique.active) {
            setState("techniques", index, "active", false);
            setState("techniques", index, "onGoing", true);
        }
        if (state.mana >= technique.currentCost) {
            setState("mana", (m) => m - technique.currentCost);
            setState(
                "weaponDamageBuff",
                (b) => b + technique.magnitude * multiplier,
            );
        } else {
            setState("techniques", index, "onGoing", false);
        }
    },
};*/

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
