import { setOpponent, state, setState } from "./store";

export const techniqueEffect = {
  firebolt: () => {
    if (state.mana >= 5) {
      setOpponent("health", (hp) => hp - 5);
      setState("mana", (mp) => mp - 5);
    }
  },
  clensewoundsinfire: () => {
    if (state.mana >= 5) {
      setState("health", (hp) => hp + 10);
      setState("mana", (mp) => mp - 5);
    }
  },
};
