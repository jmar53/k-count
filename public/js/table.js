window.onload = function () {
    function getMeals() {
        var meals = '{"meals": [' +
            '{ "name": "Chicken", "cals": 248, "fat": 6.0, "carbs": 0.0, "protein": 46.5},' +
            '{ "name": "Pork", "cals": 221, "fat": 6.8, "carbs": 0.0, "protein": 39.0},' +
            '{ "name": "Mixed Vegetables", "cals": 59, "fat": 0.0, "carbs": 11.8, "protein": 2.4},' +
            '{ "name": "Oats & Berries", "cals": 288, "fat": 3.8, "carbs": 61.4, "protein": 8.1}]}';

        return meals;
    }

    function calculateTotals() {
        let rows = document.getElementById('container');
        let calsTotal = 0;
        let fatTotal = 0;
        let carbsTotal = 0;
        let proteinTotal = 0;
        for(i=0;i<rows.children.length;i++) {
            calsTotal += Number(rows.children[i].children[2].children[0].value);
            fatTotal += Number(rows.children[i].children[3].children[0].value);
            carbsTotal += Number(rows.children[i].children[4].children[0].value);
            proteinTotal += Number(rows.children[i].children[5].children[0].value);
        }
        document.getElementById('calsTotal').innerHTML = calsTotal;
        document.getElementById('fatTotal').innerHTML = fatTotal;
        document.getElementById('carbsTotal').innerHTML = carbsTotal;
        document.getElementById('proteinTotal').innerHTML = proteinTotal;

        calculatePercents();
    }

    function calculatePercents() {
        let fat = Number(document.getElementById('fatTotal').innerText);
        let carbs = Number(document.getElementById('carbsTotal').innerText);
        let protein = Number(document.getElementById('proteinTotal').innerText);
        let fatPercent = (fat !== 0) ? fat * 9 / (fat * 9 + carbs * 4 + protein * 4) * 100 : 0 ;
        let carbsPercent = (carbs !== 0) ? carbs * 4 / (fat * 9 + carbs * 4 + protein * 4) * 100 : 0;
        let proteinPercent = (protein !== 0) ? protein * 4 / (fat * 9 + carbs * 4 + protein * 4) * 100 : 0;

        document.getElementById('fatPercent').innerHTML = `${fatPercent.toFixed(0)}%`;
        document.getElementById('carbsPercent').innerHTML = `${carbsPercent.toFixed(0)}%`;
        document.getElementById(`proteinPercent`).innerHTML = `${proteinPercent.toFixed(0)}%`;
    }

    function addRow() {
        let container = document.getElementById("container");
        let row = document.createElement('tr');

        var headerCell = document.createElement("TH");
        headerCell.innerHTML = "19:00";
        headerCell.setAttribute('scope', 'row');
        row.appendChild(headerCell);

        var jsonStr = getMeals();
        var meals = JSON.parse(jsonStr);
        var cell2 = document.createElement("TD");
        var input = document.createElement('input');
        input.setAttribute('name', 'name');
        input.setAttribute('list', 'mealsList');
        cell2.appendChild(input);
        var datalist = document.createElement('datalist');
        datalist.setAttribute('id', 'mealsList');
        for(i=0;i<meals.meals.length;i++) {
            var option = document.createElement('option');
            option.setAttribute('value', meals.meals[i].name);
            datalist.appendChild(option);
        };
        cell2.appendChild(datalist);
        row.appendChild(cell2);

        var cell3 = document.createElement("TD");
        var inp3 = document.createElement('INPUT');
        inp3.setAttribute('name', 'cals');
        inp3.setAttribute('type', 'text');
        inp3.setAttribute('value', '0.0');
        inp3.setAttribute('size', '2');
        cell3.appendChild(inp3);
        row.appendChild(cell3);
        var cell4 = document.createElement("TD");
        var inp4 = document.createElement('INPUT');
        inp4.setAttribute('name', 'fat');
        inp4.setAttribute('type', 'text');
        inp4.setAttribute('value', '0.0');
        inp4.setAttribute('size', '2');
        cell4.appendChild(inp4);
        row.appendChild(cell4);
        var cell5 = document.createElement("TD");
        var inp5 = document.createElement('INPUT');
        inp5.setAttribute('name', 'carbs');
        inp5.setAttribute('type', 'text');
        inp5.setAttribute('value', '0.0');
        inp5.setAttribute('size', '2');
        cell5.appendChild(inp5);
        row.appendChild(cell5);
        var cell6 = document.createElement("TD");
        var inp6 = document.createElement('INPUT');
        inp6.setAttribute('name', 'protein');
        inp6.setAttribute('type', 'text');
        inp6.setAttribute('value', '0.0');
        inp6.setAttribute('size', '2');
        cell6.appendChild(inp6);
        row.appendChild(cell6);
        container.appendChild(row);
        calculateTotals();
    }

    document.getElementById("add-meal").addEventListener("click", addRow);
}