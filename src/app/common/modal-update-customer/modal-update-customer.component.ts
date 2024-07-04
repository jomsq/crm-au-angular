import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CustomersResponse, Customers } from '../../interfaces/customers';

@Component({
  selector: 'app-modal-update-customer',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './modal-update-customer.component.html',
  styleUrl: './modal-update-customer.component.scss'
})
export class ModalUpdateCustomerComponent {
  @Input() customer: any;
  @Output() customerUpdated = new EventEmitter<void>();  

  // customer : Customers = {
  //   id: 0,
  //   first_name: '',
  //   last_name: '',
  //   email: '',
  //   contact_number: ''
  // }

  constructor(private apiService: ApiService, private modalService: NgbModal){}

  closeModal(){
    this.modalService.dismissAll();
  }

  async updateCustomer(updateCustomerForm:any, customer: any):Promise<void>{
    if (updateCustomerForm.valid){
      try{
       const response: CustomersResponse = await this.apiService.updateCustomer(customer.id, customer);
       console.log(response);
      }
      catch(error){
        console.log(error);
      }
      finally{
        this.closeModal();
        this.customerUpdated.emit();
      }
    }
  }


}
