import React, { ReactElement, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  GroupingState,
  IntegratedFiltering,
  IntegratedGrouping,
  IntegratedPaging,
  IntegratedSorting,
  PagingState,
  SearchState,
  SortingState,
  Grouping,
} from '@devexpress/dx-react-grid';
import {
  ColumnChooser,
  DragDropProvider,
  Grid,
  GroupingPanel,
  PagingPanel,
  SearchPanel,
  TableColumnReordering,
  TableColumnVisibility,
  TableGroupRow,
  TableHeaderRow,
  Toolbar,
  VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';

import { Data } from 'Components/Admin';

const useStyles = makeStyles(() => ({
  tableContainer: {
    height: '100%',
  },
}));

interface Column {
  name: string;
  title: string;
}
interface ColumnExtension {
  columnName: string;
  width: number;
}

interface EnhnacedTableProps {
  data: Data[];
}

export default function EnhnacedTable(props: EnhnacedTableProps): ReactElement {
  const { data } = props;

  const [columnOrder, setColumnOrder] = useState<string[]>();
  const [columns] = useState<Column[]>([
    { name: 'id', title: 'ID' },
    { name: 'status', title: 'Status' },
    { name: 'comment', title: 'Comment' },
  ]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [grouping, setGrouping] = useState<Grouping[]>();
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageSizes] = useState<number[]>([5, 10, 15, 20, 0]);
  const [tableColumnExtensions] = useState<ColumnExtension[]>([
    { columnName: 'comment', width: 400 },
  ]);

  function changeColumnOrder(o: string[]): void {
    setColumnOrder(o);
  }

  function changeGrouping(g: Grouping[]): void {
    setGrouping(g);
  }

  function changeCurrentPage(p: number): void {
    setCurrentPage(p);
  }

  function changePageSize(ps: number): void {
    setPageSize(ps);
  }

  const classes = useStyles();
  return (
    <div className={classes.tableContainer}>
      {data ? (
        <Grid rows={data} columns={columns}>
          <DragDropProvider />
          <SortingState
            defaultSorting={[{ columnName: 'id', direction: 'asc' }]}
          />
          <GroupingState
            grouping={grouping}
            onGroupingChange={changeGrouping}
          />
          <SearchState />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={changeCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={changePageSize}
          />
          <IntegratedGrouping />
          <IntegratedSorting />
          <IntegratedFiltering />
          <IntegratedPaging />
          <VirtualTable
            // height="auto"
            columnExtensions={tableColumnExtensions}
          />
          <TableGroupRow />
          <TableHeaderRow showSortingControls />
          <TableColumnReordering
            order={columnOrder}
            onOrderChange={changeColumnOrder}
          />

          <TableColumnVisibility />
          <Toolbar />
          <SearchPanel />
          <ColumnChooser />

          <GroupingPanel showGroupingControls showSortingControls />
          <PagingPanel pageSizes={pageSizes} />
        </Grid>
      ) : (
        <CircularProgress className="progress" size={50} />
      )}
    </div>
  );
}
