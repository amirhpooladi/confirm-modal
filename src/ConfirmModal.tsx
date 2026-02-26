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
  return (
    <button
      className={`cm-button ${variant === "delete" ? "cm-delete" : ""}`}
      onClick={onClick}
      disabled={isLoading}
    >
      <span
        className="cm-button-content"
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        {label}
      </span>

      {isLoading && <div className="cm-spinner" />}
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
        <button
          className="cm-close"
          onClick={onCancel}

        >
          ×
        </button>
        <div className="cm-header">
          <div className="cm-title">{title}</div>
          {description && (
            <div className="cm-description">{description}</div>
          )}
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
