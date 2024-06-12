const express = require("express")
const userService = require("./services/userService");
const uri = 'mongodb+srv://kevinsastas:2wByfdFsn8Cz78IV@clustertest.klnzr7a.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTest'

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use( express.json() )
const port = 8080
const { comedorModel } = require('./models');
app.get('/', (req, res) => { res.send("se registro correctamente!!"); })

app.get('/comedor', async(req, res)=>{
  const comedor = await comedorModel.find({});
  res.json( comedor );
});
// Obtener un registro de comedor por nombreAdmin
app.get('/comedor/:nombreAdmin', async (req, res) => {
  try {
    const comedor = await comedorModel.findOne({ nombreAdmin: req.params.nombreAdmin });
    if (!comedor) {
      return res.status(404).json({ message: 'Comedor not found' });
    }
    res.json(comedor);
  } catch (error) {
    console.error('Error fetching comedor:', error);
    res.status(500).json({ message: ' server error' });
  }
});
app.post('/comedor', async(req, res)=>{
  try {
    const {nombre, apeliido, numeroTelefono, nombreAdmin} = req.body;

    let usuarioComedor=null;
    usuarioComedor = await userService.get(nombreAdmin);
    if(! usuarioComedor )  throw ("Usuario no Registrado");

    const comedor = new comedorModel({ nombre, apeliido, numeroTelefono, nombreAdmin});
    const data = await comedor.save();
    return res.status(201).json(data);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'No se pudo registrar' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

