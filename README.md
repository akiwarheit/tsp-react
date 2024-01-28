# Todos List + Leaflet Map

This is the frontend of the solution to the travelling salesman problem.

Task
The goal is to develop an API-driven application that tracks Todo items, each of which has an associated location. Imagine an app that might be used by a gardener to plan each day’s services for multiple customers.

The user interface should 
- [x] Be a website written in React (and any other supporting libraries you prefer ) OR a mobile app written in React Native or Flutter
- [x] Allow the creation of Todo items with: a title; a state of “todo”, “scheduled” and “done” and a location
- [x] Allow the editing of Todo items
- [x] Allow the deletion of Todo items
- [x] Allow viewing the items as a list of items, or on a map
- [ ] Allow planning the shortest route between items marked as “scheduled” (solving the traveling salesman problem using whichever algorithm you prefer) and display that shortest route
- [x] Allow signing in and out

The API backend should
- [x] Be written in .NET (if the role you are applying for is not as a backend engineer, you may use Node.js, Python or Ruby on Rails instead)
- [ ] Provide a CRUD API for Todo items for use in the user interface described above
- [ ] Persist those Todo items in a database
- [ ] Persist them in the Event Sourcing pattern
- [ ] Allow planning the shortest route between items marked as “scheduled” (solving the traveling salesman problem using whichever algorithm you prefer) and returning that route 
- [ ] Require authentication against a user database before accessing, and support multiple users, each with their own set of Todo items

The hosting infrastructure should
- [x] Be cloud based, on AWS or Azure
- [ ] Be created with Terraform
- [ ] Be hosted using Kubernetes, and deployed to using Helm

The application should be production-ready. Not every task required to be production-ready is listed. For instance, there is no explicit task to create tests, but tests are required for production-ready applications. (https://12factor.net/)

Production Readiness:

- [x] Codebase: One codebase tracked in revision control, many deploys
- [x] Dependencies: Explicitly declare and isolate dependencies
- [x] Config: Store config in the environment
- [x] Backing services: Treat backing services as attached resources
- [x] Build, release, run: Strictly separate build and run stages
- [x] Processes: Execute the app as one or more stateless processes
- [] Port binding: Export services via port binding
- [] Concurrency: Scale out via the process model
- [] Disposability: Maximize robustness with fast startup and graceful shutdown
- [x] Dev/prod parity: Keep development, staging, and production as similar as possible
- [] Logs: Treat logs as event streams
- [] Admin processes: Run admin/management tasks as one-off processes