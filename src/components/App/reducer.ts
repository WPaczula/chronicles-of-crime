import { createReducer, ActionType } from "typesafe-actions";
import produce, { Draft } from "immer";
import { Actions, toggleCard, TOGGLE_CARD } from "components/App/actions";
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

const reducer = createReducer<ToggledCards, Actions>(getInitialState(), {
  [TOGGLE_CARD]: produce(
    (draft: Draft<ToggledCards>, action: ActionType<typeof toggleCard>) => {
      draft[action.number] = !draft[action.number];
    }
  )
});

export default reducer;
