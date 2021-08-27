import React, { Component } from 'react';
import Pagination from "react-js-pagination";

// Services
import BooksService from '../../services/BooksService';
import UsersService from '../../services/UsersService';

// Components
import BorrowBookForm from './BorrowBookForm';
import DeliverBookForm from './DeliverBookForm';
import Toast from '../../presentationals/Toast';
import Loading from '../../presentationals/Loading';
import Table from '../../presentationals/Table';
import Modal from '../../presentationals/Modal';

import {
  borrowBookValidator,
  deliverBookValidator,
} from '../../validators';

export default class Dasboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      message: '',
      type: '',
      isLoading: true,
      books: [],
      users: [],
      borrowed: [],
      page: 1,
      count: 0,
      showModal: false,
      isBorrowModal: true
    };

    this.onBorrowSubmit = this.onBorrowSubmit.bind(this);
    this.onDeliverSubmit = this.onDeliverSubmit.bind(this);
    this.removeToast = this.removeToast.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  async componentDidMount() {
    await this.fetchData();
  }

  async fetchData() {
    const {page} = this.state;
    const [
      users,
      books,
      {data: borrowed, total}
    ] = await Promise.all([
      UsersService.list(),
      BooksService.available(),
      BooksService.borrowed(page)
    ]);

    this.setState({
      books,
      users,
      borrowed,
      isLoading: false,
      count: total
    });
  }

  async onBorrowSubmit({book, user}, {resetForm}) {
    this.setState({isLoading: true});
    const booksUpdated = await BooksService.borrow(book.id, user.id);
    await this.fetchData();
    this.setState({
      isLoading: false,
      showToast: true,
      message: 'The book was borrowed successfully',
      type: 'success',
      books: booksUpdated,
    });
    this.onCloseModal();
    resetForm();
  }

  async onDeliverSubmit({book}, {resetForm}) {
    this.setState({isLoading: true});
    const booksUpdated = await BooksService.deliver(book.record.id);
    await this.fetchData();
    this.setState({
      isLoading: false,
      showToast: true,
      message: 'The book was delivered successfully',
      type: 'success',
      books: booksUpdated,
    });
    this.onCloseModal();
    resetForm();
  }

  removeToast() {
    this.setState({showToast: false});
  }

  onCloseModal() {
    this.setState({showModal: false});
  }

  async handlePageChange(page) {
    this.setState({isLoading: true});
    const result = await BooksService.borrowed(page);
    this.setState({
      borrowed: result.data,
      count: result.total,
      page,
      isLoading: false
    });
  }

  render() {
    const {
      books,
      users,
      message,
      type,
      showToast,
      isLoading,
      borrowed,
      page,
      count,
      showModal,
      isBorrowModal,
    } = this.state;
    return (
      <section className="vistas">
        {showToast &&
          <Toast
            message={message}
            type={type}
            clearToast={this.removeToast}
          />
        }
        {isLoading && <Loading absolute={true} />}
        {
          showModal ?
            <Modal
              onClose={this.onCloseModal}
            >
              {
                isBorrowModal ?
                  <div>
                    <h4>Borrow a book</h4>
                    <BorrowBookForm
                      onValidate={borrowBookValidator}
                      onSubmit={this.onBorrowSubmit}
                      books={books}
                      users={users}
                    />
                  </div>
                : <div>
                    <h4>Deliver a book</h4>
                      <div>
                        <DeliverBookForm
                          onValidate={deliverBookValidator}
                          onSubmit={this.onDeliverSubmit}
                          books={books.filter(b => b.record)}
                          users={users}
                        />
                      </div>
                  </div>
              }
            </Modal>
            : undefined
        }
        <div>
          <h4 className="left">Pending books to deliver</h4>
          <div
            className="right"
          >
            <button
              className="boton"
              onClick={() => {this.setState({showModal: true, isBorrowModal: true})}}
            >
              Borrow a Book
            </button>
            <button
              className="boton"
              onClick={() => {this.setState({showModal: true, isBorrowModal: false})}}
            >
              Deliver a Book
            </button>
          </div>
          <div style={{clear: 'both'}} />
        </div>
        <div className="dashboard-component">
          <Table
             headers={[
              'User',
              'Book',
              'Borrowed At'
            ]}
            hideLastHeader={true}
            data={borrowed}
            fields={[
              'user.name',
              'book.name',
              'borrowed_at'
            ]}
            links={[
            ]}
          />
          <nav className="paginado">
            <Pagination
              activePage={page}
              itemsCountPerPage={10}
              totalItemsCount={count}
              pageRangeDisplayed={5}
              onChange={this.handlePageChange.bind(this)}
            />
          </nav>
        </div>
      </section>
    )
  }
}
