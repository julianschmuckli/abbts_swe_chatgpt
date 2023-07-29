const fetch = require('node-fetch');

export default class OpenWeatherMap {
    private sApiKey: string;
    private sUnit: string;

    constructor(sApiKey: string, sUnit: string = "metric") {
        this.sApiKey = sApiKey;
        this.sUnit = sUnit;
    }

    public async getCoordinates(sLocation: string): Promise<number[] | null> {
        try {
            const oResult = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${sLocation}&appid=${this.sApiKey}`);
            const oJSON = await oResult.json();

            return [oJSON[0].lat, oJSON[0].lon];
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public async getWeather(coord: number[]): Promise<string | null> {
        try {
            const oResult = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coord[0]}&lon=${coord[1]}&units=${this.sUnit}&&appid=${this.sApiKey}`);
            const oJSON = await oResult.json();

            const oCurrent = oJSON.current.weather[0];

            return `${oCurrent.description} and ${Math.round(oJSON.current.temp)}° ${this.getUnitName()}`;
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    private getUnitName(): string {
        switch (this.sUnit) {
            case "imperial":
                return "Fahrenheit";
            case "metric":
            default:
                return "Celsius";
        }
    }
}