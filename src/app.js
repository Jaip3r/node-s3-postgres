import express from 'express';

// Contexto principal de la aplicación
const app = express();

// Middlewares
app.use(express.json());


app.get('/', (req, res) => {
    res.json({ message: "Hola mundo" });
});


// Exportamos la aplicación
export default app;