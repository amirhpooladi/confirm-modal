"use client";

import React, { useEffect, useState, useCallback } from "react";
import "./styles.css";

export interface ConfirmModalProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  type?: "default" | "delete";
}

function AnimatedButton({
  label,
  isLoading,
  onClick,
  variant,
}: {
  label: string;
  isLoading: boolean;
  onClick: () => void;
  variant: "default" | "delete";
}) {
  const letters = label.split("");
  const [isDropping, setIsDropping] = useState(false);
  const [droppedCount, setDroppedCount] = useState(0);

  const reset = useCallback(() => {
    setIsDropping(false);
    setDroppedCount(0);
  }, []);

  useEffect(() => {
    if (isLoading && !isDropping) setIsDropping(true);
    if (!isLoading && isDropping) reset();
  }, [isLoading, isDropping, reset]);

  useEffect(() => {
    if (!isDropping) return;
    if (droppedCount < letters.length) {
      const t = setTimeout(() => setDroppedCount((c) => c + 1), 100);
      return () => clearTimeout(t);
    }
  }, [isDropping, droppedCount, letters.length]);

  const allDropped = isDropping && droppedCount >= letters.length;

  return (
    <button
      className={`cm-button ${variant === "delete" ? "cm-delete" : ""}`}
      onClick={onClick}
      disabled={isLoading}
    >
      <span className="cm-button-content">
        {letters.map((letter, i) => {
          const gone = isDropping && i < droppedCount;
          return (
            <span
              key={i}
              style={{
                transform: gone
                  ? "translateY(20px) rotate(10deg) scale(0.3)"
                  : "none",
                opacity: gone ? 0 : 1,
                transition: "all 0.2s ease",
              }}
            >
              {letter}
            </span>
          );
        })}
      </span>

      {allDropped && <div className="cm-spinner" />}
    </button>
  );
}

export function ConfirmModal({
  open,
  title = "Are you sure?",
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isLoading = false,
  type = "default",
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="cm-overlay">
      <div className="cm-modal">
        <div className="cm-header">
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </div>

        <div className="cm-footer">
          <button
            className="cm-button cm-outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            {cancelLabel}
          </button>

          <AnimatedButton
            label={confirmLabel}
            isLoading={isLoading}
            onClick={onConfirm}
            variant={type === "delete" ? "delete" : "default"}
          />
        </div>
      </div>
    </div>
  );
}
