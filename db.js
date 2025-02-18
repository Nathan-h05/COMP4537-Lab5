// Chatgpt was used in creation of the code

const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost', 
    user: 'root', 
    password: 'password',
    database: 'lab5_db' 
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Connected to the database!');
});

// check if the patient table exists and create it if not
function ensurePatientTableExists(callback) {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS patient (
            patientid INT(11) AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            DateOfBirth DATETIME NOT NULL
        ) ENGINE=InnoDB;
    `;

    connection.query(createTableQuery, (err) => {
        callback(err);
    });
    console.log('Checked or created patient table');
}

module.exports = {
    connection,
    ensurePatientTableExists
};
