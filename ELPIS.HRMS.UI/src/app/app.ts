import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Employee {
  id: number;
  code: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  salary: number;
  joiningDate: string;
}

interface Leave {
  id: number;
  employeeId: number;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: string;
}

interface Payroll {
  id: number;
  employeeId: number;
  employeeName: string;
  month: string;
  basicSalary: number;
  hra: number;
  da: number;
  deductions: number;
  netSalary: number;
  status: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div *ngIf="!isLoggedIn; else mainApp">
      <!-- LOGIN PAGE -->
      <div style="max-width: 400px; margin: 100px auto; padding: 30px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h1 style="text-align: center; color: #333; margin-bottom: 30px;">
          <span style="color: #4CAF50;">ELPIS</span> HRMS
        </h1>
        
        <form (ngSubmit)="login()">
          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-weight: bold;">Username</label>
            <input [(ngModel)]="username" name="username" type="text" placeholder="Enter username" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"/>
          </div>

          <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-weight: bold;">Password</label>
            <input [(ngModel)]="password" name="password" type="password" placeholder="Enter password" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;"/>
          </div>

          <button type="submit" style="width: 100%; padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
            Login
          </button>
        </form>

        <div *ngIf="errorMessage" style="background-color: #f8d7da; color: #721c24; padding: 12px; border-radius: 4px; margin-top: 15px;">
          {{errorMessage}}
        </div>

        <div *ngIf="successMessage" style="background-color: #d4edda; color: #155724; padding: 12px; border-radius: 4px; margin-top: 15px;">
          {{successMessage}}
        </div>

        <p style="text-align: center; font-size: 12px; margin-top: 20px; color: #666;">
          Test: admin / password
        </p>
      </div>
    </div>

    <ng-template #mainApp>
      <div style="min-height: 100vh; background-color: #f5f5f5;">
        <!-- HEADER -->
        <div style="background-color: #2c3e50; color: white; padding: 20px;">
          <div style="max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
            <h1 style="margin: 0; font-size: 28px; cursor: pointer;" (click)="currentPage = 'dashboard'">
              <span style="color: #4CAF50;">ELPIS</span> HRMS
            </h1>
            <div style="text-align: right;">
              <p style="margin: 0 0 10px 0;">Welcome, Admin!</p>
              <button (click)="logout()" style="padding: 10px 20px; background-color: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                Logout
              </button>
            </div>
          </div>
        </div>

        <!-- NAVIGATION -->
        <div style="background-color: #34495e; color: white; padding: 15px; overflow-x: auto;">
          <div style="max-width: 1200px; margin: 0 auto; display: flex; gap: 20px;">
            <button (click)="currentPage = 'dashboard'" [style.opacity]="currentPage === 'dashboard' ? '1' : '0.7'" style="background: none; color: white; border: none; cursor: pointer; font-weight: bold; font-size: 16px; padding: 0; white-space: nowrap;">
              📊 Dashboard
            </button>
            <button (click)="currentPage = 'employees'" [style.opacity]="currentPage === 'employees' ? '1' : '0.7'" style="background: none; color: white; border: none; cursor: pointer; font-weight: bold; font-size: 16px; padding: 0; white-space: nowrap;">
              👥 Employees
            </button>
            <button (click)="currentPage = 'leave'" [style.opacity]="currentPage === 'leave' ? '1' : '0.7'" style="background: none; color: white; border: none; cursor: pointer; font-weight: bold; font-size: 16px; padding: 0; white-space: nowrap;">
              🏖️ Leave
            </button>
            <button (click)="currentPage = 'payroll'" [style.opacity]="currentPage === 'payroll' ? '1' : '0.7'" style="background: none; color: white; border: none; cursor: pointer; font-weight: bold; font-size: 16px; padding: 0; white-space: nowrap;">
              💰 Payroll
            </button>
            <button (click)="currentPage = 'reports'" [style.opacity]="currentPage === 'reports' ? '1' : '0.7'" style="background: none; color: white; border: none; cursor: pointer; font-weight: bold; font-size: 16px; padding: 0; white-space: nowrap;">
              📄 Reports
            </button>
          </div>
        </div>

