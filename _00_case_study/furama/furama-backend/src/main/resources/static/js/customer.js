var id;
var customerTypeList = [];
var customerList = [];
var customerDeleteList = [];

$(document).ready(function () {
    $("#customerTable").on("click", ".editCustomer", function (event) {
        event.preventDefault();
        let a = $(this);
        id = a.attr("href");
        debugger
        $.ajax({
            type: "GET",
            url: `/api/customers/${id}`,
            success: function (customer) {
                let content = `<td>~</td><td><input type="text" class="form-control" id="customerCode"
                                       placeholder="KH-1234" value="${customer.customerCode}" required></td>
                               <td><input type="text" class="form-control" id="customerName"
                                       placeholder="Tran Van A" value="${customer.customerName}" required></td>
                               <td><select  class="form-control" id="customerType">
                               </select></td>
                               <td><input type="date" class="form-control" id="customerBirthday"
                                       value="${customer.customerBirthday}" required></td>
                               <td><select class="form-control" id="customerGender">
                                   </select></td>
                                <td><input type="text" class="form-control" id="customerIdCard"
                                       value="${customer.customerIdCard}" required></td>
                                <td><input type="text" class="form-control" id="customerPhone"
                                       value="${customer.customerPhone}" required></td>
                                <td><input type="text" class="form-control" id="customerEmail"
                                       value="${customer.customerEmail}" required></td>
                                <td><input type="text" class="form-control" id="customerAddress"
                                       value="${customer.customerAddress}" required></td>
                                <td><a class="saveCustomer text-decoration-none" href="${customer.customerId}">Save</a></td>
                                <td><a class="cancelEdit text-decoration-none" href="${customer.customerId}">Cancel</a></td>`;
                let trId = "c" + `${customer.customerId}`;
                document.getElementById("" + trId).innerHTML = content;

                let genderInput = "";
                if (customer.customerGender === true) {
                    genderInput += `<option value="true">Male</option>
                                    <option value="false">Female</option>`;
                } else {
                    genderInput += `<option value="false">Female</option>
                                    <option value="true">Male</option>`;
                }
                document.getElementById("customerGender").innerHTML = genderInput;
                debugger
                let customerTypeInput = "";
                for (let i = 0; i < customerTypeList.length; i++) {
                    if (customer.customerType.customerTypeId === customerTypeList[i].customerTypeId) {
                        customerTypeInput += `<option selected value="${customerTypeList[i].customerTypeId}">${customerTypeList[i].customerTypeName}</option>`;
                    } else {
                        customerTypeInput += `<option value="${customerTypeList[i].customerTypeId}">${customerTypeList[i].customerTypeName}</option>`;
                    }
                }
                document.getElementById("customerType").innerHTML = customerTypeInput;
            }
        });
    });

    $("#customerTable").on("click", ".saveCustomer", function (event) {
        let b = $(this);
        id = b.attr("href");
        let customerCode = $('#customerCode').val();
        let customerName = $('#customerName').val();
        let customerTypeId = $('#customerType').val();
        let customerBirthday = $('#customerBirthday').val();
        let customerGender = $('#customerGender').val();
        let customerIdCard = $('#customerIdCard').val();
        let customerPhone = $('#customerPhone').val();
        let customerEmail = $('#customerEmail').val();
        let customerAddress = $('#customerAddress').val();
        let customer = {
            "customerCode": customerCode,
            "customerType": {
                "customerTypeId": customerTypeId
            },
            "customerName": customerName,
            "customerBirthday": customerBirthday,
            "customerGender": customerGender,
            "customerIdCard": customerIdCard,
            "customerPhone": customerPhone,
            "customerEmail": customerEmail,
            "customerAddress": customerAddress
        }
        debugger
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "PUT",
            data: JSON.stringify(customer),
            url: `/api/customers/${id}`,
            success: successHandler
        })
        event.preventDefault();
    });

    $("#customerTable").on("click", ".cancelEdit", function (event) {
        successHandler()
        event.preventDefault();
    });

    //show delete modal
    $('.deleteCustomer').on('click', function (event) {
        let deleteCheckboxId;
        let checkDelete;
        let deleteUlList = "";
        debugger
        for (let i = 0; i < customerList.length; i++) {
            deleteCheckboxId = "d" + customerList[i].customerId;
            checkDelete = $('#' + deleteCheckboxId).is(':checked');
            if (checkDelete == true) {
                customerDeleteList.push(customerList[i]);
            }
        }
        $('#deleteModal').modal('show');
        debugger
        for (let i = 0; i < customerDeleteList.length; i++) {
            deleteUlList += `<li>${customerDeleteList[i].customerName}</li>`;
        }
        document.getElementById('deleteUlList').innerHTML = deleteUlList;
        event.preventDefault();
    });

    //cancel delete
    $('#cancelDelete').on('click', function (event) {
        $('#deleteModal').modal('hide');
        debugger
        customerDeleteList = [];
        event.preventDefault();
    });

    $('#verifyDeleteCustomer').on('click', function (event) {
    // $("#page-top").on("click", "#verifyDeleteCustomer", function (event) {
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(customerDeleteList),
            url: "/api/customers/delete",
            success: successHandler()
        })
        $('#deleteModal').modal('hide');
        event.preventDefault();
    });
})

