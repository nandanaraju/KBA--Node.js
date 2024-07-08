const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const record = new Map();

function askCommand() {
    console.log("Welcome to the Patient Record Management!");
    console.log("Available commands: add ,remove, search, update, summary, exit");
    rl.question("\Enter a Command: ", function (command) {
        switch (command.trim().toLowerCase()) {
            case 'add':
                addPatientPrompt();
                break;
            case 'remove':
                removePatientPrompt();
                break;
            case 'search':
                searchPatientPrompt();
                break;
            case 'update':
                updatePatientPrompt();
                break;
            case 'summary':
                printSummary();
                askCommand();
                break;
            case 'exit':
                rl.close();
                break;
            default:
                console.log("Invalid Command. Please try again!");
                askCommand();
                break;
        }
    });
}



function addPatientPrompt() {
    rl.question("Enter patient id: ", function (id) {
        rl.question("Enter patient name: ", function (name) {
            rl.question("Enter patient age: ", function (age) {
                rl.question("Enter patient's diagnosis: ", function (diagnosis) {
                    addPatient(id, name, age, diagnosis);
                    askCommand();
                })
            });
        });
    });
}


function addPatient(id, name, age, diagnosis) {
    if (record.has(id)) {
        console.log(`Error: Patient with ID ${id} already exists.`);
    } else {
        record.set(id, { name, age, diagnosis });
        console.log(`Patient with ID ${id} added.`);
    }
}

function removePatientPrompt() {
    rl.question("Enter search term: ", function (id) {
        removePatient(id);
        askCommand();
    });
}

function removePatient(id) {
    if (record.has(id)) {
        record.delete(id);
        console.log(`Patient with ID ${id} removed.`);
    } else {
        console.log(`Error: Patient with ID ${id} not found.`);
    }
}

function searchPatientPrompt() {
    rl.question("Enter search term: ", function (searchTerm) {
        searchPatients(searchTerm);
        askCommand();
    });
}

function searchPatients(searchTerm){
    const results =[];
    for(const [id,patient] of record){
        if(id.includes(searchTerm) || patient.name.includes(searchTerm) ){
            results.push({id,...patient});
        }
    }
    if(results.length>0){
        console.log('Search Results:',results);
    } else{
        console.log('No patients found!');
    }
}

function updatePatientPrompt(){
    rl.question("Enter patient id: ", function(id){
        rl.question("Enter patient name: ", function(newName){
            rl.question("Enter patient age: ", function(newAge){
                rl.question("Enter patient's diagnosis:", function(newDiagnosis){
                    updatePatient(id, newName, newAge ? parseInt(newAge) : undefined, newDiagnosis );
                    askCommand();
                });
            });
        });
    });
}


function updatePatient(id, newName, newAge, newDiagnosis){
    if(record.has(id)){
        const patient = record.get(id);
        patient.name = newName || patient.name;
        patient.age = newAge !== undefined ? newAge : patient.age;
        patient.diagnosis =newDiagnosis||patient.diagnosis;
        record.set(id,patient);
        console.log(`Patient with ID ${id} updated.`);
    } else {
        console.log(`Error: Patient with ID ${id} not found.`);
    }

}

function printSummary(){
    if(record.size>0){
        console.log('Record Summary:');
        for(const [id,patient] of record){
            console.log(`ID: ${id}, Name: ${patient.name}, Age: ${patient.age},
            Diagnosis: ${patient.diagnosis}`);
        }
    } else{
        console.log('Record is empty.')
    }
}

askCommand();

