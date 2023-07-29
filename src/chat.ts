import { ChatCompletionFunctions, ChatCompletionResponseMessage, ChatCompletionResponseMessageRoleEnum, Configuration, OpenAIApi } from "openai";
import Reader from "./reader";

import Weather from "./functions/Weather";
require("dotenv").config();

export default class Chat {
    private sModel: string;
    private oOpenAI: OpenAIApi;

    private aMessages: ChatCompletionResponseMessage[] = [];
    private aFunctions : Array<ChatCompletionFunctions> = [
        new Weather()
    ];

    constructor(sModel: string = "gpt-3.5-turbo") {
        this.sModel = sModel;

        console.log(`Using API key: ${process.env.OPENAI_API_KEY}`);
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
        });

        this.oOpenAI = new OpenAIApi(configuration);
    }

    public async start() {
        let bExit = false;
        do {
            const sMessage = await Reader.readLine("Me: ");

            if (sMessage.toLowerCase() === "exit") {
                bExit = true;
            } else {
                await this.sendMessage(sMessage);
            }
        } while (!bExit);
    }

    private async sendMessage(sMessage: string): Promise<boolean> {
        this.aMessages.push({
            role: ChatCompletionResponseMessageRoleEnum.User,
            content: sMessage
        });

        try {
            const oResult = await this.oOpenAI.createChatCompletion({
                model: this.sModel,
                messages: this.aMessages,
                //functions: this.aFunctions
            });

            if (oResult && oResult.data.choices[0].message) {
                const oReturnMessage = oResult.data.choices[0].message;

                if (oReturnMessage.function_call) {
                    console.log(oReturnMessage.content)
                } else {
                    console.log(`ChatGPT: ${oReturnMessage.content}`);
                    this.aMessages.push(oReturnMessage);
                }

                return true;
            } else {
                console.warn("No result provided");
                return false;
            }
        } catch (e: any) {
            console.error(e.message);
        }
        return false;
    }
}