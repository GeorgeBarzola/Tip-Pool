let billAmtInput = document.getElementById("billAmt");
let tipAmtInput = document.getElementById("tipAmt");
let paymentForm = document.getElementById("paymentForm");

let paymentTbody = document.querySelector("#paymentTable tbody");
let summaryTds = document.querySelectorAll("#summaryTable tbody tr td");

let allPayments = {};
let paymentId = 0;

paymentForm.addEventListener("submit", submitPaymentInfo);

// Add a curPayment object to allPayments, update html and reset input values
function submitPaymentInfo(evt) {
  if (evt) evt.preventDefault(); // when running tests there is no event

  console.log("Trying to submit payment info...");
  console.log("billAmtInput: " + billAmtInput.value);
  console.log("tipAmtInput: " + tipAmtInput.value);

  let curPayment = createCurPayment();

  if (curPayment) {
    console.log("curPayment created");
    console.log(curPayment);
    paymentId += 1;

    allPayments["payment" + paymentId] = curPayment;

    appendPaymentTable(curPayment);
    updateServerTable();
    updateSummary();

    billAmtInput.value = "";
    tipAmtInput.value = "";
  } else {
    console.log("curPayment was not created");
  }
}

// createCurPayment() will return undefined with negative or empty inputs
// positive billAmt is required but tip can be 0
function createCurPayment() {
  let billAmt = billAmtInput.value;
  let tipAmt = tipAmtInput.value;

  if (billAmt === "" || tipAmt === "") {
    return;
  }

  if (Number(billAmt) > 0 && Number(tipAmt) >= 0) {
    let curPayment = {
      billAmt: billAmt,
      tipAmt: tipAmt,
      tipPercent: calculateTipPercent(billAmt, tipAmt),
    };
    return curPayment;
  }
}

// Create table row element and pass to appendTd with input value
function appendPaymentTable(curPayment) {
  let newTr = document.createElement("tr");
  newTr.id = "payment" + paymentId;

  appendTd(newTr, "$" + curPayment.billAmt);
  appendTd(newTr, "$" + curPayment.tipAmt);
  appendTd(newTr, curPayment.tipPercent + "%");
  appendDeleteBtn(newTr);

  paymentTbody.append(newTr);
}

// Create table row element and pass to appendTd with calculated sum of all payment
function updateSummary() {
  let tipPercentAvg;
  let paymentTotal = sumPaymentTotal("tipPercent");
  let numberOfPayments = Object.keys(allPayments).length;

  if (paymentTotal === 0 && numberOfPayments === 0) {
    tipPercentAvg = 0;
  } else {
    tipPercentAvg = paymentTotal / Object.keys(allPayments).length;
  }

  summaryTds[0].innerHTML = "$" + sumPaymentTotal("billAmt");
  summaryTds[1].innerHTML = "$" + sumPaymentTotal("tipAmt");
  summaryTds[2].innerHTML = Math.round(tipPercentAvg) + "%";
}