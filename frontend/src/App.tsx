import Search from "./components/Search";
import useForecast from "./hooks/useForecast";
import Forecast from "./components/Forecast";

const App = (): JSX.Element => {
  const { term, city, weather, options, onInputChange, onOptionSelect, fetchWeather, clear } = useForecast();

  return (
    <main className="flex justify-center items-center bg-sky-400 w-full">
      {!weather ? (
        <Search
          term={term}
          city={city}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          fetchWeather={fetchWeather}
        />
      ) : (
        <Forecast data={weather} clear={clear} />
      )}
    </main>
  );
};

export default App;
