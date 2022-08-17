import Pagination from 'react-bootstrap/Pagination';

let active = 1;
let items = [];
for (let number = 1; number <= 5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}

export const PaginationBasic = (
  <div>
    <Pagination size="lg">{items}</Pagination>
  </div>
);


    