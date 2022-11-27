const id = (new URL(document.location)).searchParams.get("id");
document.getElementById("orderId").innerHTML = id;