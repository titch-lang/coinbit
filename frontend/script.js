let tradeType = "";
const fixedUIDs = {
  "Binance": "761945402",
  "OKX": "483357627414418340",
  "Bybit": "Coming Soon"
};

// open modal
function openModal(type) {
  tradeType = type;
  document.getElementById("modal").style.display = "flex";
  document.getElementById("modal-title").innerText = type === "buy" ? "Buy Crypto" : "Sell Crypto";
  document.getElementById("buyFields").style.display = type === "buy" ? "block" : "none";
  document.getElementById("sellFields").style.display = type === "sell" ? "block" : "none";
}

// close modal
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

// update UID in Sell
function handleExchangeChange() {
  const exch = document.getElementById("exchange").value;
  if (tradeType === "sell") {
    document.getElementById("sellUid").value = fixedUIDs[exch] || "";
  }
}

// copy UID
function copyUid() {
  const uid = document.getElementById("sellUid");
  uid.select();
  document.execCommand("copy");
  alert("UID copied: " + uid.value);
}

// calculate KES from USD offers (for Buy)
function updateKesAmount() {
  const usd = parseFloat(document.getElementById("buyAmount").value) || 0;
  let rate = 0;

  if (usd >= 1 && usd <= 13) rate = 131;
  else if (usd >= 14 && usd <= 27) rate = 130;
  else if (usd >= 28) rate = 129;

  const kes = usd * rate;
  document.getElementById("buyKes").value = kes > 0 ? kes + " KES" : "";
}

// summary modal for Buy only
function showSummary() {
  if (tradeType === "buy") {
    const exch = document.getElementById("exchange").value;
    const amount = document.getElementById("buyAmount").value;
    const uid = document.getElementById("buyUid").value;
    const kes = document.getElementById("buyKes").value;
    if (!exch || !amount || !uid) return alert("Please fill all fields.");

    const html = `
      <p><strong>Type:</strong> Buy</p>
      <p><strong>Exchange:</strong> ${exch}</p>
      <p><strong>Amount:</strong> ${amount} USD</p>
      <p><strong>To Pay:</strong> ${kes}</p>
      <p><strong>Your UID:</strong> ${uid}</p>
    `;
    document.getElementById("summaryContent").innerHTML = html;
    document.getElementById("summaryModal").style.display = "flex";
  } else {
    // For Sell, send directly to WhatsApp
    shareOnWhatsApp();
  }
}

// close summary
function closeSummary() {
  document.getElementById("summaryModal").style.display = "none";
}

// share WhatsApp
function shareOnWhatsApp() {
  const exch = document.getElementById("exchange").value;
  let message = "";

  if (tradeType === "buy") {
    const amount = document.getElementById("buyAmount").value;
    const uid = document.getElementById("buyUid").value;
    const kes = document.getElementById("buyKes").value;
    message = `✅ CoinBit Buy\nExchange: ${exch}\nAmount: ${amount} USD\nTo Pay: ${kes}\nUID: ${uid}\n\nI have paid via M-Pesa.`;
  } else {
    const amount = document.getElementById("sellAmount").value;
    const phone = document.getElementById("sellerPhone").value;
    const name = document.getElementById("sellerName").value;
    if (!exch || !amount || !phone || !name) return alert("Please fill all fields.");

    message = `I have paid ${amount} USD to ${exch}.\n\nNow send money to:\nM-Pesa Number: ${phone}\nName: ${name}`;
  }

  const operator = "254759354842"; // your WhatsApp number
  const waUrl = `https://wa.me/${operator}?text=${encodeURIComponent(message)}`;
  window.open(waUrl, "_blank");

  closeSummary();
  closeModal();
}
fetch("http://localhost:5000/confirm", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    amount: 100,
    exchange: "Binance",
    uid: "12345678",
    phone: "0700123456"
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
