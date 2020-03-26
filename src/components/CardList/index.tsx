import * as React from "react";
import Card from "components/Card";
import "./styles.scss";

interface ICardListProps {
  cards: string[];
}

const CardList: React.FunctionComponent<ICardListProps> = ({ cards }) => {
  return (
    <div className="card-list">
      {cards.map((description, i) => (
        <Card number={i + 1} description={description} />
      ))}
    </div>
  );
};

export default CardList;
