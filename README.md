# project-challenge01
Simple node api using express
First challenge on Go Stack bootcam by Rocketseat

### Routes

- `POST /projects`: Register new project.

- `GET /projects`: Find and return all projects;

- `GET /projects/id`: Find and return project by id;

- `PUT /projects/:id`: Updates project tittle by id;

- `DELETE /projects/:id`: Deletes project by id;

- `POST /projects/:id/tasks`: Inserts new task into project by ID;

### Example

If you request `POST /projects` with body `{ id: 1, title: 'New project' }` and  `POST /projects/1/tasks` with body `{ title: 'New task' }`, project at id 1 must look like this:

```js
[
  {
    id: "1",
    title: "New project",
    tasks: ["New task"]
  }
];
```

### Middlewares

-  `checkProjectExists` - Checks if there is a project by param ID and runs before every route that contains ID as parameter;

-  `checkProjectRequest` - Validades body request for creation of new Project;

-   Request counter for every request print on console.

