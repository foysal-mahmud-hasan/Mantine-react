'use client';

import { Box } from '@mantine/core'
import { clsx } from 'clsx'
import styles from '../BasicUsageExample.module.css';
import { DataTable } from 'mantine-datatable';
import dayjs from 'dayjs';
import { employees } from './IndexNested';
import { companies, departments } from './IndexNested'
import { useEffect, useState } from 'react';
import classes from './Nested.module.css'
import '@mantine/core/styles.css';
import { IconBuilding } from '@tabler/icons-react';
import { IconUser } from '@tabler/icons-react'
import { IconUsers } from '@tabler/icons-react'
import { IconChevronRight } from '@tabler/icons-react';

const PAGE_SIZES = [10, 15, 20, 25];

export function NestedTables() {
    const [expandedCompanyIds, setExpandedCompanyIds] = useState([]);
    const [expandedDepartmentIds, setExpandedDepartmentIds] = useState([]);

    return (
        <DataTable
            withTableBorder
            withColumnBorders
            highlightOnHover
            columns={[
                {
                    accessor: 'name',
                    title: 'Company / Department / Employee',
                    noWrap: true,
                    render: ({ id, name }) => (
                        <>
                            <IconChevronRight
                                className={clsx(classes.icon, classes.expandIcon, {
                                    [classes.expandIconRotated]: expandedCompanyIds.includes(id),
                                })}
                            />
                            <IconBuilding className={classes.icon} />
                            <span>{name}</span>
                        </>
                    ),
                },
                { accessor: 'employees', title: 'Employees / Birth date', textAlign: 'right', width: 200 },
            ]}
            records={companies}
            rowExpansion={{
                allowMultiple: true,
                expanded: { recordIds: expandedCompanyIds, onRecordIdsChange: setExpandedCompanyIds },
                content: (company) => (
                    <DataTable
                        noHeader
                        withColumnBorders
                        columns={[
                            {
                                accessor: 'name',
                                noWrap: true,
                                render: ({ id, name }) => (
                                    <Box component="span" ml={20}>
                                        <IconChevronRight
                                            className={clsx(classes.icon, classes.expandIcon, {
                                                [classes.expandIconRotated]: expandedDepartmentIds.includes(id),
                                            })}
                                        />
                                        <IconUsers className={classes.icon} />
                                        <span>{name}</span>
                                    </Box>
                                ),
                            },
                            { accessor: 'employees', textAlign: 'right', width: 200 },
                        ]}
                        records={departments.filter((department) => department.company.id === company.record.id)}
                        rowExpansion={{
                            allowMultiple: true,
                            expanded: { recordIds: expandedDepartmentIds, onRecordIdsChange: setExpandedDepartmentIds },
                            content: (department) => (
                                <DataTable
                                    noHeader
                                    withColumnBorders
                                    columns={[
                                        {
                                            accessor: 'name',
                                            render: ({ firstName, lastName }) => (
                                                <Box component="span" ml={40}>
                                                    <IconUser className={classes.icon} />
                                                    <span>
                                                        {firstName} {lastName}
                                                    </span>
                                                </Box>
                                            ),
                                        },
                                        {
                                            accessor: 'birthDate',
                                            render: ({ birthDate }) => dayjs(birthDate).format('DD MMM YYYY'),
                                            textAlign: 'right',
                                            width: 200,
                                        },
                                    ]}
                                    records={employees.filter((employee) => employee.department.id === department.record.id)}
                                />
                            ),
                        }}
                    />
                ),
            }}
        />)
}


// --------------------------------------------------------------------------



export function ColumnPropertiesExample() {

    const [pageSize, setPageSize] = useState(PAGE_SIZES[1]);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    const [page, setPage] = useState(1);
    const [records, setRecords] = useState(employees.slice(0, pageSize));

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords(employees.slice(from, to));
    }, [page, pageSize]);

    return (
        <DataTable
            height={300}
            withTableBorder
            withColumnBorders
            borderRadius='sm'
            shadow='sm'
            highlightOnHover
            horizontalSpacing={'xs'}
            verticalSpacing={'xs'}
            fz={'sm'}
            verticalAlign='center'
            striped
            c={{ dark: '#dbc7a0', light: '#55350d' }}
            //  override default background color for light and dark themes
            backgroundColor={{ dark: '#232b25', light: '#f0f7f1' }}
            borderColor="#40c057" //  override default border color
            rowBorderColor="#fab005" //  override default row border color
            paginationActiveBackgroundColor="#40c057" //  override default pagination active 
            records={records}
            columns={[
                {
                    accessor: 'id',
                    title: '#',
                    textAlign: 'right',
                    width: 40,
                    render: (record) => records.indexOf(record) + 1,
                },
                { accessor: 'sex' },
                {
                    accessor: 'name',
                    title: 'Full name',
                    render: ({ firstName, lastName }) => `${firstName} ${lastName}`,
                    width: 160,
                },
                { accessor: 'email' },
                { accessor: 'birthDate' },
                // {
                //     accessor: 'departmentId',
                //     render: ({ departmentId }) => `${departmentId},`
                // },

            ]}
            totalRecords={employees.length}
            recordsPerPage={pageSize}
            page={page}
            onPageChange={(p) => setPage(p)}
            recordsPerPageOptions={PAGE_SIZES}
            onRecordsPerPageChange={setPageSize}

            pagination={{
                position: 'bottom',
                className: styles.pagination,
            }}

        />
    );
}

