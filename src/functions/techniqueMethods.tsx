import { hashParser } from "@solidjs/router/dist/routers/HashRouter";
import {
  setOpponent,
  state,
  setState,
  effectMultiplier,
  maxHealth,
  opponent,
  Technique,
} from "../state/store";

export const techniqueCustomEffect = {
  // Fire techniques
  test: (technique: Technique) => {},
};

export const useTechnique = (technique: Technique) => {
  if (technique.effect) {
    techniqueEffects[technique.effect](technique);
  }
  if (technique.customEffect) {
    techniqueCustomEffect[technique.customEffect](technique);
  }
};

export type EffectType = keyof typeof techniqueEffects;

export const techniqueEffects = {
  damage: (technique: Technique) => {
    let multiplier = effectMultiplier(technique.multiplier);
    if (state.mana >= technique.currentCost) {
      setState("mana", (m) => m - technique.currentCost);
      setOpponent("health", (hp) => hp - technique.magnitude * multiplier);
    }
  },
  heal: (technique: Technique) => {
    let multiplier = effectMultiplier(technique.multiplier);
    if (state.mana >= technique.currentCost) {
      setState("mana", (m) => m - technique.currentCost);
      setState("health", (hp) => hp + technique.magnitude * multiplier);
    }
  },
};

export const meditationTechniqueEffect = {
  basicmanaregen: () => {
    if (state.mana < state.maxMana) {
      setState("mana", (m) => m + 4);
    }
  },
  basichealthregen: () => {
    if (state.health < maxHealth()) {
      setState("health", (h) => h + 4);
    }
  },
  basicmixedregen: () => {
    if (state.mana < state.maxMana) {
      setState("mana", (m) => m + 2);
    }
    if (state.health < maxHealth()) {
      setState("health", (h) => h + 2);
    }
  },
};
