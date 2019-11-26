function calculateValues() {
    let sel = document.getElementById('ingredient');
    let per = 0;
    let cals = 0;
    let fat = 0;
    let carbs = 0;
    let protein = 0;
    let amount = document.getElementById('amount').value;

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
    document.getElementById('cals').value = cals;
    document.getElementById('fat').value = fat;
    document.getElementById('carbs').value = carbs;
    document.getElementById('protein').value = protein;
}