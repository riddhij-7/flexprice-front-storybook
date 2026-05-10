import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  HomeIcon, LayersIcon, UsersIcon, FileTextIcon,
  BarChart2Icon, WrenchIcon, CodeIcon, PuzzleIcon,
  ChevronDownIcon, ChevronRightIcon, LayoutIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * `SidebarNav` is the main navigation sidebar for the FlexPrice app.
 * Supports top-level items, collapsible groups with sub-items,
 * active state highlighting, and a collapsed (icon-only) mode.
 *
 * ## Usage
 * ```tsx
 * <SidebarNav
 *   items={navItems}
 *   activeRoute="/billing/invoices"
 *   collapsed={false}
 * />
 * ```
 *
 * ### Props
 * - `items` — nav item config with title, icon, url, optional sub-items
 * - `activeRoute` — current route to highlight active item
 * - `collapsed` — icon-only collapsed mode
 */

interface SubNavItem {
  title: string;
  url: string;
  icon?: React.FC<{ className?: string }>;
}

interface NavItem {
  title: string;
  url: string;
  icon: React.FC<{ className?: string }>;
  items?: SubNavItem[];
  disabled?: boolean;
}

interface SidebarNavProps {
  items: NavItem[];
  activeRoute: string;
  collapsed?: boolean;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ items, activeRoute, collapsed = false }) => {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    'Product Catalog': true,
    'Billing': false,
  });

  const toggleGroup = (title: string) => {
    setOpenGroups(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className={cn(
      'flex flex-col h-full bg-white border-r border-gray-200 py-4 transition-all duration-300',
      collapsed ? 'w-14' : 'w-56'
    )}>

      <div className={cn('px-3 mb-6 flex items-center gap-2', collapsed && 'justify-center')}>
        <div className="w-7 h-7 rounded-md bg-[#092E44] flex items-center justify-center text-white text-xs font-bold">S</div>
        {!collapsed && <span className="text-sm font-semibold text-gray-800">student</span>}
      </div>

      <nav className="flex-1 px-2 space-y-0.5">
        {items.map((item) => {
          const Icon = item.icon;
          const hasChildren = item.items && item.items.length > 0;
          const isGroupOpen = openGroups[item.title] ?? false;
          const isActive = activeRoute === item.url || activeRoute.startsWith(item.url + '/');

          return (
            <div key={item.title}>
              <button
                onClick={() => hasChildren && toggleGroup(item.title)}
                disabled={item.disabled}
                className={cn(
                  'w-full flex items-center gap-2 px-2 py-2 rounded-md text-sm transition-colors',
                  isActive ? 'bg-zinc-200 border border-zinc-300 font-medium' : 'hover:bg-gray-100 font-light',
                  item.disabled && 'opacity-40 cursor-not-allowed',
                  collapsed && 'justify-center',
                )}>
                <Icon className={cn('shrink-0', isActive ? 'text-blue-600' : 'text-zinc-600',
                  collapsed ? 'w-5 h-5' : 'w-4 h-4'
                )} />
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left">{item.title}</span>
                    {hasChildren && (
                      isGroupOpen
                        ? <ChevronDownIcon className="w-3.5 h-3.5 text-gray-400" />
                        : <ChevronRightIcon className="w-3.5 h-3.5 text-gray-400" />
                    )}
                  </>
                )}
              </button>

              {hasChildren && isGroupOpen && !collapsed && (
                <div className="ml-3 mt-1 mb-2 pl-3 border-l border-gray-200 space-y-0.5">
                  {item.items!.map((sub) => {
                    const SubIcon = sub.icon;
                    const subActive = activeRoute === sub.url || activeRoute.startsWith(sub.url);
                    return (
                      <button key={sub.title} className={cn(
                        'w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors',
                        subActive ? 'text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100 font-light',
                      )}>
                        {SubIcon && <SubIcon className="w-3.5 h-3.5 shrink-0" />}
                        <span>{sub.title}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {!collapsed && (
        <div className="px-3 mt-4 border-t pt-3">
          <p className="text-xs text-gray-400 truncate">riddhijathar7@gmail.com</p>
        </div>
      )}
    </div>
  );
};

//Mock Nav Data 

const navItems: NavItem[] = [
  { title: 'Home', url: '/home', icon: HomeIcon },
  {
    title: 'Product Catalog', url: '/catalog', icon: LayersIcon,
    items: [
      { title: 'Features', url: '/catalog/features', icon: LayoutIcon },
      { title: 'Plans', url: '/catalog/plans', icon: LayersIcon },
      { title: 'Coupons', url: '/catalog/coupons' },
      { title: 'Add-ons', url: '/catalog/addons' },
    ],
  },
  {
    title: 'Billing', url: '/billing', icon: FileTextIcon,
    items: [
      { title: 'Customers', url: '/billing/customers', icon: UsersIcon },
      { title: 'Subscriptions', url: '/billing/subscriptions' },
      { title: 'Invoices', url: '/billing/invoices', icon: FileTextIcon },
    ],
  },
  { title: 'Revenue', url: '/revenue', icon: BarChart2Icon },
  { title: 'Tools', url: '/tools', icon: WrenchIcon },
  { title: 'Developers', url: '/developers', icon: CodeIcon },
  { title: 'Integrations', url: '/integrations', icon: PuzzleIcon },
];

const meta: Meta<typeof SidebarNav> = {
  title: 'Organisms/SidebarNav',
  component: SidebarNav,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    activeRoute: { control: 'text' },
    collapsed: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof SidebarNav>;

export const Default: Story = {
  decorators: [(Story) => <div style={{ height: '600px', display: 'flex' }}><Story /></div>],
  args: {
    items: navItems,
    activeRoute: '/home',
    collapsed: false,
  },
};

export const ActiveInBilling: Story = {
  name: 'Active — Billing / Invoices',
  decorators: [(Story) => <div style={{ height: '600px', display: 'flex' }}><Story /></div>],
  args: {
    items: navItems,
    activeRoute: '/billing/invoices',
    collapsed: false,
  },
};

export const ActiveInCatalog: Story = {
  name: 'Active — Product Catalog / Plans',
  decorators: [(Story) => <div style={{ height: '600px', display: 'flex' }}><Story /></div>],
  args: {
    items: navItems,
    activeRoute: '/catalog/plans',
    collapsed: false,
  },
};

export const Collapsed: Story = {
  name: 'Collapsed (Icon Only)',
  decorators: [(Story) => <div style={{ height: '600px', display: 'flex' }}><Story /></div>],
  args: {
    items: navItems,
    activeRoute: '/home',
    collapsed: true,
  },
};

export const WithAppLayout: Story = {
  name: 'Real World — App Layout',
  render: () => {
    const [active, setActive] = useState('/home');
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div style={{ display: 'flex', height: '600px' }}>
        <SidebarNav items={navItems} activeRoute={active} collapsed={collapsed} />
        <div className="flex-1 p-6 bg-gray-50">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-semibold text-gray-800">
              {navItems.find(i => active.startsWith(i.url))?.title ?? 'Page'}
            </h1>
            <button
              onClick={() => setCollapsed(c => !c)}
              className="text-xs px-3 py-1.5 border rounded-md text-gray-500 hover:bg-gray-100">
              {collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {navItems.map(i => (
              <button key={i.url} onClick={() => setActive(i.url)}
                className={cn('px-3 py-1.5 text-xs border rounded-md transition-colors',
                  active.startsWith(i.url) ? 'bg-blue-50 border-blue-300 text-blue-700' : 'hover:bg-gray-100 text-gray-600'
                )}>
                {i.title}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-400">Active route: <code>{active}</code></p>
        </div>
      </div>
    );
  },
};