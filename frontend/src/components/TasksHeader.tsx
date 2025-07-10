import { Button } from "@/ui/components/Button";
import { FeatherPlus } from "@subframe/core";

type TasksHeaderProps = {
  totalTasks: number;
  onCreateTask: () => void;
  isCreating: boolean;
};

export function TasksHeader({
  totalTasks,
  onCreateTask,
  isCreating,
}: TasksHeaderProps) {
  return (
    <div className="flex w-full items-center justify-between gap-4 bg-white p-6 rounded-lg shadow-sm border border-slate-200 mobile:flex-col mobile:items-start mobile:gap-6">
      <div className="flex flex-col gap-2">
        <span className="text-3xl font-bold text-slate-900 mobile:text-2xl">
          Tasks
        </span>
        <span className="text-sm text-slate-600">
          Manage and track your tasks efficiently • {totalTasks} total tasks
        </span>
      </div>
      <Button
        className="mobile:w-full text-white shadow-md hover:shadow-lg transition-all duration-200 px-6 py-2.5"
        icon={<FeatherPlus />}
        onClick={onCreateTask}
        disabled={isCreating}
      >
        {isCreating ? "Creating..." : "Create Task"}
      </Button>
    </div>
  );
}
