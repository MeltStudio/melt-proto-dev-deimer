"use client";
/*
 * Documentation:
 * Task manager — https://app.subframe.com/library?component=Task+manager_a6a96a3b-e2c9-4ccc-a9b7-b0eb7eed783c
 * Table — https://app.subframe.com/library?component=Table_142dfde7-d0cc-48a1-a04c-a08ab2252633
 * Badge — https://app.subframe.com/library?component=Badge_97bdb082-1124-4dd7-a335-b14b822d0157
 * Dropdown Menu — https://app.subframe.com/library?component=Dropdown+Menu_99951515-459b-4286-919e-a89e7549b43b
 * Icon Button — https://app.subframe.com/library?component=Icon+Button_af9405b1-8c54-4e01-9786-5aad308224f6
 */

import React from "react";
import * as SubframeUtils from "../utils";
import { Table } from "./Table";
import { Badge } from "./Badge";
import { DropdownMenu } from "./DropdownMenu";
import * as SubframeCore from "@subframe/core";
import { IconButton } from "./IconButton";
import { FeatherMoreHorizontal } from "@subframe/core";

interface TaskManagerRootProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: React.ReactNode;
  text2?: React.ReactNode;
  text3?: React.ReactNode;
  text4?: React.ReactNode;
  text5?: React.ReactNode;
  text6?: React.ReactNode;
  text7?: React.ReactNode;
  text8?: React.ReactNode;
  text9?: React.ReactNode;
  className?: string;
}

const TaskManagerRoot = React.forwardRef<HTMLElement, TaskManagerRootProps>(
  function TaskManagerRoot(
    {
      text,
      text2,
      text3,
      text4,
      text5,
      text6,
      text7,
      text8,
      text9,
      className,
      ...otherProps
    }: TaskManagerRootProps,
    ref
  ) {
    return (
      <div
        className={SubframeUtils.twClassNames(
          "container max-w-none flex h-full w-full flex-col items-start gap-4 bg-default-background py-12",
          className
        )}
        ref={ref as any}
        {...otherProps}
      >
        <Table
          header={
            <Table.HeaderRow>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Due Date</Table.HeaderCell>
            </Table.HeaderRow>
          }
        >
          <Table.Row>
            <Table.Cell>
              {text ? (
                <span className="whitespace-nowrap text-body-bold font-body-bold text-neutral-700">
                  {text}
                </span>
              ) : null}
            </Table.Cell>
            <Table.Cell>
              {text2 ? (
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  {text2}
                </span>
              ) : null}
            </Table.Cell>
            <Table.Cell>
              <Badge>Engineering</Badge>
            </Table.Cell>
            <Table.Cell>
              <div className="flex grow shrink-0 basis-0 items-center gap-2 self-stretch">
                {text3 ? (
                  <span className="text-body font-body text-default-font">
                    {text3}
                  </span>
                ) : null}
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="flex grow shrink-0 basis-0 items-center justify-end">
                <SubframeCore.DropdownMenu.Root>
                  <SubframeCore.DropdownMenu.Trigger asChild={true}>
                    <IconButton
                      size="medium"
                      icon={<FeatherMoreHorizontal />}
                    />
                  </SubframeCore.DropdownMenu.Trigger>
                  <SubframeCore.DropdownMenu.Portal>
                    <SubframeCore.DropdownMenu.Content
                      side="bottom"
                      align="end"
                      sideOffset={8}
                      asChild={true}
                    >
                      <DropdownMenu />
                    </SubframeCore.DropdownMenu.Content>
                  </SubframeCore.DropdownMenu.Portal>
                </SubframeCore.DropdownMenu.Root>
              </div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {text4 ? (
                <span className="whitespace-nowrap text-body-bold font-body-bold text-neutral-700">
                  {text4}
                </span>
              ) : null}
            </Table.Cell>
            <Table.Cell>
              {text5 ? (
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  {text5}
                </span>
              ) : null}
            </Table.Cell>
            <Table.Cell>
              <Badge variant="warning">Design</Badge>
            </Table.Cell>
            <Table.Cell>
              <div className="flex grow shrink-0 basis-0 items-center gap-2 self-stretch">
                {text6 ? (
                  <span className="text-body font-body text-default-font">
                    {text6}
                  </span>
                ) : null}
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="flex grow shrink-0 basis-0 items-center justify-end">
                <SubframeCore.DropdownMenu.Root>
                  <SubframeCore.DropdownMenu.Trigger asChild={true}>
                    <IconButton
                      size="medium"
                      icon={<FeatherMoreHorizontal />}
                    />
                  </SubframeCore.DropdownMenu.Trigger>
                  <SubframeCore.DropdownMenu.Portal>
                    <SubframeCore.DropdownMenu.Content
                      side="bottom"
                      align="end"
                      sideOffset={8}
                      asChild={true}
                    >
                      <DropdownMenu />
                    </SubframeCore.DropdownMenu.Content>
                  </SubframeCore.DropdownMenu.Portal>
                </SubframeCore.DropdownMenu.Root>
              </div>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>
              {text7 ? (
                <span className="whitespace-nowrap text-body-bold font-body-bold text-neutral-700">
                  {text7}
                </span>
              ) : null}
            </Table.Cell>
            <Table.Cell>
              {text8 ? (
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  {text8}
                </span>
              ) : null}
            </Table.Cell>
            <Table.Cell>
              <Badge variant="success">Product</Badge>
            </Table.Cell>
            <Table.Cell>
              <div className="flex grow shrink-0 basis-0 items-center gap-2 self-stretch">
                {text9 ? (
                  <span className="text-body font-body text-default-font">
                    {text9}
                  </span>
                ) : null}
              </div>
            </Table.Cell>
            <Table.Cell>
              <div className="flex grow shrink-0 basis-0 items-center justify-end">
                <SubframeCore.DropdownMenu.Root>
                  <SubframeCore.DropdownMenu.Trigger asChild={true}>
                    <IconButton
                      size="medium"
                      icon={<FeatherMoreHorizontal />}
                    />
                  </SubframeCore.DropdownMenu.Trigger>
                  <SubframeCore.DropdownMenu.Portal>
                    <SubframeCore.DropdownMenu.Content
                      side="bottom"
                      align="end"
                      sideOffset={8}
                      asChild={true}
                    >
                      <DropdownMenu />
                    </SubframeCore.DropdownMenu.Content>
                  </SubframeCore.DropdownMenu.Portal>
                </SubframeCore.DropdownMenu.Root>
              </div>
            </Table.Cell>
          </Table.Row>
        </Table>
      </div>
    );
  }
);

export const TaskManager = TaskManagerRoot;
