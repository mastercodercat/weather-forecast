import { MouseEvent } from "react";
import { OptionType } from "../types";
import { useStore } from "../store";
import Remove from "./Icons/Remove";

type Props = {
  onOptionSelect: (option: OptionType) => void;
};

const History = ({ onOptionSelect }: Props): JSX.Element => {
  const addHistory = useStore((state) => state.addHistory);
  const removeHistory = useStore((state) => state.removeHistory);
  const history = useStore((state) => state.history);

  const onClickOption = (option: OptionType) => {
    addHistory(option);
    onOptionSelect(option);
  };

  const onRemoveHistory = (e: MouseEvent<HTMLDivElement>, id: number) => {
    e.stopPropagation();
    removeHistory(id);
  };

  return (
    <div className="pt-10">
      {history.map((option: OptionType, index) => (
        <div key={`history_${index}`}>
          <button
            className="text-left text-md w-full text-white hover:bg-sky-600 px-2 py-1 flex justify-between"
            onClick={() => onClickOption(option)}
          >
            <span>
              {option.name}, {option.country}
            </span>
            <div onClick={(e) => onRemoveHistory(e, index)}>
              <Remove />
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default History;
