import { ArgSpec } from './interfaces/ArgSpec';


  export type ArgDefinition = Record<string, ArgSpec>;
  
  export class ArgvParser {
    private appName: string;
    private args: string[];
    private definitions: ArgDefinition;
    private result: Record<string, any> = {};
  
    constructor(appName : string,definitions: ArgDefinition) {
      this.appName = appName

      this.args = process.argv.slice(2);
      this.definitions = definitions;
      this.parse();
    }
  
    private parse() {
      const flagMap = new Map<string, string>();
  
      for (const key in this.definitions) {
        const def = this.definitions[key];
        def.flags.forEach(flag => flagMap.set(flag, key));
        this.result[key] = def.multiple ? [] : def.default ?? null;
      }
  
      for (let i = 0; i < this.args.length; i++) {
        const key = flagMap.get(this.args[i]);
        if (key) {
          const spec = this.definitions[key];
          if (spec.multiple) {
            while (this.args[i + 1] && !this.args[i + 1].startsWith('-')) {
              this.result[key].push(this.args[++i]);
            }
          } else {
            this.result[key] = this.args[++i] || true;
          }
        }
      }
  
      // Enforce required
      for (const key in this.definitions) {
        const spec = this.definitions[key];
        const value = this.result[key];
        const isMissing = spec.required && (
          value === null ||
          (Array.isArray(value) && value.length === 0)
        );
        if (isMissing) {
          console.error(`❌ Missing required argument: ${spec.flags.join(', ')}`);
          console.log('\n' + this.generateHelp( this.appName ));
          process.exit(1);
        }
      }
    }
  
    public getArg(name: string): any {
      return this.result[name];
    }
  
    public getAll(): Record<string, any> {
      return this.result;
    }
      // Return list of argument names (e.g., ['folder', 'tech', 'output'])
    get keys(): string[] {
        return Object.keys(this.result);
    }

    // Return just the parsed argument values as an array
    get values(): any[] {
        return Object.values(this.result);
    }

    // Return [key, value] pairs (like Object.entries)
    get entries(): [string, any][] {
        return Object.entries(this.result);
    }

    // Return definitions as an array of { key, spec }
    get definitionList(): { key: string; spec: ArgSpec }[] {
        return Object.entries(this.definitions).map(([key, spec]) => ({ key, spec }));
    }
    
    public generateHelp(appName:string = this.appName): string {
        const lines = [
          `╭──────────────────────────────────────────────╮`,
          `│              📄 Command Line Usage            │`,
          `╰──────────────────────────────────────────────╯`,
          ``,
          `USAGE:\n  node ${appName} [OPTIONS]`,
          ``,
          `OPTIONS:`
        ];
      
        // Format each flag group
        for (const key in this.definitions) {
          const spec = this.definitions[key];
          const flags = spec.flags.join(', ').padEnd(28);
          const descLine = `  ${flags} ${spec.description}`;
          lines.push(descLine);
      
          if (spec.default !== undefined) {
            const def = Array.isArray(spec.default) ? spec.default.join(', ') : spec.default;
            lines.push(`                             (default: ${def})`);
          }
          // Add example if known
          lines.push(`                             Example: --`+key+` arg1 arg2`);
          
          lines.push('');
        }
        
        // EXAMPLES
        lines.push(`EXAMPLES:`);
        
        lines.push('');
        let sampleLine = "node " + appName + " ";
        let allRequired = [];
        for (const key in this.definitions) {
          const spec = this.definitions[key];
          const flag = spec.flags[0];
          if (spec.required) {
            allRequired.push( flag );
          }
        }
        
        for( let x = 0; x < allRequired.length; x++ ){ 
          sampleLine += allRequired[x] + ` arg1 `;
        }
        lines.push( sampleLine );
        lines.push( "" );
        // NOTES
        lines.push(`NOTES:`);
        for (const key in this.definitions) {
          const spec = this.definitions[key];
          const flag = spec.flags[0];
          if (spec.required) {
            lines.push(`  - The "${flag}" flag is REQUIRED.`);
          } else if (spec.default !== undefined) {
            const def = Array.isArray(spec.default) ? spec.default.join(', ') : spec.default;
            lines.push(`  - If "${flag}" is omitted, it defaults to "${def}".`);
          }
        }
        lines.push('');
      
        // Footer
        lines.push(`╭──────────────────────────────────────────────╮`);
        lines.push(`│                 🚀 Build faster.             │`);
        lines.push(`╰──────────────────────────────────────────────╯`);
      
        return lines.join('\n');
      }
  }
  
