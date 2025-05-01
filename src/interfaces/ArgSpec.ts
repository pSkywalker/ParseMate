export type ArgSpec = {
    flags: string[];          // e.g., ['-f', '--folder']
    description: string;
    required?: boolean;
    multiple?: boolean;
    default?: any;
  };