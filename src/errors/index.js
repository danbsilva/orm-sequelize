class NotFoundError extends Error {
    constructor(entity) {
        super(`${entity} não encontrado`);
        this.name = 'NotFoundError';
        this.idError = 0;
    }
}

class DataNotProvidedError extends Error {
    constructor() {
        super('Não foram fornecidos dados');
        this.name = 'DataNotProvidedError';
        this.idError = 1;
    }
}

module.exports = {
    NotFoundError: NotFoundError,
    DataNotProvidedError: DataNotProvidedError
}