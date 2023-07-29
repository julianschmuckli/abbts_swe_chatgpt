import { ChatCompletionFunctions } from "openai";

export default interface Function extends ChatCompletionFunctions {
    call(aArguments : object) : Promise<any>;
}