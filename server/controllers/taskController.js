const ApiError = require("../error/ApiErrors");
const sequelize = require("../models/index");
const { QueryTypes } = require("sequelize");

class TaskController {
  async getAll(req, res, next) {
    try {
      let { limit, page } = req.query
      page = page || 1
      limit = limit || 9
      let offset = page * limit - limit

      const tasks = await sequelize.query(
        'SELECT * FROM "tasks" AS "task" LIMIT $1 OFFSET $2;',
        { 
          bind: [limit, offset],
          type: sequelize.QueryTypes.SELECT
         },
        
      )
      const [{ count }] = await sequelize.query(
        'SELECT COUNT(*) FROM "tasks";',
      { type: sequelize.QueryTypes.SELECT }
      )

      return res.status(200).json({
        count: Number(count),
        rows: tasks
      })

    } catch (err) {
      next(ApiError.internal(err.message))
    }
  }

  async getByProject(req, res, next) {
    try {
      const { project_id } = req.params;
      let { limit, page } = req.query;
      page = page || 1;
      limit = limit || 9;
      let offset = page * limit - limit;


    const tasks = await sequelize.query(
        'SELECT * FROM "tasks" AS "task" WHERE project_id = $1 LIMIT $2 OFFSET $3;',
        { 
          bind: [project_id, limit, offset],
          type: sequelize.QueryTypes.SELECT
         },
        
      )
      const [{ count }] = await sequelize.query(
        'SELECT COUNT(*) FROM "tasks" WHERE project_id = $1;',
      { 
         bind: [project_id ],
        type: sequelize.QueryTypes.SELECT 
      }
      )

      return res.status(200).json({
        count: Number(count),
        rows: tasks
      })
    } catch (err) {
      next(ApiError.internal(err.message));
    }
  }

  async getStatusCount(req, res, next) { 
    try{
      let { project_id, status } = req.query;
      let sql = `SELECT COUNT(*) AS count FROM tasks WHERE status = $1`;
      let bindParams = [status];
    
      if (project_id) {
        sql += ` AND project_id = $2`;
        bindParams.push(project_id);
      }
    
    const count = await sequelize.query(sql, { bind: bindParams });
    
      return res.status(200).json(count)
    } catch (err) {
      next(ApiError.internal(err.message))
    }
  }

  async create(req, res, next) {
    try {
      let {
        project_id,
        title,
        created_date,
        deadline,
        estimated_hours,
        priority,
        status,
      } = req.body;
      const newTask = await sequelize.query(
        `
                WITH project_check AS (
                    SELECT id FROM projects WHERE id = $1
                )
                INSERT INTO tasks (project_id, title, created_date, deadline, estimated_hours, priority, status)
                SELECT 
                    p.id, $2, $3, $4, $5, $6, $7
                FROM project_check p
                RETURNING id
                `,
        {
          bind: [
            project_id,
            title,
            created_date,
            deadline,
            estimated_hours,
            priority,
            status,
          ],
          type: QueryTypes.SELECT,
        },
      )
      if (newTask[0]) {
        return res.status(201).json(newTask[0])
      }
    } catch (err) {
      next(ApiError.internal(err.message))
    }
  }

  async update(req, res, next) {
    const {
      id,
      title,
      created_date,
      deadline,
      estimated_hours,
      priority,
      status,
    } = req.body;
    try {
      const updatedTask = await sequelize.query(
        `
                UPDATE tasks
                SET title = $2, created_date = $3, deadline = $4, estimated_hours = $5, priority = $6, status = $7
                WHERE id = $1;
                `,
        {
          bind: [
            id,
            title,
            created_date,
            deadline,
            estimated_hours,
            priority,
            status,
          ],
        },
      );
      if (updatedTask[1].rowCount === 1) {
        return res.status(201).json(updatedTask[1].rowCount)
      }
    } catch (err) {
      next(ApiError.internal(err.message));
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const count = await sequelize.query("DELETE FROM tasks WHERE id = $1", {
        bind: [id],
      });

      if (count[1].rowCount === 1) {
        return res.status(200).json(count[1].rowCount)
      }
    } catch (err) {
      next(ApiError.internal(err.message))
    }
  }
}

module.exports = new TaskController();