        <!-- DASHBOARD PAGE -->
        <div *ngIf="currentPage === 'dashboard'" style="max-width: 1200px; margin: 30px auto; padding: 0 20px;">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px;">
            
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-left: 5px solid #4CAF50;">
              <h3 style="margin: 0 0 10px 0; color: #333; font-size: 14px; text-transform: uppercase;">Total Employees</h3>
              <p style="margin: 0; font-size: 32px; font-weight: bold; color: #4CAF50;">{{employees.length}}</p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-left: 5px solid #3498db;">
              <h3 style="margin: 0 0 10px 0; color: #333; font-size: 14px; text-transform: uppercase;">Pending Leaves</h3>
              <p style="margin: 0; font-size: 32px; font-weight: bold; color: #3498db;">{{leaves.filter(l => l.status === 'Pending').length}}</p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-left: 5px solid #f39c12;">
              <h3 style="margin: 0 0 10px 0; color: #333; font-size: 14px; text-transform: uppercase;">Total Leaves</h3>
              <p style="margin: 0; font-size: 32px; font-weight: bold; color: #f39c12;">{{leaves.length}}</p>
            </div>

            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-left: 5px solid #e74c3c;">
              <h3 style="margin: 0 0 10px 0; color: #333; font-size: 14px; text-transform: uppercase;">Payroll Processed</h3>
              <p style="margin: 0; font-size: 32px; font-weight: bold; color: #e74c3c;">{{payrolls.filter(p => p.status === 'Processed').length}}</p>
            </div>

          </div>

          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 20px;">
            <h2 style="margin: 0 0 20px 0; color: #333;">Quick Navigation</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
              <button (click)="currentPage = 'employees'" style="padding: 15px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                Manage Employees
              </button>
              <button (click)="currentPage = 'leave'" style="padding: 15px; background-color: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                Manage Leaves
              </button>
              <button (click)="currentPage = 'payroll'" style="padding: 15px; background-color: #f39c12; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                Manage Payroll
              </button>
              <button (click)="currentPage = 'reports'" style="padding: 15px; background-color: #9b59b6; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                View Reports
              </button>
            </div>
          </div>
        </div>

        <!-- EMPLOYEES PAGE -->
        <div *ngIf="currentPage === 'employees'" style="max-width: 1200px; margin: 30px auto; padding: 0 20px;">
          
          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 30px;">
            <h2 style="margin: 0 0 20px 0; color: #333;">Add New Employee</h2>
            
            <form (ngSubmit)="addEmployee()" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
              <input [(ngModel)]="newEmployee.firstName" name="firstName" placeholder="First Name" required style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;"/>
              <input [(ngModel)]="newEmployee.lastName" name="lastName" placeholder="Last Name" required style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;"/>
              <input [(ngModel)]="newEmployee.email" name="email" type="email" placeholder="Email" required style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;"/>
              <input [(ngModel)]="newEmployee.phone" name="phone" placeholder="Phone" style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;"/>
              <input [(ngModel)]="newEmployee.department" name="department" placeholder="Department" style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;"/>
              <input [(ngModel)]="newEmployee.designation" name="designation" placeholder="Designation" style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;"/>
              <input [(ngModel)]="newEmployee.salary" name="salary" type="number" placeholder="Salary" style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;"/>
              <input [(ngModel)]="newEmployee.joiningDate" name="joiningDate" type="date" style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;"/>
              
              <button type="submit" style="padding: 10px; background-color: #4CAF50; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; grid-column: 1 / -1;">
                Add Employee
              </button>
            </form>
          </div>

          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="margin: 0 0 20px 0; color: #333;">Employees List ({{employees.length}})</h2>
            
            <div *ngIf="employees.length === 0" style="text-align: center; padding: 40px; color: #999;">
              No employees added yet.
            </div>

