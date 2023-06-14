import mongoose from "mongoose";


const SuplidorSchema = new mongoose.Schema({
    nombre:{
        type: String,
        required: [true, "El nombre es requerido"],
    },
    direccion:{
        type: String,
        required: [true, "La direccion es requerida"],
    },
    rnc: {
        type: String,
        required: [true, "El RNC es requerido"],
    },
    codigo:{
        type: String,
        required: [true, "El codigo es requerido"],
    },
    ciudad:{
        type: String,
        required: [true, "La ciudad es requerida"],
    }

}); 

export default mongoose.models.Suplidor || mongoose.model('Suplidor', SuplidorSchema);