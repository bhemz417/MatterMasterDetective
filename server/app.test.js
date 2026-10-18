import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from './app.js';

async function withServer(run) {
  const server = createApp({ serveClient: false }).listen(0);
  try {
    const port = server.address().port;
    await run(`http://127.0.0.1:${port}`);
  } finally {
    await new Promise((resolve, reject) => server.close(err => err ? reject(err) : resolve()));
  }
}

test('API health endpoint returns application status', async () => {
  await withServer(async base => {
    const response = await fetch(`${base}/api/health`);
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.status, 'ok');
  });
});

test('mission briefing contains required five-badge instruction', async () => {
  await withServer(async base => {
    const response = await fetch(`${base}/api/briefing`);
    const body = await response.json();
    assert.equal(body.title, 'Welcome, Detective!');
    assert.equal(body.rank, 'MASTER MATTER DETECTIVE');
    assert.match(body.paragraphs[2], /all 5 badges/);
  });
});

test('attribution resources reference both external sources', async () => {
  await withServer(async base => {
    const response = await fetch(`${base}/api/resources`);
    const body = await response.json();
    assert.equal(body.length, 2);
    assert.ok(body.every(item => item.url.startsWith('https://')));
  });
});

test('unknown API route correctly returns 404', async () => {
  await withServer(async base => {
    const response = await fetch(`${base}/api/no-such-endpoint`);
    assert.equal(response.status, 404);
  });
});
