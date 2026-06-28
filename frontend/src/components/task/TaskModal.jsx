import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import Modal from "../common/Modal.jsx";
import Input from "../common/Input.jsx";
import Textarea from "../common/Textarea.jsx";
import Select from "../common/Select.jsx";
import Button from "../common/Button.jsx";
import { createTaskSchema, updateTaskSchema } from "../../utils/taskSchema.js";
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from "../../constants/index.js";

export default function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  task = null,
}) {
  const isEditing = !!task;
  const schema = isEditing ? updateTaskSchema : createTaskSchema;

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
      dueDate: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (task) {
        reset({
          title: task.title || "",
          description: task.description || "",
          priority: task.priority || "Medium",
          status: task.status || "Pending",
          dueDate: task.dueDate
            ? format(new Date(task.dueDate), "yyyy-MM-dd")
            : "",
        });
      } else {
        reset({
          title: "",
          description: "",
          priority: "Medium",
          status: "Pending",
          dueDate: "",
        });
      }
    }
  }, [isOpen, task, reset]);

  const descriptionValue = watch("description");

  const handleFormSubmit = (data) => {
    const payload = { ...data };
    if (payload.dueDate) {
      payload.dueDate = new Date(payload.dueDate).toISOString();
    }
    if (!payload.description) {
      payload.description = "";
    }
    onSubmit(payload);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Task" : "Create New Task"}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
        <Input
          label="Title"
          placeholder="Enter task title..."
          error={errors.title?.message}
          {...register("title")}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <Textarea
              label="Description"
              placeholder="Add a description (optional)..."
              maxLength={500}
              error={errors.description?.message}
              {...field}
            />
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Priority"
            options={PRIORITY_OPTIONS}
            error={errors.priority?.message}
            {...register("priority")}
          />
          <Select
            label="Status"
            options={STATUS_OPTIONS}
            error={errors.status?.message}
            {...register("status")}
          />
        </div>

        <Input
          label="Due Date"
          type="date"
          error={errors.dueDate?.message}
          {...register("dueDate")}
        />

        <div className="flex items-center gap-3 pt-2">
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" className="flex-1" isLoading={isLoading}>
            {isEditing ? "Update Task" : "Create Task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
