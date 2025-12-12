import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import ProjectForm from '../ProjectForm.jsx';

// Helpers to render with minimal required props
const setup = (overrideProps = {}) => {
  const setProjects = vi.fn();
  const setEditProject = vi.fn();
  const handleUpdate = vi.fn();

  const props = { setProjects, setEditProject, handleUpdate, editProject: null, ...overrideProps };

  const utils = render(<ProjectForm {...props} />);
  const nameInput = screen.getByPlaceholderText(/enter project name/i);
  const descInput = screen.getByPlaceholderText(/enter project description/i);
  const submitBtn = screen.getByRole('button', { name: /add project|update project/i });
  const statusSelect = screen.getByRole('combobox');

  return { ...utils, setProjects, setEditProject, handleUpdate, nameInput, descInput, submitBtn, statusSelect };
};

// Mock alert and Date.now to keep tests deterministic
beforeEach(() => {
  vi.spyOn(window, 'alert').mockImplementation(() => {});
  vi.spyOn(Date, 'now').mockReturnValue(1700000000000);
});

describe('ProjectForm', () => {
  it('adds a new project when valid name is provided', async () => {
    const user = userEvent.setup();
    const { setProjects, nameInput, descInput, statusSelect, submitBtn } = setup();

    await user.type(nameInput, 'My Project');
    await user.type(descInput, 'Some description');
    await user.selectOptions(statusSelect, 'completed');

    await user.click(submitBtn);

    expect(setProjects).toHaveBeenCalledTimes(1);
    // Check the callback receives a function to update state
    const updater = setProjects.mock.calls[0][0];
    const prev = [];
    const result = updater(prev);
    expect(result).toEqual([
      {
        project: 'My Project',
        status: 'completed',
        tags: [],
        description: 'Some description',
        id: 1700000000000,
      },
    ]);
  });

  it('pre-fills fields when editProject is provided', () => {
    const editProject = {
      id: 1,
      project: 'Edit Me',
      status: 'inProgress',
      tags: ['React', 'NodeJS'],
      description: 'Existing description',
    };

    const { nameInput, descInput, statusSelect } = setup({ editProject });

    expect(nameInput).toHaveValue('Edit Me');
    expect(descInput).toHaveValue('Existing description');
    expect(statusSelect).toHaveValue('inProgress');
    // Button should say Update Project
    expect(screen.getByRole('button', { name: /update project/i })).toBeInTheDocument();
  });

  it('calls handleUpdate and resets edit state on submit while editing', async () => {
    const user = userEvent.setup();
    const editProject = {
      id: 42,
      project: 'Old Name',
      status: 'upcoming',
      tags: [],
      description: '',
    };

    const { nameInput, submitBtn, handleUpdate, setEditProject } = setup({ editProject });

    await user.clear(nameInput);
    await user.type(nameInput, 'New Name');

    await user.click(submitBtn);

    expect(handleUpdate).toHaveBeenCalledWith({
      id: 42,
      project: 'New Name',
      status: 'upcoming',
      tags: [],
      description: '',
    });
    expect(setEditProject).toHaveBeenCalledWith(null);
  });

  it('prevents submission and alerts when project name is empty or whitespace', async () => {
    const user = userEvent.setup();
    const { submitBtn } = setup();

    await user.click(submitBtn);

    expect(window.alert).toHaveBeenCalledWith('Project name cannot be empty!');
  });

  it('toggles tags when tag buttons are clicked', async () => {
    const user = userEvent.setup();
    const { setProjects, nameInput, submitBtn } = setup();

    await user.type(nameInput, 'With Tags');

    // Click on two tags, e.g., React and NodeJS
    await user.click(screen.getByRole('button', { name: 'React' }));
    await user.click(screen.getByRole('button', { name: 'NodeJS' }));

    await user.click(submitBtn);

    const updater = setProjects.mock.calls[0][0];
    const result = updater([]);

    expect(result[0].tags.sort()).toEqual(['NodeJS', 'React']);
  });

  it('resets form fields after successful submission', async () => {
    const user = userEvent.setup();
    const { nameInput, descInput, statusSelect, submitBtn } = setup();

    await user.type(nameInput, 'Reset Me');
    await user.type(descInput, 'Desc');
    await user.selectOptions(statusSelect, 'inProgress');

    await user.click(submitBtn);

    expect(nameInput).toHaveValue('');
    expect(descInput).toHaveValue('');
    expect(statusSelect).toHaveValue('upcoming');
  });

  it('uses smooth scroll into view after leaving edit mode', async () => {
    // jsdom does not implement scrollIntoView - provide a stub so calling it does not throw
    const scrollSpy = vi.fn();
    Element.prototype.scrollIntoView = scrollSpy;

    const { rerender } = render(
      <ProjectForm
        setProjects={vi.fn()}
        setEditProject={vi.fn()}
        handleUpdate={vi.fn()}
        editProject={{ id: 1, project: 'x', status: 'upcoming', tags: [], description: '' }}
      />
    );

    // Transition from edit mode to create mode -> effect should call scrollIntoView
    rerender(
      <ProjectForm
        setProjects={vi.fn()}
        setEditProject={vi.fn()}
        handleUpdate={vi.fn()}
        editProject={null}
      />
    );

    expect(scrollSpy).toHaveBeenCalled();
  });
});
