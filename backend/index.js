const express = require('express');
const app = express();

const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json);

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    `Servidor corriendo en el puerto ${PORT}`
});
