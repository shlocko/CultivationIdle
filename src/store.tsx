import { createSignal, createMemo } from "solid-js";
import { createStore } from "solid-js/store";
import { combatTick } from "./tickMethods";

type Action = "Meditate" | "Train" | "Combat";

// Old, here for reference to rank names until I finish rankInfo
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

// Gamedata on the ranks of advancement
export const rankInfo = [
  { name: "Foundation", advMana: 27 },
  { name: "CoreFormation", advMana: 81 },
  { name: "RedCore", advMana: 243 },
  { name: "GreenCore", advMana: 729 },
];

// Available aspects at CoreFormation rank
export type Aspect =
  | "Fire"
  | "Water"
  | "Stone"
  | "Wind"
  | "Sword"
  | "Pure"
  | "Shadow";

//********************************************************
// techniques
//********************************************************
export type TechniqueType = "Shaper" | "Enhancement" | "Range" | "Manipulation";

export type Technique = {
  name: string;
  aspect: Aspect;
  baseCost: number;
  minCost: number;
  onGoing: boolean; // whether the technique is an ongoing effect vs a one time use
  active: boolean; // Whether the technique is currently active
  effect: Function; // Function to be called when technique is active and a tick occurs
};

export const fireTechniqes: Technique[] = [
  {
    name: "Fire Bolt",
    onGoing: false,
    active: false,
    aspect: "Fire",
    baseCost: 5,
    minCost: 1,
    effect: () => {
      if (state.mana >= 5) {
        setOpponent("health", (hp) => hp - 5);
        setState("mana", (mp) => mp - 5);
      }
    },
  },
  {
    name: "Clense wounds in flame",
    onGoing: false,
    active: false,
    aspect: "Fire",
    baseCost: 5,
    minCost: 1,
    effect: () => {
      if (state.mana >= 5) {
        setState("health", (hp) => hp + 10);
        setState("mana", (mp) => mp - 5);
      }
    },
  },
];

//********************************************************
// items
//********************************************************

export type Item = "Health Potion" | "Mana Potion" | "Herb";

//********************************************************
// state
//********************************************************
export const [pause, setPause] = createSignal(false);
export const [opponent, setOpponent] = createStore({
  alive: true,
  health: 10,
  damage: 3,
  respawn: 3,
});

// Gamestate intended for persistence
export const [state, setState] = createStore({
  //Gamedata on the various actions
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
  // Player's current mana
  mana: 0,
  // Player's maximum mana
  maxMana: 22,
  // Player's passive mana regeneration
  passiveManaRegen: 1,
  // Current % of tick bar
  bar: 0.0,
  // Player's current action
  action: "Meditate" as Action,
  // Player's current rank
  rank: 0,
  // Player's magic aspect
  aspect: undefined as Aspect | undefined,
  // Player's known techniques
  techniques: [fireTechniqes[0], fireTechniqes[1]] as Technique[],
  // Player's helth points for combat
  health: 20,
  // Player's inventory, item name - item count
  inventory: [
    { item: "Health Potion", quantity: 1 },
    { item: "Mana Potion", quantity: 3 },
    { item: "Herb", quantity: 4 },
  ] as Array<{ item: Item; quantity: number }>,
  inventoryCapacity: 20,
});

//********************************************************
// helper functions
//********************************************************

export const hasItem = (item: Item) => {
  state.inventory.forEach((e) => {
    if (e.item === item) {
      return true;
    }
  });
  return false;
};

export const howManyOfItem = (item: Item) => {
  let count = 0;
  state.inventory.forEach((e) => {
    if (e.item === item) {
      count = e.quantity;
    }
  });
};

export const inventoryRemove = (item: Item) => {
  state.inventory.forEach((e, i) => {
    if (e.item === item) {
      let arr = state.inventory.slice();
      arr.splice(i, 1);
      setState("inventory", arr);
    }
  });
};

// Helper function for finding the current action's tickSpeed
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

// Helper Function to call the tick method for the current action
export const tick = {
  Train: () => {
    if (state.mana >= 5) {
      setState("mana", (mana) => mana - 5);
      setState("maxMana", (max) => max + 0.2);
    } else {
      setState("action", "Meditate");
    }
  },
  Meditate: () => {
    if (state.mana < state.maxMana) {
      setState("mana", (mana) => mana + 1);
    }
  },
  Combat: () => {
    combatTick();
  },
};

// Happens every tick
export const perTick = () => {
  if (state.mana < state.maxMana) {
    setState("mana", (m) => m + state.passiveManaRegen);
  }
  if (state.mana > state.maxMana) {
    setState("mana", state.maxMana);
  }
};

export const canAdvance = () => {
  return state.maxMana >= rankInfo[state.rank].advMana;
};

export const advance = () => {
  if (canAdvance()) {
    setState("rank", (rank) => rank + 1);
  }
};

export const setAction = (action: Action) => {
  setState("action", action);
  setPause(false);
};

// Memo for calculating mana per tick
export const tickMana = createMemo(() => {
  let total = 0;
  state.techniques.forEach((e) => {
    if (e.active) {
      total += e.baseCost;
    }
  });
  return total;
});
