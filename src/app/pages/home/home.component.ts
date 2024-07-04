import { Component, OnInit, TemplateRef, viewChild, ViewChild } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { Customers, CustomerResponse } from '../../interfaces/customers';
import { ToastComponent } from '../../common/toast/toast.component';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { EncryptionService } from '../../services/encryption.service';
import { ModalDeleteCustomerComponent } from "../../common/modal-delete-customer/modal-delete-customer.component";
import { ModalAddCustomerComponent } from "../../common/modal-add-customer/modal-add-customer.component";


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [NgFor, NgIf, ModalDeleteCustomerComponent, ToastComponent, ModalAddCustomerComponent]
})
export class HomeComponent implements OnInit {
  @ViewChild(ToastComponent)
  toast: ToastComponent = new ToastComponent();

  isLoading: boolean = true;
  selectedCustomer: any;
  customers: Customers[] = [];

  constructor(private apiService: ApiService, private router: Router, private modalService: NgbModal, private encryptionService: EncryptionService ){}

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
  showCustomer(id: any) {
    const encryptedID = this.encryptionService.encrypt(id.toString());
    this.router.navigate(['/customer', encryptedID]);
  }

  //Edit Customer
  editCustomer(id: number){
    console.log(id);
  }

  //Delete Customer
  deleteCustomer(content: TemplateRef<any>, customer: any){
    this.modalService.open(content, { centered: true });
    this.selectedCustomer = customer;
  }

  //Add Customer
  addCustomer(content: TemplateRef<any>){
    this.modalService.open(content, { centered: true });
    console.log("Add Customer Works");
  }

  
  onCustomerDeleted(){
    this.getCustomers();
    this.toast.showToast('Deleted', 'Customer deleted successfully', 'error');
  }

  onCustomerAdded(){
    this.getCustomers();
    this.toast.showToast('Success', 'Customer added successfully', 'success');
  }
  
}