import { useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InputRow, SelectRow, TextareaRow } from "@/components";
import { useForm } from "@/hooks/useForm";
import type { CreateTaskData } from "@/types/task";
import { useTasks } from "@/hooks/useTasks";

interface CreateTaskFormProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const STATUS_OPTIONS = [
  { value: "TODO", label: "To Do" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "COMPLETED", label: "Completed" },
];

const TABS_OPTIONS = {
  DETAILS: "details",
  SUBTASKS: "subtasks",
  TAGS: "tags",
} as const;

const TABS = [
  { id: TABS_OPTIONS.DETAILS, title: "Details" },
  { id: TABS_OPTIONS.SUBTASKS, title: "Subtasks" },
  { id: TABS_OPTIONS.TAGS, title: "Tags" },
];

const CreateTaskForm = ({ isOpen, setIsOpen }: CreateTaskFormProps) => {
  const [activeTab, setActiveTab] = useState<
    (typeof TABS_OPTIONS)[keyof typeof TABS_OPTIONS]
  >(TABS_OPTIONS.DETAILS);
  const { isCreating, createTask } = useTasks();

  const { values, errors, touched, handleChange, handleSubmit, reset } =
    useForm<CreateTaskData>(
      {
        title: "",
        description: "",
        status: "TODO",
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
        createTask(formData, {
          onSuccess: () => {
            setIsOpen(false);
          },
        }),
    );

  const handleClose = () => {
    reset();
    setIsOpen(false);
  };

  const handleStatusChange = (value: string) => {
    handleChange({
      target: { name: "status", value },
    } as React.ChangeEvent<HTMLSelectElement>);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-150 max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
            <DialogDescription>Fill in the details below</DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 border-b mt-4">
            {TABS?.map((tab) => {
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2 px-1 relative cursor-pointer ${
                    activeTab === tab.id
                      ? "text-blue-600 font-semibold border-b-2 border-blue-600"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab.title}
                </button>
              );
            })}
          </div>

          <div className="py-4 space-y-4">
            {activeTab === "details" && (
              <>
                <div>
                  <InputRow
                    name="title"
                    inputType="text"
                    labelText="Title"
                    placeholderText="Enter task title..."
                    value={values.title}
                    onChange={handleChange}
                    error={touched.title ? errors.title : undefined}
                    required
                  />
                  <small className="pl-3">
                    Min 3 characters, max 200 characters
                  </small>
                </div>
                <TextareaRow
                  name="description"
                  labelText="Description"
                  placeholderText="Describe your task in detail"
                  value={values.description || ""}
                  onChange={handleChange}
                  error={touched.description ? errors.description : undefined}
                  rows={5}
                  maxLength={1000}
                />

                <SelectRow
                  name="status"
                  labelText="Status"
                  value={values.status || "TODO"}
                  onChange={handleStatusChange}
                  options={STATUS_OPTIONS}
                  placeholder="Select status"
                />
              </>
            )}

            {activeTab === TABS_OPTIONS.SUBTASKS && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm text-yellow-800">
                  <strong>Coming in Sprint 3:</strong> Subtasks functionality
                  will be added when we implement the parent-child task
                  relationship.
                </p>
              </div>
            )}

            {activeTab === TABS_OPTIONS.TAGS && (
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm text-yellow-800">
                  <strong>Coming in Sprint 3:</strong> Tags functionality will
                  be added with the many-to-many relationship.
                </p>
              </div>
            )}
          </div>
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="border-blue-700 cursor-pointer"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 cursor-pointer"
              disabled={isCreating}
            >
              {isCreating ? "Creating..." : "Create Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default CreateTaskForm;
