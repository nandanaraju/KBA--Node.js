const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const registration = new Map();

function askCommand() {
    console.log("Welcome to the Event Management Record System!");
    console.log("Available commands: add ,remove, update, summary, exit");
    rl.question("\Enter a Command: ", function (command) {
        switch (command.trim().toLowerCase()) {
            case 'add':
                addRecordPrompt();
                break;
            case 'remove':
                removeRecordPrompt();
                break;
            case 'update':
                updateRecordPrompt();
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
function addRecordPrompt() {
    rl.question("Enter id: ", function (id) {
        rl.question("Enter participant name: ", function (name) {
            rl.question("Enter event name: ", function (event) {
                rl.question("Enter registration date: ", function (date) {
                    addRecord(id, name, event, date);
                    askCommand();
                })
            });
        });
    });
}

function addRecord(id, name, event, date) {
    if (registration.has(id)) {
        console.log(`Error: Record with ID ${id} already exists.`);
    } else {
        registration.set(id, { name, event, date });
        console.log(`Record with ID ${id} added.`);
    }
}

function removeRecordPrompt() {
    rl.question("Enter search term: ", function (id) {
        removeRecord(id);
        askCommand();
    });
}

function removeRecord(id) {
    if (registration.has(id)) {
        registration.delete(id);
        console.log(`Record with ID ${id} removed.`);
    } else {
        console.log(`Error: Record with ID ${id} not found.`);
    }
}



function updateRecordPrompt() {
    rl.question("Enter id: ", function (id) {
        rl.question("Enter participant name: ", function (newName) {
            rl.question("Enter event name: ", function (newEvent) {
                rl.question("Enter registration date", function (newDate) {
                    updateRecord(id, newName, newEvent,newDate);
                    askCommand();
                })
            });
        });
    });
}

function updateRecord(id, newName, newEvent,newDate) {
    if (registration.has(id)) {
        const record = registration.get(id);
        record.name = newName || record.name;
        record.event = newEvent || record.event;
        record.date = newDate || record.date;
        registration.set(id, record);
        console.log(`Record with ID ${id} updated.`);
    } else {
        console.log(`Error: Record with ID ${id} not found.`);
    }

}


function printSummary() {
    if (registration.size > 0) {
        console.log('Record Summary:');
        for (const [id, record] of registration) {
            console.log(`ID: ${id}, Name: ${record.name}, Event: ${record.event},Date:${record.date}`);
        }
    } else {
        console.log('Record is empty.')
    }
}

askCommand();