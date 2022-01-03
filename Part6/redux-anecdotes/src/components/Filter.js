import React from 'react';
import { connect } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

function Filter(props) {
  const handleChange = (e) => {
    props.filterChange(e.target.value);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      Filter
      <input onChange={handleChange} />
    </div>
  );
}

const mapStateToProps = () => {};

const mapDispatchToProps = {
  filterChange,
};

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter);

export default ConnectedFilter;
