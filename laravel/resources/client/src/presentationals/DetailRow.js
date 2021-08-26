import React from 'react';
import {get} from 'lodash';

const DetailRow = props => (
  <div className="table">
    <label>{props.title}</label>
    <div className="table">
      <label>{props.text ? props.text : get(props.item, props.field, '')}</label>
    </div>
  </div>
);

export default DetailRow;
