import { ArgSpec } from './interfaces/ArgSpec';
export type ArgDefinition = Record<string, ArgSpec>;
export declare class ArgvParser {
    private args;
    private definitions;
    private result;
    constructor(definitions: ArgDefinition);
    private parse;
    getArg(name: string): any;
    getAll(): Record<string, any>;
    get keys(): string[];
    get values(): any[];
    get entries(): [string, any][];
    get definitionList(): {
        key: string;
        spec: ArgSpec;
    }[];
    generateHelp(appName?: string): string;
}
