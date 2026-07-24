
type StatusBurn = {
  kind: "burn",
  duration: number,
  magnitude: number
}

type StatusPoison = {
  kind: "poison",
  duration: number,
  magnitude: number
}

export type StatusEffect = StatusBurn | StatusPoison;
