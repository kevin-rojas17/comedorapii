const express = require("express")
const uri = 'mongodb+srv://kevinsastas:2wByfdFsn8Cz78IV@clustertest.klnzr7a.mongodb.net/?retryWrites=true&w=majority&appName=ClusterTest'

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use( express.json() )
const port = 8080
const { usuarioModel } = require('./models');
app.get('/', (req, res) => { res.send("Usuarios"); })

app.get('/usuario', async(req, res)=>{
  const usuario = await usuarioModel.find({});
  res.json( usuario );
});
app.get('/usuario/:nombreAdmin', async(req, res)=>{
  const person = await usuarioModel.find({nombreAdmin:req.params.nombreAdmin});
  res.json( person );
});
app.post('/usuario', async(req, res)=>{
  try {

    const nombreAdmin = req.body.nombreAdmin;
    const contrasena = req.body.contrasena;

    
    const person = new usuarioModel({ nombreAdmin,contrasenan});

    const data = await person.save();
    return res.status(201).json(data);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: ' server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

