const Router = require('express');
const router = Router();
const PessoaController = require('../controllers/PessoaController');

router
    .get('/pessoas', PessoaController.list)
    .post('/pessoas', PessoaController.create)
    .get('/pessoas/:id', PessoaController.searchById)
    .put('/pessoas/:id', PessoaController.update)
    .delete('/pessoas/:id', PessoaController.delete);

module.exports = router;