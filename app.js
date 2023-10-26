const express = require('express');
const mysql = require('mysql');
const app = express();
const puerto = process.env.PUERTO || 3000;

app.use(express.json());

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'obras_literarias'
});

conexion.connect(error => {
    if (error) {
        throw error;
    }
});

// Metodo GET Para traer todos los registros de la base de datos
app.get('/api/obras', (req, res) => {
    conexion.query('SELECT * FROM obras', (error, filas) => {
        if (error) {
            throw error;
        }
        res.json(filas);
    });
});

// Metodo GET Para traer un registro dependiendo de su ID
app.get('/api/obras/:id', (req, res) => {
    conexion.query('SELECT * FROM obras WHERE id=?', [req.params.id], (error, fila) => {
        if (error) {
            throw error;
        } else {
            res.json(fila);
        }
    });
});

// Metodo de insercción de nuevos datos POST
app.post('/api/obras', (req, res) => {
    let data = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        genero: req.body.genero,
        idioma: req.body.idioma,
        isbn: req.body.isbn
    };

    let sql = "INSERT INTO obras SET ?";

    conexion.query(sql, data, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.send(results);
        }
    });
});


app.listen(puerto, () => {
    console.log("Servidor OK en puerto: " + puerto);
});
