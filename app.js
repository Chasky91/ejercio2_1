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
//actualizar
app.put('/persona',async function(req, res) {
  //recuperamos  e legajo
  const legajo = req.body.legajo 

  try{
    const  existe = await pool.execute(
      "SELECT * FROM Personas WHERE legajo = ?",
    [legajo])
    console.log(existe[0])

    if(existe[0].length  === 0 ){
      return res.status(404).json({
        mensaje:"El  legajo  no  existe"
      })
    }
    const actualizar = pool.execute(
      "UPDATE Personas SET nombre = ?, fecha_ingreso = ? WHERE legajo= ?",
      [] 
    )
  }catch(err){

  }
  //recuperar id legajo 
  //comprabar  que  el id  existe
  //catualizar  el  registro
  //si  es  correcto,  actualizacion  correcta
  //Si  incorrecta ,  ni  se  pudo  actulizar  el usuario
})

//http://localhost:3000 "/personas"
app.post('/persona', async function(req,res){
  //console.log(req.body, "Datos  de la  persona")
  const  nombre =   req.body.nombre
  const  fechaIngreso = req.body.fechaIngreso
  const legajo = req.body.legajo
  
  console.log(nombre, fechaIngreso, "Datos  de la  persona")

  try{
    const resultado = await pool.execute(
            `INSERT INTO Personas     (legajo, nombre, fecha_ingreso) 
            VALUES (?, ?,?)`,
            [ legajo, nombre, fechaIngreso]) //${}
      res.json({
        nombrejson: nombre,
      })
  } catch(err){
    console.log(err)
    return res.status(503).json({
      "mensaje":"Error al  intentar crear  el usuario"
    })
  }
  //const resultado = await pool.execute(
           // `INSERT INTO Personas     (legajo, nombre, fecha_ingreso) VALUES (?, ?,?)`,
           // [ legajo, nombre, fechaIngreso]) //${}
  
  
  console.log(resultado, "Resultado  de la  insercion")
  
})



app.listen(port, () => {
  console.log("Servidor andando por el  puerto", port);
})