import React, { useEffect, useState } from 'react'
import './DataPaginator.css';
import TablePagination from '@mui/material/TablePagination';

export interface DataPaginatorProps {
  datas: any[]
  Component: any,
  additionalComponentProps?: any,
  NoResultComponent?: any
}

export const DataPaginator = ({ datas, Component, NoResultComponent, additionalComponentProps = {} }: DataPaginatorProps): JSX.Element => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filteredDatas, setFilteredDatas] = useState<any>([]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteringDatas = () => {
    if (datas.length > 0) {
      setFilteredDatas([
        ...datas.slice((page) * rowsPerPage, (page + 1) * rowsPerPage)
      ])
    }
  }

  useEffect(() => {
    filteringDatas();
  }, [datas])

  useEffect(() => {
    filteringDatas();
  }, [page, rowsPerPage])

  return (
    <>
      <div>
        {datas.length > 0 && filteredDatas?.map((item: any, key: number) => {
          return (
            <div className="mb-[10px] xl:mb-0">
              <Component isSecondary={key % 2 ? true : false} {...item} {...additionalComponentProps} />
            </div>
          )
        })}
        {datas.length === 0 && (<NoResultComponent />)}
      </div>
      {filteredDatas.length > 0 && (
        <div>
          <TablePagination
            component="div"
            count={datas.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10, 25, 50, 100]}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelDisplayedRows={function defaultLabelDisplayedRows({ from, to, count }) {
              return `${from}–${to} / ${count !== -1 ? count : `more than ${to}`}`;
            }}
            sx={{
              color: 'white',
              ' .Mui-disabled': {
                color: "grey !important",
              },
              ' .MuiTablePagination-selectIcon': {
                color: "white",
              }
            }}
            labelRowsPerPage={'Találat per oldal'}
          />
        </div>
      )}

    </>
  )
}