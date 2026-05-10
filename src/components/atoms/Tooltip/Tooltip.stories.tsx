import type { Meta, StoryObj } from '@storybook/react';
import { InfoIcon, HelpCircleIcon } from 'lucide-react';
import Tooltip from './Tooltip';
import Button from '../Button/Button';

/**
 * `Tooltip` wraps any trigger element and shows a floating content box on hover.
 * Built on Radix UI's Tooltip primitive.
 *
 * ## Usage
 * ```tsx
 * <Tooltip content="This is helpful info">
 *   <Button>Hover me</Button>
 * </Tooltip>
 * ```
 *
 * ### Props
 * - `content` : what to show inside the tooltip (string or JSX)
 * - `delayDuration` : ms before tooltip appears (default: Radix default ~700ms)
 * - `side` : `top` | `right` | `bottom` | `left`
 * - `align` : `start` | `center` | `end`
 * - `sideOffset` : px gap between trigger and tooltip
 */
const meta: Meta<typeof Tooltip> = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Which side of the trigger to show the tooltip',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'Alignment relative to the trigger',
    },
    delayDuration: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'Delay in ms before tooltip appears',
    },
    sideOffset: {
      control: { type: 'number', min: 0, max: 20 },
      description: 'Pixel gap between trigger and tooltip',
    },
    content: {
      control: 'text',
      description: 'Tooltip content text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'This is a helpful tooltip',
    children: <Button variant="outline">Hover me</Button>,
  },
};

export const TopSide: Story = {
  name: 'Side — Top',
  args: {
    content: 'Tooltip on top',
    side: 'top',
    children: <Button variant="outline">Top</Button>,
  },
};

export const BottomSide: Story = {
  name: 'Side — Bottom',
  args: {
    content: 'Tooltip on bottom',
    side: 'bottom',
    children: <Button variant="outline">Bottom</Button>,
  },
};

export const LeftSide: Story = {
  name: 'Side — Left',
  args: {
    content: 'Tooltip on left',
    side: 'left',
    children: <Button variant="outline">Left</Button>,
  },
};

export const RightSide: Story = {
  name: 'Side — Right',
  args: {
    content: 'Tooltip on right',
    side: 'right',
    children: <Button variant="outline">Right</Button>,
  },
};


export const WithDelay: Story = {
  name: 'With Delay (1000ms)',
  args: {
    content: 'I appear after 1 second',
    delayDuration: 1000,
    children: <Button variant="outline">Hover (delayed)</Button>,
  },
};

export const Instant: Story = {
  name: 'No Delay (Instant)',
  args: {
    content: 'I appear instantly',
    delayDuration: 0,
    children: <Button variant="outline">Hover (instant)</Button>,
  },
};

export const OnInfoIcon: Story = {
  name: 'On Info Icon',
  args: {
    content: 'Usage is calculated based on your billing cycle',
    delayDuration: 0,
    children: (
      <span className="cursor-help text-gray-400 hover:text-gray-600">
        <InfoIcon size={16} />
      </span>
    ),
  },
};

export const OnHelpIcon: Story = {
  name: 'On Help Icon',
  args: {
    content: 'Graduated pricing means each unit is charged at the rate for its tier',
    side: 'right',
    delayDuration: 0,
    children: (
      <span className="cursor-help text-gray-400 hover:text-gray-600">
        <HelpCircleIcon size={16} />
      </span>
    ),
  },
};


export const RichContent: Story = {
  name: 'Rich Content',
  args: {
    delayDuration: 0,
    content: (
      <div className="space-y-1">
        <p className="font-semibold">Invoice #INV-001</p>
        <p className="text-xs text-gray-300">Due: May 15, 2026</p>
        <p className="text-xs text-gray-300">Amount: $1,200.00</p>
      </div>
    ),
    children: <Button variant="outline">Hover for details</Button>,
  },
};


export const AllSides: Story = {
  name: 'All Sides',
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-12">
      <Tooltip content="Top tooltip" side="top" delayDuration={0}>
        <Button variant="outline" size="sm">Top</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" side="right" delayDuration={0}>
        <Button variant="outline" size="sm">Right</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom" delayDuration={0}>
        <Button variant="outline" size="sm">Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" side="left" delayDuration={0}>
        <Button variant="outline" size="sm">Left</Button>
      </Tooltip>
    </div>
  ),
};