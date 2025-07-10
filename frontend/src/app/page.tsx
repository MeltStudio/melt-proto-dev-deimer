"use client";

import React, { useState } from "react";

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

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [viewMode, setViewMode] = useState("table");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "update">("create");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const {
    data: tasks,
    isLoading,
    error,
  } = useFilteredTasks(searchTerm, statusFilter);
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();
  const taskStats = useTaskStats();

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

  const handleViewTask = (task: Task) => {
    console.log("Viewing task:", task);
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
    return (
      <div className="container max-w-7xl mx-auto flex h-full w-full items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2"></div>
          <p className="text-slate-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-7xl mx-auto flex h-full w-full items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Error loading tasks: {error.message}</p>
        </div>
      </div>
    );
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
                onViewTask={handleViewTask}
                onEditTask={handleEditTask}
                isUpdating={updateTask.isPending}
              />
            ))}
          </div>

          <TasksTable
            tasks={tasks}
            onViewTask={handleViewTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
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
