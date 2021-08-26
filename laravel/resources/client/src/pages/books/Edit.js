import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';

// Services
import BooksService from '../../services/BooksService'; 
import {DATE_FORMAT} from '../../helpers/constants';

// Components
import {createBookValidator} from '../../validators';
import Toast from '../../presentationals/Toast';
import Loading from '../../presentationals/Loading';
import BookForm from './Form';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      message: '',
      type: '',
      isLoading: false,
      book: null
    }

    this.fetchData = this.fetchData.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.removeToast = this.removeToast.bind(this);
  }

  async componentDidMount() {
    const {id} = this.props.match.params;
    await this.fetchData(id);
  }

  async fetchData(id) {
    this.setState({
      isLoading: true,
    });
    const book = await BooksService.get(id);
    this.setState({
      book,
      isLoading: false,
    });
  }

  formatBookResponse(book) {
    return {
      ...book,
      publication_date: moment(book.publication_date).toDate()
    }
  }

  removeToast() {
    this.setState({showToast: false});
  }

  async onSubmit(values, {resetForm}) {
    this.setState({isLoading: true});
    try {
      await BooksService.edit({
        ...values,
        publication_date: moment(values.publication_date).format(DATE_FORMAT)
      });
      resetForm();
      this.setState({
        showToast: true,
        message: 'The book was saved successfully',
        type: 'success',
        isLoading: false,
      });
      this.props.history.push(`/books/detail/${values.id}`);
    } catch (e) {
      this.setState({
        showToast: true,
        message: _.get(e, 'body.message', '') || e.message,
        type: 'error',
        isLoading: false,
      });
    }
  }

  render() {
    const {
      showToast,
      message,
      type,
      isLoading,
      book,
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
        <div style={{position:'relative'}}>
          <div>
            <h4 className="left">Edit Book</h4>
            <div className="right">
              <Link
                className="boton mode_link"
                to="/books"
              >
                BACK
              </Link>
            </div>
          </div>
          <div>
            {
              book ?
              <BookForm
                initialValues={this.formatBookResponse(book)}
                onValidate={createBookValidator}
                onSubmit={this.onSubmit}
              /> : undefined
            }
          </div>
        </div>
      </section>
    )
  }
}

export default withRouter(Edit);