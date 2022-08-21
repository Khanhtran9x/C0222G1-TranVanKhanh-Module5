package com.furama.model.service;

import com.furama.annotation.CodeConstraint;
import com.furama.annotation.NameConstraint;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import javax.persistence.*;
import javax.validation.constraints.Pattern;

@Entity(name = "service")
public class Service implements Validator {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer serviceId;
    @Pattern(regexp = "^(DV-)\\d{4}$", message = "Invalid service code format")
    @Column(unique = true)
//    @CodeConstraint
    private String serviceCode;
    @Pattern(regexp = "^[\\w\\s]+$", message = "Invalid service name")
    @Column(unique = true)
    private String serviceName;
    @Column(columnDefinition = "INT")
    @Pattern(regexp = "^[1-9]+\\d*$", message = "Invalid service area")
    private String serviceArea;
    @Column(columnDefinition = "DOUBLE")
    @Pattern(regexp = "^\\d+(\\.\\d+)?$", message = "Invalid service cost")
    private String serviceCost;
    @Column(columnDefinition = "INT")
    @Pattern(regexp = "^[1-9]+\\d*$", message = "Invalid service max people")
    private String serviceMaxPeople;
    @Pattern(regexp = "^[\\w\\s]+$", message = "Invalid service standard room")
    private String serviceStandardRoom;
    @Pattern(regexp = "^[\\w\\s]+$", message = "Invalid format")
    private String descriptionOtherConvenience;
    @Column(columnDefinition = "DOUBLE")
    @Pattern(regexp = "^\\d+(\\.\\d+)?$", message = "Invalid service pool area")
    private String servicePoolArea;
    @Column(columnDefinition = "INT")
    @Pattern(regexp = "^[1-9]+\\d*$", message = "Invalid service number of floors")
    private String serviceNumberOfFloors;
    private String imgUrl;

    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name="rent_type_id ", nullable=false)
    private RentType rentType;

    @ManyToOne()
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name="service_type_id", nullable=false)
    private ServiceType serviceType;

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public Integer getServiceId() {
        return serviceId;
    }

    public void setServiceId(Integer serviceId) {
        this.serviceId = serviceId;
    }

    public String getServiceCode() {
        return serviceCode;
    }

    public void setServiceCode(String serviceCode) {
        this.serviceCode = serviceCode;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getServiceArea() {
        return serviceArea;
    }

    public void setServiceArea(String serviceArea) {
        this.serviceArea = serviceArea;
    }

    public String getServiceCost() {
        return serviceCost;
    }

    public void setServiceCost(String serviceCost) {
        this.serviceCost = serviceCost;
    }

    public String getServiceMaxPeople() {
        return serviceMaxPeople;
    }

    public void setServiceMaxPeople(String serviceMaxPeople) {
        this.serviceMaxPeople = serviceMaxPeople;
    }

    public String getServiceStandardRoom() {
        return serviceStandardRoom;
    }

    public void setServiceStandardRoom(String serviceStandardRoom) {
        this.serviceStandardRoom = serviceStandardRoom;
    }

    public String getDescriptionOtherConvenience() {
        return descriptionOtherConvenience;
    }

    public void setDescriptionOtherConvenience(String descriptionOtherConvenience) {
        this.descriptionOtherConvenience = descriptionOtherConvenience;
    }

    public String getServicePoolArea() {
        return servicePoolArea;
    }

    public void setServicePoolArea(String servicePoolArea) {
        this.servicePoolArea = servicePoolArea;
    }

    public String getServiceNumberOfFloors() {
        return serviceNumberOfFloors;
    }

    public void setServiceNumberOfFloors(String serviceNumberOfFloors) {
        this.serviceNumberOfFloors = serviceNumberOfFloors;
    }

    public RentType getRentType() {
        return rentType;
    }

    public void setRentType(RentType rentType) {
        this.rentType = rentType;
    }

    public ServiceType getServiceType() {
        return serviceType;
    }

    public void setServiceType(ServiceType serviceType) {
        this.serviceType = serviceType;
    }

    @Override
    public boolean supports(Class<?> clazz) {
        return false;
    }

    @Override
    public void validate(Object target, Errors errors) {

    }
}
