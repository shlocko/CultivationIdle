import {
  setPause,
  setState,
  state,
  opponent,
  setOpponent,
  canAdvance,
  rankInfo,
  advance,
} from "../state/store";
import { techniqueEffect } from "./techniqueMethods";
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
    setPause(true);
    //advancementMethods[
    //rankInfo[state.rank].name as keyof typeof advancementMethods
    //]();
    advance();
  }
};

export const trainTick = () => {
  if (state.mana >= 3) {
    setState("mana", (mana) => mana - 3);
    setState("maxMana", (max) => max + 0.5);
  } else {
    setState("action", "Meditate");
  }
};

export const meditateTick = () => {
  if (state.mana < state.maxMana) {
    setState("mana", (mana) => mana + 1);
  }
  if (state.health < state.maxHealth) {
    setState("health", (h) => h + 1);
  }
};

export const combatTick = () => {
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
      state.techniques.forEach((e, i) => {
        if (e.active) {
          setState("maxMana", (m) => m + 0.2);
          techniqueEffect[e.id as keyof typeof techniqueEffect]!();
          if (!e.onGoing) {
            setState("techniques", i, "active", false);
          }
        }
      });
      setState("combat", "turn", 1);
      if (opponent.health <= 0) {
        setState("combat", "tickSpeed", 1);
        setOpponent("alive", false);
      }
    } else {
      setState("health", (hp) => hp - opponent.damage);
      setState("combat", "turn", 0);
      if (state.health <= 0) {
        setState("action", "Meditate");
        setState("health", 0);
        setPause(false);
      }
    }
    setState("combat", "tickSpeed", 0.0001);
  }
};
