const express = require('express');
const app = express();
const Joi = require('joi'); 
app.use(express.json());

const Avengers = [
    { Name: 'Captain America', id: 1 },
    { Name: 'Thor', id: 2 },
    { Name: 'Hulk', id: 3 },
    { Name: 'Iron Man', id: 4}
]
 
app.get('/', (req, res) => {
    res.send('Welcome to Avengers REST API!');
});

app.get('/api/Avengers', (req, res) => {
    res.send(Avengers);
});

app.get('/api/echo/:id', (req, res) => {
    console.log(`${req.protocol}://${req.hostname}:${req.socket.localPort}${req.url}`) 
    res.send(`Hello ${req.params.id}`);
});

app.get('/api/delayedPing/:ms', (req, res) => {
    console.log(`${req.protocol}://${req.hostname}:${req.socket.localPort}${req.url}`)  
    let ms=parseInt(req.params.ms);
    setTimeout(() => {
        res.send(`OK`);
    }, ms); 
});

app.get('/api/httpStatus/:status', (req, res) => {
    console.log(`${req.protocol}://${req.hostname}:${req.socket.localPort}${req.url}`)  
    const status =  parseInt(req.params.status);
    res.status(status).send('<h2>Status</h2>');
});
 

app.get('/api/Avengers/:id', (req, res) => {
    const avenger = Avengers.find(c => c.id === parseInt(req.params.id));
    if (!avenger) res.status(404).send('<h2>Not here!</h2>');
    res.send(avenger);
});
 

app.get('/api/health', (req, res) => { 
    res.send("OK");
});
app.post('/api/Avengers', (req, res) => {
    const { error } = validateAvenger(req.body);
    if (error) {
        res.status(400).send(error.details[0].message)
        return;
    }
    const avenger = {
        id: Avengers.length + 1,
        Name: req.body.Name
    };
    Avengers.push(avenger);
    res.send(avenger);
});

//UPDATE Request Handler
app.put('/api/Avengers/:id', (req, res) => {
    const avenger = Avengers.find(c => c.id === parseInt(req.params.id));
    if (!avenger) res.status(404).send('<h2 style="font-family: Malgun Gothic; color: darkred;">Not Found!! </h2>');

    const { error } = validateAvenger(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    avenger.Name = req.body.Name;
    res.send(avenger);
});
 
app.delete('/api/Avengers/:id', (req, res) => {

    const avenger = Avengers.find(c => c.id === parseInt(req.params.id));
    if (!avenger) res.status(404).send('<h2> Not Found!! </h2>');

    const index = Avengers.indexOf(avenger);
    Avengers.splice(index, 1);

    res.send(avenger);
});

function validateAvenger(avenger) {
    const schema = {
        Name: Joi.string().min(3).required()
    };
    return Joi.validate(avenger, schema);

}
async function delay(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));