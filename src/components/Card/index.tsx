import * as React from "react";
import "./styles.scss";

export interface ICardProps {
  number: number;
  description: string;
  isToggled: boolean;
  toggleCard: (number: number) => void;
}

const Card: React.FunctionComponent<ICardProps> = ({
  number,
  description,
  isToggled,
  toggleCard
}) => {
  const classNames = ["card"];

  if (isToggled) {
    classNames.push("card--selected");
  }

  const onClick = React.useCallback(() => {
    toggleCard(number);
  }, [toggleCard, number]);

  return (
    <div className={classNames.join(" ")} onClick={onClick} role="presentation">
      <div className="card__main">
        <p className="card__description">{description}</p>
      </div>
      <footer className="card__footer">
        <div className="card__number">{number}</div>
      </footer>
    </div>
  );
};

export default Card;
