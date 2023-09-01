const db = require('../models');


class PessoaController{
    
    async list(req, res) {
        try {
            const pessoas = await db.Pessoas.findAll();
            return res.status(200).json(pessoas);
        } catch(error) {
            return res.status(500).json({error: error.message});
        }
    }

    async searchById(req, res) {
        try {

            const { id } = req.params;
            const pessoa = await db.Pessoas.findOne({ 
                where: { 
                    id: Number(id) 
                } 
            });
            return res.status(200).json(pessoa);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const pessoa = await db.Pessoas.create(req.body);
            return res.status(200).json(pessoa);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const [updated] = await db.Pessoas.update(req.body, {
                where: { id: Number(id) }
            });

            if (updated) {
                const updatedPessoa = await db.Pessoas.findOne({ where: { id: Number(id) } });
                return res.status(200).json(updatedPessoa);
            }
            throw new Error({ message: "Pessoa não encontrada" });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const deleted = await db.Pessoas.destroy({
                where: { id: Number(id) }
            });

            if (deleted) {
                return res.status(204).send({ message: "Pessoa deletada" });
            }
            throw new Error({ message: "Pessoa não encontrada" });
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
}

module.exports = new PessoaController();