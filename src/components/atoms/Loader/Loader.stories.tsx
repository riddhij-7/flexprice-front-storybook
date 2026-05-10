import type { Meta, StoryObj } from '@storybook/react';
import Loader, { PageLoader } from './Loader';

/**
 * `Loader` is the full-screen loading state used across FlexPrice while
 * data is being fetched. It shows an animated spinner with rotating
 * motivational quotes.
 *
 * `PageLoader` wraps `Loader` in a full viewport-height container — use
 * this at the page/route level.
 *
 * ## Usage
 * ```tsx
 * // Inline loader (fills its container)
 * <Loader />
 *
 * // Full page loader
 * <PageLoader />
 * ```
 */
const meta: Meta<typeof Loader> = {
	title: 'Atoms/Loader',
	component: Loader,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
};

export default meta;
type Story = StoryObj<typeof Loader>;

export const Default: Story = {
	decorators: [
		(Story) => (
			<div style={{ width: '100%', height: '300px', position: 'relative' }}>
				<Story />
			</div>
		),
	],
};

export const FullPage: Story = {
	name: 'Page Loader (Full Viewport)',
	render: () => <PageLoader />,
	decorators: [
		(Story) => (
			<div style={{ width: '100%', height: '100vh' }}>
				<Story />
			</div>
		),
	],
};

export const InsideCard: Story = {
	name: 'Inside a Card / Panel',
	render: () => (
		<div className='border rounded-lg' style={{ width: '500px', height: '300px', position: 'relative' }}>
			<Loader />
		</div>
	),
};

export const InsideTable: Story = {
	name: 'Table Loading State',
	render: () => (
		<div className='border rounded-lg overflow-hidden' style={{ width: '700px' }}>
			{/* Fake table header */}
			<div className='grid grid-cols-4 bg-gray-50 border-b px-4 py-2 text-sm font-medium text-gray-500'>
				<span>Customer</span>
				<span>Plan</span>
				<span>Status</span>
				<span>Amount</span>
			</div>
			{/* Loader in place of rows */}
			<div style={{ height: '200px', position: 'relative' }}>
				<Loader />
			</div>
		</div>
	),
};
