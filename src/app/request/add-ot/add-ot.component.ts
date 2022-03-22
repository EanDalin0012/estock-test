import { NgForm } from '@angular/forms';
import { OTData } from './../../share/data/OT';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

import {
  CheckboxSelectionCallbackParams,
  ColDef,
  GridReadyEvent,
  HeaderCheckboxSelectionCallbackParams,
  GridApi
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import "@ag-grid-community/core/dist/styles/ag-grid.css";
import "@ag-grid-community/core/dist/styles/ag-theme-alpine.css";
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';

ModuleRegistry.registerModules([ClientSideRowModelModule]);



@Component({
  selector: 'app-add-ot',
  templateUrl: './add-ot.component.html',
  styleUrls: ['./add-ot.component.css']
})
export class AddOTComponent implements OnInit {

  oTData!: OTData;
  private gridApi!: GridApi;
  public columnDefs: ColDef[] = [
    {
      headerName: 'date',
      field: 'date',
      minWidth: 40,
      checkboxSelection: checkboxSelection,
      headerCheckboxSelection: headerCheckboxSelection,
    },
    {
      headerName: 'Name',
      field: 'startTime',
      tooltipField: 'startTime',
      tooltipComponentParams: { color: '#ececec' },
      minWidth: 100,
    },
    {
      headerName: 'Name',
      field: 'endTime',
      tooltipField: 'endTime',
      tooltipComponentParams: { color: '#ececec' },
      minWidth: 100,
    }
  ];
  public autoGroupColumnDef: ColDef = {
    headerName: 'Group',
    minWidth: 170,
    field: 'athlete',
    valueGetter: function (params) {
      if (params.node!.group) {
        return params.node!.key;
      } else {
        return params.data[params.colDef.field!];
      }
    },
    headerCheckboxSelection: true,
    cellRenderer: 'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true,
    },
  };
  public defaultColDef: ColDef = {
    // editable: true,
    // enableRowGroup: true,
    // enablePivot: true,
    // enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
  };
  public rowSelection = 'single';
  public rowGroupPanelShow = 'always';
  public pivotPanelShow = 'always';
  public rowData!: any[];
  public tooltipShowDelay = 0;
  public tooltipHideDelay = 2000;
  itemSelectedGride: any;
  disabled = true;

  constructor() {
    this.oTData = {} as OTData;
  }

  ngOnInit(): void {
  }


  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api!.sizeColumnsToFit();
    // this.http
    //   .get<any[]>('https://www.ag-grid.com/example-assets/olympic-winners.json')
    //   .subscribe((data) => (this.rowData = data));
   this.rowData = [];
  }

  onSelectionChanged(event: any) {
    const selectedRows = this.gridApi.getSelectedRows();
    if(selectedRows.length === 0) {
      this.disabled = true;
    } else {
      this.disabled = false;
      this.itemSelectedGride = selectedRows[0];
    }

    // (document.querySelector('#selectedRows') as any).innerHTML =
    //   selectedRows.length === 1 ? selectedRows[0].athlete : '';
  }

  public btnSave(form: NgForm): void {
    console.log(form.form.value, form.invalid);

    // console.log(this.oTData.startTime - this.oTData.endTime);
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }
    else {
      this.rowData.push(this.oTData);
      this.oTData = {} as OTData;
      form.resetForm();
      this.gridApi.setRowData(this.rowData);
      console.log(this.rowData);

    }
  }

}


var checkboxSelection = function (params: CheckboxSelectionCallbackParams) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};
var headerCheckboxSelection = function (
  params: HeaderCheckboxSelectionCallbackParams
) {
  // we put checkbox on the name if we are not doing grouping
  return params.columnApi.getRowGroupColumns().length === 0;
};
