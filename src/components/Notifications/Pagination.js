import Pagination from 'react-bootstrap/Pagination';

let active = 0;
let items = [];
for (let number = 1; number <= 3; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}

const paginationBasic = (
  <div>
    <Pagination size="lg">{items}</Pagination>
  </div>
);


    