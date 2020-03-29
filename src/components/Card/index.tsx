import * as React from "react";
import "./styles.scss";

export interface ICardProps {
  number: number;
  description: string;
  isToggled: boolean;
  toggleCard(number: number): void;
  color?: string;
}

const Card: React.FunctionComponent<ICardProps> = ({
  number,
  description,
  isToggled,
  toggleCard,
  color
}) => {
  const onClick = React.useCallback(() => {
    toggleCard(number);
  }, [toggleCard, number]);

  return (
    <div
      className="card"
      onClick={onClick}
      role="presentation"
      style={
        isToggled && color ? { boxShadow: `0 0 0em 0.5em ${color}` } : undefined
      }
    >
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
