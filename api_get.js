const connection = require('./db'); // Import the MySQL connection

exports.get = (req, res) => {
    let path = req.url;
    const prefix = "/COMP4537/labs/5/api/v1/sql/";

    // Remove trailing slashes and spaces
    path = path.replace(/\/+$/, '').trim();

    // Check if the request path starts with the expected prefix
    if (!path.startsWith(prefix)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid API endpoint' }));
        return;
    }

    // Extract and decode the SQL query from the URL
    let sqlQuery = decodeURIComponent(path.substring(prefix.length));

    // Ensure only SELECT queries are allowed
    const trimmedQuery = sqlQuery.trim().toUpperCase();
    if (!trimmedQuery.startsWith('SELECT')) {
        res.writeHead(403, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Only SELECT queries are allowed' }));
        return;
    }

    // Execute the SELECT query
    connection.query(sqlQuery, (err, results) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error fetching data', error: err }));
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Data fetched successfully', data: results }));
    });
};


