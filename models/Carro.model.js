const mongoose = require('mongoose');
const { Schema } = mongoose;


const CarrosSchema = new Schema({
  marca: {
    type: String,
    required: true,
    trim: true,
  },
  modelo: {
    type: String,
    required: true,
    trim: true,
  },
  ano_fabricacao: {
    type: Number,
    required: true,
    min: 1886,
  },
  cor: {
    type: String,
    required: true,
    trim: true,
  },
  tipo: {
    type: String,
    required: true,
    enum: ['Hatch', 'Sedan', 'SUV', 'Picape', 'Conversível'],
  },
  quilometragem: {
    type: Number,
    required: true,
    min: 0,
  },
  num_portas: {
    type: Number,
    required: true,
    min: 2,
    max: 5, 
  },
  imagem: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.*\.(jpg|jpeg|png|gif)$/.test(v)
      },
      message: (props) => `${props.value} não é uma URL válida para uma imagem.`,
    },
  },
});


CarrosSchema.methods.excluirCarro = async function () {
  try {
    await this.deleteOne()
    return { message: `Carro ${this.modelo} excluído com sucesso.` }
  } catch (error) {
    throw new Error(`Erro ao excluir o carro: ${error.message}`)
  }
};


const Carro = mongoose.model('Carros', CarrosSchema)

module.exports = Carro;
