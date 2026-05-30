"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const FILES = [
  { name: "Supervision CEU - Leann Salmonson", type: "Certificate", date: "May 30, 2026", category: "CEU", image: "/ceu-supervision-sample.png" },
  { name: "CEU Certificate - Trauma-Informed Care", type: "PDF", date: "May 23, 2026", category: "CEU" },
  { name: "CEU Certificate - Ethics Update 2026", type: "PDF", date: "Apr 15, 2026", category: "CEU" },
  { name: "CEU Certificate - Somatic Approaches", type: "PDF", date: "Mar 10, 2026", category: "CEU" },
  { name: "CEU Certificate - CBT for Anxiety", type: "PDF", date: "Feb 20, 2026", category: "CEU" },
  { name: "Practice Playbook - Fee Setting Guide", type: "PDF", date: "Jan 5, 2026", category: "Resource" },
];

const CATEGORIES = ["All", "CEU", "Resource"];

export default function FilesPage() {
  const [category, setCategory] = useState("All");
  const [viewingCert, setViewingCert] = useState<string | null>(null);

  const filtered = category === "All" ? FILES : FILES.filter((f) => f.category === category);

  return (
    <>
      {viewingCert ? (
        <div className="flex flex-col gap-6">
          <button
            type="button"
            onClick={() => setViewingCert(null)}
            className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-70 w-fit"
            style={{ color: "var(--color-sage-700)" }}
          >
            <span className="text-base">←</span>
            Back to files
          </button>
          <div
            className="rounded-2xl overflow-hidden border"
            style={{ borderColor: "var(--color-cream-300)", background: "#fff" }}
          >
            <img
              src={viewingCert}
              alt="CEU Certificate"
              className="w-full h-auto"
              style={{ maxHeight: "80vh", objectFit: "contain" }}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div>
            <p className="text-eyebrow">
              Files
            </p>
            <h1 className="text-page-title">
              CEU certificates & files
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((item) => {
              const active = category === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium transition-colors"
                  style={{
                    background: active ? "var(--color-sage-700)" : "#fff",
                    color: active ? "#fff" : "var(--color-sage-700)",
                    border: `1px solid ${active ? "var(--color-sage-700)" : "var(--color-cream-300)"}`,
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <Card className="py-14 text-center">
              <p className="text-sm" style={{ color: "var(--color-text-secondary)" }}>
                No files in this category yet.
              </p>
            </Card>
          ) : (
            <div className="flex flex-col gap-3">
              {filtered.map((file) => (
                <Card key={file.name} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-sm shrink-0 overflow-hidden"
                      style={{ background: "var(--color-sage-100)", color: "var(--color-sage-600)" }}
                    >
                      {file.image ? (
                        <img src={file.image} alt={file.name} className="w-full h-full object-cover" />
                      ) : (
                        "◫"
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
                        {file.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge>{file.category}</Badge>
                        <span className="text-xs" style={{ color: "var(--color-text-tertiary)" }}>
                          {file.date}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:shrink-0">
                    {file.image && (
                      <Button variant="secondary" size="sm" onClick={() => setViewingCert(file.image!)}>
                        View certificate
                      </Button>
                    )}
                    <Button variant="secondary" size="sm" onClick={() => alert('Download started.')}>Download</Button>
                    <Button variant="ghost" size="sm" onClick={() => alert('Preview coming soon.')}>View</Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
