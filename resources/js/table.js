window.onload = function () {
    function addRow() {
        var table = document.getElementById("meals");
        var rowIndex = table.rows.length - 2;
        var row = table.insertRow(rowIndex);

        var headerCell = document.createElement("TH");
        headerCell.innerHTML = "19:00";
        headerCell.setAttribute('scope', 'row');
        row.appendChild(headerCell);

        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        cell2.innerHTML = "Another Meal";
        cell3.innerHTML = "0.0";
        cell4.innerHTML = "0.0";
        cell5.innerHTML = "0.0";
        cell6.innerHTML = "0.0";
    }

    document.getElementById("add-meal").addEventListener("click", addRow); 
}