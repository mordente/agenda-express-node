const mongoose = require('mongoose');
const validator = require('validator');

const ContatoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sobrenome: { type: String, required: false, default: ''},
  email: { type: String, required: false, default: ''},
  telefone: { type: String, required: false, default: ''},
  criadoEm: { type: Date, default: Date.now}
});

const ContatoModel = mongoose.model('Contato', ContatoSchema);

class Contato {
  constructor(body){
    this.body = body;
    this.errors = [];
    this.contato = null;
  }

  async register() {
    this.valida();
    if(this.errors.length > 0) return;

    this.contato = await ContatoModel.create(this.body);
  }

  valida() {
    this.cleanUp();
    //Checa se o nome é valido
    if(!this.body.name) this.errors.push('Você precisa inserir um nome.');
    //Checa se o email é valido
    if(this.body.email && !validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');
    //Checa se email ou telefone foram preenchidos
    if(!this.body.email && !this.body.telefone) {
      this.errors.push('Você precisa especificar pelo menos uma forma de contato.')
    }
    
  }
  async edit(id) {
    if(typeof id !== 'string') return;
    this.valida();
    if(this.errors.length > 0) return;

    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true})
    console.log(this.contato);

  }

  static async delete(id) {
    if(typeof id !== 'string') return;
    this.contato = await ContatoModel.findByIdAndDelete(id)
  }

  static async buscaPorId(id) {
    if(typeof id !== 'string') return;
    const user = await ContatoModel.findById(id);
    return user;
  }

  cleanUp() {
    for(const key in this.body){
      if(typeof this.body[key] !== 'string'){
        this.body[key] = '';
      }
    }

    this.body = {
      name: this.body.name,
      sobrenome: this.body.sobrenome,
      email: this.body.email,
      telefone: this.body.telefone
    }
  }

}



module.exports = {
  Contato: Contato,
  ContatoModel: ContatoModel
}
