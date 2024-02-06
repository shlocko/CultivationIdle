import { Item, setAction, setOpponent, setState, state } from "./store";

export type Event = {
  name: string;
  isUnlocked: () => boolean;
  activation: Function;
};

// Rarity: Common, Uncommon, Rare, Epic, Legendary, Mythical, Unique

export const commonEvents = [
  {
    name: "combat",
    isUnlocked: () => state.rank >= 1,
    activation: () => {
      setOpponent({
        alive: true,
        health: 10,
        damage: 3,
        respawn: 3,
        name: "Nerd",
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
        ] as Array<{
          name: Item;
          chance: number;
          min: number;
          max: number;
          show: boolean;
        }>,
      });
      setState("combat", "turn", -1);
      setAction("Combat");
    },
  },
];
