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
  onEditTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
};

export function TasksTable({
  tasks,
  onEditTask,
  onDeleteTask,
}: TasksTableProps) {
  return (
    <div className="flex w-full items-start mobile:hidden bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
      <Table
        header={
          <Table.HeaderRow className="bg-slate-50 border-b border-slate-200">
            <Table.HeaderCell className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
              Title
            </Table.HeaderCell>
            <Table.HeaderCell className="px-6 py-4 text-left text-sm font-semibold text-slate-900 mobile:hidden">
              Description
            </Table.HeaderCell>
            <Table.HeaderCell className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
              Status
            </Table.HeaderCell>
            <Table.HeaderCell className="px-6 py-4 text-left text-sm font-semibold text-slate-900">
              Due Date
            </Table.HeaderCell>
            <Table.HeaderCell className="px-6 py-4 text-right text-sm font-semibold text-slate-900">
              Actions
            </Table.HeaderCell>
          </Table.HeaderRow>
        }
      >
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
