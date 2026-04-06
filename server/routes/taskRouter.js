const Router = require('express')
const router = new Router()
const taskController = require('../controllers/taskController')

router.get('/', taskController.getAll)
router.get('/status', taskController.getStatusCount)
router.get('/:project_id', taskController.getByProject)
router.post('/', taskController.create)
router.put('/', taskController.update)
router.delete('/:id',taskController.delete)

module.exports = router