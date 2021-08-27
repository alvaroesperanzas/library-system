# Library System

This is an application that manage a library.

# Dependencies

[Docker](https://www.docker.com/products/docker-engine). If you can run `docker run hello-world` successfully from your terminal, you're good to go.
If not, make sure docker is installed and it's running. Follow this instructions <el link que pusiste de docker> to install docker

# Quick Start
+ `./go build` Setup the project on your development machine.
+ `./go start` Start the application and it's dependencies.

You can check out all available commands if you run `./go help`.

# Usage
You can start the whole application by doing the following steps (from the top-level directory):

1. Start the application with `./go init && ./go start` in a terminal.
2. Go to [localhost:8000](http://localhost:8000/)
3. If you see an Encryption Key Not found error please run `./go setup-app`

# Functionalities
Inside the app you are able to create:
- Users
- Categories
- Books
In the Dashboard you are able to `Borrow a Book` choosing the book and the user, this book will be block to borrow until is deliver again.
In the Dashboard you also will be able to `Deliver a Book` just choosing the book (This list will only show the borrowed books).
In the Book details you will see the history of to whom was borrowed it and when.

# Technical Decisions
- The visual theme is from my own, not the design perse but I created the react components and css library.
- The go commands is an implementation I use in all my projects to run with bash and docker.
- I didn't create an authentication scheme since it was not specified (But I now how to implement it as well).
- 
# Tests

To run the tests just run this command:
```
./go test
````
and you will see all the test cases in terminal.
