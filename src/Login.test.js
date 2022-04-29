import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from './App';

const emailInputTestId = 'email-input';
const passwordInputTestId = 'password-input';
const loginSubmitTestId = 'login-submit-btn';

describe('Tela de Login', () => {
  it('contem um input de email', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailInputTestId);
    expect(emailInput).toBeInTheDocument();
  });
  it('contem um input de password', () => {
    renderWithRouter(<App />);
    const passwordInput = screen.getByTestId(passwordInputTestId);
    expect(passwordInput).toBeInTheDocument();
  });

  it('Verifica se o botão é exibido', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId(loginSubmitTestId);
    expect(button).toBeInTheDocument();
  });
  it('Verifica se o botão "Enter" está desabilitado', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId(loginSubmitTestId);
    expect(button).toBeDisabled();
  });
  it('Verifica se o botão "Enter" é habilitado após a validação dos inputs', () => {
    renderWithRouter(<App />);
    const button = screen.getByTestId(loginSubmitTestId);
    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    expect(button).toBeEnabled();
  });
  it('Verifica se a pagina e redirecionada ao submeter o formulario', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailInputTestId);
    const passwordInput = screen.getByTestId(passwordInputTestId);
    const button = screen.getByTestId(loginSubmitTestId);
    userEvent.type(emailInput, 'test@test.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(button);
    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });
});
