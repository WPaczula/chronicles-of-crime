import produce, {
  Draft,
  produceWithPatches,
  enablePatches,
  applyPatches
} from "immer";
import { Actions, TOGGLE_CARD, APPLY_PATCHES } from "components/App/actions";
import cards from "data/cards.json";

export type ToggledCards = {
  readonly [number: number]: boolean;
};

export const getInitialState = (): ToggledCards =>
  cards.reduce(
    (state, _, i) => ({
      ...state,
      [i + 1]: false
    }),
    {}
  );

enablePatches();
const producer = (draft: Draft<ToggledCards>, action: Actions) => {
  switch (action.type) {
    case TOGGLE_CARD: {
      draft[action.number] = !draft[action.number];
      break;
    }

    case APPLY_PATCHES: {
      applyPatches(draft, action.patches);
    }
  }
};
export const reducerWithPatches = produceWithPatches(producer);
export const reducer = produce(producer);
