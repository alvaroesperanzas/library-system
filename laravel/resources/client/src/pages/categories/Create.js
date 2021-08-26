import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import moment from 'moment';

// Services
import BooksService from '../../services/BooksService';
import CategoriesService from '../../services/CategoriesService';
import {DATE_FORMAT} from '../../helpers/constants';

// Components
import {createCategoriesValidator} from '../../validators';
import Toast from '../../presentationals/Toast';
import Loading from '../../presentationals/Loading';
import CategoriesForm from './Form';

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      message: '',
      type: '',
      isLoading: false,
      books: [],
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.removeToast = this.removeToast.bind(this);
  }

  async componentDidMount() {
    this.setState({isLoading: true});
    const books = await BooksService.list();
    this.setState({
      isLoading: false,
      books,
    });
  }

  removeToast() {
    this.setState({showToast: false});
  }

  async onSubmit(values, {resetForm}) {
    this.setState({isLoading: true});
    try {
      await CategoriesService.add(values);
      resetForm();
      this.setState({
        showToast: true,
        message: 'The category was saved successfully',
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
      isLoading,
      books,
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
            <h4 className="left">Add Category</h4>
            <div className="right">
              <Link
                className="boton mode_link"
                to="/categories"
              >
                BACK
              </Link>
            </div>
          </div>
          <div>
            <CategoriesForm
              initialValues={{
              name: '',
              description: '',
              selectedBook: '',
              books: []
            }}
            onValidate={createCategoriesValidator}
            onSubmit={this.onSubmit}
            items={books}
            />
          </div>
        </div>
      </section>
    )
  }
}

export default withRouter(Create);