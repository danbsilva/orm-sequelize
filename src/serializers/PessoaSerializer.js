const { Serializer } = require(".");

class PessoaSerializer extends Serializer {
    constructor(contentType, extraFields) {
        super();
        this.contentType = contentType;
        this.publicFields = [
            'id',
            'nome',
            'ativo',
        ].concat(extraFields || []);
        this.tagSingular = 'pessoa';
        this.tagPlural = 'pessoas';
      }
}

module.exports = PessoaSerializer;