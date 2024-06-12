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
app.get('/comedor/:cuposComedor', async(req, res)=>{
  const comedor = await comedorModel.find({cuposComedor:req.params.cuposComedor});
  try {
    res.json( comedor[0] );
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/comedor', async(req, res)=>{
  try {
    const {nombre, apeliido, numeroTelefono, nombreAdmin} = req.body;

    let usuarioComedor=null;
    usuarioComedor = await userService.get(nombreAdmin);
    if(! usuarioComedor )  throw ("Usuario no Registrado");

    const comedor = new internadoModel({ nombre, apeliido, numeroTelefono, nombreAdmin});
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

