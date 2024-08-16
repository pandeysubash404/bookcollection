## Running Jest Unit Tests with ES6 Modules in Node.js

### 1. Initialize Your Project
Initialize your Node.js project and install Jest:

```bash
npm init -y
npm install jest --save-dev
```

### 2. Enable ES6 Modules in Node.js
Set your package.json configuration:

```json
{
  "type": "module",
  "scripts": {
    "test": "jest"
  }
}
```

### 3. Configure Jest for ES6 Modules
Jest needs to be configured to work with ES6 modules. Install Babel if your project uses ES6 features not natively supported by Node.js:

```bash
npm install --save-dev babel-jest @babel/preset-env
```

Create a .babelrc file:

```json
{
  "presets": ["@babel/preset-env"]
}
```

### 4. Writing ES6 Modules
Example ES6 module math.js:

```js
// math.js
export function add(a, b) {
  return a + b;
}
```

### 5. Writing Jest Test Files
Example test file math.test.js:

```js
import { add } from './math.js';

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});
```

### 6. Running the Tests
Run the tests using:

```bash
npm test
```

### 7. Additional Configurations (Optional)
You can customize Jest with a jest.config.js file:

```js
export default {
  moduleFileExtensions: ['js'],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["json", "html", "text"],
  verbose: true,
  testTimeout: 20000,
  testEnvironment: "node"
  //other configuration
};
```
---