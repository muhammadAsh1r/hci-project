"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/shared/primary-button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { Upload } from "lucide-react";
import { FILTER_OPTIONS } from "@/lib/types/project";

interface AddPortfolioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface FormErrors {
  title?: string;
  description?: string;
  technologies?: string;
  category?: string;
}

const categories = FILTER_OPTIONS.categories;

export function AddPortfolioModal({
  open,
  onOpenChange,
  onSuccess,
}: AddPortfolioModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [category, setCategory] = useState("");
  const [projectUrl, setProjectUrl] = useState("");
  const [thumbnailName, setThumbnailName] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTechnologies("");
    setCategory("");
    setProjectUrl("");
    setThumbnailName("");
    setErrors({});
    setIsSuccess(false);
  };

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) resetForm();
    onOpenChange(nextOpen);
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!title.trim()) newErrors.title = "Project name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    else if (description.trim().length < 30)
      newErrors.description = "Description must be at least 30 characters";
    if (!technologies.trim()) newErrors.technologies = "Technologies are required";
    if (!category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSubmitting(false);
    setIsSuccess(true);
    onSuccess?.();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setThumbnailName(file.name);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto" showCloseButton>
        {isSuccess ? (
          <div className="py-4 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <DialogHeader>
              <DialogTitle>Portfolio Item Added!</DialogTitle>
              <DialogDescription className="mt-2">
                Your project has been added to your portfolio successfully.
              </DialogDescription>
            </DialogHeader>
            <PrimaryButton onClick={() => handleClose(false)} className="mt-6 w-full">
              Done
            </PrimaryButton>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Add Portfolio Item</DialogTitle>
              <DialogDescription>
                Showcase your best work to attract new clients.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="portfolio-title">
                  Project Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="portfolio-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. FinTech Analytics Dashboard"
                  aria-invalid={!!errors.title}
                  className="h-11 rounded-xl"
                />
                {errors.title && (
                  <p className="text-sm text-destructive" role="alert">{errors.title}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio-desc">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="portfolio-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the project, your role, and key outcomes..."
                  rows={4}
                  aria-invalid={!!errors.description}
                  className="rounded-xl resize-none"
                />
                {errors.description && (
                  <p className="text-sm text-destructive" role="alert">{errors.description}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio-tech">
                  Technologies <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="portfolio-tech"
                  value={technologies}
                  onChange={(e) => setTechnologies(e.target.value)}
                  placeholder="React, TypeScript, Node.js (comma separated)"
                  aria-invalid={!!errors.technologies}
                  className="h-11 rounded-xl"
                />
                {errors.technologies && (
                  <p className="text-sm text-destructive" role="alert">{errors.technologies}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio-category">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select value={category} onValueChange={(v) => setCategory(v ?? "")}>
                  <SelectTrigger id="portfolio-category" className="h-11 w-full rounded-xl" aria-invalid={!!errors.category}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive" role="alert">{errors.category}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio-url">Project URL</Label>
                <Input
                  id="portfolio-url"
                  type="url"
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="h-11 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio-thumbnail">Thumbnail</Label>
                <label
                  htmlFor="portfolio-thumbnail"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 px-6 py-8 transition-colors hover:border-primary/40 hover:bg-muted/50"
                >
                  <Upload className="mb-2 size-8 text-muted-foreground" aria-hidden="true" />
                  <span className="text-sm font-medium text-foreground">
                    {thumbnailName || "Click to upload thumbnail"}
                  </span>
                  <span className="mt-1 text-xs text-muted-foreground">
                    PNG, JPG up to 5MB
                  </span>
                  <input
                    id="portfolio-thumbnail"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>

            <DialogFooter className="mt-6 gap-2">
              <SecondaryButton type="button" onClick={() => handleClose(false)}>
                Cancel
              </SecondaryButton>
              <PrimaryButton type="submit">
                {isSubmitting ? "Adding..." : "Add to Portfolio"}
              </PrimaryButton>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
