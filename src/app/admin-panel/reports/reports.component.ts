import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AdminService } from "../admin.service";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.scss"],
})
export class ReportsComponent implements OnInit {
  dtOptions: any = {};
  dtRendered = true;
  selectedReport = 1;
  report = new FormControl("");
  public tabs: {
    id: number;
    title: string;
    columns: any[];
  }[] = [];

  columns = [];
  values = [];

  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef
  ) {}

  getReports() {
    this.report.setValue(this.selectedReport);
    this.adminService.getReports().subscribe((res) => {
      res.result.forEach((element, index) => {
        var x = element.column_names;
        var y = x.replace(/"/, "'");
        this.tabs.push({
          id: element.id,
          title: element.name,
          columns: JSON.parse(y.replace(/'/g, '"')),
        });
      });
      this.getReport();
    });
  }

  getReport() {
    let tab = this.tabs.find((x) => x.id == this.selectedReport);
    this.columns = [];
    if(tab){
    tab.columns.forEach((col) => {
      this.columns.push({
        title: col,
        data: col,
      });
    });
    this.adminService.getReport(this.selectedReport).subscribe((res) => {
      this.dtRendered = false;
      this.values = res;
      this.dtOptions = {
        destroy: true,
        pagingType: "full_numbers",
        retrieve: true,
        data: res,
        pageLength: 50,
        lengthMenu: [
          [50, 100, -1],
          ["50 rows", "100 rows",'Show all'],
        ],
        columns: this.columns,
        responsive: true,
        // Declare the use of the extension in the dom parameter
        dom: "Bfrtip",
        // Configure the buttons
        buttons: ["csv", "pageLength"],
      };
      this.cdr.detectChanges();
      this.dtRendered = true;
      this.cdr.detectChanges();
    });
    }
  }

  reportChange() {
    this.selectedReport = this.report.value;
    this.getReport();
  }

  ngOnInit() {
    this.dtOptions = {
      destroy: true,
      pagingType: "full_numbers",
      retrieve: true,

      data: [],
      pageLength: 50,
      lengthMenu: [
        [50, 100, -1],
        ["50 rows", "100 rows",'Show all'],
      ],
      columns: [
        {
          title: "id",
          data: "id",
        },
      ],
      responsive: true,
      // Declare the use of the extension in the dom parameter
      dom: "Bfrtip",
      // Configure the buttons
      buttons: ["csv", "pageLength"],
    };
    this.getReports();
  }
}
