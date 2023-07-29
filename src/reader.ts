import * as readline from "readline";

export default class Reader {
    public static readLine(sQuestion: string): Promise<string> {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });

        return new Promise(resolve => rl.question(sQuestion, ans => {
            rl.close();
            resolve(ans);
        }));
    }
}