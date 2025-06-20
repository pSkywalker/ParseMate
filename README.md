<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
</head>
<body>

<h1>🧩 ParseMate <img src="https://img.shields.io/npm/v/parsemate"/> <img src="https://img.shields.io/npm/l/parsemate"/></h1>
<p>A flexible, zero-dependency TypeScript class for parsing command-line arguments with support for multi-value flags, default values, required arguments, and rich help output.</p>

<img width="298" height="253" src="https://github.com/user-attachments/assets/8bc7b0de-ef87-4921-bb1c-7a8fbf7d9a1d"/>

<hr>

<h2>🚀 Features</h2>
<ul>
  <li>Define your own argument structure using <code>ArgSpec</code></li>
  <li>Support for required flags and multiple values</li>
  <li>Auto-generated terminal help with examples</li>
  <li>Simple access to argument values</li>
</ul>

<hr>

<h2>📦 Installation</h2>
<p>This is a self-contained utility. Just include <code>ArgvParser.ts</code> and <code>ArgSpec.ts</code> in your project.</p>
<p>Or install from npm:</p>
<pre><code>npm install parsemate</code></pre>
<hr>

<h2>📄 Usage</h2>
<pre><code>import { ArgvParser } from "parsemate";
( () =&gt; {
  const appName = "test.js";      
  const parser = new ArgvParser( appName , {
    folder: {
      flags: ['-f', '--folder'],
      description: 'Folder to scan',
      required: true,
      multiple: true,
    },
    tech: {
      flags: ['-t', '--tech'],
      description: 'Technologies to process',
      multiple: true,
      default: ['html', 'css'],
    },
    output: {
      flags: ['-o', '--output'],
      description: 'Output folder',
      default: 'dist',
    },
  });
  
    for (const [key, value] of parser.entries) {
      console.log(`${key}:`, value);
    }
})();
</code></pre>
<hr>

<h2>🔧 ArgSpec Type</h2>
<pre><code>export type ArgSpec = {
  flags: string[];          // e.g., ['-f', '--folder']
  description: string;
  required?: boolean;
  multiple?: boolean;
  default?: any;
};</code></pre>

<hr>

<h2>🔍 Example Help Output</h2>
<hr>
<img src="https://github.com/user-attachments/assets/7cd0fa39-9156-45ee-a97e-1cc5ac6a016a"/>
<h2>🧪 API Reference</h2>
<ul>
  <li><code>constructor(appName: String, defs: ArgDefinition)</code> – Initialize with a map of argument specs.</li>
  <li><code>getArg(name: string)</code> – Get the parsed value for a specific argument.</li>
  <li><code>getAll()</code> – Get all parsed arguments as an object.</li>
  <li><code>keys</code> – Array of all argument names.</li>
  <li><code>values</code> – Array of all parsed values.</li>
  <li><code>entries</code> – Array of <code>[key, value]</code> pairs.</li>
  <li><code>definitionList</code> – Array of defined arguments and specs.</li>
  <li><code>generateHelp(appName?: string)</code> – Returns CLI help string.</li>
</ul>

<hr>

<h2>📃 License</h2>
<p>MIT – Use freely in personal or commercial projects.</p>

</body>
</html>
