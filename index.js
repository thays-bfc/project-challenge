const express = require('express');
const server = express();
server.use(express.json());

/**
 * Project estructure 
 *  [
         {
          "id": "1",
          "title": "Project Name",
         "tasks": [ "Task Name" ]
         }
    ]
 */

const projects = [];

//------------------------------MIDDLEWARES---------------------------------
/**
 * Counts number of requests 
 *  before after every request
 */
server.use((req, res, next)=>{
    next();
    console.count("Number of requests");
});

/**
 * Checks if there is a project by param ID
 * Runs before every route that contains ID as parameter
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function checkProjectExists( req, res, next) {
    const { id } = req.params;
    const project = projects.find(p => p.id == id)

    if (!project) {
       return res.status(400).json({ error : "Project not found" });
    }

    req.project = project;

    const index = projects.findIndex(p => p.id == id);
    req.index = index;

    return next();
}
/**
 * Validades creation of new Project
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
function checkProjectRequest(req, res, next) {
    if (!req.body.id) {
       return res.status(400).json({ error : "Project id is required" });
    }
    if (!req.body.title) {
        res.status(400).json({ error : "Project title is required" });
    }
    return next();
}
//------------------------------ROUTES-----------------------------------
/**
 * Register new project
 *
 */
server.post('/projects',checkProjectRequest, ( req, res )=>{
    const { id, title } = req.body;

    const project = {
        id: id,
        title: title,
        tasks: []
    }

    projects.push(project);

    return res.json(projects);

})

/**
 * Find and return all projects
 */
server.get('/projects', ( req, res )=>{
    return res.json(projects);
})

/**
 * Find and return project by id
 */
server.get('/projects/:id', checkProjectExists, ( req, res )=>{
    return res.json(req.project);
})


/**
 * Updates project tittle by id
 */
server.put('/projects/:id', checkProjectExists, ( req, res )=>{
    const { title } = req.body;

    req.project.title = title;

    return res.json(projects);

})

/**
 * Deletes project by id
 */

server.delete('/projects/:id', checkProjectExists, ( req, res )=>{
    projects.splice(req.index,1);

    return res.send();
})

/**
 * Inserts new task into project by ID
 */
server.post('/projects/:id/tasks', checkProjectExists, ( req, res )=>{
    const { title } = req.body;

    req.project.tasks.push(title);

    return res.json(projects);

})

server.listen(3000);