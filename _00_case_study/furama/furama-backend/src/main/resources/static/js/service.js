function info(id, name) {
    console.log(name)
    document.getElementById("id").value = id;
    document.getElementById("name").innerHTML = name;
}

function createService() {
    let serviceCode = $('#serviceCode').val();
    let serviceName = $('#serviceName').val();
    let serviceArea = $('#serviceArea').val();
    let serviceCost = $('#serviceCost').val();
    let serviceMaxPeople = $('#serviceMaxPeople').val();
    let serviceStandardRoom = $('#serviceStandardRoom').val();
    let otherConvenience = $('#otherConvenience').val();
    let servicePoolArea = $('#servicePoolArea').val();
    let numberOfFloors = $('#numberOfFloors').val();
    let rentTypeId = $('#rentType').val();
    let serviceTypeId = $('#serviceType').val();
    let rentType = {
        rentTypeId: rentTypeId
    }
    let serviceType = {
        serviceTypeId: serviceTypeId
    }
    let newService = {
        serviceCode: serviceCode,
        serviceName: serviceName,
        serviceArea: serviceArea,
        serviceCost: serviceCost,
        serviceMaxPeople: serviceMaxPeople,
        serviceStandardRoom: serviceStandardRoom,
        descriptionOtherConvenience: otherConvenience,
        servicePoolArea: servicePoolArea,
        serviceNumberOfFloors: numberOfFloors,
        rentType: rentType,
        serviceType: serviceType
    }
    debugger
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newService),
        url: "/api/services",
        success: successHandler,
        error: function (e) {
            console.log(e)
            debugger
            if (e.responseJSON.serviceCode != undefined){
                document.getElementById("serviceCodeError").innerText = e.responseJSON.serviceCode;
            } else {
                document.getElementById("serviceCodeError").innerText = "";
            }
            if (e.responseJSON.serviceName != undefined){
                document.getElementById("serviceNameError").innerText = e.responseJSON.serviceName;
            } else {
                document.getElementById("serviceNameError").innerText = "";
            }
            if (e.responseJSON.serviceArea != undefined){
                document.getElementById("serviceAreaError").innerText = e.responseJSON.serviceArea;
            } else {
                document.getElementById("serviceAreaError").innerText = "";
            }
            if (e.responseJSON.serviceCost != undefined){
                document.getElementById("serviceCostError").innerText = e.responseJSON.serviceCost;
            } else {
                document.getElementById("serviceCostError").innerText = "";
            }
            if (e.responseJSON.serviceMaxPeople != undefined){
                document.getElementById("serviceMaxPeopleError").innerText = e.responseJSON.serviceMaxPeople;
            } else {
                document.getElementById("serviceMaxPeopleError").innerText = "";
            }
            if (e.responseJSON.serviceStandardRoom != undefined){
                document.getElementById("serviceStandardRoomError").innerText = e.responseJSON.serviceStandardRoom;
            } else {
                document.getElementById("serviceStandardRoomError").innerText = "";
            }
            if (e.responseJSON.descriptionOtherConvenience != undefined){
                document.getElementById("serviceOtherConvenienceError").innerText = e.responseJSON.descriptionOtherConvenience;
            } else {
                document.getElementById("serviceOtherConvenienceError").innerText = "";
            }
            if (e.responseJSON.servicePoolArea != undefined){
                document.getElementById("servicePoolAreaError").innerText = e.responseJSON.servicePoolArea;
            } else {
                document.getElementById("servicePoolAreaError").innerText = "";
            }
            if (e.responseJSON.serviceNumberOfFloors != undefined){
                document.getElementById("serviceNumberOfFloorsError").innerText = e.responseJSON.serviceNumberOfFloors;
            } else {
                document.getElementById("serviceNumberOfFloorsError").innerText = "";
            }
        }
    })
}

