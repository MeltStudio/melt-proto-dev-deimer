
import { Badge } from "@/ui/components/Badge";
import { Task } from "../hooks/useMockTasks";

const getStatusInfo = (status: Task["status"]) => {
  switch (status) {
    case "Pending":
      return {
        variant: "neutral" as const,
        className: "bg-gray-100 text-gray-800",
      };
    case "In Progress":
      return {
        variant: "warning" as const,
        className: "bg-amber-100 text-amber-800",
      };
    case "Completed":
      return {
        variant: "success" as const,
        className: "bg-green-100 text-green-800",
      };
    case "Cancelled":
      return {
        variant: "destructive" as const,
        className: "bg-red-100 text-red-800",
      };
    default:
      return {
        variant: "neutral" as const,
        className: "bg-gray-100 text-gray-800",
      };
  }
};

type TaskStatusBadgeProps = {
  status: Task["status"];
};

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  const statusInfo = getStatusInfo(status);
  return (
    <Badge
      variant={statusInfo.variant}
      className={`${statusInfo.className} px-3 py-1 rounded-full text-xs font-medium`}
    >
      {status}
    </Badge>
  );
}
