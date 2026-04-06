const ApiError = require('../error/ApiErrors')
const { models } = require('../models/index')
const  project = models.project

class ProjectController {

    async getAll(req, res, next) {
        try {
            let { limit, page } = req.query
            page = page || 1
            limit = limit || 9
            let offset = page * limit - limit

            const projects = await project.findAndCountAll({limit, offset}) 

             if (projects.rows.length === 0) return res.status(200).json()

            return res.status(200).json(projects);
            
        } catch (err) {
            next(ApiError.internal(err.message))
        }
    }

    async getOne(req, res, next) {
         try {
            const { id } = req.params

            const projectById = await project.findByPk(id)

            return res.status(200).json(projectById);
            
        } catch (err) {
            next(ApiError.internal(err.message))
        }       
    }

    async create(req, res, next) {
        try {
            let { name, description, start_date, deadline, priority, status } = req.body
            const newProject = await project.create({ name, description, start_date, deadline, priority, status });

            return res.status(201).json(newProject);

        } catch (err) {
            next(ApiError.internal(err.message))
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.body
            if (req.body.id === id) {
		        await project.update(req.body, {
			        where: {
				        id: id
                    }
		        });
                return res.status(201).json(id);
            } 
        } catch (err) {
           next(ApiError.internal(err.message))
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            const count = await project.destroy({
                onDelete: 'CASCADE',
                where: {
                    id: id
                }
            })
            return res.status(200).json(count[1].rowCount)
            
        } catch (err) {
             next(ApiError.internal(err.message))
        }
    }
}

module.exports = new ProjectController()

