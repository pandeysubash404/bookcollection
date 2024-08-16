## Running Jest Unit Tests with TypeScript in Node.js

### 1. Initialize Your Project
Initialize your Node.js project and install Jest, TypeScript, and necessary types:

```bash
npm init -y
npm install --save-dev jest ts-jest @types/jest typescript
```

### 2. Configure TypeScript
Create a `tsconfig.json` file for TypeScript configuration:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "types": ["jest", "node"]
  },
  "include": ["src/**/*.ts", "tests/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 3. Configure Jest for TypeScript
Create a `jest.config.js` file for Jest configuration:

```js
export default {
  moduleFileExtensions: ['ts'],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "html", "text"],
  verbose: true,
  testTimeout: 20000,
  testEnvironment: "node"
};
```

### 4. Writing TypeScript Code and Tests
Example TypeScript module `src/math.ts`:

```ts
export function add(a: number, b: number): number {
  return a + b;
}
```

Example test file `tests/math.test.ts`:

```ts
import { add } from '../src/math';

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});
```

### 5. Running the Tests
Run the tests using:

```bash
npm test
```

Make sure your `package.json` includes the following script:

```json
{
  "scripts": {
    "test": "jest"
  }
}
```
---