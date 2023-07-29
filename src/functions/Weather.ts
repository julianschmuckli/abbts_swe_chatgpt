import Function from "../interfaces/Function";
import OpenWeatherMap from "../provider/OpenWeatherMap";
require("dotenv").config();

export default class Weather implements Function {
    public name = "Weather"
    public description = "Returns the current weather from a given location."
    public parameters = {
        type: "object",
        properties: {
            location: {
                type: "string",
                description: "The city and state, e.g. San Francisco, CA",
            },
            unit: { type: "string", enum: ["metric", "imperial"] },
        },
        required: ["location"]
    }

    async call(aArguments: object): Promise<any> {
        // @ts-ignore
        const sLocation = aArguments.location;
        // @ts-ignore
        const sUnit = aArguments.unit;

        const oOpenWeatherMap = new OpenWeatherMap(process.env.OPENWEATHERMAP_API_KEY!, sUnit);

        const aCoords : number[] | null = await oOpenWeatherMap.getCoordinates(sLocation);

        if (!aCoords) {
            return "I couldn't find that location.";
        } else {
            const sWeather = await oOpenWeatherMap.getWeather(aCoords);
            return `The weather in ${sLocation} is ${sWeather}.`;
        }
    }
}