import shelljs from "shelljs";

import fs from "fs";
import archiver from "archiver";

import { printMessage } from "../utils";

export default class Repository {
  public static getRepoInfos(repoURL: string) {
    return {
      username: repoURL.split("/")[3],
      repoName: repoURL.split("/")[4],
    };
  }

  public static cloneRepo(repoURL: string, destination: string, username: string) {
    printMessage(`Clonando o repositório de "${username}"...`, "#f5508e");

    shelljs.cd(destination);
    shelljs.exec(`git clone ${repoURL}`, { silent: true });
  }

  public static compressRepo(source: string, repoName: string, username: string) {
    printMessage(`Comprimindo o repositório de "${username}"...`, "#fddd7c");

    const output = fs.createWriteStream(`${source}/${repoName}.zip`);

    const archive = archiver("zip");

    archive.pipe(output);
    archive.directory(`${source}/${repoName}`, repoName);
    archive.finalize();
  }
}
