import React from "react";
import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { ToggleGroup } from "@/ui/components/ToggleGroup";
import {
  FeatherChevronDown,
  FeatherSearch,
  FeatherLayoutGrid,
  FeatherList,
} from "@subframe/core";

type TaskActionsProps = {
  searchTerm: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  statusFilter: string;
  onStatusFilterChange: (filter: string) => void;
  viewMode: string;
  onViewModeChange: (mode: string) => void;
};

export function TaskActions({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  viewMode,
  onViewModeChange,
}: TaskActionsProps) {
  const cycleStatusFilter = () => {
    const filters = ["", "Pending", "In Progress", "Completed", "Cancelled"];
    const currentIndex = filters.indexOf(statusFilter);
    const nextIndex = (currentIndex + 1) % filters.length;
    onStatusFilterChange(filters[nextIndex]);
  };

  return (
    <div className="flex w-full items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-slate-200 mobile:flex-col mobile:gap-4">
      <div className="flex grow items-center gap-4 mobile:flex-col mobile:w-full mobile:gap-4">
        <div className="relative flex-1 mobile:w-full">
          <TextField className="mobile:w-full" label="" helpText="">
            <TextField.Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={onSearchChange}
              className="pl-10 bg-slate-50 border-slate-300"
            />
          </TextField>
          <FeatherSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        </div>
        <div className="flex items-center gap-3 mobile:w-full mobile:flex-col mobile:gap-3">
          <Button
            className="mobile:w-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors"
            variant="neutral-secondary"
            iconRight={<FeatherChevronDown />}
            onClick={cycleStatusFilter}
          >
            {statusFilter ? `Status: ${statusFilter}` : "Filter by status"}
          </Button>
        </div>
      </div>
    </div>
  );
}
