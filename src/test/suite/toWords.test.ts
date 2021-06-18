import * as assert from "assert";
import * as switchCase from "../../switchCase";

suite("toWords", () => {
  const tests: [string, string[]][] = [
    ["hello", ["hello"]],
    ["helloThere", ["hello", "There"]],
    ["HelloThere", ["Hello", "There"]],
    ["Hello-There", ["Hello", "There"]],
    ["Hello/There", ["Hello", "There"]],
    ["Hello\\There", ["Hello", "There"]],
    ["Hello There", ["Hello", "There"]],
    ["Hello.There", ["Hello", "There"]],
    ["Hello_There", ["Hello", "There"]],
    [
      "Hello_There-Nice=1234/Thing.IT\\works right",
      ["Hello", "There", "Nice", "1234", "Thing", "IT", "works", "right"],
    ],
  ];

  tests.forEach(([input, words]) => {
    test(`convert ${input} into words`, () => {
      assert.strictEqual(
        JSON.stringify(switchCase.toWords(input)),
        JSON.stringify(words),
      );
    });
  });
});
