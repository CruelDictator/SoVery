// Test TypeScript integration
interface TestConfig {
    name: string;
    version: string;
    enabled: boolean;
}

export const testConfig: TestConfig = {
    name: 'test',
    version: '1.0.0',
    enabled: true
};

export function testFunction(input: string): string {
    return `Test: ${input}`;
}

// Test React component with TypeScript
import React from 'react';

interface TestComponentProps {
    title: string;
    count?: number;
}

export const TestComponent: React.FC<TestComponentProps> = ({ title, count = 0 }) => {
    return (
        <div>
        <h1>{ title } </h1>
        < p > Count: { count } </p>
            </div>
    );
}; 