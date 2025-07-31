const input = document.getElementById("trackingInput");
const result = document.getElementById("result");
const checkBtn = document.getElementById("checkBtn");
const hints = document.getElementById("hints");

function detectCarrier(trackingNumber) {
  if (/^1Z[0-9A-Z]{16}$/.test(trackingNumber)) return "UPS";
  if (/^\d{12}$/.test(trackingNumber)) return "FedEx";
  if (/^\d{20,22}$/.test(trackingNumber)) return "USPS";
    if (/^(JD\d{16,18}|\d{10})$/.test(trackingNumber)) return "DHL";
  if (/^TBA[0-9]+$/.test(trackingNumber)) return "Amazon";
  if (/^(1LS|LS)\d{8,}$/.test(trackingNumber)) return "Lasership";
  return null;
}

function getMockStatus(carrier) {
  const fail = Math.random() < 0.25;
  if (fail) return null;

  const now = new Date();
  const sixHoursAgo = new Date(now.getTime() - 6 * 60 * 60 * 1000);

  const mockData = {
    UPS: {
      status: "In Transit – Scheduled for delivery tomorrow",
      normalizedStatus: "In Transit",
      stage: "In Transit",
      lastUpdated: sixHoursAgo.toISOString(),
    },
    FedEx: {
      status: "Delivered – Left at front door",
      normalizedStatus: "Delivered",
      stage: "Delivered",
      lastUpdated: now.toISOString(),
    },
    USPS: {
      status: "Out for delivery – Arriving today",
      normalizedStatus: "Out for delivery",
      stage: "Out for delivery",
      lastUpdated: now.toISOString(),
    },
    DHL: {
      status: "Shipment processed at facility",
      normalizedStatus: "Accepted",
      stage: "Accepted",
      lastUpdated: now.toISOString(),
    },
    Amazon: {
      status: "Package has left the Amazon facility",
      normalizedStatus: "In Transit",
      stage: "In Transit",
      lastUpdated: now.toISOString(),
    },
    Lasership: {
      status: "At local hub – Out for delivery",
      normalizedStatus: "Out for Delivery",
      stage: "Out for delivery",
      lastUpdated: sixHoursAgo.toISOString(),
    },
  };
  return mockData[carrier];
}

function formatTimeStamp(isoString) {
  const date = new Date(isoString);
  return date.toLocaleString();
}

function renderTimeline(currentStage) {
  const stages = ["Accepted", "In Transit", "Out for Delivery", "Delivered"];
  return `
  <div style="margin-top: 1rem;">
  <strong>Delivery Timeline:</strong>
  <ul style="padding-left: 1.2rem;">
    ${stages.map(stage =>
      stage === currentStage
      ? `<li><strong>${stage} ✓</strong></li>`
      : `<li>${stage}</li>`
    ).join("")}
      </ul>
  </div>`;
}

checkBtn.addEventListener('click', () => {
  const trackingNumber = input.value.trim();
  const carrier = detectCarrier(trackingNumber);
  const hints = document.getElementById("hints");

  input.classList.remove("error");
  if (trackingNumber === "") {
    result.innerHTML = `<span id="error">Please enter a tracking number.</span>`;
    input.classList.add("error");
    hints.style.display = "block";
    return;
  }

  if (carrier) {
    const mockStatus = getMockStatus(carrier);

    if (!mockStatus) {
      result.innerHTML = `
      <strong>Detected carrier:</strong> ${carrier}<br>
      <span style="color: red;">Unable to retrieve tracking information. Carrier systems may be temporarily unavailable.</span>
      <button id="retryBtn">Retry</button>
      `;
      document.getElementById("retryBtn").addEventListener("click", retryCheck);
    }

    const lastUpdated = new Date(mockStatus.lastUpdated);
    const now = new Date();
    const isStale = now - lastUpdated > 6 * 60 * 60 * 1000;

    result.innerHTML = `<strong>Detected carrier:</strong> ${carrier}<br>
    <strong>Status:</strong> ${mockStatus.normalizedStatus}<br>
    <em style="color: gray;">Carrier note:</em> ${mockStatus.status}<br>
    <strong>Last updated:</strong> ${formatTimeStamp(mockStatus.lastUpdated)}
    ${isStale ? '<span style="color: red;">(May be outdated)</span>' : ''}
    ${renderTimeline(mockStatus.stage)}
    `;
    hints.style.display = "none";
  } else {
    result.innerHTML = `<span id="error">Unknown tracking number format.</span><br>Please check the number and try again.`;
    input.classList.add("error");
    hints.style.display = "block";
  }
});

function retryCheck() {
  checkBtn.click();
}
