export interface Customer {
  customerId?: number;
  customerCode?: string;
  customerName?: string;
  customerBirthday?: string;
  customerGender?: boolean;
  customerIdCard?: string;
  customerPhone?: string;
  customerEmail?: string;
  customerAddress?: string;
  customerType?: {
    customerTypeId?: number,
    customerTypeName?: string
  };
}
