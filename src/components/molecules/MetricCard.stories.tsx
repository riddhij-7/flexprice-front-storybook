import type { Meta, StoryObj } from '@storybook/react';
import MetricCard from './MetricCard';

/**
 * `MetricCard` displays a single KPI metric on the FlexPrice dashboard.
 * Shows a title, formatted value (currency, percent, or plain number),
 * and an optional trend indicator arrow.
 *
 * ## Usage
 * ```tsx
 * <MetricCard
 *   title="Total Revenue"
 *   value={48320}
 *   currency="USD"
 *   showChangeIndicator
 *   isNegative={false}
 * />
 * ```
 *
 * ### Props
 * - `title` : label above the value
 * - `value` : numeric value to display
 * - `currency` : ISO currency code (e.g. `"USD"`); shows symbol + formatted number
 * - `isPercent` : renders value as a percentage
 * - `showChangeIndicator` : shows a trending up/down arrow
 * - `isNegative` : red down arrow when true, green up arrow when false
 */
const meta: Meta<typeof MetricCard> = {
  title: 'Molecules/MetricCard',
  component: MetricCard,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: '260px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    title: { control: 'text' },
    value: { control: 'number' },
    currency: { control: 'text' },
    isPercent: { control: 'boolean' },
    showChangeIndicator: { control: 'boolean' },
    isNegative: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof MetricCard>;

export const Default: Story = {
  args: {
    title: 'Total Revenue',
    value: 48320,
    currency: 'USD',
  },
};

export const WithCurrency: Story = {
  name: 'With Currency (USD)',
  args: {
    title: 'Monthly Recurring Revenue',
    value: 12450.5,
    currency: 'USD',
  },
};

export const AsPercent: Story = {
  name: 'As Percentage',
  args: {
    title: 'Churn Rate',
    value: 3.4,
    isPercent: true,
  },
};

export const TrendingUpStory: Story = {
  name: 'Trending Up',
  args: {
    title: 'New Subscriptions',
    value: 142,
    showChangeIndicator: true,
    isNegative: false,
  },
};

export const TrendingDownStory: Story = {
  name: 'Trending Down',
  args: {
    title: 'Churn Rate',
    value: 3.4,
    isPercent: true,
    showChangeIndicator: true,
    isNegative: true,
  },
};

export const PlainNumber: Story = {
  name: 'Plain Number',
  args: {
    title: 'Active Customers',
    value: 1284,
  },
};

export const LargeValue: Story = {
  name: 'Large Value',
  args: {
    title: 'Total Billed (All Time)',
    value: 1_284_930.75,
    currency: 'USD',
    showChangeIndicator: true,
    isNegative: false,
  },
};

export const DashboardRow: Story = {
  name: 'Real World — Dashboard KPI Row',
  render: () => (
    <div className="grid grid-cols-4 gap-4" style={{ width: '900px' }}>
      <MetricCard title="Total Revenue" value={48320} currency="USD" showChangeIndicator isNegative={false} />
      <MetricCard title="Active Subscriptions" value={312} showChangeIndicator isNegative={false} />
      <MetricCard title="Churn Rate" value={2.1} isPercent showChangeIndicator isNegative={true} />
      <MetricCard title="Avg Revenue / Customer" value={154.87} currency="USD" />
    </div>
  ),
};