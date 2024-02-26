import { useState, ChangeEvent } from "react";
import { OptionType, ForecastType } from "../types";

const LOCATION_ENDPOINT = "http://localhost:3001/location";
const FORECAST_ENDPOINT = "http://localhost:3001/forecast";

const useForecast = () => {
  const [term, setTerm] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<OptionType | null>(null);
  const [weather, setWeather] = useState<ForecastType | null>(null);

  const fetchLoc = async (cityname: string) => {
    try {
      const fetchResult = await fetch(`${LOCATION_ENDPOINT}?city=${cityname}&limit=10`);
      const locationRes = await fetchResult.json();
      setOptions(locationRes);
    } catch (error) {
      console.error(error);
    }
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);
    if (value === "") {
      return;
    }
    fetchLoc(value);
  };

  const onOptionSelect = (option: OptionType) => {
    setCity(option);
    setTerm(option.name + ", " + option.country);
    setOptions([]);
  };

  const fetchWeather = async (city: OptionType) => {
    try {
      const fetchRes = await fetch(
        `${FORECAST_ENDPOINT}?city=${city.name}&state=${city.state}&country=${city.country}`
      );
      const forecastDetails = await fetchRes.json();
      const forecastDet = {
        ...forecastDetails.city,
        list: forecastDetails.list.slice(0, 16),
      };
      setWeather(forecastDet);
    } catch (error) {
      console.error(error);
    }
  };

  const clear = () => {
    setTerm("");
    setOptions([]);
    setCity(null);
    setWeather(null);
  };

  return {
    term,
    city,
    weather,
    options,
    onInputChange,
    onOptionSelect,
    fetchWeather,
    clear,
  };
};

export default useForecast;
