import { Badge } from "@/ui/components/Badge";
import { Task } from "../hooks/useMockTasks";

const getStatusInfo = (status: Task["status"]) => {
  switch (status) {
    case "Pending":
      return {
        variant: "neutral",
        className: "bg-gray-100 text-gray-800",
      };
    case "In Progress":
      return {
        variant: "warning",
        className: "bg-amber-100 text-amber-800",
      };
    case "Completed":
      return {
        variant: "success",
        className: "bg-green-100 text-green-800",
      };
    case "Cancelled":
      return {
        variant: "destructive",
        className: "bg-red-100 text-red-800",
      };
    default:
      return {
        variant: "neutral",
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
      className={`${statusInfo.className} px-3 py-1 rounded-full text-xs font-medium`}
    >
      {status}
    </Badge>
  );
}
