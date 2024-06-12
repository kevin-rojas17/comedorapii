const express = require("express");
const mongoose = require('mongoose');
const { userModel } = require('./models');

const uri = 'mongodb+srv://kevinsastas:2wByfdFsn8Cz78IV@clustertest.klnzr7a.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTest';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

const app = express();
app.use(express.json());
const port = 8080;

// Ruta de prueba
app.get('/', (req, res) => {
  res.send("Usuarios");
});

// Obtener todos los usuarios
app.get('/usuario', async (req, res) => {
  try {
    const usuarios = await userModel.find({});
    res.json(usuarios);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Obtener usuario por nombre de administrador
app.get('/usuario/:nombreAdmin', async (req, res) => {
  try {
    const person = await userModel.find({ nombreAdmin: req.params.nombreAdmin });
    res.json(person);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Agregar un nuevo usuario
app.post('/usuario', async (req, res) => {
  try {
    const { nombreAdmin, contrasena } = req.body;
    const person = new userModel({ nombreAdmin, contrasena });
    const data = await person.save();
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

