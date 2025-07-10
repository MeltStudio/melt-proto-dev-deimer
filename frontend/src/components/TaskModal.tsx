"use client";

import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { Task } from "../hooks/useMockTasks";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (taskData: Partial<Task>) => void;
  task?: Task | null;
  isSubmitting?: boolean;
  mode: "create" | "update";
}

export const TaskModal: React.FC<TaskModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  task,
  isSubmitting = false,
  mode,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
  });

  useEffect(() => {
    if (isOpen) {
      if (mode === "update" && task) {
        setFormData({
          title: task.title,
          description: task.description || "",
          status: task.status,
          dueDate: task.dueDate
            ? new Date(task.dueDate).toISOString().split("T")[0]
            : "",
        });
      } else {
        setFormData({
          title: "",
          description: "",
          status: "Pending",
          dueDate: "",
        });
      }
    }
  }, [isOpen, task, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData: Partial<Task> = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
    };

    if (mode === "update" && task) {
      submitData.id = task.id;
    }

    onSubmit(submitData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === "create" ? "Create New Task" : "Update Task"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isSubmitting}
          >
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter task title"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter task description"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="dueDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={isSubmitting}
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={isSubmitting || !formData.title.trim()}
            >
              {isSubmitting
                ? mode === "create"
                  ? "Creating..."
                  : "Updating..."
                : mode === "create"
                ? "Create Task"
                : "Update Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
