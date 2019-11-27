function calculateValues(index) {
    let sel = document.getElementById(`ingredient${index}`);
    let per = 0;
    let cals = 0;
    let fat = 0;
    let carbs = 0;
    let protein = 0;
    let amount = document.getElementById(`amount${index}`).value;

    if(sel.selectedIndex !== 0){
        per = sel.options[sel.selectedIndex].getAttribute('per');
        cals = sel.options[sel.selectedIndex].getAttribute('cals');
        cals = amount / per * cals;
        fat = sel.options[sel.selectedIndex].getAttribute('fat');
        fat = amount / per * fat;
        carbs = sel.options[sel.selectedIndex].getAttribute('carbs');
        carbs = amount / per * carbs;
        protein = sel.options[sel.selectedIndex].getAttribute('protein');
        protein = amount / per * protein;
    }
    document.getElementById(`cals${index}`).value = cals;
    document.getElementById(`fat${index}`).value = fat;
    document.getElementById(`carbs${index}`).value = carbs;
    document.getElementById(`protein${index}`).value = protein;

    calculateTotals();
}

function calculateTotals() {
    let rows = document.getElementById('container');
    let calsTotal = Number(rows.children[0].children[3].children[1].value);
    let fatTotal = Number(rows.children[0].children[4].children[1].value);
    let carbsTotal = Number(rows.children[0].children[5].children[1].value);
    let proteinTotal = Number(rows.children[0].children[6].children[1].value);
    for(i=1;i<rows.children.length;i++) {
        calsTotal += Number(rows.children[i].children[2].children[0].value);
        fatTotal += Number(rows.children[i].children[3].children[0].value);
        carbsTotal += Number(rows.children[i].children[4].children[0].value);
        proteinTotal += Number(rows.children[i].children[5].children[0].value);
    }
    document.getElementById('calsTotal').setAttribute('value', calsTotal);
    document.getElementById('fatTotal').setAttribute('value', fatTotal);
    document.getElementById('carbsTotal').setAttribute('value', carbsTotal);
    document.getElementById('proteinTotal').setAttribute('value', proteinTotal);
}

function addRow() {
    let container = document.getElementById('container');
    let index = container.children.length;
    let rowDiv = document.createElement('div');
    rowDiv.setAttribute('class', 'form-row align-dish-row2');
    let cellDiv = document.createElement('div');
    cellDiv.setAttribute('class', 'form-group col-md-2');
    let ingSel = document.getElementById('ingredient0').cloneNode(true);
    ingSel.setAttribute('id', `ingredient${index}`);
    ingSel.setAttribute('name', `ingredient${index}`);
    ingSel.setAttribute('onchange', `calculateValues(${index})`);
    let amountTxt = document.createElement('input');
    amountTxt.setAttribute('id', `amount${index}`);
    amountTxt.setAttribute('name', `amount${index}`);
    amountTxt.setAttribute('onblur', `calculateValues(${index})`);
    amountTxt.setAttribute('value', 0);
    let calsTxt = document.createElement('input');
    calsTxt.setAttribute('id', `cals${index}`);
    calsTxt.setAttribute('name', `cals${index}`);
    calsTxt.setAttribute('value', 0);
    let fatTxt = document.createElement('input');
    fatTxt.setAttribute('id', `fat${index}`);
    fatTxt.setAttribute('name', `fat${index}`);
    fatTxt.setAttribute('value', 0);
    let carbsTxt = document.createElement('input');
    carbsTxt.setAttribute('id', `carbs${index}`);
    carbsTxt.setAttribute('name', `carbs${index}`);
    carbsTxt.setAttribute('value', 0);
    let proteinTxt = document.createElement('input');
    proteinTxt.setAttribute('id', `protein${index}`);
    proteinTxt.setAttribute('name', `protein${index}`);
    proteinTxt.setAttribute('value', 0);
    cellDiv.appendChild(ingSel);
    rowDiv.appendChild(cellDiv);
    let cellDiv2 = document.createElement('div');
    cellDiv2.setAttribute('class', 'form-group col-md-1');
    cellDiv2.appendChild(amountTxt);
    rowDiv.appendChild(cellDiv2);
    let cellDiv3 = document.createElement('div');
    cellDiv3.setAttribute('class', 'form-group col-md-1');
    cellDiv3.appendChild(calsTxt);
    rowDiv.appendChild(cellDiv3);
    let cellDiv4 = document.createElement('div');
    cellDiv4.setAttribute('class', 'form-group col-md-1');
    cellDiv4.appendChild(fatTxt);
    rowDiv.appendChild(cellDiv4);
    let cellDiv5 = document.createElement('div');
    cellDiv5.setAttribute('class', 'form-group col-md-1');
    cellDiv5.appendChild(carbsTxt);
    rowDiv.appendChild(cellDiv5);
    let cellDiv6 = document.createElement('div');
    cellDiv6.setAttribute('class', 'form-group col-md-1');
    cellDiv6.appendChild(proteinTxt);
    rowDiv.appendChild(cellDiv6);
    container.appendChild(rowDiv);
}