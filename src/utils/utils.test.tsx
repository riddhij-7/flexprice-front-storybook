import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import formatNumber, { formatCompactNumber } from '@/utils/common/format_number';
import { formatBillingPeriodForPrice, getPriceTypeLabel, toSentenceCase } from '@/utils/common/helper_functions';
import Button from '@/components/atoms/Button/Button';
import Chip from '@/components/atoms/Chip/Chip';

// ══════════════════════════════════════════════════════════════════════════════
// 1. formatNumber
// ══════════════════════════════════════════════════════════════════════════════
describe('formatNumber', () => {
	it('returns "-" for zero (falsy value)', () => {
		expect(formatNumber(0)).toBe('-');
	});

	it('formats a plain integer with no decimals', () => {
		expect(formatNumber(1000)).toBe('1,000');
	});

	it('formats a large number with thousands separators', () => {
		expect(formatNumber(1_284_930)).toBe('1,284,930');
	});

	it('formats a number with specified decimal places', () => {
		expect(formatNumber(12450.5, 2)).toBe('12,450.50');
	});

	it('clamps decimals to 0 minimum if negative supplied', () => {
		// negative decimals should not throw; clamped to 0
		expect(() => formatNumber(100, -1)).not.toThrow();
	});
});

// ══════════════════════════════════════════════════════════════════════════════
// 2. formatCompactNumber
// ══════════════════════════════════════════════════════════════════════════════
describe('formatCompactNumber', () => {
	it('formats thousands as "k"', () => {
		expect(formatCompactNumber(10_000)).toBe('10k');
	});

	it('formats millions as "M"', () => {
		expect(formatCompactNumber(1_500_000)).toBe('1.5M');
	});

	it('formats billions as "B"', () => {
		expect(formatCompactNumber(2_000_000_000)).toBe('2B');
	});

	it('returns plain number for values under 1000', () => {
		expect(formatCompactNumber(500)).toBe('500');
	});

	it('strips trailing .0 from compact form', () => {
		expect(formatCompactNumber(1_000_000)).toBe('1M');
	});
});

// ══════════════════════════════════════════════════════════════════════════════
// 3. formatBillingPeriodForPrice
// ══════════════════════════════════════════════════════════════════════════════
describe('formatBillingPeriodForPrice', () => {
	it('maps MONTHLY to "month"', () => {
		expect(formatBillingPeriodForPrice('MONTHLY')).toBe('month');
	});

	it('maps ANNUAL to "year"', () => {
		expect(formatBillingPeriodForPrice('ANNUAL')).toBe('year');
	});

	it('maps DAILY to "day"', () => {
		expect(formatBillingPeriodForPrice('DAILY')).toBe('day');
	});

	it('maps WEEKLY to "week"', () => {
		expect(formatBillingPeriodForPrice('WEEKLY')).toBe('week');
	});

	it('maps QUARTERLY to "quarter"', () => {
		expect(formatBillingPeriodForPrice('QUARTERLY')).toBe('quarter');
	});

	it('maps ONETIME to "one-time"', () => {
		expect(formatBillingPeriodForPrice('ONETIME')).toBe('one-time');
	});

	it('returns "--" for unknown billing period', () => {
		expect(formatBillingPeriodForPrice('UNKNOWN')).toBe('--');
	});

	it('is case-insensitive', () => {
		expect(formatBillingPeriodForPrice('monthly')).toBe('month');
	});
});

// ══════════════════════════════════════════════════════════════════════════════
// 4. getPriceTypeLabel
// ══════════════════════════════════════════════════════════════════════════════
describe('getPriceTypeLabel', () => {
	it('returns "Fixed charge" for FIXED type', () => {
		expect(getPriceTypeLabel('FIXED')).toBe('Fixed charge');
	});

	it('returns "Usage Based" for USAGE type', () => {
		expect(getPriceTypeLabel('USAGE')).toBe('Usage Based');
	});

	it('returns "--" for null', () => {
		expect(getPriceTypeLabel(null as any)).toBe('--');
	});

	it('returns "--" for empty string', () => {
		expect(getPriceTypeLabel('')).toBe('--');
	});

	it('returns "--" for unknown type', () => {
		expect(getPriceTypeLabel('FLAT')).toBe('--');
	});

	it('is case-insensitive', () => {
		expect(getPriceTypeLabel('fixed')).toBe('Fixed charge');
	});
});

// ══════════════════════════════════════════════════════════════════════════════
// 5. toSentenceCase
// ══════════════════════════════════════════════════════════════════════════════
describe('toSentenceCase', () => {
	it('capitalises first letter and lowercases rest', () => {
		expect(toSentenceCase('ACTIVE')).toBe('Active');
	});

	it('handles already sentence-cased strings', () => {
		expect(toSentenceCase('Cancelled')).toBe('Cancelled');
	});

	it('returns empty string unchanged', () => {
		expect(toSentenceCase('')).toBe('');
	});
});

// ══════════════════════════════════════════════════════════════════════════════
// Component render test 1 — Button
// ══════════════════════════════════════════════════════════════════════════════
describe('Button component', () => {
	it('renders children text', () => {
		render(<Button>Create Plan</Button>);
		expect(screen.getByRole('button', { name: /create plan/i })).toBeInTheDocument();
	});

	it('is disabled when disabled prop is true', () => {
		render(<Button disabled>Disabled</Button>);
		expect(screen.getByRole('button')).toBeDisabled();
	});

	it('is disabled and shows spinner when isLoading is true', () => {
		render(<Button isLoading>Save</Button>);
		const btn = screen.getByRole('button');
		expect(btn).toBeDisabled();
		// spinner SVG is rendered instead of children text
		expect(screen.queryByText('Save')).not.toBeInTheDocument();
	});

	it('fires onClick when clicked', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();
		render(<Button onClick={handleClick}>Click Me</Button>);
		await user.click(screen.getByRole('button'));
		expect(handleClick).toHaveBeenCalledOnce();
	});

	it('does not fire onClick when disabled', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();
		render(
			<Button disabled onClick={handleClick}>
				Click Me
			</Button>,
		);
		await user.click(screen.getByRole('button'));
		expect(handleClick).not.toHaveBeenCalled();
	});
});

// ══════════════════════════════════════════════════════════════════════════════
// Component render test 2 — Chip
// ══════════════════════════════════════════════════════════════════════════════
describe('Chip component', () => {
	it('renders the label text', () => {
		render(<Chip label='Active' />);
		expect(screen.getByText('Active')).toBeInTheDocument();
	});

	it('applies disabled styles and does not call onClick when disabled', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();
		render(<Chip label='Archived' disabled onClick={handleClick} />);
		const chip = screen.getByRole('button');
		await user.click(chip);
		expect(handleClick).not.toHaveBeenCalled();
	});

	it('calls onClick when clicked and not disabled', async () => {
		const user = userEvent.setup();
		const handleClick = vi.fn();
		render(<Chip label='Draft' onClick={handleClick} />);
		await user.click(screen.getByRole('button'));
		expect(handleClick).toHaveBeenCalledOnce();
	});

	it('renders icon when provided', () => {
		render(<Chip label='Paid' icon={<span data-testid='chip-icon'>✓</span>} />);
		expect(screen.getByTestId('chip-icon')).toBeInTheDocument();
	});

	it('renders all status variants without crashing', () => {
		const variants = ['default', 'success', 'warning', 'failed', 'info'] as const;
		variants.forEach((variant) => {
			const { unmount } = render(<Chip label={variant} variant={variant} />);
			expect(screen.getByText(variant)).toBeInTheDocument();
			unmount();
		});
	});
});
