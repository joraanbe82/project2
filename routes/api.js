var express = require("express");
var router = express.Router();
let jwt = require("jsonwebtoken");
let mongo = require("mongodb");
var md5 = require("md5");

const secret = "mysecret";

//funcion para authenticar usuarios
router.post("/auth", (request, response) => {
  const query = global.dbo.collection("alumnos").find({
    email: request.body.m,
    pass: md5(request.body.p)
  });

  query.toArray().then(documents => {
    if (documents.length > 0) {
      var token = jwt.sign(
        {
          email: documents[0].email,
          isAdmin: documents[0].isAdmin ? true : false,
          id: documents[0]._id
        },
        secret,
        {
          expiresIn: 3600
        }
      );
      response.send(token);
    } else {
      response.status(400).send("Invalid credentials");
    }
  });
});

//funcion para devolver la info de la bdd
router.get("/users/:id?", (request, response) => {
  const id = request.params.id;

  if (id) {
    let alumno;
    global.dbo
      .collection("alumnos")
      .find(
        {
          _id: new mongo.ObjectID(id)
        },
        {
          projection: {
            _id: 0,
            first_name: 1,
            last_name: 1,
            birth_date: 1,
            nationality: 1,
            weight: 1,
            belt: 1,
            email: 1
          }
        }
      )
      .toArray()
      .then(documents => {
        alumno = documents[0];
       
        let estadisticas;
        global.dbo
          .collection("estadisticas")
          .find({ userId: { $in: [mongo.ObjectID(id)] } })
          .toArray()
          .then(documents => {
            estadisticas = documents[0];

            alumno.estadisticas = estadisticas;
            response.send(alumno);
            
          });
      });
  } else {
    global.dbo
      .collection("alumnos")
      .find(
        { isAdmin: false }, //solo muestra los alumnos
        {
          projection: {
            first_name: 1,
            last_name: 1,
            birth_date: 1,
            nationality: 1,
            weight: 1,
            belt: 1,
            email: 1
          }
        }
      )
      .toArray(function(err, result) {
        if (err) {
          throw err;
        } else {
          response.send(result);
          console.log(result);
        }
      });
  }
});

//funcion para añadir un alumno nuevo

router.post("/users", (request, response) => {
  if (
    request.body.first_name === "" ||
    request.body.last_name === "" ||
    request.body.birth_date === "" ||
    request.body.nationality == "" ||
    request.body.weight == "" ||
    request.body.belt == "" ||
    request.body.email == ""
  ) {
    response.status(400).send(); //si no estan todos los datos no se puede continuar
  } else {
    let myobj = {
      first_name: request.body.first_name, //el ultimo param tiene que ser el mismo que los de dentro del body en el fetch
      last_name: request.body.last_name,
      birth_date: request.body.birth_date,
      nationality: request.body.nationality,
      weight: request.body.weight,
      belt: request.body.belt,
      email: request.body.email,
      isAdmin: false,
      pass: md5("alumno")
    };
    global.dbo.collection("alumnos").insertOne(myobj, function(err, result) {
      if (err) throw err;

      let myStats = {
        userId: mongo.ObjectID(result.insertedId),
        Cortesia: request.body.Cortesia,
        Integridad: request.body.Integridad,
        Perseverancia: request.body.Perseverancia,
        Auto_Control: request.body.Auto_Control,
        Espiritu_Indomable: request.body.Espiritu_Indomable,
        Fuerza: request.body.Fuerza,
        Equilibrio: request.body.Equilibrio,
        Respiracion: request.body.Respiracion,
        Tecnica: request.body.Tecnica,
        Agilidad: request.body.Agilidad
      };

      global.dbo
        .collection("estadisticas")
        .insertOne(myStats, function(err, res) {
          if (err) throw err;
          response.status(201).send(res.ops[0]); //lo segundo hace que se muestre el documento nuevo
        });
    });
  }
});

// funcion para actualizar datos

router.put("/users/:id", (request, response) => {
  const id = request.params.id;
  const myquery = {
    _id: new mongo.ObjectID(id)
  };

  const obj = {}; // objeto vacio, si me llega algun dato nuevo lo cambio, sino no

  if (request.body.first_name !== "") {
    obj.first_name = request.body.first_name;
  }
  if (request.body.last_name !== "") {
    obj.last_name = request.body.last_name;
  }
  if (request.body.birth_date !== "") {
    obj.birth_date = request.body.birth_date;
  }
  if (request.body.nationality !== "") {
    obj.nationality = request.body.nationality;
  }
  if (request.body.weight !== "") {
    obj.weight = request.body.weight;
  }
  if (request.body.belt !== "") {
    obj.belt = request.body.belt;
  }
  if (request.body.email !== "") {
    obj.email = request.body.email;
  }

  console.log(request.body);

  const stats = {};

  if (request.body.Cortesia !== "") {
    stats.Cortesia = request.body.Cortesia;
  }

  if (request.body.Integridad !== "") {
    stats.Integridad = request.body.Integridad;
  }

  if (request.body.Perseverancia !== "") {
    stats.Perseverancia = request.body.Perseverancia;
  }

  if (request.body.Auto_Control !== "") {
    stats.Auto_Control = request.body.Auto_Control;
  }

  if (request.body.Espiritu_Indomable !== "") {
    stats.Espiritu_Indomable = request.body.Espiritu_Indomable;
  }

  if (request.body.Fuerza !== "") {
    stats.Fuerza = request.body.Fuerza;
  }

  if (request.body.Equilibrio !== "") {
    stats.Equilibrio = request.body.Equilibrio;
  }

  if (request.body.Respiracion !== "") {
    stats.Respiracion = request.body.Respiracion;
  }

  if (request.body.Tecnica !== "") {
    stats.Tecnica = request.body.Tecnica;
  }

  if (request.body.Agilidad !== "") {
    stats.Agilidad = request.body.Agilidad;
  }

  const newValues = {
    $set: obj
  };
  const newStatsValues = {
    $set: stats
  };

  global.dbo.collection("alumnos").updateOne(myquery, newValues);

  global.dbo
    .collection("estadisticas")
    .updateOne({ userId: mongo.ObjectID(id) }, newStatsValues);

  response.send();
});

// funcion para elimiar alumno

router.delete("/users/:id", (request, response) => {
  const id = request.params.id;
  const myquery = {
    _id: new mongo.ObjectID(id)
  };
  global.dbo.collection("alumnos").deleteOne(myquery);   
  
  global.dbo.collection("estadisticas").deleteOne({ userId: mongo.ObjectID(id) })
  if (err) throw err;
  response.send();
  console.log("1 document deleted");
});



module.exports = router;
