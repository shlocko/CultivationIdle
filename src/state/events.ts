import { Enemies, enemyList } from "./enemies";
import {
  Item,
  LootTable,
  setAction,
  setOpponent,
  setState,
  state,
} from "./store";

export type Event = {
  name: string;
  isUnlocked: () => boolean;
  activation: Function;
};

// Rarity: Common, Uncommon, Rare, Epic, Legendary, Mythical, Unique

export const beginnerArea = {
  enemies: ["bandit", "wanderingKnight"] as Enemies[],
  commonEvents: [
    {
      name: "combat",
      isUnlocked: () => state.rank >= 1,
      activation: () => {
        let enemy = Math.floor(Math.random() * beginnerArea.enemies.length);
        console.log(enemy);
        setOpponent(enemyList[beginnerArea.enemies[enemy]]);
        setState("combat", "turn", -1);
        setAction("Combat");
      },
    },
  ],
};
