export interface Contract {
  contractId?: number;
  contractStartDate?: string;
  contractEndDate?: string;
  contractDeposit?: string;
  customer?: {
    customerId?: number,
    customerName?: string
  };
  service?: {
    serviceId?: number,
    serviceName?: string
  };
  employee?: {
    employeeId?: number,
    employeeName?: string
  };
}
