import * as React from "react";
import "./styles.scss";

export interface ICardProps {
  number: number;
  description: string;
}

const Card: React.FunctionComponent<ICardProps> = ({ number, description }) => {
  const [isSelected, setSelected] = React.useState<boolean>(false);

  const onClick = React.useCallback(() => {
    setSelected(s => !s);
  }, []);

  const classNames = ["card"];

  if (isSelected) {
    classNames.push("card--selected");
  }

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
