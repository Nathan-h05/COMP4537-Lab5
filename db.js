const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
    host: 'localhost', // or your specific host
    user: 'root', // your MySQL username
    password: 'password', // your MySQL password
    database: 'lab5_db' // the database you want to connect to
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Connected to the database!');
    
    // Check if 'patient' table exists and create it if not
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS patient (
            patientid INT(11) AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            DateOfBirth DATETIME NOT NULL
        ) ENGINE=InnoDB;
    `;

    connection.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Error creating table: ', err);
        } else {
            console.log('Checked or created patient table');
        }
    });
});

module.exports = connection; // Export the connection to use in other parts of your app
