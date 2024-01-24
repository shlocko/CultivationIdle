import { Accessor, Setter, createContext, useContext, createSignal } from "solid-js";
import {createStore} from "solid-js/store"

enum Action{
    Cycle,
    Train,

}

enum Rank{
    Foundation = 1,
    CoreFormation,
    RedCore,
    GreenCore,
    GoldCore,
    SilverCore,
    WhiteCore,
    Enlightened,
    Lord,
    Ancient,
    FreeImmortal,
    HighImmortal,
    TrueImmortal
}

export const [state, setState] = createStore({
    mana: 0.0,
    maxMana: 9.0,
    tick: 0.5,
    bar: 0.0,
    });
