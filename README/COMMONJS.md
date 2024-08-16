## Running Jest Unit Tests with **CommonJS** in Node.js

### 1. Initialize Your Project
Initialize your Node.js project and install Jest:

```bash
npm init -y
npm install jest --save-dev
```

### 2. Enable CommonJS Modules in Node.js
Set your `package.json` configuration:

```json
{
  "type": "commonjs",
  "scripts": {
    "test": "jest"
  }
}
```

### 3. Writing CommonJS Modules
Example module `math.js`:

```js
// math.js
module.exports = function add(a, b) {
  return a + b;
};
```

### 4. Writing Jest Test Files
Example test file `math.test.js`:

```js
const { add } = require('./math.js');

test('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});
```

### 5. Running the Tests
Run the tests using:

```bash
npm test
```

### 6. Additional Configurations (Optional)
You can customize Jest with a  `jest.config.js` file:

```js
module.exports = {
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