// accepts 'tipAmt', 'billAmt', 'tipPercent' and sums total from allPayments objects
function sumPaymentTotal(type) {
  let total = 0;

  for (let key in allPayments) {
    let payment = allPayments[key];

    total += Number(payment[type]);
  }

  return total;
}

// converts the bill and tip amount into a tip percent
function calculateTipPercent(billAmt, tipAmt) {
  return Math.round(100 / (billAmt / tipAmt));
}

// expects a table row element, appends a newly created td element from the value
function appendTd(tr, value) {
  let newTd = document.createElement("td");
  newTd.innerText = value;

  tr.append(newTd);
}

// expects a table row element, appends a newly created td element with value X
function appendDeleteBtn(tr) {
  let deleteBtn = document.createElement("td");

  deleteBtn.innerText = "X";
  deleteBtn.classList.add("deleteBtn");

  deleteBtn.addEventListener("click", function (event) {
    let parentTr = event.target.parentNode;
    delete allServers[parentTr.id];
    parentTr.remove();
    updateServerTable();
  });

  tr.append(deleteBtn);
}