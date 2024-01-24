import { Accessor, Setter, createContext, useContext, createSignal } from "solid-js";
import {createStore} from "solid-js/store"

type Action = 'Cycle' | 'Train';
type Menu = 'Main' | 'Test';

type Rank = 'Foundation' | 'CoreFormation' | 'RedCore' | 'GreenCore' |
    'GoldCore' | 'SilverCore' | 'WhiteCore' | 'Enlightened' |
    'Lord' | 'Ancient' | 'FreeImmortal' | 'HighImmortal' | 'TrueImmortal';

export const [state, setState] = createStore({
    cycle: {
        tick: () => {
            if(state.mana < state.maxMana){
                setState("mana", mana => mana + 1);
            }

            if(state.mana > state.maxMana){
                setState('mana', state.maxMana);
            }
        },
        tickSpeed: 1,
    },
    train: {
        tick: () => {
            if(state.mana >= 1){
                setState('mana', mana => mana-1);
                setState('maxMana', max => max+0.1);
            }
        },
        tickSpeed: 0.5,
    },
    mana: 0.0,
    maxMana: 9.0,
    bar: 0.0,
    tick: 1,
    action: 'Cycle' as Action,
    menu: 'Main' as Menu,
    });

export const setAction = (action: Action) => {
    setState('action', action);
    switch (action){
        case "Cycle":
            setState('tick', state.cycle.tickSpeed);
            break;
        case "Train":
            setState('tick', state.train.tickSpeed);
            break;
    }
}
