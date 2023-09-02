const db = require('../models');
const PessoaSerializer = require('../serializers/PessoaSerializer');
const { NotFoundError, DataNotProvidedError } = require('../errors');

class PessoaController{
    
    async list(req, res, next) {
        try {
            const pessoas = await db.Pessoas.findAll({ raw: true});
            return res.status(200).send(
                new PessoaSerializer(res.getHeader('Content-Type')).serialize(pessoas)
            );
        } catch(error) {
            next(error);
        }
    }

    async searchById(req, res, next) {
        try {

            const extraFields = ['email', 'role', 'createdAt', 'updatedAt'];

            const { id } = req.params;
            const pessoa = await db.Pessoas.findOne({ 
                where: { 
                    id: Number(id) 
                },
                raw: true
            });
            if (!pessoa) {
                throw new NotFoundError('Pessoa');
            }
            return res.status(200).send(
                new PessoaSerializer(res.getHeader('Content-Type'), extraFields).serialize(pessoa)
            )
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            const pessoa = req.body;
            if (Object.keys(pessoa).length === 0) {
                throw new DataNotProvidedError();
            }

            const newPessoa = await db.Pessoas.create(pessoa);
            const newPessoaJson = newPessoa.toJSON();
            return res.status(201).send(
                new PessoaSerializer(res.getHeader('Content-Type')).serialize(newPessoaJson)
            );
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const extraFields = ['email', 'role', 'createdAt', 'updatedAt'];

            const { id } = req.params;
            const newInfos = req.body;
            
            if (Object.keys(newInfos).length === 0) {
                throw new DataNotProvidedError();
            }

            const pessoa = await db.Pessoas.findOne({ 
                where: { 
                    id: Number(id) 
                } 
            });
            if (!pessoa) {
                throw new NotFoundError('Pessoa');
            }   

            const pessoaUpdated = await db.Pessoas.update(newInfos,{ 
                where: { 
                    id: Number(id) 
                },
                returning: true,
                raw: true
            });
            const pessoaUpdatedJson = pessoaUpdated[1][0];
            return res.status(200).send(
                new PessoaSerializer(res.getHeader('Content-Type'), extraFields).serialize(pessoaUpdatedJson)
            );
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const pessoa = await db.Pessoas.findOne({ where: { id: Number(id) } });
            if (!pessoa) {
                throw new NotFoundError('Pessoa');
            }

            const deleted = await db.Pessoas.destroy({
                where: { 
                    id: Number(id) 
                }
            });
            return res.status(204).end();
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new PessoaController();