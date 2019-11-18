window.onload = function () {
    function getMeals() {
        var meals = '{"meals": [' +
            '{ "name": "Chicken", "cals": 248, "fat": 6.0, "carbs": 0.0, "protein": 46.5},' +
            '{ "name": "Pork", "cals": 221, "fat": 6.8, "carbs": 0.0, "protein": 39.0},' +
            '{ "name": "Mixed Vegetables", "cals": 59, "fat": 0.0, "carbs": 11.8, "protein": 2.4},' +
            '{ "name": "Oats & Berries", "cals": 288, "fat": 3.8, "carbs": 61.4, "protein": 8.1}]}';

        return meals;
    }
    function fillMealSelect() {
        var select = document.createElement('SELECT');
        var option = document.createElement('option');
        option.text = 'Some Meal';
        select.appendChild(option);
        return select;
    }

    function addRow() {
        var table = document.getElementById("meals");
        var rowIndex = table.rows.length - 2;
        var row = table.insertRow(rowIndex);

        var headerCell = document.createElement("TH");
        headerCell.innerHTML = "19:00";
        headerCell.setAttribute('scope', 'row');
        row.appendChild(headerCell);

        var jsonStr = getMeals();
        var meals = JSON.parse(jsonStr);
        var cell2 = document.createElement("TD");
        var sel2 = document.createElement('select');
        
        for(i=0;i<meals.meals.length;i++) {
            var opt2 = document.createElement('option');
            opt2.text = meals.meals[i].name;
            sel2.appendChild(opt2);
            cell2.appendChild(sel2);
        };
        row.appendChild(cell2);

        var cell3 = document.createElement("TD");
        var inp3 = document.createElement('INPUT');
        inp3.setAttribute('type', 'text');
        inp3.setAttribute('value', '0.0');
        inp3.setAttribute('size', '2');
        cell3.appendChild(inp3);
        row.appendChild(cell3);
        var cell4 = document.createElement("TD");
        var inp4 = document.createElement('INPUT');
        inp4.setAttribute('type', 'text');
        inp4.setAttribute('value', '0.0');
        inp4.setAttribute('size', '2');
        cell4.appendChild(inp4);
        row.appendChild(cell4);
        var cell5 = document.createElement("TD");
        var inp5 = document.createElement('INPUT');
        inp5.setAttribute('type', 'text');
        inp5.setAttribute('value', '0.0');
        inp5.setAttribute('size', '2');
        cell5.appendChild(inp5);
        row.appendChild(cell5);
        var cell6 = document.createElement("TD");
        var inp6 = document.createElement('INPUT');
        inp6.setAttribute('type', 'text');
        inp6.setAttribute('value', '0.0');
        inp6.setAttribute('size', '2');
        cell6.appendChild(inp6);
        row.appendChild(cell6);
    }

    document.getElementById("add-meal").addEventListener("click", addRow);
}