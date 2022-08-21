$(document).ready(function () {
    //display contract detail
    $("#contractTable").on("click", ".displayContractDetail", function (event) {
        let a = $(this);
        let id = a.attr("href");
        $('#contractDetailModal').modal('show');
        debugger;
        $.ajax({
            type: "GET",
            url: `/api/contracts/${id}/contract-details/`,
            success: function (data) {
                debugger;
                let content = '<thead class="">\n' +
                    '<tr>\n' +
                    '<th scope="col">#</th>\n' +
                    '<th scope="col">Name</th>\n' +
                    '<th scope="col">Unit</th>\n' +
                    '<th scope="col">Quantity</th>\n' +
                    '<th scope="col">Delete</th>\n' +
                    '</tr>\n' +
                    '</thead>\n' +
                    '<tbody>';
                for (let i = 0; i < data.length; i++) {
                    content += `<tr><td>${i + 1}</td>` + getContractDetail(data[i]);
                }
                content += '</tbody>';
                document.getElementById('contractDetailTable').innerHTML = content;
            }
        })
        event.preventDefault();
    });

    //show picking attach service
    var contractId;
    $("#contractTable").on("click", ".pickAttachService", function (event) {
        $('#attachServicePickingModal').modal('show');
        let a = $(this);
        contractId = a.attr("href");
        $.ajax({
            type: "GET",
            url: `/api/attach-services`,
            success: function (data) {
                let content = '<thead class="">\n' +
                    '<tr>\n' +
                    '<th scope="col">#</th>\n' +
                    '<th scope="col">Name</th>\n' +
                    '<th scope="col">Cost</th>\n' +
                    '<th scope="col">Status</th>\n' +
                    '<th scope="col">Unit</th>\n' +
                    '<th scope="col">Quantity</th>\n' +
                    '<th scope="col">Pick</th>\n' +
                    '</tr>\n' +
                    '</thead>\n' +
                    '<tbody>';
                for (let i = 0; i < data.length; i++) {
                    content += `<tr><td>${i + 1}</td>` + getAttachService(data[i]);
                }
                debugger
                content += '</tbody>';
                document.getElementById('attachServicePickingTable').innerHTML = content;
            }
        })
        event.preventDefault();
    })

    $("#attachServicePickingTable").on("click", ".createContractDetail", function (event) {
        let button = $(this);
        debugger
        attachServiceId = button.attr("href");
        let quantity = document.getElementById("attachServiceQuantity" + `${attachServiceId}`).value;
        let contractDetail = {
            "quantity": `${quantity}`,
            "contract": {
                "contractId": contractId
            },
            "attachService": {
                "attachServiceId": attachServiceId
            }
        }
        debugger
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            data: JSON.stringify(contractDetail),
            url: "/api/contract-details",
            success: successHandler()
        })
        event.preventDefault();
    })

    //show delete modal
    var a;
    $("#contractTable").on("click", ".showDeleteModal", function (event) {
        $('#deleteModal').modal('show');
        a = $(this);
        let contractId = a.attr("href");
        $.ajax({
            type: "GET",
            url: `/api/contracts/${contractId}`,
            success: function (data) {
                document.getElementById("contractHidden").value = data.contractId;
            }
        })
        debugger
        event.preventDefault();
    })

    //delete contract
    $("#deleteModal").on("click", ".deleteContract", function (event) {
        let contractId = $('#contractHidden').val();
        debugger
        $.ajax({
            type: "DELETE",
            url: `/api/contracts/${contractId}`,
            success: function (data) {
                a.parent().parent().remove();
            }
        })
        event.preventDefault();
    })

    //delete contract detail
    $("#contractDetailTable").on("click", ".deleteContractDetail", function (event) {
        let a = $(this);
        let contractId = a.attr("href");
        $.ajax({
            type: "DELETE",
            url: `/api/contract-details/${contractId}`,
            success: function (data) {
                a.parent().parent().remove();
                successHandler()
            }
        })
        event.preventDefault();
    })

    //onchange contract money
    $('#contractService').on('change', function (e) {
        let option = $("option:selected", this);
        let serviceId = this.value;
        $.ajax({
            type: "GET",
            url: `/api/services/${serviceId}`,
            success: function (data) {
                document.getElementById("contractTotalMoney").innerText = "Total money: " + data.serviceCost + " $";
            }
        })
    });
})


