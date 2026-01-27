import type { Task } from "@/types/task";
import { useNavigate } from "react-router";
import { useForm } from "@/hooks/useForm";
import type { UpdateTaskData } from "@/types/task";
import { InputRow, SelectRow, TextareaRow } from "@/components";
import { Button } from "@/components/ui/button";
import { useTasks } from "@/hooks/useTasks";
import { useState } from "react";

const STATUS_OPTIONS = [
  { value: "TODO", label: "To Do" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
];

const EditTaskForm = ({ task }: { task: Task }) => {
  const navigate = useNavigate();
  const { editTask, isEditing } = useTasks();

  const { values, errors, touched, handleChange, handleSubmit, reset } =
    useForm<UpdateTaskData>(
      {
        title: task.title,
        description: task.description,
        status: task.status,
      },
      {
        title: (value) => {
          if (!value || value.length < 3)
            return "Title must be at least 3 characters";
          if (value.length > 200)
            return "Title must be less than 200 characters";
          return null;
        },
        description: (value) => {
          if (value && value.length > 1000)
            return "Description must be less than 1000 characters";
          return null;
        },
      },
      (formData) =>
        editTask(
          { taskId: task.id, data: formData },
          {
            onSuccess: () => {
              navigate(`/tasks/${task.id}`);
            },
          },
        ),
    );

  const handleStatusChange = (value: string) => {
    handleChange({
      target: { name: "status", value },
    } as React.ChangeEvent<HTMLSelectElement>);
  };

  const handleCancel = () => {
    navigate(`/tasks/${task.id}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 justify-center bg-white border shadow-sm p-6 rounded-lg"
    >
      <div>
        <InputRow
          name="title"
          inputType="text"
          labelText="Title"
          value={values.title || ""}
          onChange={handleChange}
          error={touched.title ? errors.title : undefined}
          required
        />
        <small className="pl-3">Min 3 characters, max 200 characters</small>
      </div>
      <TextareaRow
        name="description"
        labelText="Description"
        value={values.description || ""}
        onChange={handleChange}
        rows={5}
        maxLength={1000}
        error={touched.description ? errors.description : undefined}
      />
      <SelectRow
        name="status"
        labelText="Status"
        value={values.status || "TODO"}
        onChange={handleStatusChange}
        options={STATUS_OPTIONS}
        placeholder="Select status"
        error={touched.status ? errors.status : undefined}
      />
      <div className="flex items-center justify-end gap-4">
        <Button type="button" variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="secondary"
          className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
          disabled={isEditing}
        >
          {isEditing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>

      {!isEditing && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Unsaved Changes:</strong> Don't forget to save your changes
            before leaving this page.
          </p>
        </div>
      )}
    </form>
  );
};
export default EditTaskForm;
