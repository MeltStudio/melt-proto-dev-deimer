import { Button } from "@/ui/components/Button";
import { FeatherEdit2, FeatherEye } from "@subframe/core";
import { Task } from "../hooks/useMockTasks";
import { formatDate } from "../utils/formatDate";
import { TaskStatusBadge } from "./TaskStatusBadge";


type TaskCardProps = {
  task: Task;
  onViewTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  isUpdating: boolean;
};

export function TaskCard({
  task,
  onViewTask,
  onEditTask,
  isUpdating,
}: TaskCardProps) {
  return (
    <div className="flex w-full flex-col items-start gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md">
      <div className="flex w-full items-start justify-between gap-4">
        <span className="text-lg font-semibold text-slate-900">
          {task.title}
        </span>
        <TaskStatusBadge status={task.status} />
      </div>
      <span className="text-slate-600 leading-relaxed">
        {task.description || "No description"}
      </span>
      <div className="flex w-full items-center justify-between pt-4 border-t border-slate-200">
        <span className="text-sm text-slate-500 font-medium">
          {formatDate(task.dueDate)}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="neutral-tertiary"
            size="small"
            icon={<FeatherEye />}
            onClick={() => onViewTask(task)}
          >
            View
          </Button>
          <Button
            variant="neutral-tertiary"
            size="small"
            icon={<FeatherEdit2 />}
            onClick={() => onEditTask(task)}
            disabled={isUpdating}
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
}
