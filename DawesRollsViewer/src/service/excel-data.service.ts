import { Injectable } from '@angular/core';
import { Indian } from '../model/indian';

@Injectable({
  providedIn: 'root'
})
export class ExcelDataService {
public listofIndians: Indian[] = [];
  constructor() { }
  initialize(listofIndians: Indian[]) {
    this.listofIndians = listofIndians;
  }
/*  exportExcel() {
    import('xlsx').then((xlsx) => {
        const worksheet = xlsx.utils.json_to_sheet(this.listofIndians);
        const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, {
            bookType: 'xlsx',
            type: 'array',
        });
        this.saveAsExcelFile(excelBuffer, 'tutorials');
    });
}

saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE =
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    ); */
}
