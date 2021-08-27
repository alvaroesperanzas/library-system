import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Pagination from "react-js-pagination";

// Services
import UsersService from '../../services/UsersService';

// Components
import Table from '../../presentationals/Table';
import Loading from '../../presentationals/Loading';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      page: 1,
      count: 0,
      isLoading: true
    };
  }

  async componentDidMount() {
    const {page} = this.state;
    const result = await UsersService.list(page);
    this.setState({
      users: result.data,
      count: result.total,
      isLoading: false
    });
  }

  async handlePageChange(page) {
    this.setState({isLoading: true});
    const result = await UsersService.list(page);
    this.setState({
      users: result.data,
      count: result.total,
      page,
      isLoading: false
    });
  }

  render() {
    const {
      users,
      page,
      count,
      isLoading,
    } = this.state;
    return (
      <section className="vistas">
        {isLoading && <Loading absolute={true} />}
        <div className="filtros">
          <Link
            to="/users/create"
            className="boton right"
          >
            Add a User
          </Link>
          <div className="clear" />
        </div>
        <div className="table-container">
          <Table
            headers={[
              'Name',
              'Email',
            ]}
            hideLastHeader={true}
            data={users}
            fields={[
              'name',
              'email',
            ]}
            links={[
              <Link key={1} to="/users/create">Add User</Link>
            ]}
          />
        </div>
        <nav className="paginado">
          <Pagination
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
          />
        </nav>
      </section>
    );
  }
}