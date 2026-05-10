import type { Meta, StoryObj } from '@storybook/react';
import { PackageIcon, UsersIcon, FileTextIcon, CreditCardIcon, ZapIcon } from 'lucide-react';

/**
 * `EmptyState` is the full-page empty state shown when a list or table has
 * no data yet. Seen on Features, Plans, Subscriptions, Invoices pages.
 *
 * It renders a centred card with an optional icon, heading, description,
 * and a CTA button — plus optional tutorial cards below.
 *
 * ## Usage
 * ```tsx
 * <EmptyState
 *   icon={<PackageIcon size={40} className="text-gray-300" />}
 *   heading="No Plans Yet"
 *   description="Create your first plan to start billing customers."
 *   buttonLabel="Create Plan"
 *   onButtonClick={() => navigate('/plans/new')}
 * />
 * ```
 *
 * ### Props
 * - `icon` — illustration or icon shown at top of empty card
 * - `heading` — bold title text
 * - `description` — supporting subtext
 * - `buttonLabel` — CTA button text
 * - `onButtonClick` — CTA button action
 */

// Because EmptyPage pulls in heavy app-level dependencies (Page, ApiDocsContent,
// framer-motion, TutorialItem), we document it here with a self-contained
// replica that matches the real visual exactly — same classes, same structure.

interface EmptyStateProps {
  icon?: React.ReactNode;
  heading?: string;
  description?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}
const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  heading,
  description,
  buttonLabel,
  onButtonClick,
}) => (
  <div className="bg-[#fafafa] border border-[#E9E9E9] rounded-[6px] w-full h-[360px] flex flex-col items-center justify-center mx-auto">
    {icon && <div className="mb-8">{icon}</div>}
    {heading && (
      <div className="font-medium text-[20px] leading-normal text-gray-700 mb-4 text-center">
        {heading}
      </div>
    )}
    {description && (
      <div className="font-normal text-[16px] leading-normal text-gray-400 mb-8 text-center max-w-[350px]">
        {description}
      </div>
    )}
    {buttonLabel && onButtonClick && (
      <button
        onClick={onButtonClick}
        className="px-5 py-2 border border-[#CFCFCF] rounded-[7px] bg-[#fbfbfb] text-sm text-gray-700 hover:bg-gray-100 transition-colors"
      >
        {buttonLabel}
      </button>
    )}
  </div>
);
const meta: Meta<typeof EmptyState> = {
  title: 'Organisms/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    heading: { control: 'text' },
    description: { control: 'text' },
    buttonLabel: { control: 'text' },
    onButtonClick: { action: 'clicked' },
  },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;
export const Default: Story = {
  args: {
    icon: <PackageIcon size={40} className="text-gray-300" />,
    heading: 'No Plans Yet',
    description: 'Create your first pricing plan to start billing your customers.',
    buttonLabel: 'Create Plan',
  },
};
export const Features: Story = {
  args: {
    icon: <ZapIcon size={40} className="text-gray-300" />,
    heading: 'Features',
    description: 'Create your first feature to define what customers pay for.',
    buttonLabel: 'Create Feature',
  },
};
export const Customers: Story = {
  args: {
    icon: <UsersIcon size={40} className="text-gray-300" />,
    heading: 'No Customers Yet',
    description: 'Add your first customer to start managing subscriptions.',
    buttonLabel: 'Add Customer',
  },
};
export const Subscriptions: Story = {
  args: {
    icon: <CreditCardIcon size={40} className="text-gray-300" />,
    heading: 'Subscriptions',
    description: 'Create your first subscription to start billing your customers.',
    buttonLabel: 'Create Subscription',
  },
};
export const Invoices: Story = {
  args: {
    icon: <FileTextIcon size={40} className="text-gray-300" />,
    heading: 'No Invoices',
    description: 'Invoices will appear here once subscriptions are active.',
  },
};
export const WithoutCTA: Story = {
  name: 'Without CTA Button',
  args: {
    icon: <FileTextIcon size={40} className="text-gray-300" />,
    heading: 'Nothing Here Yet',
    description: 'Data will appear here once available.',
  },
};
export const WithoutIcon: Story = {
  name: 'Without Icon',
  args: {
    heading: 'No Results Found',
    description: 'Try adjusting your filters or search query.',
    buttonLabel: 'Clear Filters',
  },
};
export const Minimal: Story = {
  name: 'Minimal (heading only)',
  args: {
    heading: 'No data available',
  },
};