import { Technique } from "./store";

export const techniques = {
  Fire: [
    {
      name: "Fire Bolt",
      id: "firebolt",
      onGoing: false,
      active: false,
      aspect: "Fire",
      baseCost: 5,
      minCost: 1,
      description: "Fire a small ball of fire at the target",
      mastery: 1,
      multiplier: 2,
    },
    {
      name: "Clense wounds in flame",
      id: "clensewoundsinfire",
      onGoing: false,
      active: false,
      aspect: "Fire",
      baseCost: 5,
      minCost: 1,
      description: "Sear your wounds closed",
      mastery: 1,
      multiplier: 1,
    },
  ] as Technique[],
};
