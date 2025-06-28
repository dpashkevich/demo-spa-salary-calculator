import * as stylex from "@stylexjs/stylex";
import type { ChangeEvent } from "react";

interface SelectProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  error?: string;
  id?: string;
}

export default function Select({
  value,
  onChange,
  options,
  placeholder,
  error,
  id,
}: SelectProps) {
  return (
    <div {...stylex.props(styles.wrapper)}>
      <select
        {...stylex.props(styles.select, error ? styles.selectError : undefined)}
        value={value}
        onChange={onChange}
        id={id}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <div {...stylex.props(styles.error)}>{error}</div>}
    </div>
  );
}

const styles = stylex.create({
  wrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  select: {
    width: "100%",
    background: "#303033",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 8,
    fontSize: 16,
    fontFamily: "JetBrains Sans, sans-serif",
    padding: "12px 16px",
    outline: "none",
    appearance: "none",
  },
  selectError: {
    borderColor: "#ff4d4f",
  },
  error: {
    color: "#ff4d4f",
    fontSize: 12,
    marginTop: 2,
  },
});
