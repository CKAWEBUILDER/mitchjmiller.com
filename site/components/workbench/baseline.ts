/**
 * Build-time baseline for the population workbench pages.
 * Runs in Node during `astro build`; never imported by the browser island.
 */
import { readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  DEFAULT_FILTERS, DEFAULT_UBI_PARAMS, filterPopulation, fromSample, runUbi, summarize,
  type Summary, type UbiMeta, type UbiResult, type UbiSample,
} from '../../islands/workbench/model';

export const DATA_PATH = '/data/ca-pums-sample-2019.json';
export const META_PATH = '/data/ca-pums-meta-2019.json';

export interface Baseline {
  meta: UbiMeta;
  records: number;
  recordWeight: number;
  totalWeight: number;
  fileBytes: number;
  summary: Summary;
  ubi: UbiResult;
}

let cached: Baseline | null = null;

export function loadBaseline(): Baseline {
  if (cached) return cached;
  const samplePath = resolve(process.cwd(), 'public', DATA_PATH.slice(1));
  const metaPath = resolve(process.cwd(), 'public', META_PATH.slice(1));
  const sample = JSON.parse(readFileSync(samplePath, 'utf8')) as UbiSample;
  const meta = JSON.parse(readFileSync(metaPath, 'utf8')) as UbiMeta;
  const pop = fromSample(sample);
  const idx = filterPopulation(pop, DEFAULT_FILTERS);
  const ubi = runUbi(pop, idx, meta, DEFAULT_UBI_PARAMS);
  if (!ubi) throw new Error('Baseline UBI run returned no result');
  cached = {
    meta,
    records: pop.n,
    recordWeight: sample.scaledWeight,
    totalWeight: pop.totalWeight,
    fileBytes: statSync(samplePath).size,
    summary: summarize(pop, idx),
    ubi,
  };
  return cached;
}
