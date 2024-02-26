import { ChangeEvent, MouseEvent, useState } from "react";
import { OptionType } from "../types";
import { ThreeCircles } from "react-loader-spinner";
import { useStore } from "../store";
import Remove from "./Icons/Remove";
import History from "./History";

type Props = {
  term: string;
  options: [];
  city: OptionType | null;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: OptionType) => void;
  fetchWeather: (city: OptionType) => void;
};

const Search = ({ term, city, options, onInputChange, onOptionSelect, fetchWeather }: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const addHistory = useStore((state) => state.addHistory);

  const onClickOption = (option: OptionType) => {
    addHistory(option);
    onOptionSelect(option);
  };

  if (city && !isLoading) {
    fetchWeather(city);
    setIsLoading(true);
  }

  if (isLoading) {
    return (
      <ThreeCircles
        visible={true}
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="three-circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    );
  }

  return (
    <div className="flex justify-center items-center bg-sky-400 h-[100vh] w-full">
      <section className="bg-white rounded bg-opacity-20 backdrop-blur-lg drop-shadow-lg w-full md:max-w-[560px] p-4 flex flex-col text-center justify-center md:px-10 lg:p-24 h-full sm:h-[560px] lg:h-[560px] text-zinc-700">
        <h1 className="text-4xl font-bold">Weather Dashboard</h1>
        <p className="text-sm mt-3 mb-5">Search cities</p>
        <div className="relative flex mt-4 justify-center">
          <input
            type="text"
            placeholder="City Name Here"
            value={term}
            onChange={onInputChange}
            className="px-3 py-2 rounded-lg border-2 border-white outline-none text-black"
          />
          <ul className="bg-white rounded-b-md top-9 absolute ml-1 left-16 sm:left-20 md:left-8">
            {options?.map((option: OptionType, index) => (
              <li key={`options_${index}`}>
                <button
                  className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1"
                  onClick={() => onClickOption(option)}
                >
                  {option.name}, {option.country}
                </button>
              </li>
            ))}
          </ul>
          <button className="ml-4 text-zinc-100 border-2 border-zinc-100 px-4 py-1 cursor-pointer hover:text-zinc-500">
            Search
          </button>
        </div>
        <History onOptionSelect={onOptionSelect} />
      </section>
    </div>
  );
};

export default Search;
