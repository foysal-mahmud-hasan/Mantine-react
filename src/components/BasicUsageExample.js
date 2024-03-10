'use client';

import styles from './BasicUsageExample.module.css';
import { Box, Group, ActionIcon } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


import { DataTable } from 'mantine-datatable';
//import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import companies from './companies.json';
import '@mantine/core/styles.css';

const PAGE_SIZES = [3, 5, 7, 11, 15];

/* const customPaginationStyles = {
  display: 'flex',
  justifyContent: 'flex-end !important', // Align items to the right
}; */

export default function BasicUsageExample() {
  const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  const [page, setPage] = useState(1);
  const [records, setRecords] = useState(companies.slice(0, pageSize));

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords(companies.slice(from, to));
  }, [page, pageSize]);

  return (
    <DataTable
      height={300}
      withTableBorder
      borderRadius="sm"
      shadow="sm"
      withColumnBorders
      striped
      highlightOnHover
      horizontalSpacing="xs"
      verticalSpacing="xs"
      fz="sm"
      verticalAlign="center"
      //  override default text color for light and dark themes
      c={{ dark: '#dbc7a0', light: '#55350d' }}
      //  override default background color for light and dark themes
      backgroundColor={{ dark: '#232b25', light: '#f0f7f1' }}
      borderColor="#40c057" //  override default border color
      rowBorderColor="#fab005" //  override default row border color
      paginationActiveBackgroundColor="#40c057" //  override default pagination active background color
      records={records}
      columns={[
        { accessor: 'name', },
        { accessor: 'missionStatement', },
        { accessor: 'streetAddress', },
        { accessor: 'city', },
        { accessor: 'state', },
        { accessor: 'contact', },
        {
          accessor: 'actions',
          title: <Box mr={6}>Row actions</Box>,
          textAlign: 'right',
          render: (company) => (
            <Group gap={4} justify="right" wrap="nowrap">
              <ActionIcon
                size="sm"
                variant="subtle"
                color="green"
              // onClick={() => showModal({ company, action: 'view' })}
              >
                <FontAwesomeIcon icon={faEye} size={16} />
              </ActionIcon>
              <ActionIcon
                size="sm"
                variant="subtle"
                color="blue"
              // onClick={() => showModal({ company, action: 'edit' })}
              >
                <FontAwesomeIcon icon={faEdit} size={16} />
              </ActionIcon>
              <ActionIcon
                size="sm"
                variant="subtle"
                color="red"
              // onClick={() => showModal({ company, action: 'delete' })}
              >
                <FontAwesomeIcon icon={faTrash} size={16} />
              </ActionIcon>
            </Group>
          ),
        },
      ]}
      totalRecords={companies.length}
      recordsPerPage={pageSize}
      page={page}
      onPageChange={(p) => setPage(p)}
      recordsPerPageOptions={PAGE_SIZES}
      onRecordsPerPageChange={setPageSize}
      //  uncomment the next line to use a custom pagination size
      // paginationSize="md"
      //  uncomment the next line to use a custom loading text
      // loadingText="Loading..."
      //  uncomment the next line to display a custom text when no records were found
      // noRecordsText="No records found"
      //  customize pagination positioning and appearance

      /* pagination={{
        position: 'bottom', // Place it at the bottom
        style: customPaginationStyles, // Apply custom styles directly
      }}
 */
      pagination={{
        position: 'bottom', // Place it at the bottom
        className: styles.pagination, // Apply custom styles
      }}
    /* pagination={{
      position: 'bottom-left !important', // Move pagination to bottom-left corner
      // Additional customization options for pagination styling (optional)
      // style: {
      //   // Modify styles as needed to achieve your desired look
      // }
    }} */
    //  uncomment the next lines to use custom pagination text
    // paginationText={({ from, to, totalRecords }) => `Records ${from} - ${to} of ${totalRecords}`}
    //  uncomment the next lines to use custom pagination colors
    // paginationActiveBackgroundColor="green"
    // paginationActiveTextColor="#e6e348"
    />
  );
}
