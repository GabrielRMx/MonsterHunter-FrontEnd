fetch('http://127.0.0.1:8000/api/monsters/')
.then(response => response.json())
.then(data => {
    const monsters = data.monsters;
    const table = document.getElementById('monsters-table');

    monsters.forEach(monster => {
        const row = table.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);

        cell1.innerText = monster.id;
        cell2.innerText = monster.name;
        cell3.innerText = monster.type;
        cell4.innerText = monster.attribute;
        cell5.innerText = monster.weakness;
        cell6.innerText = monster.rank;
    });
})
.catch(error => console.error('Error:', error));

function addMonster() {
    const newName = document.getElementById('newName').value;
    const newType = document.getElementById('newType').value;
    const newAttribute = document.getElementById('newAttribute').value;
    const newWeakness = document.getElementById('newWeakness').value;
    const newRank = document.getElementById('newRank').value;

    const newMonster = {
        id: monsters.length + 1,
        name: newName,
        type: newType,
        attribute: newAttribute,
        weakness: newWeakness,
        rank: newRank
    };

    // Limpiar los campos del formulario
    document.getElementById('addMonsterForm').reset();
    
}

function addNewMonster() {
    fetch('http://127.0.0.1:8000/api/monsters/', {
        method: 'POST',
        body: JSON.stringify({
            "name": document.getElementById('newName').value,
            "type": document.getElementById('newType').value,
            "attribute": document.getElementById('newAttribute').value,
            "weakness": document.getElementById('newWeakness').value,
            "rank": document.getElementById('newRank').value
        }),
    }).then(function (response) {
        if (response.ok) {
            alert(`The new monster "${document.getElementById('newName').value}" has been added!`)
            return response.json();
        }
        return Promise.reject(response);
    }).then(function (data) {
        console.log(data);
    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });
}