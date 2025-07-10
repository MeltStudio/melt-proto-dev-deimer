"use client";

import React from "react";
import { Button } from "@/ui/components/Button";
import { FeatherPlus } from "@subframe/core";
import { TextField } from "@/ui/components/TextField";
import { FeatherChevronDown } from "@subframe/core";
import { ToggleGroup } from "@/ui/components/ToggleGroup";
import { FeatherLayoutGrid } from "@subframe/core";
import { FeatherList } from "@subframe/core";
import { Badge } from "@/ui/components/Badge";
import { FeatherEye } from "@subframe/core";
import { FeatherEdit2 } from "@subframe/core";
import { Table } from "@/ui/components/Table";
import { DropdownMenu } from "@/ui/components/DropdownMenu";
import { FeatherTrash } from "@subframe/core";
import * as SubframeCore from "@subframe/core";
import { IconButton } from "@/ui/components/IconButton";
import { FeatherMoreHorizontal } from "@subframe/core";

function Home() {
  return (
    <div className="container max-w-none flex h-full w-full flex-col items-start gap-8 bg-default-background py-12 mobile:px-4 mobile:py-6">
      <div className="flex w-full items-center gap-4 mobile:flex-col mobile:flex-nowrap mobile:items-start mobile:justify-start mobile:gap-4">
        <span className="grow shrink-0 basis-0 text-heading-1 font-heading-1 text-default-font mobile:text-heading-2 mobile:font-heading-2">
          Tasks
        </span>
        <Button
          className="mobile:w-full"
          icon={<FeatherPlus />}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
        >
          Create Task
        </Button>
      </div>
      <div className="flex w-full flex-col items-start gap-8">
        <div className="flex w-full items-center gap-4 mobile:flex-col mobile:flex-nowrap mobile:gap-4">
          <div className="flex grow shrink-0 basis-0 items-center gap-2 mobile:flex-col mobile:flex-nowrap mobile:gap-2">
            <TextField className="mobile:w-full" label="" helpText="">
              <TextField.Input
                placeholder="Search tasks..."
                value=""
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
              />
            </TextField>
            <div className="flex items-center gap-2 mobile:h-auto mobile:w-full mobile:flex-none">
              <Button
                className="mobile:grow"
                variant="neutral-secondary"
                iconRight={<FeatherChevronDown />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Filter by status
              </Button>
              <Button
                className="mobile:grow"
                variant="neutral-secondary"
                iconRight={<FeatherChevronDown />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
              >
                Sort by
              </Button>
            </div>
          </div>
          <ToggleGroup
            className="mobile:hidden"
            value=""
            onValueChange={(value: string) => {}}
          >
            <ToggleGroup.Item
              className="h-7 w-auto flex-none"
              icon={<FeatherLayoutGrid />}
              value="d658b967"
            />
            <ToggleGroup.Item
              className="h-7 w-auto flex-none"
              icon={<FeatherList />}
              value="73568c92"
            />
          </ToggleGroup>
        </div>
        <div className="hidden w-full flex-col items-start gap-4 mobile:flex">
          <div className="flex w-full flex-col items-start gap-4 rounded-md border border-solid border-neutral-border px-4 py-4">
            <div className="flex w-full items-start justify-between">
              <span className="text-body-bold font-body-bold text-default-font">
                Update landing page
              </span>
              <Badge variant="warning">In Progress</Badge>
            </div>
            <span className="text-body font-body text-subtext-color">
              Revise hero section and add new testimonials
            </span>
            <div className="flex w-full items-center justify-between">
              <span className="text-body font-body text-neutral-500">
                Aug 25, 2024
              </span>
              <div className="flex items-center gap-2">
                <Button
                  variant="neutral-tertiary"
                  size="small"
                  icon={<FeatherEye />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  View
                </Button>
                <Button
                  variant="neutral-tertiary"
                  size="small"
                  icon={<FeatherEdit2 />}
                  onClick={(event: React.MouseEvent<HTMLButtonElement>) => {}}
                >
                  Edit
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full items-start mobile:hidden">
          <Table
            header={
              <Table.HeaderRow>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell className="mobile:hidden">
                  Description
                </Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Due Date</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.HeaderRow>
            }
          >
            <Table.Row>
              <Table.Cell>
                <span className="text-body-bold font-body-bold text-default-font">
                  Update landing page
                </span>
              </Table.Cell>
              <Table.Cell>
                <span className="text-body font-body text-subtext-color">
                  Revise hero section and add new testimonials
                </span>
              </Table.Cell>
              <Table.Cell>
                <Badge variant="warning">In Progress</Badge>
              </Table.Cell>
              <Table.Cell>
                <span className="text-body font-body text-neutral-500">
                  Aug 25, 2024
                </span>
              </Table.Cell>
              <Table.Cell>
                <div className="flex grow shrink-0 basis-0 items-center justify-end">
                  <SubframeCore.DropdownMenu.Root>
                    <SubframeCore.DropdownMenu.Trigger asChild={true}>
                      <IconButton
                        icon={<FeatherMoreHorizontal />}
                        onClick={(
                          event: React.MouseEvent<HTMLButtonElement>
                        ) => {}}
                      />
                    </SubframeCore.DropdownMenu.Trigger>
                    <SubframeCore.DropdownMenu.Portal>
                      <SubframeCore.DropdownMenu.Content
                        side="bottom"
                        align="end"
                        sideOffset={4}
                        asChild={true}
                      >
                        <DropdownMenu>
                          <DropdownMenu.DropdownItem icon={<FeatherEye />}>
                            View
                          </DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem icon={<FeatherEdit2 />}>
                            Edit
                          </DropdownMenu.DropdownItem>
                          <DropdownMenu.DropdownItem icon={<FeatherTrash />}>
                            Delete
                          </DropdownMenu.DropdownItem>
                        </DropdownMenu>
                      </SubframeCore.DropdownMenu.Content>
                    </SubframeCore.DropdownMenu.Portal>
                  </SubframeCore.DropdownMenu.Root>
                </div>
              </Table.Cell>
            </Table.Row>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Home;