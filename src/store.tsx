import { createStore } from "solid-js/store";

type Action = "Meditate" | "Train";

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

export const rankInfo = [
  { name: "Foundation", advMana: 27 },
  { name: "CoreFormation", advMana: 81 },
  { name: "RedCore", advMana: 243 },
  { name: "GreenCore", advMana: 729 },
];

export const [state, setState] = createStore({
  meditate: {
    tickSpeed: 0.5,
  },
  train: {
    tickSpeed: 1,
  },
  mana: 0.0,
  maxMana: 9.0,
  bar: 0.0,
  action: "Meditate" as Action,
  rank: 0,
});

export const tickSpeed = () => {
  switch (state.action) {
    case "Meditate":
      return state.meditate.tickSpeed;
    case "Train":
      return state.train.tickSpeed;
  }
};

export const tick = {
  Train: () => {
    if (state.mana >= 1) {
      setState("mana", (mana) => mana - 1);
      setState("maxMana", (max) => max + 1);
    } else {
      setState("action", "Meditate");
    }
  },
  Meditate: () => {
    if (state.mana < state.maxMana) {
      setState("mana", (mana) => mana + 1);
    }
    if (state.mana > state.maxMana) {
      setState("mana", state.maxMana);
    }
  },
};

export const canAdvance = () => {
  return state.maxMana >= rankInfo[state.rank].advMana;
};

export const advance = () => {
  if (canAdvance()) {
    setState("rank", (rank) => rank + 1);
  }
};
