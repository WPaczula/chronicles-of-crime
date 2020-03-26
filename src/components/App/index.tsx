import * as React from "react";
import cards from "data/cards.json";
import "./styles.scss";
import CardList from "components/CardList";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <div className="app">
      <CardList cards={cards} />
    </div>
  );
};

export default App;
