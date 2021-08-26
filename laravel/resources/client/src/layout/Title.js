import React from 'react';
import moment from 'moment';
import {EXTEND_DATE_FORMAT} from '../helpers/constants';

const Title = (props) => (
  <div className="template-titulo">
    <hgroup>
      <h2>Welcome to your system</h2>
      <h3>{moment().format(EXTEND_DATE_FORMAT)}</h3>
    </hgroup>
    <hgroup>
      <h3>{`${props.name} ${props.lastname}`}</h3>
    </hgroup>
  </div>
);
export default Title;
