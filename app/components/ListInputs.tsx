"use client";

import { useState } from "react";

export default function ListInputs() {
  const [title, setTitle] = useState("");

  async function createList(e: React.FormEvent) {
    e.preventDefault();
    if (!title) return;

    await fetch("/api/lists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    location.reload();
  }

  return (
    <form onSubmit={createList} className="space-y-2">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-zinc-800 rounded"
      />
      <button className="w-full p-2 border border-zinc-800 rounded">
        List
      </button>
    </form>
  );
}
