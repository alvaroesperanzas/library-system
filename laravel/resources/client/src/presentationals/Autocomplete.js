import React from 'react';
import Autocomplete from 'react-autocomplete';
import _ from 'lodash';

const Dropdown = (props) => {
  const validClassName = (parentProps) => {
    const {form, errors, field} = parentProps;
    const {touched} = form;
    const {name} = field;
    if (touched[name] && !errors[name]) {
      return 'valid';
    } else if (touched[name] && errors[name]) {
      return 'invalid';
    }

    return '';
  }

  const onRenderItem = (item, isHighlighted) => (
    <div
      className="item"
      key={item.id}
      style={{ background: isHighlighted ? 'lightgray' : 'white' }}
    >
      {item.name}
    </div>
  );

  const shouldRenderItem = (item, value) => {
    return item.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
  }

  const getMenuStyles = () => {
    return {
      borderRadius: '3px',
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 12px',
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '2px 0px',
      fontSize: '90%',
      position: 'fixed',
      overflow: 'auto',
      maxHeight: '50%',
      zIndex: '1',
    };
  };

  const className = validClassName(props);

  return (
    <div className={`custom-autocomplete ${className}`}>
      <Autocomplete
        getItemValue={item => item.name}
        items={props.items}
        renderItem={onRenderItem}
        value={_.get(props, 'field.value.name', '')}
        shouldItemRender={shouldRenderItem}
        onChange={props.onChange}
        onSelect={props.onSelect}
        renderMenu={(items, value, style) =>
          (
            <div style={{ ...style, ...getMenuStyles() }}>
              {items}
            </div>
          )
        }
      />
    </div>
  );
};

export default Dropdown;