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

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      message: '',
      type: '',
      isLoading: false
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.removeToast = this.removeToast.bind(this);
  }

  removeToast() {
    this.setState({showToast: false});
  }

  async onSubmit(values, {resetForm}) {
    this.setState({isLoading: true});
    try {
      await BooksService.add({
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
      isLoading
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
            <h4 className="left">Add Book</h4>
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
            <BookForm
              initialValues={{
              name: '',
              author: '',
              publication_date: ''
            }}
            onValidate={createBookValidator}
            onSubmit={this.onSubmit}
            />
          </div>
        </div>
      </section>
    )
  }
}

export default withRouter(Create);