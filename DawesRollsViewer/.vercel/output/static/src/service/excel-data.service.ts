import { Injectable } from '@angular/core';
import { Indian } from '../model/indian';
import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import { AddIndianTable } from 'src/model/add-indian-table';


interface ColumnDef {
  field: string;
  header: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExcelDataService {
public listofIndians: Indian[] = [];
public addIndianTitles?: AddIndianTable[] = [
    { titleName: "ID", formName: "ID" },
    { titleName: "Tribe", formName: "Tribe" },
    { titleName: "Page", formName: "Page" },
    { titleName: "Last Name", formName: "LastName" },
    { titleName: "First Name", formName: "FirstName" },
    { titleName: "Middle Name", formName: "MiddleName" },
    { titleName: "Suffix", formName: "Suffix" },
    { titleName: "Age", formName: "Age" },
    { titleName: "Year", formName: "Year" },
    { titleName: "Sex", formName: "Sex" },
    { titleName: "Blood", formName: "Blood" },
    { titleName: "Relationship", formName: "Relationship" },
    { titleName: "Roll Num", formName: "RollNum" },
    { titleName: "Source", formName: "Source" }];
  constructor() { }
  initialize(listofIndians: Indian[]) {
    this.listofIndians = listofIndians;
  }

  async exportGridToExcel(): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(this.listofIndians[0].LastName);

    const dataToExport = this.listofIndians;

    worksheet.columns = this.addIndianTitles!.map(col => ({
      header: col.titleName,
      key: col.formName,
      width: Math.max(col.titleName!.length + 4, 15)
    }));

    dataToExport.forEach(row => {
      const rowData: Record<string, any> = {};
      this.addIndianTitles!.forEach(col => {
        if (!col.formName) return;
        const key = col.formName as keyof Indian;
        rowData[String(key)] = row[key] ?? '';
      });
      worksheet.addRow(rowData);
    });

    const headerRow = worksheet.getRow(1);
    headerRow.font = { bold: true };
    headerRow.alignment = { vertical: 'middle', horizontal: 'center' };

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) {
        row.alignment = { vertical: 'middle', horizontal: 'left' };
      }
    });

    worksheet.views = [{ state: 'frozen', ySplit: 1 }];

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob(
      [buffer],
      { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
    );

    saveAs(blob, `${this.listofIndians[0].LastName}.xlsx`);
  }

  private formatDate(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

}