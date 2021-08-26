import React, { Component } from 'react';
import moment from 'moment';

class Footer extends Component {
  render(){
    return(
      <footer className="template-footer">
    		&copy; {moment().format('Y')} Library System.
    	</footer>
    );
  }
}

export default Footer;
