import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import moment from 'moment';

// Services
import BooksService from '../../services/BooksService';
import { EXTEND_DATE_FORMAT, DATE_FORMAT } from '../../helpers/constants';

// Components
import Loading from '../../presentationals/Loading';
import DetailRow from '../../presentationals/DetailRow';
import Toast from '../../presentationals/Toast';

class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
      showToast: false,
      isLoading: true,
      message: '',
      type: '',
    };

    this.fetchData = this.fetchData.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
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

  async deleteBook() {
    const {id} = this.props.match.params;
    this.setState({ isLoading: true });
    const result = await BooksService.delete(id);
    if(result.deleted_at) {
      this.setState({
        showToast: true,
        message: 'The book was deleted successfully',
        type: 'success',
      });
      setTimeout(()=> {
        this.removeToast();
        this.props.history.push('/books');
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
      book,
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
          <h4 style={{float: 'left'}}>Book</h4>
          <div style={{float: 'right'}}>
            <Link
              to="/books"
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
                    text={book.name}
                  />
                  <DetailRow
                    title="Author"
                    text={book.author}
                  />
                  <DetailRow
                    title="Publication Date"
                    text={moment(book.publication_date).format(EXTEND_DATE_FORMAT)}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="center padding-space">
          <Link
            to={`/books/edit/${book.id}`}
            className="boton buttons-space"
          >
            EDIT
          </Link>
          <button
            className="boton buttons-space"
            onClick={this.deleteBook}
          >
            DELETE
          </button>
        </div>
      </div>
    )
  }
};

export default withRouter(Detail);
