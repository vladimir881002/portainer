import userEvent from '@testing-library/user-event';

import { renderWithQueryClient, waitFor } from '@/react-tools/test-utils';

import { CreateTeamForm } from './CreateTeamForm';

test('filling the name should make the submit button clickable and emptying it should make it disabled', async () => {
  const { findByLabelText, findByText } = renderWithQueryClient(
    <CreateTeamForm users={[]} teams={[]} />
  );

  const button = await findByText('Create team');
  expect(button).toBeVisible();

  const nameField = await findByLabelText('Name*');
  expect(nameField).toBeVisible();
  expect(nameField).toHaveDisplayValue('');

  expect(button).toBeDisabled();

  const newValue = 'name';
  await userEvent.type(nameField, newValue);

  await waitFor(() => {
    expect(nameField).toHaveDisplayValue(newValue);
    expect(button).toBeEnabled();
  });
});
