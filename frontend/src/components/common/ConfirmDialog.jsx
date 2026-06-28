import { AlertTriangle } from "lucide-react";
import Modal from "./Modal.jsx";
import Button from "./Button.jsx";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title = "Delete Task",
  message = "Are you sure you want to delete this task? This action cannot be undone.",
  taskTitle,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="text-center">
        <div className="mx-auto w-14 h-14 rounded-full bg-rose-50 dark:bg-rose-950/20 flex items-center justify-center mb-4 transition-colors duration-300">
          <AlertTriangle className="w-7 h-7 text-rose-500 dark:text-rose-400" />
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1 transition-colors duration-300">{message}</p>
        {taskTitle && (
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-6 transition-colors duration-300">
            "{taskTitle}"
          </p>
        )}

        <div className="flex items-center gap-3 mt-6">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="flex-1"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
}
