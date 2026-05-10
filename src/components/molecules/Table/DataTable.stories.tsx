import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import FlexpriceTable, { ColumnData } from './Table';
import Chip from '../../atoms/Chip/Chip';
import Button from '../../atoms/Button/Button';
import { ArrowUpDownIcon } from 'lucide-react';

/**
 * `DataTable` (FlexpriceTable) is the standard data table used across all
 * list pages in FlexPrice — Customers, Invoices, Plans, Subscriptions, etc.
 *
 * Supports custom column renderers, row click handlers, empty state,
 * loading skeleton, sortable headers, and two visual variants.
 *
 * ## Usage
 * ```tsx
 * <FlexpriceTable
 *   columns={columns}
 *   data={rows}
 *   onRowClick={(row) => navigate(`/customers/${row.id}`)}
 * />
 * ```
 *
 * ### Props
 * - `columns` : array of `ColumnData` with `title`, `fieldName` or `render`
 * - `data` : array of row objects
 * - `onRowClick` : fired when a row is clicked (skip interactive cells)
 * - `showEmptyRow` : show `--` placeholder row when data is empty
 * - `variant` : `default` (bordered) | `no-bordered`
 */


interface Customer {
  id: string;
  name: string;
  email: string;
  plan: string;
  status: 'active' | 'cancelled' | 'trial';
  mrr: string;
}

const mockCustomers: Customer[] = [
  { id: 'c1', name: 'Acme Corp', email: 'billing@acme.com', plan: 'Enterprise', status: 'active', mrr: '$4,200' },
  { id: 'c2', name: 'Globex Inc', email: 'pay@globex.io', plan: 'Growth', status: 'active', mrr: '$890' },
  { id: 'c3', name: 'Initech', email: 'finance@initech.com', plan: 'Starter', status: 'trial', mrr: '$0' },
  { id: 'c4', name: 'Umbrella Ltd', email: 'accounts@umbrella.co', plan: 'Growth', status: 'cancelled', mrr: '$0' },
  { id: 'c5', name: 'Stark Industries', email: 'tony@stark.com', plan: 'Enterprise', status: 'active', mrr: '$12,000' },
];

const statusVariant = {
  active: 'success',
  trial: 'warning',
  cancelled: 'failed',
} as const;

const customerColumns: ColumnData<Customer>[] = [
  {
    title: 'Customer',
    fieldVariant: 'title',
    render: (row) => (
      <div>
        <p className="font-medium text-gray-900">{row.name}</p>
        <p className="text-xs text-gray-400">{row.email}</p>
      </div>
    ),
  },
  { title: 'Plan', fieldName: 'plan' },
  {
    title: 'Status',
    render: (row) => (
      <Chip label={row.status.charAt(0).toUpperCase() + row.status.slice(1)} variant={statusVariant[row.status]} />
    ),
  },
  { title: 'MRR', fieldName: 'mrr', align: 'right' },
];

const skeletonData = Array.from({ length: 5 }, (_, i) => ({
  id: `sk-${i}`, name: '', email: '', plan: '', status: 'active' as const, mrr: '',
}));

const skeletonColumns: ColumnData<Customer>[] = [
  {
    title: 'Customer',
    render: () => (
      <div className="space-y-1">
        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-2 w-24 bg-gray-100 rounded animate-pulse" />
      </div>
    ),
  },
  { title: 'Plan', render: () => <div className="h-3 w-20 bg-gray-200 rounded animate-pulse" /> },
  { title: 'Status', render: () => <div className="h-5 w-16 bg-gray-200 rounded animate-pulse" /> },
  { title: 'MRR', render: () => <div className="h-3 w-12 bg-gray-200 rounded animate-pulse ml-auto" />, align: 'right' },
];

// 10k rows for virtualisation demo
const bigData = Array.from({ length: 10_000 }, (_, i) => ({
  id: `r${i}`,
  name: `Customer ${i + 1}`,
  email: `user${i + 1}@example.com`,
  plan: ['Starter', 'Growth', 'Enterprise'][i % 3],
  status: (['active', 'trial', 'cancelled'] as const)[i % 3],
  mrr: `$${((i % 500) * 10).toLocaleString()}`,
}));


const meta: Meta<typeof FlexpriceTable> = {
  title: 'Molecules/DataTable',
  component: FlexpriceTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    variant: { control: 'select', options: ['default', 'no-bordered'] },
    showEmptyRow: { control: 'boolean' },
    hideBottomBorder: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof FlexpriceTable>;


export const Default: Story = {
  args: {
    columns: customerColumns,
    data: mockCustomers,
    variant: 'default',
  },
};


export const WithRowClick: Story = {
  name: 'Clickable Rows',
  args: {
    columns: customerColumns,
    data: mockCustomers,
    onRowClick: (row: Customer) => alert(`Clicked: ${row.name}`),
  },
};


export const LoadingSkeleton: Story = {
  name: 'Loading State (Skeleton)',
  args: {
    columns: skeletonColumns,
    data: skeletonData,
    variant: 'default',
  },
};


export const EmptyState: Story = {
  name: 'Empty State',
  args: {
    columns: customerColumns,
    data: [],
    showEmptyRow: true,
    variant: 'default',
  },
};


export const NoBorder: Story = {
  name: 'Variant — No Border',
  args: {
    columns: customerColumns,
    data: mockCustomers,
    variant: 'no-bordered',
  },
};

export const LargeDataset: Story = {
  name: 'Large Dataset (10,000 rows)',
  render: () => {
    const [page, setPage] = useState(1);
    const pageSize = 20;
    const start = (page - 1) * pageSize;
    const pageData = bigData.slice(start, start + pageSize);
    const totalPages = Math.ceil(bigData.length / pageSize);

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {start + 1}–{Math.min(start + pageSize, bigData.length)} of {bigData.length.toLocaleString()} rows
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(p => p - 1)}>Prev</Button>
            <Button size="sm" variant="outline" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
          </div>
        </div>
        <FlexpriceTable columns={customerColumns} data={pageData} />
      </div>
    );
  },
};


export const SortableColumns: Story = {
  name: 'Sortable Columns',
  render: () => {
    const [sortField, setSortField] = useState<keyof Customer | null>(null);
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');

    const handleSort = (field: keyof Customer) => {
      if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
      else { setSortField(field); setSortDir('asc'); }
    };

    const sorted = [...mockCustomers].sort((a, b) => {
      if (!sortField) return 0;
      return sortDir === 'asc'
        ? String(a[sortField]).localeCompare(String(b[sortField]))
        : String(b[sortField]).localeCompare(String(a[sortField]));
    });

    const sortableColumns: ColumnData<Customer>[] = [
      {
        title: (
          <button onClick={() => handleSort('name')} className="flex items-center gap-1 hover:text-gray-900">
            Customer <ArrowUpDownIcon size={12} />
          </button>
        ) as any,
        render: (row) => <span className="font-medium">{row.name}</span>,
      },
      {
        title: (
          <button onClick={() => handleSort('plan')} className="flex items-center gap-1 hover:text-gray-900">
            Plan <ArrowUpDownIcon size={12} />
          </button>
        ) as any,
        fieldName: 'plan',
      },
      {
        title: 'Status',
        render: (row) => <Chip label={row.status} variant={statusVariant[row.status]} />,
      },
      { title: 'MRR', fieldName: 'mrr', align: 'right' },
    ];

    return <FlexpriceTable columns={sortableColumns} data={sorted} />;
  },
};