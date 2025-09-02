const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env'});
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('mongoDB conectado'))
.catch(err => console.error('Error de conexion:', err));

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
