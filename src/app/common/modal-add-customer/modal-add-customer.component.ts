import { Component, Output, EventEmitter } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { CustomersResponse, Customers } from '../../interfaces/customers';

@Component({
  selector: 'app-modal-add-customer',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './modal-add-customer.component.html',
  styleUrl: './modal-add-customer.component.scss'
})
export class ModalAddCustomerComponent {
  @Output() customerAdded = new EventEmitter<void>();  

  customer : Customers = {
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    contact_number: ''
  }

  constructor(private apiService: ApiService, private modalService: NgbModal){}

  closeModal(){
    this.modalService.dismissAll();
  }

  async addCustomer(addCustomerForm:any, customer: any):Promise<void>{
    if (addCustomerForm.valid){
      try{
       const response: CustomersResponse = await this.apiService.addCustomer(customer);
       console.log(response);
      }
      catch(error){
        console.log(error);
      }
      finally{
        this.closeModal();
        this.customerAdded.emit();
      }
    }
  }

}
