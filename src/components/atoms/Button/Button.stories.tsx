import type { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from '@storybook/test';
import { PlusIcon, TrashIcon } from 'lucide-react';
import Button from './Button';

/**
 * `Button` is the primary action element in FlexPrice.
 *
 * ## Usage
 * ```tsx
 * <Button variant="default" size="default" onClick={handleClick}>
 *   Create Plan
 * </Button>
 * ```
 *
 * ### Props
 * - `variant` : visual style: `default` | `black` | `destructive` | `outline` | `secondary` | `ghost` | `link`
 * - `size` : `default` | `sm` | `lg` | `xs` | `icon`
 * - `isLoading` : shows a spinner and disables the button
 * - `disabled` : disables the button
 * - `prefixIcon` : icon rendered before the label
 * - `suffixIcon` : icon rendered after the label
 * - `asChild` : renders as a child element via Radix Slot (e.g. wrapping an `<a>` tag)
 */
const meta: Meta<typeof Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'black', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'Visual style of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'xs', 'icon'],
      description: 'Size of the button',
    },
    isLoading: {
      control: 'boolean',
      description: 'Shows a spinner and disables interaction',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    children: {
      control: 'text',
      description: 'Button label text',
    },
    onClick: { action: 'clicked' },
  },
  args: {
    onClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Button>;


export const Default: Story = {
  args: {
    children: 'Create Plan',
    variant: 'default',
    size: 'default',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name: /create plan/i });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Primary: Story = {
  args: {
    children: 'Add Customer',
    variant: 'default',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Cancel',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Export',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'View Details',
    variant: 'ghost',
  },
};

export const Destructive: Story = {
  name: 'Danger / Destructive',
  args: {
    children: 'Delete Plan',
    variant: 'destructive',
  },
};

export const Link: Story = {
  args: {
    children: 'Learn more',
    variant: 'link',
  },
};

export const SizeXS: Story = {
  name: 'Size: XS',
  args: {
    children: 'Badge action',
    size: 'xs',
  },
};

export const SizeSM: Story = {
  name: 'Size: SM',
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const SizeMD: Story = {
  name: 'Size: MD (Default)',
  args: {
    children: 'Medium Button',
    size: 'default',
  },
};

export const SizeLG: Story = {
  name: 'Size: LG',
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

export const Loading: Story = {
  args: {
    children: 'Saving...',
    isLoading: true,
    variant: 'default',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeDisabled();
  },
};

export const Disabled: Story = {
  args: {
    children: 'Unavailable',
    disabled: true,
    variant: 'default',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');
    await expect(button).toBeDisabled();
  },
};


export const WithPrefixIcon: Story = {
  name: 'With Prefix Icon',
  args: {
    children: 'Add Plan',
    variant: 'default',
    prefixIcon: <PlusIcon />,
  },
};

export const WithSuffixIcon: Story = {
  name: 'With Suffix Icon',
  args: {
    children: 'Delete',
    variant: 'destructive',
    suffixIcon: <TrashIcon />,
  },
};

export const IconOnly: Story = {
  name: 'Icon Only',
  args: {
    size: 'icon',
    variant: 'outline',
    children: <PlusIcon />,
    'aria-label': 'Add item',
  },
};

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div className="flex flex-wrap gap-3 items-center p-4">
      <Button variant="default">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
      <Button isLoading>Loading</Button>
      <Button disabled>Disabled</Button>
    </div>
  ),
};

export const AllSizes: Story = {
  name: 'All Sizes',
  render: () => (
    <div className="flex flex-wrap gap-3 items-center p-4">
      <Button size="xs">XSmall</Button>
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};