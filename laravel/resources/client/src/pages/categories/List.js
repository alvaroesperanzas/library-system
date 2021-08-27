import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Pagination from "react-js-pagination";

// Services
import CategoriesService from '../../services/CategoriesService';

// Components
import Table from '../../presentationals/Table';
import Loading from '../../presentationals/Loading';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      page: 1,
      count: 0,
      isLoading: true
    };
  }

  async componentDidMount() {
    const {page} = this.state;
    const result = await CategoriesService.list(page);
    this.setState({
      categories: result.data,
      count: result.total,
      isLoading: false
    });
  }

  async handlePageChange(page) {
    this.setState({isLoading: true});
    const result = await CategoriesService.list(page);
    this.setState({
      categories: result.data,
      count: result.total,
      page,
      isLoading: false
    });
  }

  render() {
    const {
      categories,
      page,
      count,
      isLoading,
    } = this.state;
    return (
      <section className="vistas">
        {isLoading && <Loading absolute={true} />}
        <div className="filtros">
          <Link
            to="/categories/create"
            className="boton right"
          >
            Add a Category
          </Link>
          <div className="clear" />
        </div>
        <div className="table-container">
          <Table
            headers={[
              'Name',
              'Description',
            ]}
            hideLastHeader={true}
            data={categories}
            fields={[
              'name',
              'description',
            ]}
            link={'/categories/detail/'}
            links={[
              <Link key={1} to="/categories/create">Add Category</Link>
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