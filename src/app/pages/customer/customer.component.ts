import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { EncryptionService } from '../../services/encryption.service';
import { NgIf } from '@angular/common';
import { Customers, CustomerResponse, CustomersResponse } from '../../interfaces/customers';


@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [NgIf],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {

  isLoading: boolean = true;
  id: any = '';
  customer : Customers = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    contact_number: ''
  }

  constructor(private apiService: ApiService,  private router: Router, private route: ActivatedRoute, private encryptionService: EncryptionService){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.id = this.encryptionService.decrypt(this.id);
    });

    this.getCustomerbyID();
  }

  //Get Customer by ID
  async getCustomerbyID():Promise<void>{
    try{
      const response: CustomersResponse = await this.apiService.showCustomer(this.id);
      this.customer = response.data;
    }
    catch(error){
      console.log(error);
    }
    finally{
     this.isLoading = false;
    }
  }

}
