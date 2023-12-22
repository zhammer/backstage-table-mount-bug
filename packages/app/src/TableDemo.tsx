import { Table, TableColumn } from '@backstage/core-components';
import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

type UpdatingRow = {
  id: string;
  timesUpdated: number;
};

const MountCheck = () => {
  const [mountedAt] = useState(new Date());
  return <Typography variant="body1">{mountedAt.toTimeString()}</Typography>;
};

const columns: TableColumn<UpdatingRow>[] = [
  {
    title: 'id',
    field: 'id',
  },
  {
    title: 'times updated',
    field: 'timesUpdated',
  },
  {
    title: 'row last mounted',
    render: MountCheck,
  },
];

export const TableDemo = () => {
  const [data, setData] = useState<UpdatingRow[]>([
    {
      id: 'row1',
      timesUpdated: 0,
    },
    {
      id: 'row2',
      timesUpdated: 0,
    },
  ]);
  useEffect(() => {
    const interval = setInterval(() => {
      setData(rows =>
        rows.map(row => ({
          id: row.id,
          timesUpdated: row.timesUpdated + 1,
        })),
      );
    }, 1e3);
    return () => clearInterval(interval);
  }, [data]);
  return (
    <div>
      <Typography variant="h2">
        Without <code>emptyContent=</code>
      </Typography>
      <Table columns={columns} data={data} />
      <Typography variant="h2">
        With <code>emptyContent=</code>
      </Typography>
      <Table emptyContent={<div>empty</div>} columns={columns} data={data} />
    </div>
  );
};
