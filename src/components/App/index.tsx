import * as React from "react";
import cards from "data/cards.json";
import CardList from "components/CardList";
import {
  reducer,
  reducerWithPatches,
  getInitialState
} from "components/App/reducer";
import {
  toggleCard as toggleCardAction,
  Actions,
  applyPatches
} from "components/App/actions";
import useSocket from "hooks/useSocket";
import "./styles.scss";
import { Patch } from "immer";

interface IAppProps {}

const serverUrl: string = process.env.SERVER_URL ?? "ws://localhost:5001";

const App: React.FunctionComponent<IAppProps> = () => {
  const [toggledCards, setToggledCards] = React.useState(getInitialState);

  const send = useSocket<Patch[]>(serverUrl, (patches: Patch[]) => {
    setToggledCards(current => reducer(current, applyPatches(patches)));
  });

  const dispatch = React.useCallback(
    (action: Actions) => {
      setToggledCards(current => {
        const [nextState, patches] = reducerWithPatches(current, action);

        send(patches);
        return nextState;
      });
    },
    [send]
  );

  const toggleCard = React.useCallback(
    (number: number) => {
      dispatch(toggleCardAction(number));
    },
    [dispatch]
  );

  return (
    <div className="app">
      <CardList
        cards={cards}
        toggleCard={toggleCard}
        toggledCards={toggledCards}
      />
    </div>
  );
};

export default App;
