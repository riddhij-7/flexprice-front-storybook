import { describe, it, expect } from 'vitest';
import { createQueryConfig, QUERY_PRESETS, getQueryClientDefaults } from './queryConfig';

describe('createQueryConfig', () => {
  it('returns global defaults when called with no arguments', () => {
    const config = createQueryConfig();
    expect(config.staleTime).toBe(5 * 60 * 1000);
    expect(config.gcTime).toBe(10 * 60 * 1000);
  });

  it('allows overriding staleTime only', () => {
    const config = createQueryConfig({ staleTime: 0 });
    expect(config.staleTime).toBe(0);
    expect(config.gcTime).toBe(10 * 60 * 1000);
  });

  it('allows overriding both staleTime and gcTime', () => {
    const config = createQueryConfig({ staleTime: 1000, gcTime: 2000 });
    expect(config.staleTime).toBe(1000);
    expect(config.gcTime).toBe(2000);
  });
});

describe('QUERY_PRESETS', () => {
  it('REALTIME preset has staleTime and gcTime of 0', () => {
    expect(QUERY_PRESETS.REALTIME.staleTime).toBe(0);
    expect(QUERY_PRESETS.REALTIME.gcTime).toBe(0);
  });

  it('DEFAULT preset matches global defaults', () => {
    expect(QUERY_PRESETS.DEFAULT.staleTime).toBe(5 * 60 * 1000);
    expect(QUERY_PRESETS.DEFAULT.gcTime).toBe(10 * 60 * 1000);
  });

  it('STATIC preset has longer staleTime than DEFAULT', () => {
    expect(QUERY_PRESETS.STATIC.staleTime).toBeGreaterThan(QUERY_PRESETS.DEFAULT.staleTime);
    expect(QUERY_PRESETS.STATIC.staleTime).toBe(30 * 60 * 1000);
    expect(QUERY_PRESETS.STATIC.gcTime).toBe(60 * 60 * 1000);
  });

  it('presets can be spread into createQueryConfig', () => {
    const config = createQueryConfig(QUERY_PRESETS.STATIC);
    expect(config.staleTime).toBe(30 * 60 * 1000);
  });
});

describe('getQueryClientDefaults', () => {
  it('returns queries with correct staleTime', () => {
    const defaults = getQueryClientDefaults();
    expect(defaults.queries.staleTime).toBe(5 * 60 * 1000);
  });

  it('disables refetchOnWindowFocus', () => {
    const defaults = getQueryClientDefaults();
    expect(defaults.queries.refetchOnWindowFocus).toBe(false);
  });
});