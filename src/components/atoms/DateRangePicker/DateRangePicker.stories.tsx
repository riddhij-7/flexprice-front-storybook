import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import DateRangePicker from './DateRangePicker';

/**
 * `DateRangePicker` is used across FlexPrice for filtering analytics,
 * revenue charts, and event logs by a start/end date range.
 *
 * Supports UTC and local timezone modes with a two-month calendar view.
 *
 * ## Usage
 * ```tsx
 * <DateRangePicker
 *   startDate={startDate}
 *   endDate={endDate}
 *   onChange={({ startDate, endDate }) => {
 *     setStartDate(startDate);
 *     setEndDate(endDate);
 *   }}
 * />
 * ```
 *
 * ### Props
 * - `startDate` / `endDate` : controlled date values
 * - `onChange` : called with `{ startDate, endDate }` when selection changes
 * - `placeholder` : shown when no range is selected
 * - `title` : label shown above the trigger button
 * - `disabled` : disables the picker
 * - `minDate` / `maxDate` : restrict selectable range
 */
const meta: Meta<typeof DateRangePicker> = {
  title: 'Atoms/DateRangePicker',
  component: DateRangePicker,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    placeholder: { control: 'text' },
    title: { control: 'text' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof DateRangePicker>;

export const Default: Story = {
  render: () => {
    const [start, setStart] = useState<Date | undefined>();
    const [end, setEnd] = useState<Date | undefined>();
    return (
      <DateRangePicker
        startDate={start}
        endDate={end}
        onChange={({ startDate, endDate }) => {
          setStart(startDate);
          setEnd(endDate);
        }}
        placeholder="Select date range"
      />
    );
  },
};
export const WithTitle: Story = {
  name: 'With Title Label',
  render: () => {
    const [start, setStart] = useState<Date | undefined>();
    const [end, setEnd] = useState<Date | undefined>();
    return (
      <DateRangePicker
        title="Billing Period"
        startDate={start}
        endDate={end}
        onChange={({ startDate, endDate }) => {
          setStart(startDate);
          setEnd(endDate);
        }}
      />
    );
  },
};

export const PreSelected: Story = {
  name: 'Pre-selected Range',
  render: () => {
    const [start, setStart] = useState<Date>(new Date('2026-04-01'));
    const [end, setEnd] = useState<Date>(new Date('2026-04-30'));
    return (
      <DateRangePicker
        title="Revenue Period"
        startDate={start}
        endDate={end}
        onChange={({ startDate, endDate }) => {
          setStart(startDate!);
          setEnd(endDate!);
        }}
      />
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <DateRangePicker
      startDate={new Date('2026-01-01')}
      endDate={new Date('2026-01-31')}
      onChange={() => {}}
      disabled
      title="Period (locked)"
    />
  ),
};

export const WithMinMax: Story = {
  name: 'With Min / Max Dates',
  render: () => {
    const [start, setStart] = useState<Date | undefined>();
    const [end, setEnd] = useState<Date | undefined>();
    return (
      <DateRangePicker
        title="Select within Q2 2026"
        startDate={start}
        endDate={end}
        minDate={new Date('2026-04-01')}
        maxDate={new Date('2026-06-30')}
        onChange={({ startDate, endDate }) => {
          setStart(startDate);
          setEnd(endDate);
        }}
      />
    );
  },
};

export const RevenueFilter: Story = {
  name: 'Real World — Revenue Page Filter',
  render: () => {
    const [start, setStart] = useState<Date | undefined>();
    const [end, setEnd] = useState<Date | undefined>();
    return (
      <div className="flex items-center gap-3 p-4 border rounded-lg bg-gray-50">
        <span className="text-sm font-medium text-gray-600">Revenue for:</span>
        <DateRangePicker
          startDate={start}
          endDate={end}
          onChange={({ startDate, endDate }) => {
            setStart(startDate);
            setEnd(endDate);
          }}
          placeholder="All time"
        />
      </div>
    );
  },
};