function getCustomerList() {
    $.ajax({
        type: "GET",
        url: "/api/customers",
        success: function (data) {
            data = data.content;
            for (let i = 0; i < data.length; i++) {
                customerList.push(data[i]);
            }
        }
    });
}

function getCustomerTypeList() {
    $.ajax({
        type: "GET",
        url: "/api/customer-types",
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                customerTypeList.push(data[i]);
            }
        }
    });
    console.log(customerTypeList)
}

function successHandler() {
    $.ajax({
        type: "GET",
        url: "/api/customers",
        success: function (data) {
            data = data.content;
            let content = '<thead class="text-white table-dark">\n' +
                '            <tr>\n' +
                '                <th scope="col">#</th>\n' +
                '                <th scope="col">Code</th>\n' +
                '                <th scope="col">Name</th>\n' +
                '                <th scope="col">Type</th>\n' +
                '                <th scope="col">Date Of Birth</th>\n' +
                '                <th scope="col">Gender</th>\n' +
                '                <th scope="col">ID Card</th>\n' +
                '                <th scope="col">Phone</th>\n' +
                '                <th scope="col">Email</th>\n' +
                '                <th scope="col">Address</th>\n' +
                '                <th scope="col">Action</th>\n' +
                '                <th scope="col">Action</th>\n' +
                '            </tr>\n' +
                '            </thead>\n' +
                '            <tbody>';
            for (let i = 0; i < data.length; i++) {
                content += `<tr id="${'c' + data[i].customerId}"><td>${i + 1}</td>` + getCustomer(data[i]);
            }
            content += '</tbody>';
            $('#createModal').modal('hide');
            document.getElementById('customerTable').innerHTML = content;
        }
    });
}

function getCustomer(customer) {
    let content = "";
    if (customer.customerGender === true) {
        content = `<td>${customer.customerCode}</td>
            <td>${customer.customerName}</td>
            <td>${customer.customerType.customerTypeName}</td>
            <td>${customer.customerBirthday}</td>
            <td>Male</td>
            <td>${customer.customerIdCard}</td>
            <td>${customer.customerPhone}</td>
            <td>${customer.customerEmail}</td>
            <td>${customer.customerAddress}</td>
            <td><a class="editCustomer text-decoration-none" data-toggle="modal" href="${customer.customerId}">Edit</a></td>
            <td><input type="checkbox" id="${'d' + customer.customerId}" value="true"></td>`;
    } else {
        content = `<td>${customer.customerCode}</td>
            <td>${customer.customerName}</td>
            <td>${customer.customerType.customerTypeName}</td>
            <td>${customer.customerBirthday}</td>
            <td>Female</td>
            <td>${customer.customerIdCard}</td>
            <td>${customer.customerPhone}</td>
            <td>${customer.customerEmail}</td>
            <td>${customer.customerAddress}</td>
            <td><a class="editCustomer text-decoration-none" data-toggle="modal" href="${customer.customerId}">Edit</a></td>
            <td><input type="checkbox" id="${'d' + customer.customerCode}" value="true"></td>`;
    }
    return content;

}

window.onload = getCustomerTypeList();
window.onload = getCustomerList()();
