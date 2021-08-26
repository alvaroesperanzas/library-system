import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Container from './layout/Container';
import Dashboard from './pages/dashboard/Index';

// Books
import ListBooks from './pages/books/List';
import CreateBook from './pages/books/Create';
import DetailBook from './pages/books/Detail';
import EditBook from './pages/books/Edit';

// Categories
import ListCategories from './pages/categories/List';
import CreateCategories from './pages/categories/Create';
import DetailCategory from './pages/categories/Detail';
import EditCategory from './pages/categories/Edit';

import ListUsers from './pages/users/List';
import CreateUser from './pages/users/Create';


function App() {
    return (
      <React.Fragment>
        <Router>
          <Container>
            <Switch>
              <Route exact={true} path="/" component={Dashboard} />
              <Route exact={true} path="/books" component={ListBooks} />
              <Route exact={true} path="/books/create" component={CreateBook} />
              <Route exact={true} path="/books/detail/:id" component={DetailBook} />
              <Route exact={true} path="/books/edit/:id" component={EditBook} />

              <Route exact={true} path="/categories" component={ListCategories} />
              <Route exact={true} path="/categories/create" component={CreateCategories} />
              <Route exact={true} path="/categories/detail/:id" component={DetailCategory} />
              <Route exact={true} path="/categories/edit/:id" component={EditCategory} />

              <Route exact={true} path="/users" component={ListUsers} />
              <Route exact={true} path="/users/create" component={CreateUser} />
            </Switch>
          </Container>
        </Router>
      </React.Fragment>
    );
}

export default App;

