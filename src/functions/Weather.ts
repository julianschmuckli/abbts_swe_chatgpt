import Function from "../interfaces/Function";

export default class Weather implements Function {
    name = "Weather"
    description = "Returns the current weather from a given location."

    call(aArguments: String[]): Promise<any> {
        return new Promise((resolve, reject) => {
            console.log("Test", aArguments);
            resolve(true);
        });
    }
}