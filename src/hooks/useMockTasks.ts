import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "Pending" | "In Progress" | "Completed" | "Cancelled";
  dueDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTaskInput {
  title: string;
  description?: string;
  status?: "Pending" | "In Progress" | "Completed" | "Cancelled";
  dueDate?: Date | null;
}

export interface UpdateTaskInput {
  id: string;
  title?: string;
  description?: string;
  status?: "Pending" | "In Progress" | "Completed" | "Cancelled";
  dueDate?: Date | null;
}

let mockTasks: Task[] = [
  {
    id: "1",
    title: "Update landing page",
    description: "Revise hero section and add new testimonials",
    status: "In Progress",
    dueDate: new Date("2024-08-25"),
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Build authentication system",
    description:
      "Implement user login, registration, and password reset functionality",
    status: "Pending",
    dueDate: new Date("2024-08-30"),
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-16"),
  },
  {
    id: "3",
    title: "Write API documentation",
    description:
      "Document all API endpoints with examples and usage instructions",
    status: "Completed",
    dueDate: new Date("2024-08-20"),
    createdAt: new Date("2024-01-13"),
    updatedAt: new Date("2024-01-13"),
  },
  {
    id: "4",
    title: "Setup CI/CD pipeline",
    description: "Configure automated testing and deployment workflows",
    status: "In Progress",
    dueDate: new Date("2024-09-01"),
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-12"),
  },
  {
    id: "5",
    title: "Database optimization",
    description: "Optimize database queries and add proper indexing",
    status: "Cancelled",
    dueDate: null,
    createdAt: new Date("2024-01-11"),
    updatedAt: new Date("2024-01-11"),
  },
];

const mockApi = {
  getTasks: async (): Promise<Task[]> => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
    return [...mockTasks];
  },

  createTask: async (input: CreateTaskInput): Promise<Task> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const newTask: Task = {
      id: Date.now().toString(),
      title: input.title,
      description: input.description,
      status: input.status || "Pending",
      dueDate: input.dueDate || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    mockTasks.push(newTask);
    return newTask;
  },

  updateTask: async (input: UpdateTaskInput): Promise<Task> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const taskIndex = mockTasks.findIndex((task) => task.id === input.id);
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

    const updatedTask = {
      ...mockTasks[taskIndex],
      ...input,
      updatedAt: new Date(),
    };

    mockTasks[taskIndex] = updatedTask;
    return updatedTask;
  },

  deleteTask: async (id: string): Promise<void> => {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const taskIndex = mockTasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

    mockTasks.splice(taskIndex, 1);
  },
};

const QUERY_KEYS = {
  tasks: ["tasks"] as const,
  task: (id: string) => ["tasks", id] as const,
};

export const useTasks = () => {
  return useQuery({
    queryKey: QUERY_KEYS.tasks,
    queryFn: mockApi.getTasks,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mockApi.createTask,
    onSuccess: (newTask) => {
      queryClient.setQueryData(
        QUERY_KEYS.tasks,
        (oldTasks: Task[] | undefined) => {
          return oldTasks ? [...oldTasks, newTask] : [newTask];
        }
      );
    },
    onError: (error) => {
      console.error("Failed to create task:", error);
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mockApi.updateTask,
    onSuccess: (updatedTask) => {
      queryClient.setQueryData(
        QUERY_KEYS.tasks,
        (oldTasks: Task[] | undefined) => {
          return oldTasks?.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          );
        }
      );
    },
    onError: (error) => {
      console.error("Failed to update task:", error);
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mockApi.deleteTask,
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData(
        QUERY_KEYS.tasks,
        (oldTasks: Task[] | undefined) => {
          return oldTasks?.filter((task) => task.id !== deletedId);
        }
      );
    },
    onError: (error) => {
      console.error("Failed to delete task:", error);
    },
  });
};

export const useTask = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.task(id),
    queryFn: async () => {
      const tasks = await mockApi.getTasks();
      const task = tasks.find((t) => t.id === id);
      if (!task) throw new Error("Task not found");
      return task;
    },
    enabled: !!id,
  });
};

export const useFilteredTasks = (
  searchTerm: string = "",
  statusFilter: string = ""
) => {
  const { data: tasks, ...rest } = useTasks();

  const filteredTasks = useMemo(() => {
    if (!tasks) return [];

    let filtered = tasks;

    if (searchTerm) {
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    return filtered;
  }, [tasks, searchTerm, statusFilter]);

  return {
    data: filteredTasks,
    ...rest,
  };
};

export const useTaskStats = () => {
  const { data: tasks } = useTasks();

  return useMemo(() => {
    if (!tasks)
      return {
        total: 0,
        pending: 0,
        inProgress: 0,
        completed: 0,
        cancelled: 0,
      };

    return {
      total: tasks.length,
      pending: tasks.filter((t) => t.status === "Pending").length,
      inProgress: tasks.filter((t) => t.status === "In Progress").length,
      completed: tasks.filter((t) => t.status === "Completed").length,
      cancelled: tasks.filter((t) => t.status === "Cancelled").length,
    };
  }, [tasks]);
};
