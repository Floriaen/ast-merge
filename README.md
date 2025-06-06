# ast-merge

This module merges a piece of code seamlessly into another one, handling function and variable duplication and conflicts. It ensures that the latest declarations are kept and earlier duplicates are removed.

## Capabilities

- Merges two simple function declarations.
- Deduplicates variable declarations, keeping the latest declaration.
- Merges logic into existing functions (function extension).
- Extends a class with a new method.
- Inserts top-level statements.
- Handles duplicate function declarations gracefully.
- Handles conflicting variable values by keeping the latest declaration.
- Preserves comments.
- Preserves the order of unrelated declarations.

## Usage

**Local usage:**
```javascript
import { mergeCode } from './src/index.js';

const currentCode = `function foo() { return 1; }`;
const stepCode = `function bar() { return 2; }`;
const merged = await mergeCode(currentCode, stepCode, 'js');
console.log(merged);
```

**NPM usage (after publishing):**
```javascript
import { mergeCode } from 'ast-merge';
// usage as above
```

## Supported Languages

Currently, only JavaScript (`'js'`) is supported.

## Reference

This module is based on the initial repository: [aiCoder](https://github.com/mmiscool/aiCoder).