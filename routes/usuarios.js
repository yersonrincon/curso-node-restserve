
const {Router} = require('express');
const { usuariosGet, usuariosDelete,usuariosPatch, usuariosPost, usuariosPut } = require('../controllers/usuarios');
const router= Router();

router.get('/',usuariosGet);
//usuariosDelete,usuariosPost,usuariosPut
router.delete('/',usuariosDelete);

router.put('/',usuariosGet);
router.post('/',usuariosPost);
router.put('/:id',usuariosPut);
router.patch('/',usuariosPatch);

    router.get('/',  (req, res) =>{
        res.json({
         
            msg:'get API'
        });
    });
    router.put('/',  (req, res) =>{
        res.json({
         
            msg:'put API'
        });
    });
    router.post('/',  (req, res) =>{
        res.json({
         
            msg:'post API'
        });
    });
    router.delete('/',  (req, res) =>{
        res.json({
         
            msg:'delete API'
        });
    });
    
      module.exports =  router;