function successHandler() {
    $.ajax({
        type: "GET",
        url: "/api/services",
        success: function (data) {
            data = data.content;
            debugger;
            let content = '<thead class="text-white table-dark">\n' +
                '            <tr>\n' +
                '                <th scope="col">#</th>\n' +
                '                <th scope="col">Code</th>\n' +
                '                <th scope="col">Name</th>\n' +
                '                <th scope="col">Area</th>\n' +
                '                <th scope="col">Cost</th>\n' +
                '                <th scope="col">Max people</th>\n' +
                '                <th scope="col">Room standard</th>\n' +
                '                <th scope="col">Other convenience</th>\n' +
                '                <th scope="col">Pool area</th>\n' +
                '                <th scope="col">Floors</th>\n' +
                '                <th scope="col">Rent type</th>\n' +
                '                <th scope="col">Service type</th>\n' +
                '                <th scope="col">Edit</th>\n' +
                '                <th scope="col">Delete</th>\n' +
                '            </tr>\n' +
                '            </thead>\n' +
                '            <tbody>';
            for (let i = 0; i < data.length; i++) {
                content += `<tr><td>${i + 1}</td>` + getService(data[i]);
            }
            content += '</tbody>';
            $('#createModal').modal('hide');
            document.getElementById('serviceTable').innerHTML = content;
        }
    });
}

function getService(service) {
    return `<td>${service.serviceCode}</td>
            <td>${service.serviceName}</td>
            <td>${service.serviceArea}</td>
            <td>${service.serviceCost}</td>
            <td>${service.serviceMaxPeople}</td>
            <td>${service.serviceStandardRoom}</td>
            <td>${service.descriptionOtherConvenience}</td>
            <td>${service.servicePoolArea}</td>
            <td>${service.serviceNumberOfFloors}</td>
            <td>${service.rentType.rentTypeName}</td>
            <td>${service.serviceType.serviceTypeName}</td>
            <td><a class="editService text-decoration-none" data-toggle="modal" href="${service.serviceId}">Edit</a></td>
            <td><a class="deleteService text-decoration-none" href="${service.serviceId}">Delete</a></td></tr>`;
}

$(document).ready(function () {
    $("body").on("click", ".editService", function () {
        let a = $(this);
        let id = a.attr("href");
        $('#editModal').modal('show');
        $.ajax({
            type: "GET",
            url: `/api/services/${id}`,
            success: function (data) {
                debugger;
                document.getElementById('editServiceId').value = id;
                document.getElementById('editServiceCode').value = data.serviceCode;
                document.getElementById('editServiceName').value = data.serviceName;
                document.getElementById('editServiceArea').value = data.serviceArea;
                document.getElementById('editServiceCost').value = data.serviceCost;
                document.getElementById('editServiceMaxPeople').value = data.serviceMaxPeople;
                document.getElementById('editServiceStandardRoom').value = data.serviceStandardRoom;
                document.getElementById('editOtherConvenience').value = data.descriptionOtherConvenience;
                document.getElementById('editServicePoolArea').value = data.servicePoolArea;
                document.getElementById('editNumberOfFloors').value = data.serviceNumberOfFloors;
                document.getElementById('editRentType').value = data.rentType.rentTypeId;
                document.getElementById('editServiceType').value = data.serviceType.serviceTypeId;
            }
        })
        event.preventDefault();
    });

    $("body").on("click", "#save", function () {
        let id = $('#editServiceId').val();
        let serviceCode = $('#editServiceCode').val();
        let serviceName = $('#editServiceName').val();
        let serviceArea = $('#editServiceArea').val();
        let serviceCost = $('#editServiceCost').val();
        let serviceMaxPeople = $('#editServiceMaxPeople').val();
        let serviceStandardRoom = $('#editServiceStandardRoom').val();
        let otherConvenience = $('#editOtherConvenience').val();
        let servicePoolArea = $('#editServicePoolArea').val();
        let numberOfFloors = $('#editNumberOfFloors').val();
        let rentTypeId = $('#editRentType').val();
        let serviceTypeId = $('#editServiceType').val();
        let rentType = {
            rentTypeId: rentTypeId
        }
        let serviceType = {
            serviceTypeId: serviceTypeId
        }
        let service = {
            serviceId: id,
            serviceCode: serviceCode,
            serviceName: serviceName,
            serviceArea: serviceArea,
            serviceCost: serviceCost,
            serviceMaxPeople: serviceMaxPeople,
            serviceStandardRoom: serviceStandardRoom,
            descriptionOtherConvenience: otherConvenience,
            servicePoolArea: servicePoolArea,
            serviceNumberOfFloors: numberOfFloors,
            rentType: rentType,
            serviceType: serviceType
        }
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "PUT",
            data: JSON.stringify(service),
            url: `/api/services/${id}`,
            success: successHandler
        })
    });

    $("#serviceTable").on("click", ".deleteService", function () {
        let a = $(this);
        let id = a.attr("href");
        $('#testModal').modal('show');
        event.preventDefault();
    });
})