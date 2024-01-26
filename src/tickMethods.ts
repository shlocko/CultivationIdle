import {
  setPause,
  setState,
  state,
  pause,
  opponent,
  setOpponent,
} from "./store";

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
          e.effect();
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
        setState("health", 20);
        setPause(false);
      }
    }
    setState("combat", "tickSpeed", 0.0001);
  }
};
