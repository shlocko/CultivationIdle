import { cloneDeep } from "lodash";
import { Enemies, enemyList } from "./enemies";
import { sendLoot, sendModal } from "./modalMessages";
import {
  Item,
  LootTable,
  addCoins,
  findFight,
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
  enemies: ["bandit", "bear"] as Enemies[],
  hardEnemies: ["waderingKnight"] as Enemies[],
  commonEvents: [
    {
      name: "combat",
      isUnlocked: () => state.rank >= 1,
      activation: () => {
        let enemy = Math.floor(Math.random() * beginnerArea.enemies.length);
        console.log(enemy);
        //let newEnemy = cloneDeep(enemyList[beginnerArea.enemies[enemy]]);
        //setOpponent(JSON.parse(JSON.stringify(newEnemy)));
        //findFight(enemyList[beginnerArea.enemies[enemy]]);
        //console.log(enemyList[beginnerArea.enemies[enemy]] === newEnemy);
        setOpponent(cloneDeep(enemyList[beginnerArea.enemies[enemy]]));
        console.log(`alive: ${opponent.alive}`);
        console.log(`health: ${opponent.health}`);
        sendModal(`You encounter a ${opponent.name}! Defend yourself!`);
        setState("combat", "turn", -1);
        setAction("Combat");
      },
    } as Event,
  ],
  uncommonEvents: [
    {
      name: "hardCombat",
      isUnlocked: () => state.rank >= 3,
      activation: () => {
        let enemy = Math.floor(Math.random() * beginnerArea.hardEnemies.length);
        console.log(enemy);
        setOpponent(cloneDeep(enemyList[beginnerArea.hardEnemies[enemy]]));
        console.log(`alive: ${opponent.alive}`);
        console.log(`health: ${opponent.health}`);
        sendModal(`You encounter a ${opponent.name}! Defend yourself!`);
        setState("combat", "turn", -1);
        setAction("Combat");
      },
    } as Event,
  ],
  rareEvents: [
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
