import React from 'react'
import Pagination from 'react-bootstrap/Pagination';

let active = 2;
let items = [];
for (let number = 1; number <= 10; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}


const Pagination1 = () => {


  return (
    <div>
        <Pagination size="sm">{items}</Pagination>
    </div>
  )
}

export default Pagination1