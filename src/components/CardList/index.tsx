import * as React from "react";
import Card from "components/Card";
import { ToggledCards } from "components/App/reducer";
import "./styles.scss";

interface ICardListProps {
  cards: string[];
  toggledCards: ToggledCards;
  toggleCard: (number: number) => void;
}

const CardList: React.FunctionComponent<ICardListProps> = ({
  cards,
  toggledCards,
  toggleCard
}) => {
  return (
    <div className="card-list">
      {cards.map((description, i) => (
        <Card
          number={i + 1}
          key={description}
          description={description}
          isToggled={toggledCards[i + 1]}
          toggleCard={toggleCard}
        />
      ))}
    </div>
  );
};

export default CardList;
