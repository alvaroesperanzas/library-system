import React, { Component, useState } from 'react';
import {Link} from 'react-router-dom';
import _ from 'lodash';

const Thead = ({headers, isResponsive = false, hideLast = false, links = []}) => {
  const [isDropdownCollapse, setDropdownCollapse] = useState(true);
  return (
    <thead>
      <tr>
        {
          headers.map((header, i) =>
            <td
              style={isResponsive && i > 0 ? {display: 'none'} : null}
              key={i}
            >
              {header}
            </td>
          )
        }
        <td
          width="1"
          className="overflow"
        >
          {
            links.length > 0 ?
            (
              <div className="dropdown">
                <span onClick={() => {setDropdownCollapse(!isDropdownCollapse)}} className={ (!isDropdownCollapse)? 'selected icon-Menu dropdown-trigger':'icon-Menu dropdown-trigger'} />
                  { (!isDropdownCollapse)? (
                    <div>
                      <div onClick={() => {setDropdownCollapse(!isDropdownCollapse)}} className="dropdown-background"></div>
                      <div className="dropdown-content">
                        {
                          links
                        }
                      </div>
                    </div>
                    ):'' 
                  }
              </div>
            )
            : undefined
          }
        </td>
      </tr>
    </thead>
  );
};

const hasCustomField = (field, customFields) => _.filter(customFields, (c) => c.field === field);


const typeMapper = {
  link: ({element, field}) => `${field.initial}${field.fields.map(itemField => _.get(element, itemField, '')).join(field.separator)}`,
  vehiclesTickets: ({element, field}) => {
    const {tickets} = element;
    return tickets.map((t) => `${t.quantity} x ${t.vehicle.name_en}`).join(' / ')
  }
};

const Tbody = ({data, fields, link, customFields, isResponsive = false, hideLast = false, idField}) => (
  <tbody>
    {
      data.length > 0 ?
        data.map((element, index) => 
          <tr key={index}>
            {
              fields.map((field, i) => {
                const hasCustom =  hasCustomField(field, customFields);
                const customField = hasCustom[0];
                const value = _.get(element, field, '');
                const style = isResponsive && i > 0 ? {display: 'none'} : null;
                const compoundValue = typeof field == 'string' ?
                  value : ( typeMapper[field.type]({element, field}) );

                return _.isEmpty(customField) ?
                  (
                    <td
                      style={style}
                      key={i}
                      onClick={
                        typeof field == 'object' && field.onClick ?
                        field.onClick(compoundValue): () => {}
                      }
                    >
                      {compoundValue}
                    </td>
                  ) :
                  (
                    <td style={style} key={i}>
                      <customField.tag className={customField.className(value)}>
                        {compoundValue}
                      </customField.tag>
                    </td>
                  )
              }
              )
            }
            <td style={hideLast ? {display: 'none'} : null}>
              {
                link &&
                <Link
                  to={`${link}${idField ? _.get(element, idField, element.id) : element.id}`}
                  className="icon-Adelante"
                />
              }
            </td>
          </tr>
        )
      :
        <tr>
          <td colSpan={fields.length + 1}>No records found</td>
        </tr>
    }
  </tbody>
);

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isResponsive: false,
    };
    this.updateOnResize = this.updateOnResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateOnResize);
    this.updateOnResize();
  }
  
  updateOnResize() {
    const windowWidth = window.innerWidth;
    const {isResponsive} = this.state;
    if (windowWidth < 800 && !isResponsive) {
      this.setState({isResponsive: true});
    } else if (windowWidth > 800 && isResponsive) {
      this.setState({isResponsive: false});
    }
  }


  render() {
    const {isResponsive} = this.state;
    const {
      headers,
      data,
      fields,
      link = null,
      customFields = [],
      hideLastHeader,
      links = [],
      idField = null
    } = this.props;
    if (isResponsive) {
      return (
        <div className="table-wrapper">
          <div className="scrollable">
            <table className="catalogo responsive">
              <Thead
                headers={headers}
                links={links}
              />
              <Tbody
                data={data}
                fields={fields}
                link={link}
                customFields={customFields}
                idField={idField}
              />
            </table>
          </div>
          <div className="pinned">
            <table className="catalogo">
              <Thead headers={headers}
                isResponsive={isResponsive}
                hideLast={true}
                links={links}
              />
              <Tbody
                data={data}
                fields={fields}
                link={link}
                customFields={customFields}
                isResponsive={isResponsive}
                hideLast={true}
                idField={idField}
              />
            </table>
          </div>
        </div>
      );
    }

    return (
      <table className="catalogo responsive">
        <Thead
          headers={headers}
          hideLast={hideLastHeader}
          links={links}
        />
        <Tbody
          data={data}
          fields={fields}
          link={link}
          customFields={customFields}
          idField={idField}
        />
      </table>
    );
  }
}
