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

      // we need to verify that our workspace is a git repo and that it is in ECE-327 or ECE327. perhaps in the future we can add a
      // configuration option to allow the user to specify the parent folders they want auto commit enabled for.
      const workspaceRoot = workspaceFolders[0].uri.fsPath;
      const lowerWorkspaceRoot = workspaceRoot.toLowerCase();

      if (
        !lowerWorkspaceRoot.includes("ece-327") &&
        !lowerWorkspaceRoot.includes("ece327")
      )
        return vscode.window.showErrorMessage(
          "Workspace is not in ECE-327 or ECE327"
        );

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
