import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ 
      data: { 
        hello: 'Test Hello Message' 
      } 
    }),
  })
);

describe('App Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    fetch.mockClear();
  });

  it('renders the main heading', () => {
    render(<App />);
    const headingElement = screen.getByText(/Xander Global Scholars/i);
    expect(headingElement).toBeInTheDocument();
  });

  it('fetches and displays GraphQL response', async () => {
    render(<App />);
    
    await waitFor(() => {
      const messageElement = screen.getByText(/Test Hello Message/i);
      expect(messageElement).toBeInTheDocument();
    });

    // Verify fetch was called with correct parameters
    expect(fetch).toHaveBeenCalledWith(
      process.env.REACT_APP_BACKEND_URL,
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.stringContaining('query { hello }')
      })
    );
  });
});