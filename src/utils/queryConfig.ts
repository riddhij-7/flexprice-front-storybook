/**
 * createQueryConfig — Configurable TanStack Query caching utility
 *
 * Provides a global default caching strategy with named presets and
 * per-call overrides, so every `useQuery` call in FlexPrice has a
 * consistent, intentional caching behaviour.
 *
 * ## Usage
 * ```ts
 * // Use a preset
 * useQuery({ ...QUERY_PRESETS.STATIC, queryKey: ['plans'], queryFn: fetchPlans })
 *
 * // Or create a custom config
 * useQuery(createQueryConfig({ staleTime: 0 }))
 * ```
 */

export interface QueryConfig {
  staleTime: number;
  gcTime: number;
}

export interface QueryConfigOverride {
  staleTime?: number;
  gcTime?: number;
}

const GLOBAL_DEFAULTS: QueryConfig = {
  staleTime: 5 * 60 * 1000,  // 5 minutes — data is fresh, no refetch on mount
  gcTime: 10 * 60 * 1000,    // 10 minutes — keep in cache after unmount
};

/**
 * Named presets for common caching scenarios.
 *
 * - `REALTIME` — always refetch, used for live event feeds or dashboards
 * - `DEFAULT`  — 5 min stale, 10 min gc; good for most list pages
 * - `STATIC`   — 30 min stale, 60 min gc; for rarely-changing data like plan definitions
 */
export const QUERY_PRESETS = {
  REALTIME: {
    staleTime: 0,
    gcTime: 0,
  },
  DEFAULT: {
    ...GLOBAL_DEFAULTS,
  },
  STATIC: {
    staleTime: 30 * 60 * 1000,  // 30 minutes
    gcTime: 60 * 60 * 1000,     // 60 minutes
  },
} as const satisfies Record<string, QueryConfig>;


/**
 * Creates a query config object by merging global defaults with any
 * per-call overrides. Pass the result directly into `useQuery`.
 *
 * @param override — partial config to override global defaults
 * @returns merged QueryConfig
 *
 * @example
 * // Real-time invoices (always fresh)
 * useQuery({ ...createQueryConfig({ staleTime: 0 }), queryKey: ['invoices'], queryFn: fetchInvoices })
 *
 * // Static plan definitions (cache for 30 min)
 * useQuery({ ...createQueryConfig(QUERY_PRESETS.STATIC), queryKey: ['plans'], queryFn: fetchPlans })
 */
export const createQueryConfig = (override: QueryConfigOverride = {}): QueryConfig => ({
  ...GLOBAL_DEFAULTS,
  ...override,
});


/**
 * Returns `defaultOptions` for a TanStack QueryClient, applying global
 * defaults so every query in the app inherits them automatically.
 *
 * @example
 * const queryClient = new QueryClient({
 *   defaultOptions: getQueryClientDefaults(),
 * })
 */
export const getQueryClientDefaults = () => ({
  queries: {
    staleTime: GLOBAL_DEFAULTS.staleTime,
    gcTime: GLOBAL_DEFAULTS.gcTime,
    retry: 1,
    refetchOnWindowFocus: false,
  },
});