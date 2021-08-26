import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Pagination from "react-js-pagination";
import _ from 'lodash';

// Services
import BooksService from '../../services/BooksService';

// Components
import Table from '../../presentationals/Table';
import Loading from '../../presentationals/Loading';
import InputFilter from '../../presentationals/InputFilter';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      page: 1,
      count: 0,
      isLoading: true,
      filters: {
        name: '',
        author: '',
      }
    };

    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onFilter = this.onFilter.bind(this);
  }

  async componentDidMount() {
    const {page} = this.state;
    const result = await BooksService.list(page);
    this.setState({
      books: result.data,
      count: result.total,
      isLoading: false
    });
  }

  async handlePageChange(page) {
    this.setState({isLoading: true});
    const {filters} = this.state;
    const filtered = _.pickBy(filters);
    const result = await BooksService.list(page, filtered);
    this.setState({
      books: result.data,
      count: result.total,
      page,
      isLoading: false
    });
  }

  async onFilter() {
    this.setState({isLoading: true});
    const {filters, page} = this.state;
    const filtered = _.pickBy(filters);
    const result = await BooksService.list(page, filtered);
    this.setState({
      books: result.data,
      count: result.total,
      page,
      isLoading: false
    });
  }

  onChangeFilter(filterBy) {
    return (e) => {
      const {filters} = this.state;
      this.setState({
        filters: {
          ...filters,
          [filterBy]: e.target.value
        }
      });
    }
  }

  render() {
    const {
      books,
      page,
      count,
      isLoading,
      filters,
    } = this.state;

    return (
      <section className="vistas">
        {isLoading && <Loading absolute={true} />}
        <div className="filtros">
          <InputFilter
            name="Name"
            value={filters['name']}
            onChange={this.onChangeFilter('name')}
            size="ancho20"
          />
          <InputFilter
            name="Author"
            value={filters['author']}
            onChange={this.onChangeFilter('author')}
            size="ancho20"
          />
          <button
              className="boton right"
              onClick={this.onFilter}
            >
              Filter
            </button>
        </div>
        <div className="table-container">
          <Table
            headers={[
              'Name',
              'Author',
              'Publication Date'
            ]}
            hideLastHeader={true}
            data={books}
            fields={[
              'name',
              'author',
              'publication_date'
            ]}
            link={'/books/detail/'}
            links={[
              <Link key={1} to="/books/create">Add Book</Link>
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