            <table *ngIf="employees.length > 0" style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <thead>
                <tr style="background-color: #f5f5f5; border-bottom: 2px solid #ddd;">
                  <th style="padding: 12px; text-align: left; font-weight: bold;">Code</th>
                  <th style="padding: 12px; text-align: left; font-weight: bold;">Name</th>
                  <th style="padding: 12px; text-align: left; font-weight: bold;">Email</th>
                  <th style="padding: 12px; text-align: left; font-weight: bold;">Department</th>
                  <th style="padding: 12px; text-align: left; font-weight: bold;">Salary</th>
                  <th style="padding: 12px; text-align: left; font-weight: bold;">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let emp of employees" style="border-bottom: 1px solid #eee;">
                  <td style="padding: 12px;">{{emp.code}}</td>
                  <td style="padding: 12px;">{{emp.firstName}} {{emp.lastName}}</td>
                  <td style="padding: 12px;">{{emp.email}}</td>
                  <td style="padding: 12px;">{{emp.department}}</td>
                  <td style="padding: 12px;">{{emp.salary | currency}}</td>
                  <td style="padding: 12px;">
                    <button (click)="deleteEmployee(emp.id)" style="padding: 6px 12px; background-color: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- LEAVE PAGE -->
        <div *ngIf="currentPage === 'leave'" style="max-width: 1200px; margin: 30px auto; padding: 0 20px;">
          
          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 30px;">
            <h2 style="margin: 0 0 20px 0; color: #333;">Apply for Leave</h2>
            
            <form (ngSubmit)="applyLeave()" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
              <select [(ngModel)]="newLeave.employeeId" name="employeeId" required style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
  <option value="">Select Employee</option>
  <option *ngFor="let emp of employees" [value]="emp.id">{{emp.firstName}} {{emp.lastName}}</option>
</select>
              
              <select [(ngModel)]="newLeave.leaveType" name="leaveType" required style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                <option value="">Select Leave Type</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Earned Leave">Earned Leave</option>
                <option value="Unpaid Leave">Unpaid Leave</option>
              </select>

              <input [(ngModel)]="newLeave.startDate" name="startDate" type="date" required style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;"/>
              <input [(ngModel)]="newLeave.endDate" name="endDate" type="date" required style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;"/>
              <input [(ngModel)]="newLeave.reason" name="reason" placeholder="Reason for Leave" style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;"/>
              
              <button type="submit" style="padding: 10px; background-color: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; grid-column: 1 / -1;">
                Apply Leave
              </button>
            </form>
          </div>

          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="margin: 0 0 20px 0; color: #333;">Leave Applications ({{leaves.length}})</h2>
            
            <div *ngIf="leaves.length === 0" style="text-align: center; padding: 40px; color: #999;">
              No leave applications yet.
            </div>

            <table *ngIf="leaves.length > 0" style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <thead>
                <tr style="background-color: #f5f5f5; border-bottom: 2px solid #ddd;">
                  <th style="padding: 12px; text-align: left; font-weight: bold;">Employee</th>
                  <th style="padding: 12px; text-align: left; font-weight: bold;">Type</th>
                  <th style="padding: 12px; text-align: left; font-weight: bold;">Start Date</th>
                  <th style="padding: 12px; text-align: left; font-weight: bold;">End Date</th>
                  <th style="padding: 12px; text-align: left; font-weight: bold;">Days</th>
                  <th style="padding: 12px; text-align: left; font-weight: bold;">Status</th>
                  <th style="padding: 12px; text-align: left; font-weight: bold;">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let leave of leaves" style="border-bottom: 1px solid #eee;">
                  <td style="padding: 12px;">{{leave.employeeName}}</td>
                  <td style="padding: 12px;">{{leave.leaveType}}</td>
                  <td style="padding: 12px;">{{leave.startDate}}</td>
                  <td style="padding: 12px;">{{leave.endDate}}</td>
                  <td style="padding: 12px;">{{leave.days}}</td>
                  <td style="padding: 12px;">
                    <span [style.color]="leave.status === 'Approved' ? 'green' : leave.status === 'Rejected' ? 'red' : 'orange'" style="font-weight: bold;">
                      {{leave.status}}
                    </span>
                  </td>
                  <td style="padding: 12px;">
                    <button *ngIf="leave.status === 'Pending'" (click)="approveLeave(leave.id)" style="padding: 6px 12px; background-color: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px; margin-right: 5px;">
                      Approve
                    </button>
                    <button *ngIf="leave.status === 'Pending'" (click)="rejectLeave(leave.id)" style="padding: 6px 12px; background-color: #e74c3c; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">
                      Reject
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- PAYROLL PAGE -->
        <div *ngIf="currentPage === 'payroll'" style="max-width: 1200px; margin: 30px auto; padding: 0 20px;">
          
          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 30px;">
            <h2 style="margin: 0 0 20px 0; color: #333;">Process Payroll</h2>
            
