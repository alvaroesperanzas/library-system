import React, { Component } from 'react';

let timeoutId;

class Toast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
    };
    this.removeToast = this.removeToast.bind(this);
  }

  componentDidMount() {
    // timeoutId = setTimeout(this.removeToast, 4000);
  }

  componentDidUpdate(prevProps) {
    // if (this.props.message !== prevProps.message) {
    //   clearTimeout(timeoutId);
    //   timeoutId = setTimeout(this.removeToast, 4000);
    // }
  }

  componentWillUnmount() {
    // clearTimeout(timeoutId);
  }

  removeToast() {
    this.props.clearToast();
    // this.setState({ opacity: 0 });
    // timeoutId = setTimeout(() => {
    //   this.props.clearToast();
    // }, 500);
  }

  render() {
    const {message, type = 'success' } = this.props;
    return (
      <div className={`toast ${type}`}>
        <div />
        <div>{message}</div>
        <div onClick={this.removeToast} className="icon-x">&#10005;</div>
      </div>
    );
  }
}

export default Toast;