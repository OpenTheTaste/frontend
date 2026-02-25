"use client";

import { UploadButton } from "@admin-contents";
import { AdminSeriesUploadModal } from "@admin-series"

export function AdminSeriesUploadButton() {
  return (
    <UploadButton
      label="시리즈 등록"
      renderModal={({ open, onClose }) => (
        <AdminSeriesUploadModal open={open} onClose={onClose} />
      )}
    />
  );
}
