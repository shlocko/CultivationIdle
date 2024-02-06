import { Enemies, enemyList } from "./enemies";
import { sendLoot, sendModal } from "./modalMessages";
import {
  Item,
  LootTable,
  addCoins,
  opponent,
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
        setOpponent(enemyList[beginnerArea.enemies[enemy]]);
        sendModal(`You encounter a ${opponent.name}! Defend yourself!`);
        setState("combat", "turn", -1);
        setAction("Combat");
      },
    } as Event,
  ],
  uncommonEvents: [
    {
      name: "loot",
      isUnlocked: () => true,
      activation: () => {
        sendModal("You found a stash of loot!");
        addCoins(10, 100);
        sendLoot([
          {
            name: "Health Potion",
            chance: 50,
            min: 1,
            max: 5,
            show: true,
          },
          {
            name: "Mana Potion",
            chance: 50,
            min: 1,
            max: 5,
            show: true,
          },
        ]);
      },
    } as Event,
  ],
};
