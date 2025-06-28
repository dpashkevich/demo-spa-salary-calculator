import * as stylex from "@stylexjs/stylex";
import type { ChangeEvent } from "react";

interface InputTextProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

export default function InputText({
  value,
  onChange,
  placeholder,
  error,
}: InputTextProps) {
  return (
    <div {...stylex.props(styles.wrapper)}>
      <input
        {...stylex.props(styles.input, error ? styles.inputError : undefined)}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
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
  input: {
    width: "100%",
    background: "#303033",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: 8,
    fontSize: 16,
    fontFamily: "JetBrains Sans, sans-serif",
    padding: "12px 16px",
    outline: "none",
    "::placeholder": {
      color: "#aaa",
      opacity: 1,
    },
  },
  inputError: {
    borderColor: "#ff4d4f",
  },
  error: {
    color: "#ff4d4f",
    fontSize: 12,
    marginTop: 2,
  },
});
