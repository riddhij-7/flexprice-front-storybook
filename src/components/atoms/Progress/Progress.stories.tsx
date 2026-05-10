import type { Meta, StoryObj } from '@storybook/react';
import Progress from './Progress';

/**
 * `Progress` is used as a usage/meter bar throughout FlexPrice to show
 * consumed vs entitled units (e.g. API calls, seats, storage).
 *
 * ## Usage
 * ```tsx
 * <Progress
 *   value={75}
 *   label="7,500 / 10,000 API calls used"
 *   indicatorColor="bg-green-500"
 * />
 * ```
 *
 * ### Props
 * - `value` : 0–100, percentage filled
 * - `label` : text shown below the bar
 * - `indicatorColor` : Tailwind class for the fill color
 * - `backgroundColor` : Tailwind class for the track color
 * - `labelColor` : Tailwind class for the label text color
 */
const meta: Meta<typeof Progress> = {
	title: 'Atoms/Progress',
	component: Progress,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
	decorators: [
		(Story) => (
			<div style={{ width: '400px' }}>
				<Story />
			</div>
		),
	],
	argTypes: {
		value: {
			control: { type: 'range', min: 0, max: 100, step: 1 },
			description: 'Percentage filled (0–100)',
		},
		label: { control: 'text', description: 'Label shown below the bar' },
		indicatorColor: { control: 'text', description: 'Tailwind class for fill color' },
		backgroundColor: { control: 'text', description: 'Tailwind class for track color' },
		labelColor: { control: 'text', description: 'Tailwind class for label color' },
	},
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
	args: {
		value: 60,
		label: '6,000 / 10,000 API calls used',
	},
};

export const Low: Story = {
	name: 'Low Usage (25%)',
	args: {
		value: 25,
		label: '2,500 / 10,000 API calls used',
		indicatorColor: 'bg-green-500',
	},
};

export const Medium: Story = {
	name: 'Medium Usage (60%)',
	args: {
		value: 60,
		label: '6,000 / 10,000 API calls used',
		indicatorColor: 'bg-blue-500',
	},
};

export const High: Story = {
	name: 'High Usage (85%)',
	args: {
		value: 85,
		label: '8,500 / 10,000 API calls used',
		indicatorColor: 'bg-orange-500',
	},
};

export const Critical: Story = {
	name: 'Critical Usage (98%)',
	args: {
		value: 98,
		label: '9,800 / 10,000 API calls — almost at limit!',
		indicatorColor: 'bg-red-500',
		labelColor: 'text-red-600',
	},
};

export const Full: Story = {
	name: 'Full (100%)',
	args: {
		value: 100,
		label: 'Limit reached — 10,000 / 10,000',
		indicatorColor: 'bg-red-600',
		labelColor: 'text-red-600 font-semibold',
	},
};

export const Empty: Story = {
	name: 'Empty (0%)',
	args: {
		value: 0,
		label: '0 / 10,000 API calls used',
	},
};

export const NoLabel: Story = {
	name: 'Without Label',
	args: {
		value: 45,
	},
};

export const MeterDashboard: Story = {
	name: 'Real World — Usage Meter Dashboard',
	render: () => (
		<div className='space-y-4 p-4 border rounded-lg' style={{ width: '420px' }}>
			<h3 className='text-sm font-semibold text-gray-700'>Usage This Period</h3>
			<Progress value={72} label='API Calls: 72,000 / 100,000' indicatorColor='bg-blue-500' />
			<Progress value={45} label='Storage: 45 GB / 100 GB' indicatorColor='bg-purple-500' />
			<Progress value={90} label='Seats: 9 / 10 used' indicatorColor='bg-orange-500' />
			<Progress value={100} label='Voice Minutes: Limit reached' indicatorColor='bg-red-500' labelColor='text-red-600' />
		</div>
	),
};
