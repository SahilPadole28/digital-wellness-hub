// ============================================================
// FILTER UTILITY — Explore page search and filter logic
// Pure functions: unit-testable
// ============================================================

import type { Resource, Category, Platform, CostModel } from '../data/resources';

export interface ExploreFilters {
  search: string;
  categories: Category[];
  platforms: Platform[];
  costModels: CostModel[];
  privacyFriendly: boolean;
  noAccount: boolean;
}

export const defaultFilters: ExploreFilters = {
  search: '',
  categories: [],
  platforms: [],
  costModels: [],
  privacyFriendly: false,
  noAccount: false,
};

export function filterResources(resources: Resource[], filters: ExploreFilters): Resource[] {
  return resources.filter((r) => {
    // Search: match name, tagline, purpose, limitations (case-insensitive)
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase();
      const searchable = [r.name, r.tagline, r.purpose, ...r.keyFeatures, ...r.limitations]
        .join(' ')
        .toLowerCase();
      if (!searchable.includes(q)) return false;
    }

    // Category filter
    if (filters.categories.length > 0 && !filters.categories.includes(r.category)) {
      return false;
    }

    // Platform filter
    if (filters.platforms.length > 0) {
      const hasMatch = filters.platforms.some((p) => r.platforms.includes(p));
      if (!hasMatch) return false;
    }

    // Cost model filter
    if (filters.costModels.length > 0) {
      const models = Array.isArray(r.cost.model) ? r.cost.model : [r.cost.model];
      const hasMatch = filters.costModels.some((m) => models.includes(m));
      if (!hasMatch) return false;
    }

    // No account required filter
    if (filters.noAccount && r.privacy.accountRequired) {
      return false;
    }

    return true;
  });
}

export function filtersToParams(filters: ExploreFilters): URLSearchParams {
  const p = new URLSearchParams();
  if (filters.search) p.set('q', filters.search);
  if (filters.categories.length) p.set('cat', filters.categories.join(','));
  if (filters.platforms.length) p.set('plat', filters.platforms.join(','));
  if (filters.costModels.length) p.set('cost', filters.costModels.join(','));
  if (filters.noAccount) p.set('noAcct', '1');
  return p;
}

export function paramsToFilters(params: URLSearchParams): ExploreFilters {
  return {
    search: params.get('q') || '',
    categories: params.get('cat')
      ? (params.get('cat')!.split(',') as Category[])
      : [],
    platforms: params.get('plat')
      ? (params.get('plat')!.split(',') as Platform[])
      : [],
    costModels: params.get('cost')
      ? (params.get('cost')!.split(',') as CostModel[])
      : [],
    privacyFriendly: params.get('priv') === '1',
    noAccount: params.get('noAcct') === '1',
  };
}

