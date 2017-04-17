/** @jsx createElement */
import {createElement, Component} from 'react';
import {Menu} from 'semantic-ui-react';
import paginate from 'simple-pagination';

export default class MenuExamplePagination extends Component {
  render() {
    const {currentPage, pageSize, totalCount, onPageChange} = this.props;

    const pagination = paginate(totalCount, pageSize, currentPage);
    const pages = Array.from({length: pagination.pageCount});

    // TODO: better boundries
    // const MAX_VISIBLE = 7;
    // pages = 9
    // 1 => 1 2 3 4 5 6 . . 9
    // 3 => 1 2 3 4 5 6 . . 9
    // 4 => 1 2 3 4 5 6 . . 9
    // 5 => 1 . 3 4 5 6 7 . 9
    // 6 => 1 . . 4 5 6 7 8 9
    // 7 => 1 . . 4 5 6 7 8 9

    return (
      <Menu pagination>
        {pages.map((page, idx) => (
          <Menu.Item
            key={idx}
            name={`${idx + 1}`}
            active={idx + 1 === pagination.currentPage}
            onClick={() => onPageChange(idx + 1)}
          />
        ))}

      </Menu>
    );
  }
}