function createContract() {
    let contractStartDate = $('#contractStartDate').val();
    let contractEndDate = $('#contractEndDate').val();
    let contractDeposit = $('#contractDeposit').val();
    let employeeId = $('#contractEmployee').val();
    let customerId = $('#contractCustomer').val();
    let serviceId = $('#contractService').val();
    debugger
    let contract = {
        "contractStartDate": `${contractStartDate}`,
        "contractEndDate": `${contractEndDate}`,
        "contractDeposit": `${contractDeposit}`,
        "employee": {
            "employeeId": employeeId
        },
        "customer": {
            "customerId": customerId
        },
        "service": {
            "serviceId": serviceId
        }
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(contract),
        url: "/api/contracts",
        success: successHandler
    })
}

function successHandler() {
    debugger
    $.ajax({
        type: "GET",
        url: "/api/contracts",
        success: function (data) {
            data = data.content;
            debugger;
            let content = '<thead class="text-white table-dark">\n' +
                '            <tr>\n' +
                '                <th scope="col">#</th>\n' +
                '                <th scope="col">Service</th>\n' +
                '                <th scope="col">Customer</th>\n' +
                '                <th scope="col">Start date</th>\n' +
                '                <th scope="col">End date</th>\n' +
                '                <th scope="col">Deposit</th>\n' +
                '                <th scope="col">Total money</th>\n' +
                '                <th scope="col">Attach service</th>\n' +
                '                <th scope="col">Delete</th>\n' +
                '            </tr>\n' +
                '            </thead>\n' +
                '            <tbody>';
            for (let i = 0; i < data.length; i++) {
                content += `<tr><td>${i + 1}</td>` + getContract(data[i]);
            }
            debugger
            content += '</tbody>';
            document.getElementById('contractTable').innerHTML = content;
        }
    });
}

function getContract(contract) {
    return `<td>${contract.service.serviceName}</td>
            <td>${contract.customer.customerName}</td>
            <td>${contract.contractStartDate}</td>
            <td>${contract.contractEndDate}</td>
            <td>${contract.contractDeposit}</td>
            <td>${contract.contractTotalMoney}</td>
            <td>
                <a class="btn btn-dark pickAttachService" href="${contract.contractId}"
                       data-toggle="modal">+</a>
                <a class="btn btn-dark displayContractDetail" href="${contract.contractId}"
                       data-toggle="modal">Attach service list</a>
            </td>
            <td><a class="showDeleteModal text-decoration-none" href="${contract.contractId}">Delete</a></td></tr>`;
}

function getContractDetail(contractDetail) {
    return `<td>${contractDetail.attachService.attachServiceName}</td>
            <td>${contractDetail.attachService.attachServiceUnit}</td>
            <td>${contractDetail.quantity}</td>           
            <td>
            <a class="deleteContractDetail text-decoration-none" href="${contractDetail.contractDetailId}">Delete</a>
            </td>
            </tr>`;
}

function getAttachService(attachService) {
    return `<td>${attachService.attachServiceName}</td>
            <td>${attachService.attachServiceCost}</td>
            <td>${attachService.attachServiceStatus}</td>   
            <td>${attachService.attachServiceUnit}</td>     
            <td><input type="text" id="${'attachServiceQuantity' + attachService.attachServiceId}" class="form-control" placeholder="1"></td>        
            <td>
            <button class="createContractDetail text-decoration-none" href="${attachService.attachServiceId}">Pick</button>
            </td>
            </tr>`;
}