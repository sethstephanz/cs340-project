// This file uses starter code adapted from:
// https://github.com/osu-cs340-ecampus/nodejs-starter-app

function updateOrder(orderID) {

    // Get the objects we need to modify
    let updateOrderForm = document.getElementById('update-order-form');

    // Populate the update fields with the data from the table.
    document.getElementById("update-order-date").removeAttribute("disabled");
    document.getElementById("update-ship-date").removeAttribute("disabled");
    document.getElementById("update-delivered-date").removeAttribute("disabled");
    document.getElementById("update-comment").removeAttribute("disabled");
    document.getElementById("update-customer-id").removeAttribute("disabled");

    const rowToUpdate = document.querySelector(`[data-value="${orderID}"]`);

    let orderId = rowToUpdate.getElementsByClassName("order-id")[0].textContent;
    document.getElementById("update-order-id").value = orderId;

    let orderDate = rowToUpdate.getElementsByClassName("order-date")[0].textContent;
    document.getElementById("update-order-date").value = orderDate;

    let shipDate = rowToUpdate.getElementsByClassName("ship-date")[0].textContent;
    document.getElementById("update-ship-date").value = shipDate;

    let deliveredDate = rowToUpdate.getElementsByClassName("delivered-date")[0].textContent;
    document.getElementById("update-delivered-date").value = deliveredDate;

    let comment = rowToUpdate.getElementsByClassName("comment")[0].textContent;
    document.getElementById("update-comment").value = comment;

    let customerId = rowToUpdate.getElementsByClassName("customer-id")[0].textContent;
    document.getElementById("update-customer-id").value = customerId;


    // Modify the objects we need
    updateOrderForm.addEventListener("submit", function (event) {
    
        // Prevent the form from submitting
        event.preventDefault();

        // Get form fields we need to get data from
        let updateOrderId = document.getElementById("update-order-id");
        let updateOrderDate = document.getElementById("update-order-date");
        let updateShipDate = document.getElementById("update-ship-date");
        let updateDeliveredDate = document.getElementById("update-delivered-date");
        let updateComment = document.getElementById("update-comment");
        let updateCustomerId = document.getElementById("update-customer-id");

        // Get the values from the form fields
        let orderIdValue = updateOrderId.value;
        let orderDateValue = updateOrderDate.value;
        let shipDateValue = updateShipDate.value;
        let deliveredDateValue = updateDeliveredDate.value;
        let commentValue = updateComment.value;
        let customerIdValue = updateCustomerId.value;
        
        /* The Orders table allows customerId to be NULL, but that might not be the case for all tables.
        Adapt this code in other tables so we can abort if passed a NULL value.
        if (isNaN(customerIdValue)) 
        {
            return;
        }
        */

        // Put our data we want to send in a Javascript object
        let data = {
            orderId: orderIdValue,
            orderDate: orderDateValue,
            shipDate: shipDateValue,
            deliveredDate: deliveredDateValue,
            comment: commentValue,
            customerId: customerIdValue
        }
        
        // Setup our AJAX request
        var xhttp = new XMLHttpRequest();
        xhttp.open("PUT", "/update-order", true);
        xhttp.setRequestHeader("Content-type", "application/json");

        // Tell our AJAX request how to resolve
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {

                // Add the new data to the table
                updateRow(xhttp.response, orderIdValue);

            }
            else if (xhttp.readyState == 4 && xhttp.status != 200) {
                console.log("There was an error with the input.")
            }
        }

        // Send the request and wait for the response
        xhttp.send(JSON.stringify(data));

    });
}

function updateRow(data, orderID){
    let parsedData = JSON.parse(data);

    // Get the location of the row where we found the matching order ID
    let updateRow = document.querySelector(`[data-value='${orderID}'`);

    // Reassign values in the table.
    let orderDate = updateRow.getElementsByClassName("order-date")
    orderDate[0].innerText = parsedData[0].order_date.substring(0,10);

    let shipDate = updateRow.getElementsByClassName("ship-date")
    shipDate[0].innerText = parsedData[0].ship_date.substring(0,10);

    let deliveredDate = updateRow.getElementsByClassName("delivered-date")
    deliveredDate[0].innerText = parsedData[0].delivered_date.substring(0,10);

    let comment = updateRow.getElementsByClassName("comment")
    comment[0].innerText = parsedData[0].comment;
    
    let customerId = updateRow.getElementsByClassName("customer-id")
    customerId[0].innerText = parsedData[0].customer_id;

}