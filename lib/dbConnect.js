import mongoose from 'mongoose';

const DB_URI = process.env.DB_URI

// Funcion para validar que este definida la variable de entorno URI_MONGO
if(!DB_URI){
    throw new Error(
        'Por favor define la variable de entorno URI_MONGO en el archivo .env'
    )
}

/* Global se usa aquí para mantener una conexión en caché a través de recargas en caliente
* en desarrollo. Esto evita que las conexiones crezcan exponencialmente.
* durante el uso de la ruta API.
*/
let cached = global.mongoose

if(!cached){
    cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect(){
    // Si la conexión ya está establecida, reutilícela. Asi evitamos crear nuevas conexiones
    if(cached.conn){
        return cached.conn
    }
    
    // Si no hay promesa pendiente, crea una nueva conexión. De esta forma evitamos crear nuevas conexiones
    if (!cached.promise) {
        const opts = {
          bufferCommands: false, 
        }
        // Conectamos a MongoDB usando la variable de entorno DB_URI y las opciones definidas en opts
        cached.promise = mongoose.connect(DB_URI, opts).then((mongoose) => {
            return mongoose
          })
    }

    try {
    // Comprobamos que la conexión a MongoDB esté activa
    cached.conn = await cached.promise
    console.log('Conectado a MongoDB')
    } catch (e) {
    // Si hay un error, limpiamos la conexión y la promesa
    cached.promise = null
    throw e
    }
    return cached.conn
}

export default dbConnect