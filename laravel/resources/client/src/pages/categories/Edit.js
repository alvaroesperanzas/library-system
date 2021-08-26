import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

// Services
import CategoriesService from '../../services/CategoriesService'; 
import BooksService from '../../services/BooksService'; 

// Components
import {createCategoriesValidator} from '../../validators';
import Toast from '../../presentationals/Toast';
import Loading from '../../presentationals/Loading';
import CategoriesForm from './Form';

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showToast: false,
      message: '',
      type: '',
      isLoading: false,
      category: null,
      books: [],
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
    const category = await CategoriesService.get(id);
    const books = await BooksService.list();
    this.setState({
      category,
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
      await CategoriesService.edit(values);
      resetForm();
      this.setState({
        showToast: true,
        message: 'The category was saved successfully',
        type: 'success',
        isLoading: false,
      });
      this.props.history.push(`/categories/detail/${values.id}`);
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
      category,
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
            <h4 className="left">Edit Category</h4>
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
            {
              category ?
              <CategoriesForm
                initialValues={category}
                onValidate={createCategoriesValidator}
                onSubmit={this.onSubmit}
                items={books}
              /> : undefined
            }
          </div>
        </div>
      </section>
    )
  }
}

export default withRouter(Edit);