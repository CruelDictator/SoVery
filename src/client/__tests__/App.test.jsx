import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import configureStore from '../config/configureStore';
import client from '../config/createApolloClient';
import App from '../App';

const store = configureStore();

const renderApp = () => {
    return render(
        <Provider store={store}>
            <Router>
                <ApolloProvider client={client}>
                    <App />
                </ApolloProvider>
            </Router>
        </Provider>
    );
};

describe('App Component', () => {
    it('renders without crashing', () => {
        renderApp();
        // Add more specific assertions based on your App component's content
        expect(document.body).toBeTruthy();
    });
}); 