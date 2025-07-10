import { DropdownMenu } from "@/ui/components/DropdownMenu";
import { IconButton } from "@/ui/components/IconButton";
import { Table } from "@/ui/components/Table";
import * as SubframeCore from "@subframe/core";
import {
  FeatherEdit2,
  FeatherEye,
  FeatherMoreHorizontal,
  FeatherTrash,
} from "@subframe/core";
import { Task } from "../hooks/useMockTasks";
import { formatDate } from "../utils/formatDate";
import { TaskStatusBadge } from "./TaskStatusBadge";

type TasksTableProps = {
  tasks: Task[];
  sortConfig: { key: string; direction: "asc" | "desc" };
  onSort: (key: keyof Task) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
};

const SortIcon = ({ direction }: { direction?: "asc" | "desc" }) => {
  if (!direction) return null;
  return direction === "asc" ? (
    <SubframeCore.FeatherArrowUp className="w-4 h-4 ml-1" />
  ) : (
    <SubframeCore.FeatherArrowDown className="w-4 h-4 ml-1" />
  );
};

export function TasksTable({
  tasks,
  onEditTask,
  onDeleteTask,
  onSort,
  sortConfig,
}: TasksTableProps) {
  const renderHeaderCell = (label: string, sortKey: keyof Task) => (
    <Table.HeaderCell
      className="cursor-pointer hover:bg-slate-100"
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center">
        {label}
        {sortConfig.key === sortKey && (
          <SortIcon direction={sortConfig.direction} />
        )}
      </div>
    </Table.HeaderCell>
  );
  return (
    <div className="flex w-full items-start mobile:hidden bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <Table>
        <Table.HeaderRow className="bg-slate-50 border-b border-slate-200">
          {renderHeaderCell("Title", "title")}
          <Table.HeaderCell>Description</Table.HeaderCell>
          {renderHeaderCell("Status", "status")}
          {renderHeaderCell("Due Date", "dueDate")}
          <Table.HeaderCell className="text-right">Actions</Table.HeaderCell>
        </Table.HeaderRow>
        {tasks?.map((task) => {
          return (
            <Table.Row
              key={task.id}
              className="hover:bg-slate-50 transition-colors duration-200 border-b border-slate-200 last:border-b-0"
            >
              <Table.Cell className="px-6 py-4">
                <span className="text-base font-semibold text-slate-900">
                  {task.title}
                </span>
              </Table.Cell>
              <Table.Cell className="px-6 py-4">
                <span className="text-slate-600">
                  {task.description || "No description"}
                </span>
              </Table.Cell>
              <Table.Cell className="px-6 py-4">
                <TaskStatusBadge status={task.status} />
              </Table.Cell>
              <Table.Cell className="px-6 py-4">
                <span className="text-slate-600 font-medium">
                  {formatDate(task.dueDate)}
                </span>
              </Table.Cell>
              <Table.Cell className="px-6 py-4">
                <div className="flex items-center justify-end">
                  <SubframeCore.DropdownMenu.Root>
                    <SubframeCore.DropdownMenu.Trigger asChild={true}>
                      <IconButton
                        icon={<FeatherMoreHorizontal />}
                        className="hover:bg-slate-100 transition-colors duration-200 rounded-lg p-2"
                      />
                    </SubframeCore.DropdownMenu.Trigger>
                    <SubframeCore.DropdownMenu.Portal>
                      <SubframeCore.DropdownMenu.Content
                        side="bottom"
                        align="end"
                        sideOffset={4}
                        asChild={true}
                      >
                        <DropdownMenu className="bg-white border border-slate-200 shadow-lg rounded-lg p-1">
                          <DropdownMenu.DropdownItem
                            icon={<FeatherEdit2 />}
                            onClick={() => onEditTask(task)}
                            className="hover:bg-slate-100 transition-colors duration-200 rounded px-3 py-2"
                          >
                            Edit
                          </DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem
                            icon={<FeatherTrash />}
                            onClick={() => onDeleteTask(task.id)}
                            className="hover:bg-red-50 text-red-600 transition-colors duration-200 rounded px-3 py-2"
                          >
                            Delete
                          </DropdownMenu.DropdownItem>
                        </DropdownMenu>
                      </SubframeCore.DropdownMenu.Content>
                    </SubframeCore.DropdownMenu.Portal>
                  </SubframeCore.DropdownMenu.Root>
                </div>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table>
    </div>
  );
}
