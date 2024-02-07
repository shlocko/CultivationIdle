import { LootTable } from "./store";

export type Enemy = {
  alive: boolean;
  health: number;
  damage: number;
  name: string;
  loot: LootTable;
  coinMin: number;
  coinMax: number;
};

export type Enemies = keyof typeof enemyList;

export const enemyList = {
  bandit: {
    name: "Bandit",
    health: 10,
    damage: 2,
    alive: true,
    coinMin: 1,
    coinMax: 50,
    loot: [
      {
        name: "Mana Potion",
        chance: 10,
        min: 1,
        max: 1,
      },
      {
        name: "Health Potion",
        chance: 10,
        min: 1,
        max: 1,
      },
      {
        name: "Glass Bottle",
        chance: 30,
        min: 1,
        max: 1,
      },
      { name: "Berry", chance: 80, min: 1, max: 10 },
      { name: "Herb", chance: 80, min: 1, max: 10 },
    ] as LootTable,
  } as Enemy,
  wanderingKnight: {
    name: "Wandering Knight",
    health: 25,
    damage: 4,
    alive: true,
    coinMin: 25,
    coinMax: 100,
    loot: [
      {
        name: "Mana Potion",
        chance: 30,
        min: 1,
        max: 3,
      },
      {
        name: "Health Potion",
        chance: 30,
        min: 1,
        max: 3,
      },
      {
        name: "Glass Bottle",
        chance: 50,
        min: 1,
        max: 1,
      },
      { name: "Berry", chance: 80, min: 5, max: 20 },
      { name: "Herb", chance: 80, min: 5, max: 20 },
    ] as LootTable,
  } as Enemy,
};
