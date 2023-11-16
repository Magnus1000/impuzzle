// Call serverless function to check order status
window.onload = function() {
    // Fetching URL parameters
    var url = new URL(window.location.href);
    var orderId = url.searchParams.get("orderId");
    var token = url.searchParams.get("token");

    // Constructing the desired link with the order ID appended
    var link = "https://www.unlockcarstereo.com/serial-number-retry?order_id=" + orderId;
    var linkSpan = document.getElementById("resubmit_link");
    if (linkSpan) {
        linkSpan.innerHTML = '<a href="' + link + '">this link</a>';
    }

    // Click event listener for checking order status
    document.getElementById("check_order_status").addEventListener("click", function() {
        var orderStatusDiv = document.getElementById("order_status_text");
        orderStatusDiv.innerText = "Fetching order status...";

        fetch("https://your-vercel-function-url.com/checkOrderStatus?orderId=" + orderId)
            .then(response => response.json())
            .then(data => {
                orderStatusDiv.innerHTML = data.orderStatusText || "No records found for the provided order ID.";
            })
            .catch(error => {
                orderStatusDiv.innerText = "Error fetching data.";
                console.error("Error:", error);
            });
    });

    // Other existing functions like hideDivIfNotHondaOrAcura...
    hideDivIfNotHondaOrAcura();
};

// Function to hide the div based on content using MutationObserver
function hideDivIfNotHondaOrAcura() {
    var contentDiv = document.querySelector('[data-wf-bindings]');
    if (!contentDiv) return;

    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type == "childList") {
                var contentText = contentDiv.innerText.toLowerCase();
                if (!(contentText.includes("honda") || contentText.includes("acura"))) {
                    var hondaAcuraDiv = document.getElementById("trouble-shooting-honda-acura");
                    if (hondaAcuraDiv) {
                        hondaAcuraDiv.style.display = "none";
                    }
                } else {
                    var hondaAcuraDiv = document.getElementById("trouble-shooting-honda-acura");
                    if (hondaAcuraDiv) {
                        hondaAcuraDiv.style.display = "block";
                    }
                }
            }
        });
    });
    observer.observe(contentDiv, { childList: true });
}