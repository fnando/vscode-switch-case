import * as vscode from "vscode";
import * as assert from "assert";

function assertList(actual: unknown[], expected: unknown[]) {
  actual.forEach((actualItem, index) => {
    assert.strictEqual(actualItem, expected[index]);
  });
}

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function createDocument(content: string) {
  const uri = vscode.Uri.parse("untitled:" + "file:/tmp/test.txt");
  const document = await vscode.workspace.openTextDocument(uri);
  const editor = await vscode.window.showTextDocument(document);

  await editor.edit((builder) => {
    builder.insert(new vscode.Position(0, 0), content);
  });

  await sleep(50);

  return { editor };
}

async function select(
  editor: vscode.TextEditor,
  text: string,
  append: boolean = false,
) {
  const selections = append ? editor.selections : [];

  const selection = new vscode.Selection(
    new vscode.Position(selections.length, 0),
    new vscode.Position(selections.length, text.length),
  );

  selections.push(selection);
  editor.selections = selections;
}

async function runCommand(command: string) {
  await vscode.commands.executeCommand(command);
  await sleep(50);
}

function getSelections(editor: vscode.TextEditor) {
  return editor.selections.map((selection) =>
    editor.document.getText(selection),
  );
}

suite("alternate", () => {
  test("single word", async () => {
    const input = "hello";
    const { editor } = await createDocument(input);

    await select(editor, input);

    await runCommand("switch-case.alternate");
    assertList(getSelections(editor), ["HELLO"]);

    await runCommand("switch-case.alternate");
    assertList(getSelections(editor), ["Hello"]);

    await runCommand("switch-case.alternate");
    assertList(getSelections(editor), ["hello"]);

    await runCommand("workbench.action.closeAllEditors");
  });

  test("camel case", async () => {
    const input = "helloThere";
    const { editor } = await createDocument(input);

    await select(editor, input);

    await runCommand("switch-case.alternate");
    assertList(getSelections(editor), ["HelloThere"]);

    await runCommand("switch-case.alternate");
    assertList(getSelections(editor), ["hello_there"]);

    await runCommand("switch-case.alternate");
    assertList(getSelections(editor), ["hello/there"]);

    await runCommand("switch-case.alternate");
    assertList(getSelections(editor), ["hello\\there"]);

    await runCommand("switch-case.alternate");
    assertList(getSelections(editor), ["hello.there"]);

    await runCommand("switch-case.alternate");
    assertList(getSelections(editor), ["hello-there"]);

    await runCommand("switch-case.alternate");
    assertList(getSelections(editor), ["hello there"]);

    await runCommand("switch-case.alternate");
    assertList(getSelections(editor), ["hello_there"]);

    await runCommand("switch-case.alternate");
    assertList(getSelections(editor), ["HELLO_THERE"]);

    await runCommand("switch-case.alternate");
    assertList(getSelections(editor), ["HELLO-THERE"]);

    await runCommand("switch-case.alternate");
    assertList(getSelections(editor), ["HELLO_THERE"]);

    await runCommand("switch-case.alternate");
    assertList(getSelections(editor), ["helloThere"]);

    await runCommand("workbench.action.closeAllEditors");
  });

  test("multiple selections", async () => {
    const input = "helloThere\nokBye";
    const { editor } = await createDocument(input);

    await select(editor, "helloThere");
    await select(editor, "okBye", true);

    await runCommand("switch-case.alternate");
    assertList(getSelections(editor), ["HelloThere", "OkBye"]);

    await runCommand("switch-case.alternate");
    assertList(getSelections(editor), ["hello_there", "ok_bye"]);

    await runCommand("workbench.action.closeAllEditors");
  });
});
