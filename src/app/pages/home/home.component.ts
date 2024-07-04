import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Customers, CustomerResponse } from '../../interfaces/customers';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  isLoading: boolean = true;
  customers: Customers[] = [];

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.getCustomers();
  }

  //Get Customers
  async getCustomers(): Promise<void> {
    try{
      const response: CustomerResponse = await this.apiService.getCustomers();
      this.customers = response.data;
      console.log(this.customers);
    }
    catch(error){
      console.log(error);
    }
    finally{
      this.isLoading = false;
    }
  }

  //Show Customer by ID
  showCustomer(id: number) {
   console.log(id);
  }

  //Edit Customer
  editCustomer(id: number){
    console.log(id);
  }

  //Delete Customer
  deleteCustomer(id: number){
    console.log(id);
  }

  //Add Customer
  addCustomer(){
    console.log("Add Customer Works");
  }
  
}