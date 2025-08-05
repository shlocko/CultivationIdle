
//export type Area = "VerdantFields" | "SecondArea";

import { Event } from "../state/events"
import { HollowWoods } from "./HollowWoods"
import { QiBearDen } from "./QiBearDen"
import { VerdantFields } from "./VerdantFields"

export type AreaState = {
	name: string,
	unlocked: boolean,
	tickCount: number,
	unlocks: Record<string, boolean>,
	longestRun: number,
}

export type Area = {
	unlockThresholds: Record<string, number>,
	subArea: boolean,
	subAreaTo: AreaNames | null,
	endExploration: Function,
	commonEvents: Event[],
	uncommonEvents: Event[],
	rareEvents: Event[],
	epicEvents: Event[],

}

export let areas: Record<string, Area> = {
	"VerdantFields": VerdantFields,
	"HollowWoods": HollowWoods,
	"QiBearDen": QiBearDen,
}

export type AreaNames = keyof typeof areas
