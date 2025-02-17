const connection = require('./db'); // Import the MySQL connection

exports.post = (req, res) => {
    let path = req.url;
    const prefix = "/COMP4537/labs/5/api/v1/sql";

    // Remove trailing slashes and spaces
    path = path.replace(/\/+$/, '').trim();

    // Check if the request path starts with the expected prefix
    if (!path.startsWith(prefix)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid API endpoint' }));
        return;
    }

    let data = '';
    
    // Collect the data from the request body
    req.on('data', chunk => {
        data += chunk;
    });

    // When all data has been received
    req.on('end', () => {
        try {
            const jsonData = JSON.parse(data);
            // Insert data into the 'patient' table
            const { name, DateOfBirth } = jsonData;
            const insertQuery = `INSERT INTO patient (name, DateOfBirth) VALUES (?, ?)`;
            connection.query(insertQuery, [name, DateOfBirth], (err, result) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Error inserting data', error: err }));
                    return;
                }
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Data inserted successfully', patientid: result.insertId }));
            });
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Invalid data format', error }));
        }
    });
};

