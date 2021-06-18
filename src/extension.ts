import * as vscode from "vscode";
import * as switchCase from "./switchCase";

export function activate(context: vscode.ExtensionContext) {
  switchCase.MODES.forEach((mode) => {
    context.subscriptions.push(
      vscode.commands.registerCommand(`switch-case.${mode.name}`, () => {
        switchCase.run(mode.name as switchCase.ModeKey);
      }),
    );
  });

  context.subscriptions.push(
    vscode.window.onDidChangeTextEditorSelection(() => switchCase.reset()),
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
