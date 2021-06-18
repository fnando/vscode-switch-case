import * as vscode from "vscode";
import * as changeCase from "change-case";

export const MODES = [
  { name: "alternate", multiWord: true, meta: true },
  { name: "screamDash", multiWord: true, meta: false },
  { name: "screamSnake", multiWord: true, meta: false },
  { name: "camelBack", multiWord: true, meta: false },
  { name: "camel", multiWord: false, meta: false },
  { name: "snake", multiWord: true, meta: false },
  { name: "slash", multiWord: true, meta: false },
  { name: "backslash", multiWord: true, meta: false },
  { name: "dot", multiWord: true, meta: false },
  { name: "dash", multiWord: true, meta: false },
  { name: "space", multiWord: true, meta: false },
  { name: "lower", multiWord: false, meta: false },
  { name: "upper", multiWord: false, meta: false },
];

export type ModeKey =
  | "alternate"
  | "screamDash"
  | "screamSnake"
  | "camel"
  | "backslash"
  | "camelBack"
  | "dot"
  | "dash"
  | "slash"
  | "snake"
  | "space"
  | "lower"
  | "upper";

const originalWords: { text: string; mode: string }[] = [];

export function reset(): void {
  originalWords.length = 0;
}

export function run(targetMode: ModeKey): void {
  const editor = vscode.window.activeTextEditor;
  const document = editor?.document;
  const isFirstRun = originalWords.length === 0;

  if (!document || !editor) {
    return;
  }

  editor.edit((builder) => {
    editor.selections.forEach((selection, index) => {
      if (selection.start.line !== selection.end.line) {
        vscode.window.showErrorMessage("Cannot switch case from multlines.");
        return;
      }

      const originalText = document.getText(selection);
      let mode: ModeKey;
      let transformedText: string;

      if (isFirstRun) {
        if (targetMode === "alternate") {
          const currentMode = findCurrentMode(originalText);
          mode = currentMode ? getNextMode(originalText, currentMode) : "snake";
        } else {
          mode = targetMode;
        }

        originalWords[index] = { text: originalText, mode };
        transformedText = transform({ text: originalText, mode });
      } else {
        mode = getNextMode(originalText, originalWords[index].mode as ModeKey);
        transformedText = transform({ text: originalWords[index].text, mode });
      }

      originalWords[index].mode = mode;

      builder.replace(selection, transformedText);
    });
  });
}

export function filterModes(text: string) {
  const multiWord = toWords(text).length > 1;
  const noMeta = MODES.filter((mode) => !mode.meta);

  if (multiWord) {
    return noMeta;
  }

  return noMeta.filter((mode) => mode.multiWord === multiWord);
}

export function findCurrentMode(text: string): ModeKey | undefined {
  if (text.match(/^[\da-z]+$/)) {
    return "lower";
  }

  const mode = filterModes(text).find(
    (mode) =>
      transform({ text: toWords(text), mode: mode.name as ModeKey }) === text,
  );

  if (!mode) {
    return;
  }

  return mode.name as ModeKey;
}

export function toWords(text: string | string[]): string[] {
  if (text instanceof Array) {
    return text;
  }

  return changeCase.pathCase(text, { transform: (part) => part }).split("/");
}

export function transform({
  text,
  mode,
}: {
  text: string | string[];
  mode: ModeKey;
}): string {
  switch (mode) {
    case "upper":
      return text instanceof Array
        ? text.map((word) => word.toUpperCase()).join("")
        : text.toUpperCase();

    case "lower":
      return text instanceof Array
        ? text.map((word) => word.toLowerCase()).join("")
        : text.toLowerCase();

    case "screamDash":
      return toWords(text)
        .map((word) => word.toUpperCase())
        .join("-");

    case "dash":
      return toWords(text).join("-");

    case "dot":
      return toWords(text).join(".");

    case "space":
      return toWords(text).join(" ");

    case "slash":
      return toWords(text).join("/");

    case "backslash":
      return toWords(text).join("\\");

    case "screamSnake":
      return toWords(text)
        .map((word) => word.toUpperCase())
        .join("_");

    case "snake":
      return toWords(text)
        .map((word) => word.toLowerCase())
        .join("_");

    case "camel":
      return toWords(text)
        .map((word) => changeCase.capitalCase(word))
        .join("");

    case "camelBack":
      return changeCase.camelCase(
        toWords(text)
          .map((word) => changeCase.capitalCase(word))
          .join(""),
      );
  }

  return toWords(text).join("");
}

function getNextMode(text: string, mode: ModeKey): ModeKey {
  const modes = filterModes(text);
  const currentMode = modes.find((m) => m.name === mode);
  const index = currentMode ? modes.indexOf(currentMode) + 1 : 0;

  return (modes[Math.min(index, modes.length)]?.name ??
    modes[0].name) as ModeKey;
}
