import express from 'express'
import pool from './configuracion.db.js'

const app = express()
const port = 3000
app.use(express.json())


/*app.get('/:idhastag',  function(req, res){

  const idhastag = req.params.idhastag
  console.log(idhastag, "Hashtag  a  buscar")
  res.send('Hashtag  a  buscar: ' + idhastag)
  
})*/

app.get('/personas', async function(req,res){

    const respuesta = await pool.query('SELECT * FROM Personas')
    const listado = respuesta[0]

    res.status(200).json(listado)
})

//http://localhost:3000 "/personas"
app.post('/persona', async function(req,res){
  //console.log(req.body, "Datos  de la  persona")
  const  nombre =   req.body.nombre
  const  fechaIngreso = req.body.fechaIngreso
  const legajo = req.body.legajo
  
  console.log(nombre, fechaIngreso, "Datos  de la  persona")
  const resultado = await pool.execute(
            `INSERT INTO Personas     (legajo, nombre, fecha_ingreso) VALUES (?, ?,?)`,
            [ legajo, nombre, fechaIngreso]) //${}
             
  console.log(resultado, "Resultado  de la  insercion")
  res.json({
    nombrejson: nombre,
  })
})



app.listen(port, () => {
  console.log("Servidor andando por el  puerto", port);
})