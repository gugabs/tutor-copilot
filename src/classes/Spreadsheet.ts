import {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";

import credentials from "../../credentials.json";

import { printMessage } from "../utils";

export default class Spreadsheet {
  private _document: GoogleSpreadsheet;
  private _sheet?: GoogleSpreadsheetWorksheet;

  constructor() {
    printMessage("Se conectando ao documento do Google Spreadsheet...", "#f77dae");

    this._document = new GoogleSpreadsheet(process.env.SHEET_ID);
  }

  set sheet(sheetTitle: string) {
    this._sheet = this._document.sheetsByTitle[sheetTitle];
  }

  public async connect() {
    printMessage("Se autenticando ao documento do Google Spreadsheet...", "#f77dae");

    await this._document.useServiceAccountAuth({
      client_email: credentials.client_email,
      private_key: credentials.private_key,
    });

    await this._document.loadInfo();

    this.sheet = "reviews";
    await this._sheet!.loadCells();
  }

  public async getRepoURLS(): Promise<string[]> {
    const repoURLS: string[] = [];

    const rows: GoogleSpreadsheetRow[] = await this._sheet!.getRows();

    for (let row of rows) {
      repoURLS.push(row["repositories"]);
    }

    return repoURLS;
  }
}
