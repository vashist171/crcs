let deliveries = JSON.parse(localStorage.getItem("deliveries")) || [];
let editingId = null;

displayDeliveries();

function addDelivery() {
    let driverName = document.getElementById("driverName").value.trim();
    let deliveryAddress = document.getElementById("deliveryAddress").value.trim();
    let deliveryZone = document.getElementById("deliveryZone").value;
    let orderValue = document.getElementById("orderValue").value;
    let estTime = document.getElementById("estTime").value;
    let deliveryStatus = document.getElementById("deliveryStatus").value;

    if (
        driverName === "" ||
        deliveryAddress === "" ||
        deliveryZone === "" ||
        orderValue === "" ||
        estTime === "" ||
        deliveryStatus === ""
    ) {
        alert("Please fill all fields");
        return;
    }

    if (editingId === null) {
        // Create new delivery
        let delivery = {
            id: Date.now(),
            driverName: driverName,
            deliveryAddress: deliveryAddress,
            deliveryZone: deliveryZone,
            orderValue: parseFloat(orderValue).toFixed(2),
            estTime: parseInt(estTime),
            deliveryStatus: deliveryStatus
        };
        deliveries.push(delivery);
    } else {
        // Update existing delivery
        let index = deliveries.findIndex(function (d) {
            return d.id === editingId;
        });

        if (index !== -1) {
            deliveries[index].driverName = driverName;
            deliveries[index].deliveryAddress = deliveryAddress;
            deliveries[index].deliveryZone = deliveryZone;
            deliveries[index].orderValue = parseFloat(orderValue).toFixed(2);
            deliveries[index].estTime = parseInt(estTime);
            deliveries[index].deliveryStatus = deliveryStatus;
        }
        editingId = null;
        document.getElementById("submitBtn").textContent = "Add Delivery";
    }

    localStorage.setItem("deliveries", JSON.stringify(deliveries));
    clearForm();
    displayDeliveries();
}

function displayDeliveries() {
    let table = document.getElementById("deliveryTable");
    table.innerHTML = "";

    deliveries.forEach(function (delivery) {
        let badgeClass = "badge-received";
        let statusText = delivery.deliveryStatus;
        
        if (statusText === "Dispatched") {
            badgeClass = "badge-dispatched";
        } else if (statusText === "Out for Delivery") {
            badgeClass = "badge-outfordelivery";
        } else if (statusText === "Delivered") {
            badgeClass = "badge-delivered";
        }

        table.innerHTML += `
        <tr>
            <td>${delivery.id}</td>
            <td>${delivery.driverName}</td>
            <td>${delivery.deliveryAddress}</td>
            <td>${delivery.deliveryZone}</td>
            <td>$${delivery.orderValue}</td>
            <td>${delivery.estTime} min</td>
            <td>
                <span class="badge ${badgeClass}">${statusText}</span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="edit-btn" onclick="editDelivery(${delivery.id})">
                        Edit
                    </button>
                    <button class="delete-btn" onclick="deleteDelivery(${delivery.id})">
                        Delete
                    </button>
                </div>
            </td>
        </tr>
        `;
    });
}

function deleteDelivery(id) {
    deliveries = deliveries.filter(function (delivery) {
        return delivery.id !== id;
    });

    localStorage.setItem("deliveries", JSON.stringify(deliveries));
    
    // If the currently edited item was deleted, reset editing state
    if (editingId === id) {
        editingId = null;
        document.getElementById("submitBtn").textContent = "Add Delivery";
        clearForm();
    }

    displayDeliveries();
}

function editDelivery(id) {
    let delivery = deliveries.find(function (d) {
        return d.id === id;
    });

    if (delivery) {
        document.getElementById("driverName").value = delivery.driverName;
        document.getElementById("deliveryAddress").value = delivery.deliveryAddress;
        document.getElementById("deliveryZone").value = delivery.deliveryZone;
        document.getElementById("orderValue").value = delivery.orderValue;
        document.getElementById("estTime").value = delivery.estTime;
        document.getElementById("deliveryStatus").value = delivery.deliveryStatus;

        editingId = id;
        document.getElementById("submitBtn").textContent = "Update Delivery";
    }
}

function searchDeliveries() {
    let searchValue = document.getElementById("search").value.toLowerCase();
    let rows = document.querySelectorAll("#deliveryTable tr");

    rows.forEach(function (row) {
        let driverName = row.children[1].textContent.toLowerCase();
        if (driverName.includes(searchValue)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}

function clearForm() {
    document.getElementById("driverName").value = "";
    document.getElementById("deliveryAddress").value = "";
    document.getElementById("deliveryZone").value = "";
    document.getElementById("orderValue").value = "";
    document.getElementById("estTime").value = "";
    document.getElementById("deliveryStatus").value = "";
}
