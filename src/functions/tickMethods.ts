import { choice } from "../components/Combat";
import {
  sendAspectChoice,
  sendLoot,
  sendMeditationTechniqueChoice,
  sendModal,
  sendTechniqueChoice,
} from "../state/modalMessages";
import {
  setPause,
  setState,
  state,
  opponent,
  setOpponent,
  canAdvance,
  rankInfo,
  advance,
  meditationTechniques,
  setAction,
  findFight,
  tickMana,
  effectMultiplier,
  addCoins,
  hasItem,
  inventoryRemove,
  inventoryRemoveQuantity,
} from "../state/store";
import { meditationTechniqueEffect, techniqueEffect } from "./techniqueMethods";
//import { advancementMethods } from "./advanceMethods";

// Happens every tick
export const perTick = () => {
  if (state.mana < state.maxMana) {
    setState("mana", (m) => m + state.passiveManaRegen);
  }
  if (state.mana > state.maxMana) {
    setState("mana", state.maxMana);
  }
  if (state.health > state.maxHealth) {
    setState("health", state.maxHealth);
  }

  // Check for advancement
  if (canAdvance()) {
    sendModal("You advance");
    sendAspectChoice();
    sendTechniqueChoice();
    sendMeditationTechniqueChoice();
    advance();
  }
};

export const trainTick = () => {
  if (state.mana >= 3) {
    let num: number = state.trainingTechnique;
    setState("mana", (mana) => mana - 3);
    setState("maxMana", (max) => max + 0.5);
    if (state.trainingTechnique >= 0 && state.techniques[num].mastery < 10000) {
      setState("techniques", num, "mastery", (x) => x + 1);
    }
  } else {
    setState("action", "Meditate");
  }
};

export const meditateTick = () => {
  if (
    state.meditationTechniques.length > 0 &&
    state.activeMeditationTechnique >= 0
  ) {
    meditationTechniqueEffect[
      state.meditationTechniques[state.activeMeditationTechnique]
        .id as keyof typeof meditationTechniqueEffect
    ]!();
  } else if (state.mana < state.maxMana) {
    setState("mana", (mana) => mana + 1);
  }
  if (state.health < state.maxHealth) {
    setState("health", (h) => h + 1);
  }
};

export const combatTick = () => {
  setPause(true);
  if (!opponent.alive) {
    if (state.autoAdventure) {
      setState("combat", "tickSpeed", 0.7);
      if (opponent.respawn <= 0) {
        findFight();
        setPause(true);
        setState("combat", "tickSpeed", 0.0001);
      } else {
        setOpponent("respawn", (time) => time - 1);
      }
      setPause(false);
    } else {
      setAction("Meditate");
    }
  } else if (opponent.health <= 0) {
    setState("combat", "tickSpeed", 1);
    setOpponent("alive", false);
  } else {
    if (state.combat.turn === 0) {
      if (choice() === -1) {
        state.techniques.forEach((e, i) => {
          if (e.active) {
            setState(
              "maxMana",
              (m) => m + 0.3 * effectMultiplier(e.multiplier),
            );
            //setState("mana", (m) => m - tickMana());
            techniqueEffect[e.id as keyof typeof techniqueEffect]!(
              e.multiplier,
              e.currentCost,
            );
            if (!e.onGoing) {
              setState("techniques", i, "active", false);
            }
          }
        });
      } else if (choice() >= 0) {
        switch (choice()) {
          case 1:
            if (hasItem("Health Potion")) {
              inventoryRemoveQuantity("Health Potion", 1);
              setState("health", (h) => h + 10);
            }
            break;
          case 2:
            if (hasItem("Mana Potion")) {
              inventoryRemoveQuantity("Health Potion", 1);
              setState("mana", (h) => h + 20);
            }
            break;
          case 3:
            setOpponent("health", (h) => h - 5);
            break;
        }
      }
      setState("combat", "turn", 1);
      if (opponent.health <= 0) {
        sendLoot();
        addCoins(opponent.coinMin, opponent.coinMax);
        setState("combat", "tickSpeed", 1);
        setOpponent("alive", false);
      }
    } else if (state.combat.turn === 1) {
      setState("health", (hp) => hp - opponent.damage);
      setState("combat", "turn", 0);
      if (state.health <= 0) {
        setState("action", "Meditate");
        setState("health", 0);
        setPause(false);
      }
    } else {
      setState("combat", "turn", 0);
    }
    setState("combat", "tickSpeed", 0.0001);
  }
};
