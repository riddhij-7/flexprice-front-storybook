import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { CheckIcon, CircleIcon } from 'lucide-react';
import { useState } from 'react';
import FlexPriceSelect from './Select';

/**
 * `FlexPriceSelect` is the standard dropdown select used throughout FlexPrice
 * for filtering, form inputs, and configuration options.
 *
 * Built on Radix UI's Select primitive with shadcn/ui styling.
 *
 * ## Usage
 * ```tsx
 * <FlexPriceSelect
 *   label="Billing Interval"
 *   options={[
 *     { value: 'monthly', label: 'Monthly' },
 *     { value: 'annual', label: 'Annual' },
 *   ]}
 *   value={value}
 *   onChange={setValue}
 * />
 * ```
 *
 * ### Props
 * - `options` : array of `{ value, label, description?, prefixIcon?, suffixIcon?, disabled? }`
 * - `value` : controlled selected value
 * - `onChange` : callback when selection changes
 * - `placeholder` : shown when no value is selected
 * - `label` : field label above the select
 * - `error` : red error message below
 * - `description` — grey helper text below
 * - `disabled` — disables the entire select
 * - `isRadio` — renders radio-style indicators instead of checkmarks
 */
const meta: Meta<typeof FlexPriceSelect> = {
	title: 'Atoms/Select',
	component: FlexPriceSelect,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	decorators: [
		(Story) => (
			<div style={{ width: '320px' }}>
				<Story />
			</div>
		),
	],
	argTypes: {
		placeholder: { control: 'text' },
		label: { control: 'text' },
		error: { control: 'text' },
		description: { control: 'text' },
		disabled: { control: 'boolean' },
		isRadio: { control: 'boolean' },
		onChange: { action: 'changed' },
	},
};

export default meta;
type Story = StoryObj<typeof FlexPriceSelect>;

const planOptions = [
	{ value: 'starter', label: 'Starter' },
	{ value: 'growth', label: 'Growth' },
	{ value: 'enterprise', label: 'Enterprise' },
];

const billingIntervalOptions = [
	{ value: 'monthly', label: 'Monthly', description: 'Billed every month' },
	{ value: 'quarterly', label: 'Quarterly', description: 'Billed every 3 months' },
	{ value: 'annual', label: 'Annual', description: 'Billed once per year' },
];

const currencyOptions = [
	{ value: 'usd', label: 'USD — US Dollar', prefixIcon: <span className='text-xs font-mono'>$</span> },
	{ value: 'eur', label: 'EUR — Euro', prefixIcon: <span className='text-xs font-mono'>€</span> },
	{ value: 'gbp', label: 'GBP — British Pound', prefixIcon: <span className='text-xs font-mono'>£</span> },
	{ value: 'inr', label: 'INR — Indian Rupee', prefixIcon: <span className='text-xs font-mono'>₹</span> },
];

const statusOptions = [
	{ value: 'active', label: 'Active', suffixIcon: <CheckIcon size={14} className='text-green-600' /> },
	{ value: 'archived', label: 'Archived' },
	{ value: 'draft', label: 'Draft' },
];

export const Default: Story = {
	args: {
		options: planOptions,
		placeholder: 'Select a plan',
		label: 'Plan',
	},
};

export const WithLabel: Story = {
	args: {
		options: billingIntervalOptions,
		label: 'Billing Interval',
		placeholder: 'Select interval',
		required: true,
	},
};

export const WithDescription: Story = {
	args: {
		options: planOptions,
		label: 'Plan',
		placeholder: 'Select a plan',
		description: 'The plan determines what features your customer has access to.',
	},
};

export const WithError: Story = {
	args: {
		options: planOptions,
		label: 'Plan',
		placeholder: 'Select a plan',
		error: 'Please select a plan to continue.',
	},
};

export const Disabled: Story = {
	args: {
		options: planOptions,
		label: 'Plan',
		value: 'starter',
		disabled: true,
	},
};

export const WithPrefixIcons: Story = {
	name: 'With Prefix Icons (Currency)',
	args: {
		options: currencyOptions,
		label: 'Currency',
		placeholder: 'Select currency',
	},
};

export const WithSuffixIcons: Story = {
	name: 'With Suffix Icons (Status)',
	args: {
		options: statusOptions,
		label: 'Status',
		placeholder: 'Filter by status',
	},
};

export const WithOptionDescriptions: Story = {
	name: 'Options with Descriptions',
	args: {
		options: billingIntervalOptions,
		label: 'Billing Interval',
		placeholder: 'Choose interval',
	},
};

export const RadioStyle: Story = {
	name: 'Radio Style',
	args: {
		options: planOptions,
		label: 'Select Plan',
		placeholder: 'Choose a plan',
		isRadio: true,
	},
};

export const EmptyOptions: Story = {
	name: 'No Options Available',
	args: {
		options: [],
		label: 'Customer',
		placeholder: 'Select customer',
		noOptionsText: 'No customers found',
	},
};

export const Controlled: Story = {
	name: 'Controlled (Interactive)',
	render: () => {
		const [value, setValue] = useState('');
		return (
			<div className='space-y-3'>
				<FlexPriceSelect options={planOptions} label='Plan' placeholder='Select a plan' value={value} onChange={setValue} />
				<p className='text-sm text-gray-500'>
					Selected: <strong>{value || 'none'}</strong>
				</p>
			</div>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const trigger = canvas.getByRole('combobox');
		await expect(trigger).toBeInTheDocument();
	},
};

export const InvoiceFilterBar: Story = {
	name: 'Real World — Invoice Filter Bar',
	render: () => {
		const [status, setStatus] = useState('');
		const [plan, setPlan] = useState('');
		return (
			<div className='flex gap-3' style={{ width: '640px' }}>
				<FlexPriceSelect
					options={[
						{ value: 'paid', label: 'Paid' },
						{ value: 'draft', label: 'Draft' },
						{ value: 'void', label: 'Void' },
						{ value: 'pending', label: 'Pending' },
					]}
					placeholder='Filter by status'
					value={status}
					onChange={setStatus}
				/>
				<FlexPriceSelect options={planOptions} placeholder='Filter by plan' value={plan} onChange={setPlan} />
			</div>
		);
	},
};
