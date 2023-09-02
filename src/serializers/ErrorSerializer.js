const { Serializer } = require(".");

class ErrorSerializer  extends Serializer {
    constructor(contentType, extraFields) {
        super();
        this.contentType = contentType;
        this.publicFields = [
          'idError',
          'message'
        ].concat(extraFields || []);
        this.tagSingular = 'error';
        this.tagPlural = 'errors';
      }
}

module.exports = ErrorSerializer;