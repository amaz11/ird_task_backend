const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors')
const app = express();
const port = 3000;

// Connect to SQLite database
const db = new sqlite3.Database('dua_main.sqlite', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())

// Define route to fetch posts along with associated users
app.get('/', (req, res) => {
    res.status(200).json("Success")
})
app.get('/category', (req, res) => {
    db.all('SELECT * FROM category', (err, rows) => {
        if (err) {
            console.error('Error executing query:', err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows); // Send the retrieved data as JSON response
        }
    })
});

app.get('/sub_category', (req, res) => {
    db.all('SELECT * FROM sub_category', (err, rows) => {
        if (err) {
            console.error('Error executing query:', err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(rows); // Send the retrieved data as JSON response
        }
    })
});

app.get('/:category/dua', (req, res) => {
    const { category } = req.params
    db.all(`SELECT dua.*, category.* FROM dua JOIN category ON dua.cat_id = category.cat_id WHERE dua.cat_id = ${category}`, (err, rows) => {
        if (err) {
            console.error('Error executing query:', err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.json({ data: rows, }); // Send the retrieved data as JSON response
        }
    })
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});