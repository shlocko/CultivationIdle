import { createSignal, createMemo, JSXElement } from "solid-js";
import { createStore } from "solid-js/store";
import { combatTick, meditateTick, trainTick } from "../functions/tickMethods";
import toast from "solid-toast";
import {
  ChooseModalState,
  ModalMessageType,
  TextModal,
  sendModal,
} from "./modalMessages";

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
  {
    name: "Foundation",
    advMana: 27,
  },
  { name: "CoreFormation", advMana: 81 },
  { name: "RedCore", advMana: 243 },
  { name: "GreenCore", advMana: 729 },
];

// Available aspects at CoreFormation rank
export type AspectOld =
  | "Fire"
  | "Water"
  | "Stone"
  | "Wind"
  | "Sword"
  | "Pure"
  | "Shadow";

export type Aspect = (typeof aspects)[number];

export const aspects = [
  "Fire",
  "Water",
  "Stone",
  "Wind",
  "Sword",
  "Pure",
  "Shadow",
];

//********************************************************
// techniques
//********************************************************
export type TechniqueType = "Shaper" | "Enhancement" | "Range" | "Manipulation";

export type Technique = {
  name: string;
  id: string;
  aspect: Aspect;
  baseCost: number;
  minCost: number;
  onGoing: boolean; // whether the technique is an ongoing effect vs a one time use
  active: boolean; // Whether the technique is currently active
  description: string;
};

//********************************************************
// Meditation Tecniques
//********************************************************
export type meditationTechnique = {
  name: string;
  id: string;
  description: string;
};

export const meditationTechniques: meditationTechnique[] = [
  {
    name: "Basic mana regeneration",
    id: "basicmanaregen",
    description: "Regenerate mana at an increased rate",
  },
  {
    name: "Basic health regen",
    id: "basichealthregen",
    description: "Regenerate health at an increased rate",
  },
  {
    name: "Basic mixed regeneration",
    id: "basicmixedregen",
    description: "Regenerate both health and mana at a minorly increased rate",
  },
];

//********************************************************
// items
//********************************************************

export type Item = "Health Potion" | "Mana Potion" | "Herb";

//********************************************************
// state
//********************************************************
export type State = "Modal" | "Tick";
export const [pause, setPause] = createSignal(false);
export const [opponent, setOpponent] = createStore({
  alive: true,
  health: 10,
  damage: 3,
  respawn: 3,
});

// Gamestate intended for persistence
export const [state, setState] = createStore({
  // State version for ensuring compatibility with save data
  version: 0,
  // State machine state
  state: "Tick" as State,
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
  mana: 10,
  // Player's maximum mana
  maxMana: 10,
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
  techniques: [] as Technique[],
  // Player's meditation techniques
  meditationTechniques: [] as meditationTechnique[],
  activeMeditationTechnique: 0,
  // Player's helth points for combat
  health: 20,
  maxHealth: 20,
  // Player's inventory, item name - item count
  inventory: [
    { item: "Health Potion", quantity: 1 },
    { item: "Mana Potion", quantity: 3 },
    { item: "Herb", quantity: 4 },
  ] as Array<{ item: Item; quantity: number }>,
  inventoryCapacity: 20,
  // Queue of modal's to appear
  modalMessages: [] as ModalMessageType[],
  autoAdventure: false,
});

//********************************************************
// helper functions
//********************************************************

export const persist = () => {
  localStorage.setItem("state", JSON.stringify(state));

  toast("Data Saved");
};

export const load = () => {
  let rawState = localStorage.getItem("state");
  if (rawState) {
    let loadState = JSON.parse(rawState);
    setState(loadState);
  }
  toast("Data Loaded");
};
// Code to check for save data
if (localStorage.getItem("state")) {
  load();
} else {
  sendModal(
    "You are embarking down a new path, one of magic and danger. You must train yourself and advance to prepare for what lies ahead!",
  );
}

export const clear = () => {
  localStorage.clear();
  toast("Data Cleared");
};

export const hasItem = (item: Item) => {
  let has = false;
  state.inventory.forEach((e) => {
    if (e.item === item) {
      has = true;
    }
  });
  return has;
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

export const inventoryAtCapacity = () => {
  return state.inventory.length > state.inventoryCapacity;
};

export const inventoryAdd = (item: Item, quantity: number) => {
  let arr = state.inventory.slice();
  if (hasItem(item)) {
    let index = arr.findIndex((e) => e.item === item);
    setState("inventory", index, "quantity", (num) => num + quantity);
  } else {
    arr.push({ item: item, quantity: quantity });
    setState("inventory", arr);
  }
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
    trainTick();
  },
  Meditate: () => {
    meditateTick();
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

export const setAction = (action: Action) => {
  setState("action", action);
  setPause(false);
};

export const findFight = () => {
  setOpponent({
    alive: true,
    health: 10,
    respawn: 3,
  });
  setState("combat", "turn", -1);
};

export const resetActiveTechniques = () => {
  state.techniques.forEach((item, i) => {
    setState("techniques", i, "active", false);
  });
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
