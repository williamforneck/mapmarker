import { render, screen } from '@testing-library/react';
import App from './App';

test('Teste do header', () => {
  render(<App />);
  const linkElement = screen.getByText(/Syonet App/i);
  expect(linkElement).toBeInTheDocument();
});

test('Teste de loading do mapa', () => {
  render(<App />);
  const linkElement2 = screen.getByText(/Carregando mapa/i)
  expect(linkElement2).toBeInTheDocument();
});

test('Teste de carregamento do mapa', () => {
  render(<App />);
  const linkElement3 = screen.queryByText(/Erro ao carregar o mapa/i)
  expect(linkElement3).not.toBeInTheDocument()
});