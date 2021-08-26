import React, { Component } from 'react';
import Sidebar from 'react-sidebar';
import { withRouter } from 'react-router-dom';

// Components
import Header from './Header';
import CustomSidebar from './CustomSidebar';
import Footer from './Footer';
import Title from './Title';

// Providers
import UserProvider from '../providers/UserProvider';

const USER = {
  name: 'Librarian',
  lastname: 'Book'
};

class Container extends Component {
  constructor(props){
    super(props);

    this.state = {
      isSidebarOpen: false,
      user: {},
      isLoading: true,
    };

    this.onSetSidebar = this.onSetSidebar.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  async componentDidMount(){
    
  }

  componentWillReceiveProps(nextProps) {
    const { location } = this.props;
    const currentPath = location.pathname;
    const newPath = nextProps.location.pathname;

    if (currentPath !== newPath) {
      this.onSetSidebar(false);
    }
  }

  onSetSidebar(isOpen) {
    this.setState({isSidebarOpen: isOpen});
  }

  toggleSidebar(){
    const toggle = !this.state.isSidebarOpen;
    this.setState({isSidebarOpen: toggle});
  }

  render() {
    const {
      isSidebarOpen,
    } = this.state;
    const styles = {
      sidebar:{
        top: 60,
        width:360,
        backgroundColor: '#2c3e50',
        color: 'rgba(255,255,255,0.54)',
        textAlign:'left',
        fontSize:'1.2em'
      }
    };

    return (
      <Sidebar
        styles={styles}
        sidebar={CustomSidebar}
        open={isSidebarOpen}
        onSetOpen={this.onSetSidebar}
      >
        <React.Fragment>
          <UserProvider.Provider
            value={{
              user: USER,
            }}
          >
            <Header
              toggleSidebar={this.toggleSidebar}
            />
              <div className="template-contenido">
                <Title
                  {...USER}
                />
                {this.props.children}
              </div>
            <Footer />
          </UserProvider.Provider>
        </React.Fragment>
      </Sidebar>
    )
  }
}

export default withRouter(Container);