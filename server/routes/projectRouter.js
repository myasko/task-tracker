const Router = require('express')
const router = new Router()
const projectController = require('../controllers/projectController')

router.get('/', projectController.getAll)
router.get('/:id', projectController.getOne)
router.post('/', projectController.create)
router.put('/', projectController.update)
router.delete('/:id', projectController.delete)

module.exports = router