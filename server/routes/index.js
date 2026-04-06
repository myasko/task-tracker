const Router = require('express')
const router = new Router()

const projectRouter = require('./projectRouter')
const taskRouter = require('./taskRouter')

router.use('/project', projectRouter)
router.use('/task', taskRouter)

module.exports = router