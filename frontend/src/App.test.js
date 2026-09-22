import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';

afterEach(() => localStorage.clear());

function renderProtected() {
  return render(
    <MemoryRouter initialEntries={['/private']}>
      <Routes>
        <Route path="/private" element={<ProtectedRoute><div>Private page</div></ProtectedRoute>} />
        <Route path="/Login" element={<div>Login page</div>} />
      </Routes>
    </MemoryRouter>
  );
}

test('redirects to login without rendering protected content', () => {
  localStorage.setItem('isLoggedIn', 'true');
  renderProtected();
  expect(screen.getByText('Login page')).toBeInTheDocument();
  expect(screen.queryByText('Private page')).not.toBeInTheDocument();
});

test('renders protected content when a token exists', () => {
  localStorage.setItem('token', 'example-token');
  renderProtected();
  expect(screen.getByText('Private page')).toBeInTheDocument();
});
