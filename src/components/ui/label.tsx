"use client";

import * as React from "react";
import * as stylex from '@stylexjs/stylex';
import * as LabelPrimitive from "@radix-ui/react-label";

const styles = stylex.create({
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    lineHeight: 1,
    fontWeight: 500,
    userSelect: 'none',
  },
  disabled: {
    pointerEvents: 'none',
    opacity: 0.5,
  },
  peerDisabled: {
    cursor: 'not-allowed',
    opacity: 0.5,
  }
});

interface LabelProps extends React.ComponentProps<typeof LabelPrimitive.Root> {
  sx?: stylex.StyleXStyles;
}

function Label({
  sx,
  ...props
}: LabelProps) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      {...stylex.props(styles.label, sx)}
      {...props}
    />
  );
}

export { Label };
