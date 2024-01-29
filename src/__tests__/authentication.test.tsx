/**
 * @jest-environment jsdom
 */
import { expect, jest, test } from '@jest/globals';

import React from 'react';
import { render } from '@testing-library/react';
import Authentication from '../components/authentication';

const mockOnClick = jest.fn();

test('Authentication component renders correctly', () => {
    const { container } = render(<Authentication onClick={mockOnClick} />);

    expect(container).toMatchSnapshot();
});
