import mongoose from "mongoose";

const chisteSchema = new mongoose.Schema({
  // El id lo genera automáticamente mongodb

  texto: {
    type: String,
    required: [true, "Por favor ingresa el texto del chiste"],
    trim: true, // Elimina espacios innecesarios para consistencia
    maxLength: 2000, // Chistes tan largos no dan risa
  },

  autor: {
    type: String,
    default: "Se perdió en el Ávila como Led", // No es un campo obligatorio, pero tiene default
    trim: true,
  },

  puntaje: {
    type: Number,
    required: [true, "Por favor dale un puntaje del 1 al 10 al chiste"],
    min: [1, "El puntaje debe ser mínimo 1"],
    max: [10, "El puntaje debe ser como máximo 10"],
  },

  categoria: {
    type: String,
    required: [true, "Por favor indica la categoría del chiste"],
    enum: {
      values: ["dad joke", "humor negro", "chistoso", "malo"], // Las pongo en minúscula porque es case sensitive la validación
      message:
        "Categoría inválida, debe ser: Dad joke, Humor Negro, Chistoso o Malo",
    },
  },
});

const Chiste = mongoose.model("Chiste", chisteSchema);

export default Chiste;
