import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { CustomerResponse, CustomersResponse } from '../interfaces/customers';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://crm_app.local:44301/api';

  constructor(private http: HttpClient) { }

  private async getRequest(endpoint: string): Promise<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
    })
    try {
      return await this.http.get(`${this.apiUrl}/${endpoint}`, { headers }).toPromise();
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private async deleteRequest(endpoint: string): Promise<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
    })
    try {
      return await this.http.delete(`${this.apiUrl}/${endpoint}`, { headers }).toPromise();
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private async putRequest(endpoint: string, data: any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
    try {
      return await this.http.put(`${this.apiUrl}/${endpoint}`, data, { headers }).toPromise();
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private async postRequest(endpoint: string, data: any): Promise<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
    try {
      return await this.http.post(`${this.apiUrl}/${endpoint}`, data, { headers }).toPromise();
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }

  // Get Customers
  async getCustomers(): Promise<CustomerResponse> {
    return this.getRequest('customers');
  }

  //Delete Customer
  async deleteCustomer(id: number): Promise<CustomersResponse> {
    return this.deleteRequest(`customer/delete/${id}`);
  }

  //Update Customer
  async updateCustomer(id: number, customer: any ): Promise<CustomerResponse> {
    return this.putRequest(`customer/update/${id}`, customer);
  }

  //Add Customer
  async addCustomer(customer: any ): Promise<CustomersResponse> {
    return this.postRequest(`customer/add`, customer);
  }

  //Show Customer by ID
  async showCustomer(id: number): Promise<CustomersResponse> {
    return this.getRequest(`customer/${id}`);
  }



}
