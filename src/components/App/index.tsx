import * as React from "react";
import cards from "data/cards.json";
import CardList from "components/CardList";
import toggledCardsReducer, { getInitialState } from "components/App/reducer";
import { toggleCard as toggleCardAction } from "components/App/actions";
import "./styles.scss";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  const [toggledCards, dispatch] = React.useReducer(
    toggledCardsReducer,
    getInitialState()
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
