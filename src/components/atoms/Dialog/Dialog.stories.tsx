import type { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from '@storybook/test';
import { useState } from 'react';
import Dialog from './Dialog';
import Button from '../Button/Button';

/**
 * `Dialog` is the standard modal overlay used across FlexPrice for
 * confirmations, forms, and detail views.
 *
 * ## Usage
 * ```tsx
 * <Dialog
 *   isOpen={isOpen}
 *   onOpenChange={setIsOpen}
 *   title="Cancel Subscription"
 *   description="This action cannot be undone."
 * >
 *   <Button variant="destructive" onClick={handleCancel}>Confirm Cancel</Button>
 * </Dialog>
 * ```
 *
 * ### Props
 * - `isOpen` : controls visibility
 * - `onOpenChange` : called when dialog should open/close
 * - `title` : heading text (string or ReactNode)
 * - `description` : subtext below the title
 * - `children` : dialog body content
 * - `showCloseButton` : whether to show the ✕ button (default: true)
 */
const meta: Meta<typeof Dialog> = {
  title: 'Atoms/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    showCloseButton: { control: 'boolean' },
    isOpen: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog
          isOpen={open}
          onOpenChange={setOpen}
          title="Create New Plan"
          description="Fill in the details below to create a new pricing plan."
        >
          <div className="space-y-3">
            <p className="text-sm text-gray-600">Dialog content goes here — forms, details, confirmations, etc.</p>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Save Plan</Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByRole('button', { name: /open dialog/i });
    await userEvent.click(trigger);
    await expect(canvas.getByText('Create New Plan')).toBeInTheDocument();
  },
};

export const Confirmation: Story = {
  name: 'Confirmation / Destructive',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>Cancel Subscription</Button>
        <Dialog
          isOpen={open}
          onOpenChange={setOpen}
          title="Cancel Subscription"
          description="This action cannot be undone. The customer will lose access at the end of the current billing period."
        >
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Keep Subscription</Button>
            <Button variant="destructive" onClick={() => setOpen(false)}>Yes, Cancel</Button>
          </div>
        </Dialog>
      </>
    );
  },
};

export const NoCloseButton: Story = {
  name: 'Without Close Button',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Open (No Close ✕)</Button>
        <Dialog
          isOpen={open}
          onOpenChange={setOpen}
          title="Action Required"
          description="You must complete this step before continuing."
          showCloseButton={false}
        >
          <div className="flex justify-end pt-2">
            <Button onClick={() => setOpen(false)}>Complete</Button>
          </div>
        </Dialog>
      </>
    );
  },
};

export const WithRichContent: Story = {
  name: 'With Form Content',
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Add Customer</Button>
        <Dialog isOpen={open} onOpenChange={setOpen} title="Add New Customer">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">Customer Name</label>
              <input className="w-full border rounded px-3 py-2 text-sm" placeholder="Acme Corp" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Email</label>
              <input className="w-full border rounded px-3 py-2 text-sm" placeholder="billing@acme.com" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={() => setOpen(false)}>Create Customer</Button>
            </div>
          </div>
        </Dialog>
      </>
    );
  },
};