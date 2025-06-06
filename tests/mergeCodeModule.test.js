const { mergeCode } = require('../src/index.js');

function safeTest(name, fn) {
  it(name, () => {
    try {
      fn();
    } catch (err) {
      if (err.message && err.message.includes('aiCoder CLI')) {
        console.warn('SKIPPED:', name, '-', err.message);
        return pending('aiCoder CLI not available: ' + err.message);
      }
      throw err;
    }
  });
}

describe('mergeCode', () => {
  safeTest('merges two simple function declarations', async () => {
    const currentCode = `function foo() { return 1; }`;
    const stepCode = `function bar() { return 2; }`;
    const merged = await mergeCode(currentCode, stepCode, 'js');
    expect(merged).toMatch(/function foo\(\)/);
    expect(merged).toMatch(/function bar\(\)/);
    expect(merged).not.toMatch(/Duplicate declaration/);
  });

  safeTest('deduplicates variable declarations', async () => {
    const currentCode = `const x = 1;`;
    const stepCode = `const x = 2;`;
    const merged = await mergeCode(currentCode, stepCode, 'js');
    expect(merged).toContain('const x = 2;');
    expect(merged).not.toContain('const x = 1;');
  });

  safeTest('merges logic into existing function (function extension)', async () => {
    const currentCode = `function foo() { return 1; }`;
    const stepCode = `function foo() { return 2; }`;
    const merged = await mergeCode(currentCode, stepCode, 'js');
    expect(merged).toMatch(/function foo\(\)/);
    expect(merged).toContain('return 2;');
  });

  safeTest('extends a class with new method', async () => {
    const currentCode = `class Foo { constructor() {} }`;
    const stepCode = `class Foo { bar() { return 'bar'; } }`;
    const merged = await mergeCode(currentCode, stepCode, 'js');
    expect(merged).toMatch(/class Foo[\s\S]*bar\(\)\s*{\s*return 'bar';\s*}/);
  });

  safeTest('inserts top-level statements', async () => {
    const currentCode = `const x = 1;`;
    const stepCode = `const y = 2;`;
    const merged = await mergeCode(currentCode, stepCode, 'js');
    expect(merged).toContain('const x = 1;');
    expect(merged).toContain('const y = 2;');
  });

  safeTest('handles duplicate function declarations gracefully', async () => {
    const currentCode = `function foo() { return 1; }`;
    const stepCode = `function foo() { return 2; }`;
    const merged = await mergeCode(currentCode, stepCode, 'js');
    expect(merged).toMatch(/function foo\(\)/);
    expect(merged).toContain('return 2;');
  });

  safeTest('handles conflicting variable values by keeping the latest', async () => {
    const currentCode = `const x = 1;`;
    const stepCode = `const x = 2;`;
    const merged = await mergeCode(currentCode, stepCode, 'js');
    expect(merged).toContain('const x = 2;');
    expect(merged).not.toContain('const x = 1;');
  });

  safeTest('preserves comments', async () => {
    const currentCode = `// comment\nfunction foo() { return 1; }`;
    const stepCode = `function bar() { return 2; }`;
    const merged = await mergeCode(currentCode, stepCode, 'js');
    expect(merged).toContain('// comment');
  });

  safeTest('preserves order of unrelated declarations', async () => {
    const currentCode = `function foo() { return 1; }\nconst x = 1;`;
    const stepCode = `function bar() { return 2; }\nconst y = 2;`;
    const merged = await mergeCode(currentCode, stepCode, 'js');
    expect(merged).toMatch(/function foo\(\)/);
    expect(merged).toMatch(/function bar\(\)/);
    expect(merged).toContain('const x = 1;');
    expect(merged).toContain('const y = 2;');
  });
}); 