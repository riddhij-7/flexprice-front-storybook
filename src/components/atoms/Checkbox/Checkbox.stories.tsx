import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import Checkbox from './Checkbox';

/**
 * `Checkbox` is used in FlexPrice forms for boolean toggles, multi-select
 * options, and confirmation prompts.
 *
 * ## Usage
 * ```tsx
 * <Checkbox
 *   label="Send invoice by email"
 *   description="Customer will receive a PDF copy"
 *   checked={checked}
 *   onCheckedChange={setChecked}
 * />
 * ```
 *
 * ### Props
 * - `checked` : controlled checked state
 * - `onCheckedChange` : callback when toggled
 * - `label` : text label next to the checkbox
 * - `description` : smaller helper text below the label
 * - `id` : links label to checkbox for accessibility
 */
const meta: Meta<typeof Checkbox> = {
	title: 'Atoms/Checkbox',
	component: Checkbox,
	tags: ['autodocs'],
	parameters: { layout: 'centered' },
	argTypes: {
		label: { control: 'text' },
		description: { control: 'text' },
		checked: { control: 'boolean' },
		onCheckedChange: { action: 'changed' },
	},
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
	args: {
		label: 'Accept terms and conditions',
		id: 'terms',
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const checkbox = canvas.getByRole('checkbox');
		await expect(checkbox).toBeInTheDocument();
		await userEvent.click(checkbox);
		await expect(checkbox).toBeChecked();
	},
};

export const Checked: Story = {
	args: {
		label: 'Send invoice by email',
		checked: true,
		id: 'email',
	},
};

export const WithDescription: Story = {
	args: {
		label: 'Auto-renew subscription',
		description: 'Subscription will renew automatically at the end of the billing period.',
		id: 'renew',
	},
};

export const Unchecked: Story = {
	args: {
		label: 'Receive usage alerts',
		checked: false,
		id: 'alerts',
	},
};

export const Controlled: Story = {
	name: 'Controlled (Interactive)',
	render: () => {
		const [checked, setChecked] = useState(false);
		return (
			<div className='space-y-2'>
				<Checkbox
					label='Enable usage notifications'
					description='Get notified when usage exceeds 80% of your limit.'
					checked={checked}
					onCheckedChange={setChecked}
					id='notifications'
				/>
				<p className='text-xs text-gray-500'>State: {checked ? 'checked ✅' : 'unchecked'}</p>
			</div>
		);
	},
};
export const PermissionsForm: Story = {
	name: 'Real World — Permissions Form',
	render: () => {
		const [vals, setVals] = useState({ email: true, sms: false, webhook: true });
		return (
			<div className='space-y-3 p-4 border rounded-lg' style={{ width: '340px' }}>
				<p className='text-sm font-semibold'>Notification Preferences</p>
				<Checkbox
					label='Email notifications'
					checked={vals.email}
					onCheckedChange={(v) => setVals((p) => ({ ...p, email: v }))}
					id='perm-email'
				/>
				<Checkbox
					label='SMS notifications'
					description='Requires verified phone number'
					checked={vals.sms}
					onCheckedChange={(v) => setVals((p) => ({ ...p, sms: v }))}
					id='perm-sms'
				/>
				<Checkbox
					label='Webhook events'
					description='POST to your configured endpoint'
					checked={vals.webhook}
					onCheckedChange={(v) => setVals((p) => ({ ...p, webhook: v }))}
					id='perm-webhook'
				/>
			</div>
		);
	},
};
