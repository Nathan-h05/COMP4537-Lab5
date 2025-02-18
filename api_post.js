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

    req.on('end', () => {
        try {
            const jsonData = JSON.parse(data);

            // Ensure the SQL query is an INSERT statement
            const { sql } = jsonData;
            if (!sql || sql.trim().toUpperCase().indexOf('INSERT') !== 0) {
                res.writeHead(403, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Only SELECT or INSERT queries are allowed' }));
                return;
            }

            // Execute the INSERT query
            connection.query(sql, (err, result) => {
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
            res.end(JSON.stringify({ message: 'Invalid JSON format', error }));
        }
    });
};

