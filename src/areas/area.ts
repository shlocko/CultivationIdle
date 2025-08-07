
//export type Area = "VerdantFields" | "SecondArea";

import { Event } from "../state/events"
import { HollowWoods } from "./HollowWoods"
import { QiBearDen } from "./QiBearDen"
import { SmallCave } from "./SmallCave"
import { VerdantFields } from "./VerdantFields"

export type AreaState = {
	name: string,
	unlocked: boolean,
	tickCount: number,
	unlocks: Record<string, boolean>,
	longestRun: number,
}

export type AreaType =
	| "normal"
	| "dungeon"

export type Area = {
	name: string,
	type: AreaType,
	unlockThresholds: Record<string, number>,
	travelTo: number,
	subArea: boolean,
	subAreaTo: AreaName | null,
	endExploration: Function,
	commonEvents: Event[],
	uncommonEvents: Event[],
	rareEvents: Event[],
	epicEvents: Event[],

}

export const areas = {
	"VerdantFields": VerdantFields,
	"HollowWoods": HollowWoods,
	"QiBearDen": QiBearDen,
	"SmallCave": SmallCave,
} as const


export type AreaName = keyof typeof areas

export type AreaConnection = {
	area1: AreaName,
	area2: AreaName,
	travelTime: number,
}
