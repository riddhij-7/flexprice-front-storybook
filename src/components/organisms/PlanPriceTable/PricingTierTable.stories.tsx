import type { Meta, StoryObj } from '@storybook/react';
import Chip from '../../atoms/Chip/Chip';

/**
 * `PricingTierTable` displays the graduated / tiered pricing structure
 * for a plan charge. Used inside the Plan detail page under "Charges".
 *
 * Shows tier ranges, per-unit price, and flat fees in a readable table.
 *
 * ## Usage
 * ```tsx
 * <PricingTierTable
 *   currency="USD"
 *   tiers={[
 *     { from: 0, to: 1000, unitPrice: 0.05, flatFee: 0 },
 *     { from: 1001, to: 10000, unitPrice: 0.03, flatFee: 0 },
 *     { from: 10001, to: null, unitPrice: 0.01, flatFee: 0 },
 *   ]}
 * />
 * ```
 */

interface Tier {
	from: number;
	to: number | null;
	unitPrice: number;
	flatFee?: number;
}

interface PricingTierTableProps {
	tiers: Tier[];
	currency?: string;
	title?: string;
	billingPeriod?: string;
	chargeType?: 'graduated' | 'volume' | 'flat';
}

const fmt = (n: number, currency = 'USD') =>
	new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 2 }).format(n);

const PricingTierTable: React.FC<PricingTierTableProps> = ({
	tiers,
	currency = 'USD',
	title,
	billingPeriod = 'Monthly',
	chargeType = 'graduated',
}) => (
	<div className='border border-[#E2E8F0] rounded-[6px] overflow-hidden'>
		{title && (
			<div className='px-4 py-3 border-b border-[#E2E8F0] flex items-center justify-between bg-white'>
				<div>
					<p className='text-sm font-medium text-gray-900'>{title}</p>
					<p className='text-xs text-gray-400 mt-0.5'>{billingPeriod}</p>
				</div>
				<Chip label={chargeType.charAt(0).toUpperCase() + chargeType.slice(1)} variant='info' />
			</div>
		)}

		<table className='w-full text-sm'>
			<thead className='bg-gray-50 border-b border-[#E2E8F0]'>
				<tr>
					<th className='px-4 py-2.5 text-left text-xs font-medium text-gray-500'>From</th>
					<th className='px-4 py-2.5 text-left text-xs font-medium text-gray-500'>To</th>
					<th className='px-4 py-2.5 text-right text-xs font-medium text-gray-500'>Unit Price</th>
					<th className='px-4 py-2.5 text-right text-xs font-medium text-gray-500'>Flat Fee</th>
				</tr>
			</thead>
			<tbody>
				{tiers.map((tier, i) => (
					<tr key={i} className='border-b border-[#E2E8F0] last:border-0 hover:bg-gray-50 transition-colors'>
						<td className='px-4 py-2.5 text-gray-700'>{tier.from.toLocaleString()}</td>
						<td className='px-4 py-2.5 text-gray-700'>{tier.to ? tier.to.toLocaleString() : '∞'}</td>
						<td className='px-4 py-2.5 text-right text-gray-900 font-medium'>{fmt(tier.unitPrice, currency)}</td>
						<td className='px-4 py-2.5 text-right text-gray-500'>{tier.flatFee ? fmt(tier.flatFee, currency) : '—'}</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

const meta: Meta<typeof PricingTierTable> = {
	title: 'Organisms/PricingTierTable',
	component: PricingTierTable,
	tags: ['autodocs'],
	parameters: { layout: 'padded' },
	argTypes: {
		currency: { control: 'text' },
		billingPeriod: { control: 'text' },
		chargeType: { control: 'select', options: ['graduated', 'volume', 'flat'] },
	},
};

export default meta;
type Story = StoryObj<typeof PricingTierTable>;

export const Default: Story = {
	args: {
		title: 'API Calls',
		billingPeriod: 'Monthly',
		chargeType: 'graduated',
		currency: 'USD',
		tiers: [
			{ from: 0, to: 1000, unitPrice: 0.05 },
			{ from: 1001, to: 10000, unitPrice: 0.03 },
			{ from: 10001, to: null, unitPrice: 0.01 },
		],
	},
};

export const VolumePricing: Story = {
	name: 'Volume Pricing',
	args: {
		title: 'Seats',
		chargeType: 'volume',
		billingPeriod: 'Monthly',
		currency: 'USD',
		tiers: [
			{ from: 1, to: 5, unitPrice: 20.0 },
			{ from: 6, to: 20, unitPrice: 15.0 },
			{ from: 21, to: 100, unitPrice: 10.0 },
			{ from: 101, to: null, unitPrice: 7.5 },
		],
	},
};

export const WithFlatFees: Story = {
	name: 'With Flat Fees Per Tier',
	args: {
		title: 'Storage',
		chargeType: 'graduated',
		billingPeriod: 'Monthly',
		currency: 'USD',
		tiers: [
			{ from: 0, to: 10, unitPrice: 0, flatFee: 0 },
			{ from: 11, to: 100, unitPrice: 0.5, flatFee: 5.0 },
			{ from: 101, to: 1000, unitPrice: 0.3, flatFee: 20.0 },
			{ from: 1001, to: null, unitPrice: 0.1, flatFee: 50.0 },
		],
	},
};

export const SingleTierFlat: Story = {
	name: 'Single Tier (Flat Rate)',
	args: {
		title: 'Platform Fee',
		chargeType: 'flat',
		billingPeriod: 'Monthly',
		currency: 'USD',
		tiers: [{ from: 0, to: null, unitPrice: 99.0 }],
	},
};

export const NoTitle: Story = {
	name: 'Without Header',
	args: {
		currency: 'USD',
		tiers: [
			{ from: 0, to: 500, unitPrice: 0.08 },
			{ from: 501, to: null, unitPrice: 0.05 },
		],
	},
};

export const OpenAIStyle: Story = {
	name: 'Real World — OpenAI Style Pricing',
	render: () => (
		<div className='space-y-4' style={{ width: '560px' }}>
			<PricingTierTable
				title='Input Tokens'
				chargeType='graduated'
				billingPeriod='Monthly'
				currency='USD'
				tiers={[
					{ from: 0, to: 1_000_000, unitPrice: 0.000003 },
					{ from: 1_000_001, to: null, unitPrice: 0.0000015 },
				]}
			/>
			<PricingTierTable
				title='Output Tokens'
				chargeType='graduated'
				billingPeriod='Monthly'
				currency='USD'
				tiers={[
					{ from: 0, to: 1_000_000, unitPrice: 0.000015 },
					{ from: 1_000_001, to: null, unitPrice: 0.0000075 },
				]}
			/>
		</div>
	),
};
