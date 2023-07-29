export default interface Function {
    name: string;
    description: string;
    parameters?: object

    call(aArguments : Array<String>) : Promise<any>;
}