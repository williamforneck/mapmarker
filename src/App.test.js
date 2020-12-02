import { render, screen } from '@testing-library/react'
import App from './App'
import Map from './Components/Map/map'

test('Teste do header', () => {
  render(<App />)
  const linkElement = screen.getByText(/Syonet App/i)
  expect(linkElement).toBeInTheDocument()
})

test('Teste de loading do mapa', () => {
  render(<App />)
  const linkElement1 = screen.getByText(/Carregando mapa/i)
  expect(linkElement1).toBeInTheDocument()
})

test('Teste de carregamento do mapa', () => {
  render(<App />)
  const linkElement2 = screen.queryByText(/Erro ao carregar o mapa/i)
  expect(linkElement2).not.toBeInTheDocument()
})

test('Teste da section ajuda', () => {
  render(<App />)
  const linkElement3 = screen.getByText(/Ajuda/i)
  expect(linkElement3).toBeInTheDocument()
})
