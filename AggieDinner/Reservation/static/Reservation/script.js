document.addEventListener('DOMContentLoaded', function() {

    // Get DOM Elements
    const findDayForm = document.querySelector("#reserveDate")
    const findDayArea = document.querySelector('#findDate')
    const findTimeForm = document.querySelector('#reserveTime')
    const findTimeArea = document.querySelector('#findTime')
    const confirmationForm = document.querySelector('#confirmation')

    const times = ["12 AM", "1 AM", "2 AM", "3 AM", "4 AM", "5 AM", "6 AM", "7 AM","8 AM", "9 AM", "10 AM", "11 AM",
                    "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM", "7 PM", "8 PM", "9 PM", "10 PM", "11 PM"]


    // Fix date
    // TODO

    // Hide Time Form
    findTimeArea.style.display = "none"

    findDayForm.addEventListener('submit', function(event) {
        event.preventDefault()

        // all return strings
        date = this.querySelector('#date').value;
        reserver = this.querySelector('#name').value
        partySize = this.querySelector('#size').value

        // display find time area
        findTimeArea.style.display = "block";
        findDayArea.style.display = "none";
        confirmationForm.style.display = "none";

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
                block.textContent = times[parseInt(hour)];
                block.value = hour;
                dropDown.append(block);
            })
        })
    })

    // When submit time
    findTimeForm.addEventListener('submit', function(event) {
        event.preventDefault()

        const timeSlot = this.querySelector('#times').value;
        const myName = this.querySelector('#greeting').dataset.name;
        const date = this.querySelector('#greeting').dataset.date;
        const partySize = this.querySelector('#partySize').dataset.size;

        fetch('saveReservation', {
            method: "POST", 
            body: JSON.stringify({
                "name" : myName,
                "date" : date,
                "partySize" : partySize,
                "time" : timeSlot
            })
        })

        // display time better
        const time = times[timeSlot];

        // display date better
        const betterDate = date[5] + date[6] + date[7] + date[8] + date[9] + date[4] + date[0] + date[1] + date[2] + date[3]

        document.querySelector('#confirmation-description').innerHTML = `${myName}, you have a reservation at Aggie Dinner
        with a party size of ${partySize} on ${betterDate} at ${time}. We hope to see you there.`

        // Display confirmation
        findTimeArea.style.display = "none";
        findDayArea.style.display = "none";
        confirmationForm.style.display = "block";
    })

    document.querySelector('#goBack').addEventListener('click', function() {
        findTimeArea.style.display = "none";
        findDayArea.style.display = "block";
        confirmationForm.style.display = "none";
    })
})