import type { Meta, StoryObj } from '@storybook/react';
import { CheckIcon, XIcon, AlertTriangleIcon, InfoIcon } from 'lucide-react';
import Chip from './Chip';

/**
 * `Chip` is used throughout FlexPrice to display status labels, tags, and badges.
 *
 * ## Usage
 * ```tsx
 * <Chip variant="success" label="Active" />
 * <Chip variant="failed" label="Void" icon={<XIcon />} />
 * ```
 *
 * ### Variants
 * - `default` : neutral grey, for general labels
 * - `success` : green, for active/paid/healthy states
 * - `warning` : orange, for pending/trial states
 * - `failed` : red, for cancelled/void/error states
 * - `info` : blue, for draft/informational states
 */
const meta: Meta<typeof Chip> = {
	title: 'Atoms/Chip',
	component: Chip,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'success', 'warning', 'failed', 'info'],
			description: 'Visual style variant',
		},
		label: {
			control: 'text',
			description: 'Text label displayed in the chip',
		},
		disabled: {
			control: 'boolean',
			description: 'Disables click interaction and dims the chip',
		},
		onClick: { action: 'clicked' },
	},
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
	args: {
		label: 'Default',
		variant: 'default',
	},
};

export const Success: Story = {
	args: {
		label: 'Active',
		variant: 'success',
	},
};

export const Warning: Story = {
	args: {
		label: 'Pending',
		variant: 'warning',
	},
};

export const Failed: Story = {
	args: {
		label: 'Cancelled',
		variant: 'failed',
	},
};

export const Info: Story = {
	args: {
		label: 'Draft',
		variant: 'info',
	},
};

export const WithPrefixIcon: Story = {
	name: 'With Icon — Success',
	args: {
		label: 'Paid',
		variant: 'success',
		icon: <CheckIcon size={12} />,
	},
};

export const WithFailedIcon: Story = {
	name: 'With Icon — Failed',
	args: {
		label: 'Void',
		variant: 'failed',
		icon: <XIcon size={12} />,
	},
};

export const WithWarningIcon: Story = {
	name: 'With Icon — Warning',
	args: {
		label: 'Trial',
		variant: 'warning',
		icon: <AlertTriangleIcon size={12} />,
	},
};

export const WithInfoIcon: Story = {
	name: 'With Icon — Info',
	args: {
		label: 'Draft',
		variant: 'info',
		icon: <InfoIcon size={12} />,
	},
};

export const Disabled: Story = {
	args: {
		label: 'Archived',
		variant: 'default',
		disabled: true,
	},
};

export const Clickable: Story = {
	args: {
		label: 'Click me',
		variant: 'info',
		onClick: () => alert('Chip clicked!'),
	},
};

export const InvoiceStatuses: Story = {
	name: 'Invoice Statuses (Real World)',
	render: () => (
		<div className='flex flex-wrap gap-2 p-4'>
			<Chip variant='success' label='Paid' icon={<CheckIcon size={12} />} />
			<Chip variant='info' label='Draft' />
			<Chip variant='warning' label='Pending' />
			<Chip variant='failed' label='Void' icon={<XIcon size={12} />} />
			<Chip variant='failed' label='Overdue' icon={<AlertTriangleIcon size={12} />} />
		</div>
	),
};

export const PlanStatuses: Story = {
	name: 'Plan Statuses (Real World)',
	render: () => (
		<div className='flex flex-wrap gap-2 p-4'>
			<Chip variant='success' label='Active' />
			<Chip variant='default' label='Archived' disabled />
			<Chip variant='info' label='Draft' />
		</div>
	),
};

export const SubscriptionStatuses: Story = {
	name: 'Subscription Statuses (Real World)',
	render: () => (
		<div className='flex flex-wrap gap-2 p-4'>
			<Chip variant='success' label='Active' />
			<Chip variant='warning' label='Trial' />
			<Chip variant='failed' label='Cancelled' />
			<Chip variant='default' label='Expired' />
			<Chip variant='info' label='Scheduled' />
		</div>
	),
};

export const AllVariants: Story = {
	name: 'All Variants',
	render: () => (
		<div className='flex flex-wrap gap-2 p-4'>
			<Chip variant='default' label='Default' />
			<Chip variant='success' label='Success' />
			<Chip variant='warning' label='Warning' />
			<Chip variant='failed' label='Failed' />
			<Chip variant='info' label='Info' />
		</div>
	),
};
