import { createStore } from "solid-js/store";

type Action = "Cycle" | "Train";
type Menu = "Main" | "Test";

type Rank =
  | "Foundation"
  | "CoreFormation"
  | "RedCore"
  | "GreenCore"
  | "GoldCore"
  | "SilverCore"
  | "WhiteCore"
  | "Enlightened"
  | "Lord"
  | "Ancient"
  | "FreeImmortal"
  | "HighImmortal"
  | "TrueImmortal";

export const [state, setState] = createStore({
  cycle: {
    tickSpeed: 1,
  },
  train: {
    tickSpeed: 0.5,
  },
  mana: 0.0,
  maxMana: 9.0,
  bar: 0.0,
  action: "Cycle" as Action,
});

export const tickSpeed = () => {
  switch (state.action) {
    case "Cycle":
      return state.cycle.tickSpeed;
    case "Train":
      return state.train.tickSpeed;
  }
};

export const tick = {
  Train: () => {
    if (state.mana >= 1) {
      setState("mana", (mana) => mana - 1);
      setState("maxMana", (max) => max + 0.1);
    }
  },
  Cycle: () => {
    if (state.mana < state.maxMana) {
      setState("mana", (mana) => mana + 1);
    }
    if (state.mana > state.maxMana) {
      setState("mana", state.maxMana);
    }
  },
};
