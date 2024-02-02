import { setOpponent, state, setState } from "../state/store";

export const techniqueEffect = {
  firebolt: () => {
    if (state.mana >= 5) {
      setOpponent("health", (hp) => hp - 5);
    }
  },
  clensewoundsinfire: () => {
    if (state.mana >= 5) {
      setState("health", (hp) => hp + 10);
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
    if (state.health < state.maxHealth) {
      setState("health", (h) => h + 4);
    }
  },
  basicmixedregen: () => {
    if (state.mana < state.maxMana) {
      setState("mana", (m) => m + 2);
    }
    if (state.health < state.maxHealth) {
      setState("health", (h) => h + 2);
    }
  },
};
