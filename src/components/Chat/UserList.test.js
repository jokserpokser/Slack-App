import { render, screen } from '@testing-library/react'
import UserList from './UserList'
import renderer from 'react-test-renderer'

describe('UserList', () => {
    it('should render UserList', () => {
        render(<UserList />);

        expect(screen.getByText(/Channel Users/i)).toBeInTheDocument;
    });
});

test('snapshot test for userlist', () => {
    const userlist = renderer.create(<UserList />).toJSON();
    expect(userlist).toMatchSnapshot();
})