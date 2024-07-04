import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customers, CustomersResponse } from '../../interfaces/customers';

@Component({
  selector: 'app-modal-delete-customer',
  standalone: true,
  imports: [],
  templateUrl: './modal-delete-customer.component.html',
  styleUrl: './modal-delete-customer.component.scss'
})
export class ModalDeleteCustomerComponent implements OnInit {
  @Input() customer: any;
  @Output() customerDeleted = new EventEmitter<void>();  

  constructor(private apiService: ApiService, private modalService: NgbModal ){}

  ngOnInit(): void {
    console.log(this.customer);
  }

  closeModal(){
    this.modalService.dismissAll();
  }

  async deleteCustomer(): Promise<void>{
    try{
      const response: CustomersResponse = await this.apiService.deleteCustomer(this.customer.id);
    }
    catch(error){
      console.log(error);
    }
    finally{
      this.closeModal();
      this.customerDeleted.emit();
    }
  }

  


}
