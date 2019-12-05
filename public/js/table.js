function calculateTotals() {
    let rows = document.getElementById('container');
    let calsTotal = 0;
    let fatTotal = 0;
    let carbsTotal = 0;
    let proteinTotal = 0;
    for (i = 0; i < rows.children.length; i++) {
        if (Number(rows.children[i].getAttribute('_id')) !== -1) {
            calsTotal += Number(rows.children[i].children[2].innerText);
            fatTotal += Number(rows.children[i].children[3].innerText);
            carbsTotal += Number(rows.children[i].children[4].innerText);
            proteinTotal += Number(rows.children[i].children[5].innerText);
        } else {
            calsTotal += Number(rows.children[i].children[2].children[0].value);
            fatTotal += Number(rows.children[i].children[3].children[0].value);
            carbsTotal += Number(rows.children[i].children[4].children[0].value);
            proteinTotal += Number(rows.children[i].children[5].children[0].value);
        }
    }
    document.getElementById('calsTotal').innerHTML = calsTotal.toFixed(0);
    document.getElementById('fatTotal').innerHTML = fatTotal.toFixed(1);
    document.getElementById('carbsTotal').innerHTML = carbsTotal.toFixed(1);
    document.getElementById('proteinTotal').innerHTML = proteinTotal.toFixed(1);

    calculatePercents();
}

function calculatePercents() {
    let fat = Number(document.getElementById('fatTotal').innerText);
    let carbs = Number(document.getElementById('carbsTotal').innerText);
    let protein = Number(document.getElementById('proteinTotal').innerText);
    let fatPercent = (fat !== 0) ? fat * 9 / (fat * 9 + carbs * 4 + protein * 4) * 100 : 0;
    let carbsPercent = (carbs !== 0) ? carbs * 4 / (fat * 9 + carbs * 4 + protein * 4) * 100 : 0;
    let proteinPercent = (protein !== 0) ? protein * 4 / (fat * 9 + carbs * 4 + protein * 4) * 100 : 0;

    document.getElementById('fatPercent').innerHTML = `${fatPercent.toFixed(0)}%`;
    document.getElementById('carbsPercent').innerHTML = `${carbsPercent.toFixed(0)}%`;
    document.getElementById(`proteinPercent`).innerHTML = `${proteinPercent.toFixed(0)}%`;
}

function fillValues(index) {
    let sel = document.getElementById(`name${index}`);
    let list = document.getElementById(`dishesList${index}`);
    let cals = 0;
    let fat = 0;
    let carbs = 0;
    let protein = 0;

    for (i = 0; i < list.options.length; i++) {
        if (list.options[i].value === sel.value) {            
            cals = Number(list.options[i].getAttribute('cals'));
            fat = Number(list.options[i].getAttribute('fat'));
            carbs = Number(list.options[i].getAttribute('carbs'));
            protein = Number(list.options[i].getAttribute('protein'));
            break;
        }
    }
    document.getElementById(`cals${index}`).value = cals;
    document.getElementById(`fat${index}`).value = fat;
    document.getElementById(`carbs${index}`).value = carbs;
    document.getElementById(`protein${index}`).value = protein;

    calculateTotals();
}

function addRow() {
    let container = document.getElementById("container");
    let index = container.children.length;
    let row = document.createElement('tr');
    row.setAttribute('_id', -1);

    let cell1 = document.createElement('TD');
    let inp1 = document.createElement('INPUT');
    inp1.setAttribute('id', `time${index}`);
    inp1.setAttribute('name', 'time');
    inp1.setAttribute('type', 'time');
    cell1.appendChild(inp1);
    row.appendChild(cell1);

    var cell2 = document.createElement("TD");
    var input = document.createElement('input');
    input.setAttribute('id', `name${index}`);
    input.setAttribute('name', 'name');
    input.setAttribute('list', `dishesList${index}`);
    input.setAttribute('onchange', `fillValues(${index})`);
    cell2.appendChild(input);
    let datalist = document.getElementById('dishesList').cloneNode(true);
    datalist.setAttribute('id', `dishesList${index}`);
    cell2.appendChild(datalist);
    row.appendChild(cell2);

    var cell3 = document.createElement("TD");
    var inp3 = document.createElement('INPUT');
    inp3.setAttribute('id', `cals${index}`);
    inp3.setAttribute('name', 'cals');
    inp3.setAttribute('type', 'text');
    inp3.setAttribute('value', '0.0');
    inp3.setAttribute('size', '2');
    inp3.setAttribute('onchange', 'calculateTotals()');
    cell3.appendChild(inp3);
    row.appendChild(cell3);
    var cell4 = document.createElement("TD");
    var inp4 = document.createElement('INPUT');
    inp4.setAttribute('id', `fat${index}`);
    inp4.setAttribute('name', 'fat');
    inp4.setAttribute('type', 'text');
    inp4.setAttribute('value', '0.0');
    inp4.setAttribute('size', '2');
    inp4.setAttribute('onchange', 'calculateTotals()');
    cell4.appendChild(inp4);
    row.appendChild(cell4);
    var cell5 = document.createElement("TD");
    var inp5 = document.createElement('INPUT');
    inp5.setAttribute('id', `carbs${index}`);
    inp5.setAttribute('name', 'carbs');
    inp5.setAttribute('type', 'text');
    inp5.setAttribute('value', '0.0');
    inp5.setAttribute('size', '2');
    inp5.setAttribute('onchange', 'calculateTotals()');
    cell5.appendChild(inp5);
    row.appendChild(cell5);
    var cell6 = document.createElement("TD");
    var inp6 = document.createElement('INPUT');
    inp6.setAttribute('id', `protein${index}`);
    inp6.setAttribute('name', 'protein');
    inp6.setAttribute('type', 'text');
    inp6.setAttribute('value', '0.0');
    inp6.setAttribute('size', '2');
    inp6.setAttribute('onchange', 'calculateTotals()');
    cell6.appendChild(inp6);
    row.appendChild(cell6);
    container.appendChild(row);
}

window.onload = function(){
    this.calculateTotals();
}