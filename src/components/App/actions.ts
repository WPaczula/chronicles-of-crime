import { Patch } from "immer";
import { ActionType } from "typesafe-actions";

export const TOGGLE_CARD = "TOGGLE_CARD";
export const APPLY_PATCHES = "APPLY_PATCHES";

export const toggleCard = (number: number) => ({
  type: TOGGLE_CARD as typeof TOGGLE_CARD,
  number
});

export const applyPatches = (patches: Patch[]) => ({
  type: APPLY_PATCHES as typeof APPLY_PATCHES,
  patches
});

export type Actions =
  | ActionType<typeof toggleCard>
  | ActionType<typeof applyPatches>;
