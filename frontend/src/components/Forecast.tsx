import Degree from "./Degree";
import Tile from "./Tile";
import { getSunTime } from "../helper/index";
import { ForecastType } from "../types";

const Forecast = ({ data, clear }: { data: ForecastType; clear: Function }) => {
  const today = data.list[0];

  return (
    <div className="w-full max-w-[800px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto bg-white bg-opacity-20 backdrop-blur-ls rounded drop-shadow-lg my-6">
      <div className="mx-auto w-[600px]">
        <section className="text-center">
          <h2 className="text-2xl font-black">
            {data.name} {data.country}
          </h2>
          <p className="font-bold text-3xl">
            <Degree temp={today.main.temp} />
          </p>
          <p className="text-m font-medium">
            {today.weather[0].main} ({today.weather[0].description})
          </p>
          <p className="font-medium">
            H: <Degree temp={Math.ceil(today.main.temp_max)} /> L: <Degree temp={Math.floor(today.main.temp_min)} />
          </p>
          <section className="flex overflow-x-scroll mt-4 pb-2 mb-5">
            {data.list.map((item, i) => (
              <div key={i} className="w-[50px] inline-block text-center flex-shrink-0">
                <p className="text-sm font-medium">{i === 0 ? "Now" : new Date(item.dt * 1000).getHours()}</p>
                <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="weather" />
                <p className="text-sm font-bold">
                  <Degree temp={item.main.temp} />
                </p>
              </div>
            ))}
          </section>
          <section className="flex flex-wrap justify-between text-zinc-700">
            <Tile title="Sunrise" info={getSunTime(data.sunrise)} />
            <Tile title="Sunset" info={getSunTime(data.sunset)} />
            <Tile title="Wind" info={`${Math.round(today.wind.speed)} km/h`} />
            <Tile title="Feels Like" info={<Degree temp={today.main.feels_like} />} />
            <Tile title="Humidity" info={`${Math.round(today.main.humidity)} %`} />
            <Tile title="Precipitation" info={`${today.pop} %`} />
            <Tile title="Pressure" info={`${Math.round(today.main.pressure)} hPa`} />
            <Tile title="Visibility" info={`${Math.round(today.visibility) / 1000} Km`} />
          </section>
          <button
            className="px-3 py-1 text-white rounded outline-none font-bold text-md border"
            onClick={() => clear()}
          >
            Home
          </button>
        </section>
      </div>
    </div>
  );
};

export default Forecast;
