import api, { API_BASE_URL } from './api';

afterEach(() => localStorage.clear());

test('uses configured origin and attaches the current token to pickup requests', async () => {
  localStorage.setItem('token', 'first-token');
  const adapter = jest.fn(async (config) => ({ data: [], status: 200, statusText: 'OK', headers: {}, config }));
  await api.get('/api/pickups/history', { adapter });
  expect(adapter.mock.calls[0][0].baseURL).toBe(API_BASE_URL);
  expect(adapter.mock.calls[0][0].headers.Authorization).toBe('Bearer first-token');
  localStorage.setItem('token', 'next-token');
  await api.get('/api/users/profile', { adapter });
  expect(adapter.mock.calls[1][0].headers.Authorization).toBe('Bearer next-token');
});

test('allows public calls without a token', async () => {
  const adapter = jest.fn(async (config) => ({ data: {}, status: 200, statusText: 'OK', headers: {}, config }));
  await api.post('/api/users/login', {}, { adapter });
  expect(adapter.mock.calls[0][0].headers.Authorization).toBeUndefined();
});
