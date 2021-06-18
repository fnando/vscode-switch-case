import * as assert from "assert";
import * as switchCase from "../../switchCase";
import * as words from "../words";

suite("findCurrentMode", () => {
  test("lower", () => {
    words.lower.forEach((input) => {
      const mode = switchCase.findCurrentMode(input);

      assert.strictEqual(mode, "lower", `failed with ${input}; got ${mode}`);
    });
  });

  test("upper", () => {
    words.upper.forEach((input) => {
      const mode = switchCase.findCurrentMode(input);

      assert.strictEqual(mode, "upper", `failed with ${input}; got ${mode}`);
    });
  });

  test("dash", () => {
    words.dash.forEach((input) => {
      assert.strictEqual(
        switchCase.findCurrentMode(input),
        "dash",
        `failed with ${input}`,
      );
    });
  });

  test("scream dash", () => {
    words.screamDash.forEach((input) => {
      assert.strictEqual(
        switchCase.findCurrentMode(input),
        "screamDash",
        `failed with ${input}`,
      );
    });
  });

  test("dot", () => {
    words.dot.forEach((input) => {
      assert.strictEqual(
        switchCase.findCurrentMode(input),
        "dot",
        `failed with ${input}`,
      );
    });
  });

  test("slash", () => {
    words.slash.forEach((input) => {
      assert.strictEqual(
        switchCase.findCurrentMode(input),
        "slash",
        `failed with ${input}`,
      );
    });
  });

  test("backslash", () => {
    words.backslash.forEach((input) => {
      assert.strictEqual(
        switchCase.findCurrentMode(input),
        "backslash",
        `failed with ${input}`,
      );
    });
  });

  test("snake", () => {
    words.snake.forEach((input) => {
      assert.strictEqual(
        switchCase.findCurrentMode(input),
        "snake",
        `failed with ${input}`,
      );
    });
  });

  test("scream snake", () => {
    words.screamSnake.forEach((input) => {
      assert.strictEqual(
        switchCase.findCurrentMode(input),
        "screamSnake",
        `failed with ${input}`,
      );
    });
  });

  test("space", () => {
    words.space.forEach((input) => {
      assert.strictEqual(
        switchCase.findCurrentMode(input),
        "space",
        `failed with ${input}`,
      );
    });
  });

  test("camel", () => {
    words.camel.forEach((input) => {
      assert.strictEqual(
        switchCase.findCurrentMode(input),
        "camel",
        `failed with ${input}`,
      );
    });
  });

  test("camel back", () => {
    words.camelBack.forEach((input) => {
      assert.strictEqual(
        switchCase.findCurrentMode(input),
        "camelBack",
        `failed with ${input}`,
      );
    });
  });
});
