"use client";

import React, { useEffect, useState } from "react";

import { TasksHeader } from "../components/TasksHeader";
import {
  useCreateTask,
  useDeleteTask,
  useFilteredTasks,
  useTaskStats,
  useUpdateTask,
  type Task,
} from "../hooks/useMockTasks";

import { TaskActions } from "../components/TaskActions";
import { TaskCard } from "../components/TaskCard";
import { TasksTable } from "../components/TaskTable";
import { TaskModal } from "../components/TaskModal";
import { Pagination } from "../components/Paginations";
import { Loading } from "../components/Loading";
import { Error } from "../components/Error";

const TASKS_PER_PAGE = 4;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [viewMode, setViewMode] = useState("table");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "update">("create");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Task;
    direction: "asc" | "desc";
  }>({ key: "dueDate", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useFilteredTasks({
    searchTerm,
    statusFilter,
    sortConfig,
    pagination: { currentPage, tasksPerPage: TASKS_PER_PAGE },
  });
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const taskStats = useTaskStats();

  const tasks = data?.tasks ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleSort = (key: keyof Task) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const handleCreateTask = () => {
    setModalMode("create");
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setModalMode("update");
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask.mutate(taskId);
    }
  };

  const handleModalSubmit = (taskData: Partial<Task>) => {
    if (modalMode === "create") {
      createTask.mutate(
        {
          title: taskData.title!,
          description: taskData.description || "",
          status: taskData.status || "Pending",
          dueDate: taskData.dueDate,
        },
        {
          onSuccess: () => {
            setIsModalOpen(false);
          },
        }
      );
    } else {
      updateTask.mutate(
        {
          id: selectedTask!.id,
          ...taskData,
        },
        {
          onSuccess: () => {
            setIsModalOpen(false);
          },
        }
      );
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  if (isLoading) {
    <Loading />;
  }

  if (error) {
    <Error message={error.message} />;
  }

  return (
    <>
      <div className="container max-w-7xl mx-auto flex h-full w-full flex-col items-start gap-8 bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-6 mobile:px-4 mobile:py-6 rounded-xl shadow-sm">
        <TasksHeader
          totalTasks={taskStats.total}
          onCreateTask={handleCreateTask}
          isCreating={createTask.isPending}
        />

        <div className="flex w-full flex-col items-start gap-8">
          <TaskActions
            searchTerm={searchTerm}
            onSearchChange={(e) => setSearchTerm(e.target.value)}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
          <div className="hidden w-full flex-col items-start gap-4 mobile:flex">
            {tasks?.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEditTask={handleEditTask}
                isUpdating={updateTask.isPending}
              />
            ))}
          </div>
          <TasksTable
            tasks={tasks}
            sortConfig={sortConfig}
            onSort={handleSort}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        task={selectedTask}
        isSubmitting={
          modalMode === "create" ? createTask.isPending : updateTask.isPending
        }
        mode={modalMode}
      />
    </>
  );
}
