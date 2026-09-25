"use client";

import CategoryBar from "./CategoryBar";

export default function FilterShell({ children }) {
  return (
    <div className="shell menu-layout">
      <CategoryBar />
      <section className="menu-content">{children}</section>
    </div>
  );
}
