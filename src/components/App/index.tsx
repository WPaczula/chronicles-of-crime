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
import ColorPicker from "components/ColorPicker";
import { ColorChangeHandler } from "react-color";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IAppProps {}

const serverUrl: string =
  process.env.REACT_APP_WEBSOCKET_URL ?? "ws://localhost:5001";

const App: React.FunctionComponent<IAppProps> = () => {
  const [selectedColor, setSelectedColor] = React.useState<string>();

  const onChange: ColorChangeHandler = React.useCallback(color => {
    setSelectedColor(color.hex);
  }, []);

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
      if (selectedColor) {
        dispatch(toggleCardAction(number, selectedColor));
      } else {
        toast("Choose a color first!", {
          type: "error",
          position: "top-center",
          pauseOnHover: false,
          autoClose: 2000
        });
      }
    },
    [dispatch, selectedColor]
  );

  return (
    <div className="app">
      <ToastContainer />
      <ColorPicker selectedColor={selectedColor} onChange={onChange} />
      <CardList
        cards={cards}
        toggleCard={toggleCard}
        toggledCards={toggledCards}
      />
    </div>
  );
};

export default App;
