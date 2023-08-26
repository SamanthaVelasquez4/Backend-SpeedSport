import mongoose from "mongoose";

export class Database {

  constructor() {
    // Cadena de conexión
    mongoose.connect(`mongodb+srv://samvel200355:samvel200355@cluster0.tmaxqwh.mongodb.net/SpeedSport`)
    .then(()=>{
      console.log('Se conectó a Mongo');
    }).catch((error) => {
      console.error('Ocurrió un error al conectarse', error);
    });
  }
}