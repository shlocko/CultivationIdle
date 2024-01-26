import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

type Action = "Meditate" | "Train" | "Combat";

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

export type Aspect =
  | "Fire"
  | "Water"
  | "Stone"
  | "Wind"
  | "Sword"
  | "Pure"
  | "Shadow";

export type TechniqueType = "Shaper" | "Enhancement" | "Range" | "Manipulation";

export type Technique = {
  name: string;
  aspect: Aspect;
  baseCost: number;
  minCost: number;
};

export const fireTechniqes: Technique[] = [
  {
    name: "test",
    aspect: "Fire",
    baseCost: 5,
    minCost: 1,
  },
];

export const [pause, setPause] = createSignal(false);
export const [opponent, setOpponent] = createStore({
  alive: true,
  health: 10,
  damage: 3,
  respawn: 3,
});

export const [state, setState] = createStore({
  meditate: {
    tickSpeed: 0.5,
  },
  train: {
    tickSpeed: 1,
  },
  combat: {
    tickSpeed: 0.0001,
    turn: 0,
  },
  mana: 0.0,
  maxMana: 22.0,
  bar: 0.0,
  action: "Meditate" as Action,
  rank: 0,
  aspect: "Pure" as Aspect,
  aspectChosen: false,
  techniques: [] as Technique[],
  health: 20,
});

export const tickSpeed = () => {
  switch (state.action) {
    case "Meditate":
      return state.meditate.tickSpeed;
    case "Train":
      return state.train.tickSpeed;
    case "Combat":
      return state.combat.tickSpeed;
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
  Combat: () => {
    combatTick();
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

const combatTick = () => {
  setPause(true);
  if (!opponent.alive) {
    setState("combat", "tickSpeed", 1);
    if (opponent.respawn <= 0) {
      setOpponent({
        alive: true,
        health: 10,
        respawn: 3,
      });
      setPause(true);
      setState("combat", "tickSpeed", 0.0001);
    } else {
      setOpponent("respawn", (time) => time - 1);
    }
    setPause(false);
  } else if (opponent.health <= 0) {
    setState("combat", "tickSpeed", 1);
    setOpponent("alive", false);
  } else {
    if (state.combat.turn === 0) {
      setOpponent("health", (hp) => hp - 5);
      setState("combat", "turn", 1);
    } else {
      setState("health", (hp) => hp - opponent.damage);
      setState("combat", "turn", 0);
      if (state.health <= 0) {
        setState("action", "Meditate");
        setState("health", 20);
        setPause(false);
      }
    }
    setState("combat", "tickSpeed", 0.0001);
  }
};
