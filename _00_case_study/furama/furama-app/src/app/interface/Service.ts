export interface Service {
  serviceId?: number;
  serviceCode?: string;
  serviceName?: string;
  serviceArea?: string;
  serviceCost?: string;
  serviceMaxPeople?: string;
  serviceStandardRoom?: string;
  descriptionOtherConvenience?: string;
  servicePoolArea?: string;
  serviceNumberOfFloors?: string;
  rentType?: {
    rentTypeId: number
  };
  serviceType?: {
    serviceTypeId: number
  };
  imgUrl?: string;
}
