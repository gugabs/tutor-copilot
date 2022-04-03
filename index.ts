import "./setup";

import shelljs from "shelljs";

import Spreadsheet from "./src/classes/Spreadsheet";
import Repository from "./src/classes/Repository";

import { printMessage } from "./src/utils";

const spreadsheet = new Spreadsheet();

async function init() {
  await spreadsheet.connect();
}

printMessage("Criando diretório temporário...", "#f77dae");

const baseDir = `${process.env.ROOT_DIR}/tutor-copilot`;
shelljs.mkdir(baseDir);

init().then(async () => {
  const repoURLS = await spreadsheet.getRepoURLS();

  repoURLS.forEach((repoURL) => {
    const { username, repoName } = Repository.getRepoInfos(repoURL);

    printMessage(`Alocando o diretório individual de "${username}"...`, "#f77dae");

    const cloneDir = `${baseDir}/${username}-${repoName}`;
    shelljs.mkdir(cloneDir);

    Repository.cloneRepo(repoURL, cloneDir, username);
    Repository.compressRepo(cloneDir, repoName, username);
  });

  printMessage("Removendo diretório temporário...", "#f77dae");

  shelljs.rm("-rf", `${process.env.ROOT_DIR}/tutor-copilot`);
});
