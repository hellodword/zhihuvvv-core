import { unstable_dev } from 'wrangler';
import type { UnstableDevWorker } from 'wrangler';
import { describe, expect, it, beforeAll, afterAll } from 'vitest';

describe('Worker', () => {
	let worker: UnstableDevWorker;

	beforeAll(async () => {
		worker = await unstable_dev('src/index.ts', {
			logLevel: 'debug',
			experimental: { disableExperimentalWarning: true },
		});
	});

	afterAll(async () => {
		await worker.stop();
		await worker.waitUntilExit();
	});

	it('should return 301 response', async () => {
		const resp = await worker.fetch('/readme', { redirect: 'manual' });
		expect(resp.status).toBe(301);
	});
});
