export interface Customers {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    contact_number: number
}

export interface CustomerResponse {
    success: boolean,
    data: Customers []
}

export interface CustomersResponse {
    success: boolean,
    data: Customers 
}

