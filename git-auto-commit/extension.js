const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log(
    'Congratulations, your extension "git-auto-commit" is now active!'
  );

  let disposable = vscode.commands.registerCommand(
    "git-auto-commit.autoCommit",
    function () {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders || workspaceFolders.length === 0) {
        vscode.window.showErrorMessage("No workspace is open");
        return;
      }

      const workspaceRoot = workspaceFolders[0].uri.fsPath;
      if (!workspaceRoot) {
        vscode.window.showErrorMessage("No workspace is open");
        return;
      }

      const terminal = vscode.window.createTerminal("Git Auto Commit");
      terminal.sendText(`cd "${workspaceRoot}"`);
      terminal.sendText("git add .");
      terminal.sendText(
        "git commit -m \"auto staged commit. To modify my message, please run: git commit --amend -m '<your message>'\""
      );
      terminal.show();
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
