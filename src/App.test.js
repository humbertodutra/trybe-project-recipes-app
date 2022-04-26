import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from './App';

describe('Tela de Login', () => {
  it('contem um input de email', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    
  })
  it('contem um input de password', () => {
    renderWithRouter(<App />);
    const passwordInput = screen.getByTestId("password-input");
    expect(passwordInput).toBeInTheDocument();
  })
  
  it('Verifica se o botão é exibido', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId('login-submit-btn')
    expect(button).toBeInTheDocument();
  })
  it('Verifica se o botão "Enter" está desabilitado', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId("login-submit-btn")
    expect(button).toBeDisabled()
  })
  it('Verifica se o botão "Enter" é habilitado após a validação dos inputs', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId("login-submit-btn")
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId("password-input");
    userEvent.type(emailInput,'test@test.com');
    userEvent.type(passwordInput, '123456');
    expect(button).toBeEnabled();
  })
  it('Verifica se a pagina e redirecionada ao submeter o formulario', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId("password-input");
    const button = screen.getByTestId('login-submit-btn');
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '123456');
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  })
})
