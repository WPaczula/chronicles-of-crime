import produce, {
  Draft,
  produceWithPatches,
  enablePatches,
  applyPatches
} from "immer";
import { Actions, TOGGLE_CARD, APPLY_PATCHES } from "components/App/actions";
import cards from "data/cards.json";

type CardState =
  | {
      selected: true;
      color: string;
    }
  | {
      selected: false;
      color: undefined;
    };
export interface ToggledCards {
  readonly [number: number]: CardState;
}

export const getInitialState = (): ToggledCards =>
  cards.reduce(
    (state, _, i) => ({
      ...state,
      [i + 1]: { selected: false, color: undefined }
    }),
    {}
  );

enablePatches();
const producer = (draft: Draft<ToggledCards>, action: Actions) => {
  switch (action.type) {
    case TOGGLE_CARD: {
      const cardColor = draft[action.number].color;
      if (cardColor === action.color || cardColor === undefined) {
        const wasSelected = draft[action.number].selected;
        draft[action.number] = wasSelected
          ? {
              selected: false,
              color: undefined
            }
          : {
              selected: true,
              color: action.color
            };
      }
      break;
    }

    case APPLY_PATCHES: {
      applyPatches(draft, action.patches);
    }
  }
};
export const reducerWithPatches = produceWithPatches(producer);
export const reducer = produce(producer);
