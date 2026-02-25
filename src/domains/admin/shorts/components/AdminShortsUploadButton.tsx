"use client";

import { UploadButton } from "@admin-contents";
import AdminShortsUploadModal from "./AdminShortsUploadModal";

export function AdminShortsUploadButton() {
  return (
    <UploadButton
      label="숏폼 업로드"
      renderModal={({ open, onClose }) => (
        <AdminShortsUploadModal open={open} onClose={onClose} />
      )}
    />
  );
}
