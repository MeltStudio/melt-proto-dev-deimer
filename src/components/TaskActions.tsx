import React from "react";
import { Button } from "@/ui/components/Button";
import { TextField } from "@/ui/components/TextField";
import { ToggleGroup } from "@/ui/components/ToggleGroup";

// Importaciones corregidas para seguir el patrón de TasksTable
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import * as SubframeCore from "@subframe/core";
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

const filterOptions = [
  { value: "", label: "All Statuses" },
  { value: "Pending", label: "Pending" },
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
  { value: "Cancelled", label: "Cancelled" },
];

export function TaskActions({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  viewMode,
  onViewModeChange,
}: TaskActionsProps) {
  return (
    <div className="flex w-full items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-slate-200 mobile:flex-col mobile:gap-4">
      <div className="flex grow items-center gap-4 mobile:flex-col mobile:w-full mobile:gap-4">
        {/* Search Input */}
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
        <div className="flex items-center gap-3 mobile:w-full">
          <SubframeCore.DropdownMenu.Root>
            <SubframeCore.DropdownMenu.Trigger asChild={true}>
              <Button
                className="mobile:w-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors"
                variant="neutral-secondary"
                iconRight={<FeatherChevronDown />}
              >
                {statusFilter ? `Status: ${statusFilter}` : "Filter by status"}
              </Button>
            </SubframeCore.DropdownMenu.Trigger>
            <SubframeCore.DropdownMenu.Portal>
              <SubframeCore.DropdownMenu.Content
                side="bottom"
                align="end"
                sideOffset={4}
                asChild={true}
              >
                {/* Usamos tu componente DropdownMenu para el contenedor, igual que en la tabla */}
                <DropdownMenu className="bg-white border border-slate-200 shadow-lg rounded-lg p-1">
                  {filterOptions.map((option) => (
                    <DropdownMenu.DropdownItem
                      key={option.value}
                      onClick={() => onStatusFilterChange(option.value)}
                      className="hover:bg-slate-100 transition-colors duration-200 rounded px-3 py-2"
                    >
                      {option.label}
                    </DropdownMenu.DropdownItem>
                  ))}
                </DropdownMenu>
              </SubframeCore.DropdownMenu.Content>
            </SubframeCore.DropdownMenu.Portal>
          </SubframeCore.DropdownMenu.Root>
        </div>
      </div>
    </div>
  );
}
