//import forTesting from "../utils/for_testing.js";
const forTesting = require("../utils/for_testing");

test("palindrome of a", () => {
  const result = forTesting.palindrome("a");

  expect(result).toBe("a");
});

test("palindrome of react", () => {
  const result = forTesting.palindrome("react");

  expect(result).toBe("tcaer");
});

test("palindrome of releveler", () => {
  const result = forTesting.palindrome("releveler");

  expect(result).toBe("releveler");
});
