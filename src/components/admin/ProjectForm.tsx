"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, X } from "lucide-react";
import type { Project } from "@/lib/projects";

interface ProjectFormProps {
  initialData?: Project;
  isEditing?: boolean;
}

export default function ProjectForm({ initialData, isEditing }: ProjectFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");

  const [form, setForm] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    detailedDescription: initialData?.detailedDescription || "",
    githubUrl: initialData?.githubUrl || "",
    deploymentUrl: initialData?.deploymentUrl || "",
    imageUrl: initialData?.imageUrl || "",
    featured: initialData?.featured ?? true,
    order: initialData?.order ?? 0,
    techStack: initialData?.techStack || [] as string[],
    features: initialData?.features || [] as string[],
  });

  const addTech = () => {
    const val = techInput.trim();
    if (val && !form.techStack.includes(val)) {
      setForm({ ...form, techStack: [...form.techStack, val] });
      setTechInput("");
    }
  };

  const addFeature = () => {
    const val = featureInput.trim();
    if (val) {
      setForm({ ...form, features: [...form.features, val] });
      setFeatureInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const url = isEditing
        ? `/api/projects/${initialData!.id}`
        : "/api/projects";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save");
        return;
      }

      router.push("/admin/projects");
    } catch {
      setError("Connection error");
    } finally {
      setSaving(false);
    }
  };

  const update = (key: string, value: unknown) => setForm({ ...form, [key]: value });

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => router.push("/admin/projects")}
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        <h1 className="text-2xl font-bold mb-8">
          {isEditing ? "Edit Project" : "New Project"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Title *</label>
              <input
                required
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-card border border-card-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/50"
                placeholder="Project name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Slug *</label>
              <input
                required
                value={form.slug}
                onChange={(e) => update("slug", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-card border border-card-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/50"
                placeholder="project-slug"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Short Description *</label>
            <textarea
              required
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl bg-card border border-card-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/50 resize-none"
              placeholder="Brief description for the card view"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Detailed Description</label>
            <textarea
              value={form.detailedDescription}
              onChange={(e) => update("detailedDescription", e.target.value)}
              rows={5}
              className="w-full px-4 py-2.5 rounded-xl bg-card border border-card-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/50 resize-none"
              placeholder="Full description for the project detail page"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">GitHub URL *</label>
              <input
                required
                value={form.githubUrl}
                onChange={(e) => update("githubUrl", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-card border border-card-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/50"
                placeholder="https://github.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Deployment URL *</label>
              <input
                required
                value={form.deploymentUrl}
                onChange={(e) => update("deploymentUrl", e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-card border border-card-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/50"
                placeholder="https://..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Preview Image URL</label>
            <input
              value={form.imageUrl}
              onChange={(e) => update("imageUrl", e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-card border border-card-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/50"
              placeholder="/projects/screenshot.png"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Tech Stack</label>
            <div className="flex gap-2 mb-2">
              <input
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
                className="flex-1 px-4 py-2 rounded-xl bg-card border border-card-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/50"
                placeholder="Add technology..."
              />
              <button type="button" onClick={addTech} className="px-3 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.techStack.map((tech, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
                  {tech}
                  <button type="button" onClick={() => update("techStack", form.techStack.filter((_, j) => j !== i))} className="hover:text-red-500">
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Features</label>
            <div className="flex gap-2 mb-2">
              <input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                className="flex-1 px-4 py-2 rounded-xl bg-card border border-card-border text-foreground placeholder:text-muted/50 focus:outline-none focus:border-primary/50"
                placeholder="Add feature..."
              />
              <button type="button" onClick={addFeature} className="px-3 py-2 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <ul className="space-y-1.5">
              {form.features.map((feature, i) => (
                <li key={i} className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-accent text-sm text-muted">
                  <span>{feature}</span>
                  <button type="button" onClick={() => update("features", form.features.filter((_, j) => j !== i))} className="text-muted hover:text-red-500 flex-shrink-0">
                    <X className="h-3.5 w-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => update("featured", e.target.checked)}
                className="w-4 h-4 rounded border-card-border text-primary focus:ring-primary"
              />
              <span className="text-sm font-medium">Featured on homepage</span>
            </label>
            <div className="flex items-center gap-2 ml-auto">
              <label className="text-sm text-muted">Order:</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => update("order", parseInt(e.target.value) || 0)}
                className="w-16 px-2 py-1 rounded-lg bg-card border border-card-border text-foreground text-sm text-center focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 bg-red-500/10 px-3 py-2 rounded-lg">{error}</p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : isEditing ? "Save Changes" : "Create Project"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/projects")}
              className="px-6 py-2.5 rounded-xl border border-card-border text-muted hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
