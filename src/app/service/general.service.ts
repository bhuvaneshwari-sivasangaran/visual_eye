import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor() { }

  processData(data: string, hasHeader: boolean): void {
    let response: any = { data: [], header: [] };
    if (data != null && data.length > 0) {
      const tempData = data;
      let rows = [];
      rows = tempData.split('\r\n');
      // rows = tempData.split('\n');
      for (let row of rows) {
        if (row.trim() === '') {
          continue;
        }
        row = row.replace('\r', '')
        const rowSplits = row.split(',');
        response.data.push(rowSplits);
      }
      if ( hasHeader ) {
        response.header.push(response.data[0])
        response.data.shift();
      } else {
        let header = [];
        for (let i = 0; i < response.data.length; i++) {
          header.push('Column '+ ( i + 1 ) );
        }
        response.header.push(header);
      }
    } else {
      response = [];
    }

    return response;

  };

}
