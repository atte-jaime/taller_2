const MongoClient = require('mongodb').MongoClient,
    express = require('express'),
    engines = require('consolidate');

var app = express(),
    db;

app.engine('hbs', engines.handlebars);

app.set('views', './views');
app.set('view engine', 'hbs');
app.use(express.static('public'));

// Conectarse a Base de Datos
MongoClient.connect('mongodb://localhost:27017', function (err, client) {
    if (err) throw err;

    db = client.db('productos');

    // Iniciar servidor
    app.listen(1234);
});

app.get('/', (req, res) => {

    var prod = db.collection('datos')
        .find();

    if (req.query.marca)
        prod.filter({
            //marca: req.query.marca
        });

    if (req.query.modelo)
        prod.filter({
           // modelo: req.query.modelo
        });

    prod.toArray((err, result) => {
        console.log('hola servidor')
        res.render('index', {
            productos: result
        });
    })
});