            <form (ngSubmit)="generatePayroll()" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
              <select [(ngModel)]="payrollFilters.selectedMonth" name="month" style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;">
                <option value="">Select Month</option>
                <option value="2026-01">January 2026</option>
                <option value="2026-02">February 2026</option>
                <option value="2026-03">March 2026</option>
                <option value="2026-04">April 2026</option>
                <option value="2026-05">May 2026</option>
                <option value="2026-06">June 2026</option>
              </select>
              
              <button type="submit" style="padding: 10px; background-color: #f39c12; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                Generate Payroll
              </button>
            </form>
          </div>

          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="margin: 0 0 20px 0; color: #333;">Payroll Records ({{payrolls.length}})</h2>
            
            <div *ngIf="payrolls.length === 0" style="text-align: center; padding: 40px; color: #999;">
              No payroll records yet. Generate payroll above.
            </div>

            <table *ngIf="payrolls.length > 0" style="width: 100%; border-collapse: collapse; font-size: 13px; overflow-x: auto;">
              <thead>
                <tr style="background-color: #f5f5f5; border-bottom: 2px solid #ddd;">
                  <th style="padding: 12px; text-align: left; font-weight: bold;">Employee</th>
                  <th style="padding: 12px; text-align: left; font-weight: bold;">Month</th>
                  <th style="padding: 12px; text-align: right; font-weight: bold;">Basic</th>
                  <th style="padding: 12px; text-align: right; font-weight: bold;">HRA</th>
                  <th style="padding: 12px; text-align: right; font-weight: bold;">DA</th>
                  <th style="padding: 12px; text-align: right; font-weight: bold;">Ded.</th>
                  <th style="padding: 12px; text-align: right; font-weight: bold;">Net</th>
                  <th style="padding: 12px; text-align: left; font-weight: bold;">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let pay of payrolls" style="border-bottom: 1px solid #eee;">
                  <td style="padding: 12px;">{{pay.employeeName}}</td>
                  <td style="padding: 12px;">{{pay.month}}</td>
                  <td style="padding: 12px; text-align: right;">{{pay.basicSalary | currency}}</td>
                  <td style="padding: 12px; text-align: right;">{{pay.hra | currency}}</td>
                  <td style="padding: 12px; text-align: right;">{{pay.da | currency}}</td>
                  <td style="padding: 12px; text-align: right;">{{pay.deductions | currency}}</td>
                  <td style="padding: 12px; text-align: right; font-weight: bold; color: #27ae60;">{{pay.netSalary | currency}}</td>
                  <td style="padding: 12px;">
                    <span [style.color]="pay.status === 'Processed' ? 'green' : 'orange'" style="font-weight: bold;">
                      {{pay.status}}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- REPORTS PAGE -->
        <div *ngIf="currentPage === 'reports'" style="max-width: 1200px; margin: 30px auto; padding: 0 20px;">
          
          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); margin-bottom: 30px;">
            <h2 style="margin: 0 0 20px 0; color: #333;">Generate Reports</h2>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
              <input [(ngModel)]="reportFilters.startDate" name="startDate" type="date" placeholder="Start Date" style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;"/>
              <input [(ngModel)]="reportFilters.endDate" name="endDate" type="date" placeholder="End Date" style="padding: 10px; border: 1px solid #ddd; border-radius: 4px;"/>
              
              <button (click)="generateAttendanceReport()" style="padding: 10px; background-color: #3498db; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                Attendance Report
              </button>
              <button (click)="generateLeaveReport()" style="padding: 10px; background-color: #2ecc71; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                Leave Report
              </button>
              <button (click)="generatePayrollReport()" style="padding: 10px; background-color: #f39c12; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                Payroll Report
              </button>
              <button (click)="generateEmployeeReport()" style="padding: 10px; background-color: #9b59b6; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                Employee Report
              </button>
            </div>
          </div>

          <div *ngIf="reportData" style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="margin: 0 0 20px 0; color: #333;">{{reportData.title}}</h2>
            <p style="color: #666; margin: 0 0 20px 0;">Generated on: {{reportData.generatedDate | date: 'medium'}}</p>
            
            <div style="overflow-x: auto;">
              <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
                <thead>
                  <tr style="background-color: #f5f5f5; border-bottom: 2px solid #ddd;">
                    <th *ngFor="let header of reportData.headers" style="padding: 12px; text-align: left; font-weight: bold; border-right: 1px solid #ddd;">
                      {{header}}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let row of reportData.rows" style="border-bottom: 1px solid #eee;">
                    <td *ngFor="let cell of row" style="padding: 12px; border-right: 1px solid #eee;">
                      {{cell}}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style="margin-top: 20px; text-align: right;">
              <button (click)="downloadReport()" style="padding: 10px 20px; background-color: #27ae60; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;">
                📥 Download Report
              </button>
            </div>
          </div>
        </div>

      </div>
    </ng-template>
  `
})
export class App {
  // Login
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';
  isLoggedIn = false;

  // Navigation
  currentPage: 'dashboard' | 'employees' | 'leave' | 'payroll' | 'reports' = 'dashboard';

  // Employees
  employees: Employee[] = [];
  newEmployee: Partial<Employee> = {};
  nextEmployeeId = 1;

  // Leave
  leaves: Leave[] = [];
  newLeave: Partial<Leave> = {};
  nextLeaveId = 1;

  // Payroll
  payrolls: Payroll[] = [];
  payrollFilters = { selectedMonth: '' };
  nextPayrollId = 1;

  // Reports
  reportData: any = null;
  reportFilters = { startDate: '', endDate: '' };

  login(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter username and password';
      return;
    }

    if (this.username === 'admin' && this.password === 'password') {
      this.successMessage = 'Login successful!';
      this.username = '';
      this.password = '';
      
      setTimeout(() => {
        this.isLoggedIn = true;
      }, 1000);
    } else {
      this.errorMessage = 'Invalid credentials';
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.username = '';
    this.password = '';
    this.currentPage = 'dashboard';
  }

  // EMPLOYEE FUNCTIONS
  addEmployee(): void {
    if (!this.newEmployee.firstName || !this.newEmployee.lastName || !this.newEmployee.email) {
      alert('Please fill in required fields');
      return;
    }

    const employee: Employee = {
      id: this.nextEmployeeId++,
      code: 'EMP' + String(this.nextEmployeeId).padStart(3, '0'),
      firstName: this.newEmployee.firstName || '',
      lastName: this.newEmployee.lastName || '',
      email: this.newEmployee.email || '',
      phone: this.newEmployee.phone || '',
      department: this.newEmployee.department || '',
      designation: this.newEmployee.designation || '',
      salary: this.newEmployee.salary || 0,
      joiningDate: this.newEmployee.joiningDate || ''
    };

    this.employees.push(employee);
    this.newEmployee = {};
    alert('Employee added!');
  }

  deleteEmployee(id: number): void {
    if (confirm('Delete this employee?')) {
      this.employees = this.employees.filter(e => e.id !== id);
    }
  }

  // LEAVE FUNCTIONS
  applyLeave(): void {
    if (!this.newLeave.employeeId || !this.newLeave.leaveType || !this.newLeave.startDate || !this.newLeave.endDate) {
      alert('Please fill in all required fields');
      return;
    }

    const employee = this.employees.find(e => e.id === Number(this.newLeave.employeeId));
    if (!employee) {
      alert('Employee not found');
      return;
    }

    const startDate = new Date(this.newLeave.startDate!);
    const endDate = new Date(this.newLeave.endDate!);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const leave: Leave = {
      id: this.nextLeaveId++,
      employeeId: this.newLeave.employeeId || 0,
      employeeName: `${employee.firstName} ${employee.lastName}`,
      leaveType: this.newLeave.leaveType || '',
      startDate: this.newLeave.startDate || '',
      endDate: this.newLeave.endDate || '',
      days: days,
      reason: this.newLeave.reason || '',
      status: 'Pending'
    };

    this.leaves.push(leave);
    this.newLeave = {};
    alert('Leave applied!');
  }

  approveLeave(id: number): void {
    const leave = this.leaves.find(l => l.id === id);
    if (leave) {
      leave.status = 'Approved';
      alert('Leave approved!');
    }
  }

  rejectLeave(id: number): void {
    const leave = this.leaves.find(l => l.id === id);
    if (leave) {
      leave.status = 'Rejected';
      alert('Leave rejected!');
    }
  }

  // PAYROLL FUNCTIONS
  generatePayroll(): void {
    if (!this.payrollFilters.selectedMonth) {
      alert('Please select a month');
      return;
    }

    this.employees.forEach(emp => {
      const existing = this.payrolls.find(p => p.employeeId === emp.id && p.month === this.payrollFilters.selectedMonth);
      if (!existing) {
        const hra = emp.salary * 0.15;
        const da = emp.salary * 0.10;
        const deductions = emp.salary * 0.05;
        const netSalary = emp.salary + hra + da - deductions;

        const payroll: Payroll = {
          id: this.nextPayrollId++,
          employeeId: emp.id,
          employeeName: `${emp.firstName} ${emp.lastName}`,
          month: this.payrollFilters.selectedMonth,
          basicSalary: emp.salary,
          hra: hra,
          da: da,
          deductions: deductions,
          netSalary: netSalary,
          status: 'Processed'
        };

        this.payrolls.push(payroll);
      }
    });

    alert('Payroll generated for ' + this.payrollFilters.selectedMonth);
  }

  // REPORT FUNCTIONS
  generateAttendanceReport(): void {
    this.reportData = {
      title: 'Attendance Report',
      generatedDate: new Date(),
      headers: ['Employee', 'Department', 'Status', 'Date'],
      rows: this.employees.map(emp => [
        `${emp.firstName} ${emp.lastName}`,
        emp.department,
        'Present',
        this.reportFilters.startDate || 'N/A'
      ])
    };
  }

  generateLeaveReport(): void {
    this.reportData = {
      title: 'Leave Report',
      generatedDate: new Date(),
      headers: ['Employee', 'Leave Type', 'Days', 'Status', 'Reason'],
      rows: this.leaves.map(l => [
        l.employeeName,
        l.leaveType,
        l.days.toString(),
        l.status,
        l.reason
      ])
    };
  }

  generatePayrollReport(): void {
    this.reportData = {
      title: 'Payroll Report',
      generatedDate: new Date(),
      headers: ['Employee', 'Month', 'Basic', 'HRA', 'DA', 'Deductions', 'Net Salary'],
      rows: this.payrolls.map(p => [
        p.employeeName,
        p.month,
        '₹' + p.basicSalary.toFixed(2),
        '₹' + p.hra.toFixed(2),
        '₹' + p.da.toFixed(2),
        '₹' + p.deductions.toFixed(2),
        '₹' + p.netSalary.toFixed(2)
      ])
    };
  }

  generateEmployeeReport(): void {
    this.reportData = {
      title: 'Employee Report',
      generatedDate: new Date(),
      headers: ['Code', 'Name', 'Email', 'Department', 'Designation', 'Salary'],
      rows: this.employees.map(e => [
        e.code,
        `${e.firstName} ${e.lastName}`,
        e.email,
        e.department,
        e.designation,
        '₹' + e.salary.toFixed(2)
      ])
    };
  }

  downloadReport(): void {
    if (!this.reportData) return;
    
    let csv = this.reportData.title + '\n';
    csv += 'Generated: ' + new Date().toLocaleString() + '\n\n';
    csv += this.reportData.headers.join(',') + '\n';
    this.reportData.rows.forEach((row: any[]) => {
      csv += row.join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = this.reportData.title + '.csv';
    a.click();
    alert('Report downloaded!');
  }
}