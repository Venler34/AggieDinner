document.addEventListener('DOMContentLoaded', function() {

    // Get DOM Elements
    const findDayForm = document.querySelector("#reserveDate")
    const findDayArea = document.querySelector('#findDate')
    const findTimeForm = document.querySelector('#reserveTime')
    const findTimeArea = document.querySelector('#findTime')
    // Hide Time Form
    findTimeArea.style.display = "none"

    findDayForm.addEventListener('submit', function(event) {
        event.preventDefault()

        // all return strings
        date = this.querySelector('#date').value
        reserver = this.querySelector('#name').value
        partySize = this.querySelector('#size').value

        // display find time area
        findTimeArea.style.display = "block";
        findDayArea.style.display = "none";

        // display greeting 
        findTimeArea.querySelector('#greeting').innerHTML = `Hi, ${reserver}!`;
        findTimeArea.querySelector('#partySize').innerHTML = `Party Size: ${partySize}`;
        
        // Add items to dataset
        findTimeArea.querySelector('#greeting').dataset.name = reserver;
        findTimeArea.querySelector('#greeting').dataset.date = date;
        findTimeArea.querySelector('#partySize').dataset.size = partySize;

        fetch(`getReservation?date=${date}&size=${partySize}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const dropDown = findTimeForm.querySelector('#times');
            data.forEach(hour => {
                const block = document.createElement('option');
                block.textContent = hour;
                block.value = hour;
                dropDown.append(block);
            })
        })
    })

    findTimeForm.addEventListener('submit', function(event) {
        event.preventDefault()

        const timeSlot = this.querySelector('#times').value;
        const myName = this.querySelector('#greeting').dataset.name;
        const date = this.querySelector('#greeting').dataset.date;
        const partySize = this.querySelector('#partySize').dataset.size;

        console.log(timeSlot)
        console.log(myName)
        console.log(date)
        console.log(partySize)

        fetch('saveReservation', {
            method: "POST", 
            body: JSON.stringify({
                "name" : myName,
                "date" : date,
                "partySize" : partySize,
                "time" : timeSlot
            })
        }).then(response => console.log(response))
    })

    document.querySelector('#goBack').addEventListener('click', function() {
        findTimeArea.style.display = "none";
        findDayArea.style.display = "block";
    })
})