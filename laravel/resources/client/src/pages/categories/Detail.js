import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';

// Services
import CategoryService from '../../services/CategoriesService';

// Components
import Loading from '../../presentationals/Loading';
import DetailRow from '../../presentationals/DetailRow';
import Toast from '../../presentationals/Toast';
import Table from '../../presentationals/Table';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
      showToast: false,
      isLoading: true,
      message: '',
      type: '',
    };

    this.fetchData = this.fetchData.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
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
    const category = await CategoryService.get(id);
    this.setState({
      category,
      isLoading: false,
    });
  }

  async deleteCategory() {
    const {id} = this.props.match.params;
    this.setState({ isLoading: true });
    const result = await CategoryService.delete(id);
    if(result.deleted_at) {
      this.setState({
        showToast: true,
        message: 'The category was deleted successfully',
        type: 'success',
      });
      setTimeout(()=> {
        this.removeToast();
        this.props.history.push('/categories');
      }, 3000);
    }
  }

  removeToast() {
    this.setState({showToast: false});
  }

  render() {
    const {
      isLoading,
      showToast,
      category,
      message,
      type,
    } = this.state;
  
    return (
      <div className="vista">
        {isLoading && <Loading />}
        {showToast &&
          <Toast
            message={message}
            type={type}
            clearToast={this.removeToast}
          />
        }
        <div className="">
          <h4 style={{float: 'left'}}>Category</h4>
          <div style={{float: 'right'}}>
            <Link
              to="/categories"
              className="boton mode_link"
            >
              BACK
            </Link>
          </div>
          <div style={{clear: 'both'}}></div>
        </div>
        <table className="conceptos">
          <tbody>
            <tr>
              <td>
                <div className="contenedor-totales">
                  <DetailRow
                    title="Name"
                    text={category.name}
                  />
                  <DetailRow
                    title="Description"
                    text={category.description}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <h3 >Books</h3>
        {
          category.books ?
          <div className="table-container">
            <Table
              headers={[
                'Name',
                'Author',
              ]}
              hideLastHeader={true}
              data={category.books}
              fields={[
                'name',
                'author',
              ]}
            />
          </div>
          : undefined
        }
        <div className="center padding-space">
          <Link
            to={`/categories/edit/${category.id}`}
            className="boton buttons-space"
          >
            EDIT
          </Link>
          <button
            className="boton buttons-space"
            onClick={this.deleteCategory}
          >
            DELETE
          </button>
        </div>
      </div>
    )
  }
};

export default withRouter(Detail);
