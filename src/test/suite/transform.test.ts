import * as assert from "assert";
import * as switchCase from "../../switchCase";

suite("transform", () => {
  test("to upper", () => {
    ["hello", "hello1234", "hello/there"].forEach((input) => {
      assert.strictEqual(
        switchCase.transform({
          text: input,
          mode: "upper",
        }),
        input.toUpperCase(),
      );
    });
  });

  test("to lower", () => {
    ["Hello", "hello", "HelloThere", "HELLO-THERE", "hello/there"].forEach(
      (input) => {
        assert.strictEqual(
          switchCase.transform({
            text: input,
            mode: "lower",
          }),
          input.toLowerCase(),
        );
      },
    );
  });

  test("to dash", () => {
    [
      ["Hello", "Hello"],
      ["hello", "hello"],
      ["hello1234", "hello1234"],
      ["1234hello", "1234hello"],
      ["HelloThere", "Hello-There"],
      ["HelloThere1234", "Hello-There1234"],
      ["HELLO-THERE", "HELLO-THERE"],
      ["hello/there", "hello-there"],
      ["hello there", "hello-there"],
    ].forEach(([input, expected]) => {
      assert.strictEqual(
        switchCase.transform({
          text: input,
          mode: "dash",
        }),
        expected,
        `expected ${input} to be ${expected}`,
      );
    });
  });

  test("to scream dash", () => {
    [
      ["Hello", "HELLO"],
      ["hello", "HELLO"],
      ["hello1234", "HELLO1234"],
      ["1234hello", "1234HELLO"],
      ["HelloThere", "HELLO-THERE"],
      ["HelloThere1234", "HELLO-THERE1234"],
      ["HELLO-THERE", "HELLO-THERE"],
      ["hello/there", "HELLO-THERE"],
      ["hello there", "HELLO-THERE"],
    ].forEach(([input, expected]) => {
      assert.strictEqual(
        switchCase.transform({
          text: input,
          mode: "screamDash",
        }),
        expected,
        `expected ${input} to be ${expected}`,
      );
    });
  });

  test("to space", () => {
    [
      ["Hello", "Hello"],
      ["hello", "hello"],
      ["hello1234", "hello1234"],
      ["1234hello", "1234hello"],
      ["HelloThere", "Hello There"],
      ["HelloThere1234", "Hello There1234"],
      ["HELLO-THERE", "HELLO THERE"],
      ["hello/there", "hello there"],
      ["hello there", "hello there"],
    ].forEach(([input, expected]) => {
      assert.strictEqual(
        switchCase.transform({
          text: input,
          mode: "space",
        }),
        expected,
        `expected ${input} to be ${expected}`,
      );
    });
  });

  test("to slash", () => {
    [
      ["Hello", "Hello"],
      ["hello", "hello"],
      ["hello1234", "hello1234"],
      ["1234hello", "1234hello"],
      ["HelloThere", "Hello/There"],
      ["HelloThere1234", "Hello/There1234"],
      ["HELLO-THERE", "HELLO/THERE"],
      ["hello/there", "hello/there"],
      ["hello there", "hello/there"],
    ].forEach(([input, expected]) => {
      assert.strictEqual(
        switchCase.transform({
          text: input,
          mode: "slash",
        }),
        expected,
        `expected ${input} to be ${expected}`,
      );
    });
  });

  test("to backslash", () => {
    [
      ["Hello", "Hello"],
      ["hello", "hello"],
      ["hello1234", "hello1234"],
      ["1234hello", "1234hello"],
      ["HelloThere", "Hello\\There"],
      ["HelloThere1234", "Hello\\There1234"],
      ["HELLO-THERE", "HELLO\\THERE"],
      ["hello/there", "hello\\there"],
      ["hello\\there", "hello\\there"],
      ["hello there", "hello\\there"],
    ].forEach(([input, expected]) => {
      assert.strictEqual(
        switchCase.transform({
          text: input,
          mode: "backslash",
        }),
        expected,
        `expected ${input} to be ${expected}`,
      );
    });
  });

  test("to camel", () => {
    [
      ["Hello", "Hello"],
      ["hello", "Hello"],
      ["hello1234", "Hello1234"],
      ["1234hello", "1234hello"],
      ["HelloThere", "HelloThere"],
      ["HelloThere1234", "HelloThere1234"],
      ["HELLO-THERE", "HelloThere"],
      ["hello/there", "HelloThere"],
      ["hello\\there", "HelloThere"],
      ["hello there", "HelloThere"],
    ].forEach(([input, expected]) => {
      assert.strictEqual(
        switchCase.transform({
          text: input,
          mode: "camel",
        }),
        expected,
        `expected ${input} to be ${expected}`,
      );
    });
  });

  test("to camel back", () => {
    [
      ["Hello", "hello"],
      ["hello", "hello"],
      ["hello1234", "hello1234"],
      ["1234hello", "1234hello"],
      ["HelloThere", "helloThere"],
      ["HelloThere1234", "helloThere1234"],
      ["HELLO-THERE", "helloThere"],
      ["hello/there", "helloThere"],
      ["hello\\there", "helloThere"],
      ["hello there", "helloThere"],
    ].forEach(([input, expected]) => {
      assert.strictEqual(
        switchCase.transform({
          text: input,
          mode: "camelBack",
        }),
        expected,
        `expected ${input} to be ${expected}`,
      );
    });
  });

  test("to snake", () => {
    [
      ["Hello", "hello"],
      ["hello", "hello"],
      ["hello1234", "hello1234"],
      ["1234hello", "1234hello"],
      ["HelloThere", "hello_there"],
      ["HelloThere1234", "hello_there1234"],
      ["HELLO-THERE", "hello_there"],
      ["hello/there", "hello_there"],
      ["hello\\there", "hello_there"],
      ["hello there", "hello_there"],
    ].forEach(([input, expected]) => {
      assert.strictEqual(
        switchCase.transform({
          text: input,
          mode: "snake",
        }),
        expected,
        `expected ${input} to be ${expected}`,
      );
    });
  });

  test("to scream snake", () => {
    [
      ["Hello", "HELLO"],
      ["hello", "HELLO"],
      ["hello1234", "HELLO1234"],
      ["1234hello", "1234HELLO"],
      ["HelloThere", "HELLO_THERE"],
      ["HelloThere1234", "HELLO_THERE1234"],
      ["HELLO-THERE", "HELLO_THERE"],
      ["hello/there", "HELLO_THERE"],
      ["hello\\there", "HELLO_THERE"],
      ["hello there", "HELLO_THERE"],
    ].forEach(([input, expected]) => {
      assert.strictEqual(
        switchCase.transform({
          text: input,
          mode: "screamSnake",
        }),
        expected,
        `expected ${input} to be ${expected}`,
      );
    });
  });

  test("to dot", () => {
    [
      ["Hello", "Hello"],
      ["hello", "hello"],
      ["hello1234", "hello1234"],
      ["1234hello", "1234hello"],
      ["HelloThere", "Hello.There"],
      ["HelloThere1234", "Hello.There1234"],
      ["HELLO-THERE", "HELLO.THERE"],
      ["hello/there", "hello.there"],
      ["hello\\there", "hello.there"],
      ["hello there", "hello.there"],
    ].forEach(([input, expected]) => {
      assert.strictEqual(
        switchCase.transform({
          text: input,
          mode: "dot",
        }),
        expected,
        `expected ${input} to be ${expected}`,
      );
    });
  });
});
