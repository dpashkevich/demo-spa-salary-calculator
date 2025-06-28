"use client";

import * as React from "react";
import * as stylex from '@stylexjs/stylex';
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";

const styles = stylex.create({
  trigger: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.5rem',
    borderRadius: '0.375rem',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--input-background)',
    paddingLeft: '0.75rem',
    paddingRight: '0.75rem',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    fontSize: '0.875rem',
    whiteSpace: 'nowrap',
    transition: 'color 0.15s ease, box-shadow 0.15s ease',
    outline: 'none',
  },
  triggerFocusVisible: {
    borderColor: 'var(--ring)',
    boxShadow: '0 0 0 3px rgba(var(--ring), 0.5)',
  },
  triggerDisabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
  triggerDefault: {
    height: '2.25rem',
  },
  triggerSm: {
    height: '2rem',
  },
  triggerIcon: {
    pointerEvents: 'none',
    flexShrink: 0,
    width: '1rem',
    height: '1rem',
    opacity: 0.5,
  },
  content: {
    position: 'relative',
    zIndex: 50,
    maxHeight: 'var(--radix-select-content-available-height)',
    minWidth: '8rem',
    transformOrigin: 'var(--radix-select-content-transform-origin)',
    overflowX: 'hidden',
    overflowY: 'auto',
    borderRadius: '0.375rem',
    border: '1px solid var(--border)',
    backgroundColor: 'var(--popover)',
    color: 'var(--popover-foreground)',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  contentPopper: {
    // Data attribute selectors will be handled via CSS classes
  },
  viewport: {
    padding: '0.25rem',
  },
  viewportPopper: {
    height: 'var(--radix-select-trigger-height)',
    width: '100%',
    minWidth: 'var(--radix-select-trigger-width)',
    scrollMargin: '0.25rem',
  },
  label: {
    color: 'var(--muted-foreground)',
    paddingLeft: '0.5rem',
    paddingRight: '0.5rem',
    paddingTop: '0.375rem',
    paddingBottom: '0.375rem',
    fontSize: '0.75rem',
  },
  item: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    cursor: 'default',
    alignItems: 'center',
    gap: '0.5rem',
    borderRadius: '0.125rem',
    paddingTop: '0.375rem',
    paddingBottom: '0.375rem',
    paddingRight: '2rem',
    paddingLeft: '0.5rem',
    fontSize: '0.875rem',
    outline: 'none',
    userSelect: 'none',
  },
  itemFocus: {
    backgroundColor: 'var(--accent)',
    color: 'var(--accent-foreground)',
  },
  itemDisabled: {
    pointerEvents: 'none',
    opacity: 0.5,
  },
  itemIndicator: {
    position: 'absolute',
    right: '0.5rem',
    display: 'flex',
    width: '0.875rem',
    height: '0.875rem',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemIndicatorIcon: {
    width: '1rem',
    height: '1rem',
  },
  separator: {
    backgroundColor: 'var(--border)',
    pointerEvents: 'none',
    marginLeft: '-0.25rem',
    marginRight: '-0.25rem',
    marginTop: '0.25rem',
    marginBottom: '0.25rem',
    height: '1px',
  },
  scrollButton: {
    display: 'flex',
    cursor: 'default',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '0.25rem',
    paddingBottom: '0.25rem',
  },
  scrollButtonIcon: {
    width: '1rem',
    height: '1rem',
  },
});

function Select({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

interface SelectTriggerProps extends React.ComponentProps<typeof SelectPrimitive.Trigger> {
  size?: "sm" | "default";
  sx?: stylex.StyleXStyles;
  children?: React.ReactNode;
}

function SelectTrigger({
  sx,
  size = "default",
  children,
  ...props
}: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      {...stylex.props(
        styles.trigger,
        size === "default" && styles.triggerDefault,
        size === "sm" && styles.triggerSm,
        sx
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon {...stylex.props(styles.triggerIcon)} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

interface SelectContentProps extends React.ComponentProps<typeof SelectPrimitive.Content> {
  sx?: stylex.StyleXStyles;
  children?: React.ReactNode;
  position?: "popper" | "item-aligned";
}

function SelectContent({
  sx,
  children,
  position = "popper",
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        {...stylex.props(
          styles.content,
          position === "popper" && styles.contentPopper,
          sx
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          {...stylex.props(
            styles.viewport,
            position === "popper" && styles.viewportPopper
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

interface SelectLabelProps extends React.ComponentProps<typeof SelectPrimitive.Label> {
  sx?: stylex.StyleXStyles;
}

function SelectLabel({
  sx,
  ...props
}: SelectLabelProps) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      {...stylex.props(styles.label, sx)}
      {...props}
    />
  );
}

interface SelectItemProps extends React.ComponentProps<typeof SelectPrimitive.Item> {
  sx?: stylex.StyleXStyles;
  children?: React.ReactNode;
}

function SelectItem({
  sx,
  children,
  ...props
}: SelectItemProps) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      {...stylex.props(styles.item, sx)}
      {...props}
    >
      <span {...stylex.props(styles.itemIndicator)}>
        <SelectPrimitive.ItemIndicator>
          <CheckIcon {...stylex.props(styles.itemIndicatorIcon)} />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

interface SelectSeparatorProps extends React.ComponentProps<typeof SelectPrimitive.Separator> {
  sx?: stylex.StyleXStyles;
}

function SelectSeparator({
  sx,
  ...props
}: SelectSeparatorProps) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      {...stylex.props(styles.separator, sx)}
      {...props}
    />
  );
}

interface SelectScrollUpButtonProps extends React.ComponentProps<typeof SelectPrimitive.ScrollUpButton> {
  sx?: stylex.StyleXStyles;
}

function SelectScrollUpButton({
  sx,
  ...props
}: SelectScrollUpButtonProps) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      {...stylex.props(styles.scrollButton, sx)}
      {...props}
    >
      <ChevronUpIcon {...stylex.props(styles.scrollButtonIcon)} />
    </SelectPrimitive.ScrollUpButton>
  );
}

interface SelectScrollDownButtonProps extends React.ComponentProps<typeof SelectPrimitive.ScrollDownButton> {
  sx?: stylex.StyleXStyles;
}

function SelectScrollDownButton({
  sx,
  ...props
}: SelectScrollDownButtonProps) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      {...stylex.props(styles.scrollButton, sx)}
      {...props}
    >
      <ChevronDownIcon {...stylex.props(styles.scrollButtonIcon)} />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
