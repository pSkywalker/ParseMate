export type ArgSpec = {
    flags: string[];
    description: string;
    required?: boolean;
    multiple?: boolean;
    default?: any;
};
