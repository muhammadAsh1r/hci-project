"use client";

import {
  Check,
  Cloud,
  Lightbulb,
  Paperclip,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { PostProjectPreview } from "@/components/client/projects/post-project-preview";
import {
  DESCRIPTION_MAX,
  DESCRIPTION_MIN,
  FILTER_OPTIONS,
  getBudgetRecommendation,
  getSkillSuggestions,
  validateProjectForm,
  type FormErrors,
} from "@/components/client/projects/post-project-utils";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { PrimaryButton } from "@/components/shared/primary-button";
import { SecondaryButton } from "@/components/shared/secondary-button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  clearProjectDraft,
  readProjectDraft,
  saveProjectDraft,
  useClientProjects,
} from "@/hooks/use-client-projects";
import { useToast } from "@/hooks/use-toast";
import {
  DEFAULT_CLIENT_PROJECT_FORM,
  type ClientProjectFormData,
} from "@/lib/types/client-project";
import type { ExperienceLevel, ProjectCategory, ProjectType } from "@/lib/types/project";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface PostProjectContentProps {
  editId?: string;
}

export function PostProjectContent({ editId }: PostProjectContentProps) {
  const router = useRouter();
  const { publishProject, saveDraftOnly, getEditFormData } = useClientProjects();
  const { showToast, ToastContainer } = useToast();

  const [form, setForm] = useState<ClientProjectFormData>(DEFAULT_CLIENT_PROJECT_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [skillInput, setSkillInput] = useState("");
  const [publishOpen, setPublishOpen] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [draftSavedAt, setDraftSavedAt] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const draftTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isEdit = Boolean(editId);

  useEffect(() => {
    if (editId) {
      const data = getEditFormData(editId);
      if (data) setForm(data);
    } else {
      setForm(readProjectDraft());
    }
  }, [editId, getEditFormData]);

  const scheduleAutoSave = useCallback(
    (data: ClientProjectFormData) => {
      if (isEdit) return;
      if (draftTimer.current) clearTimeout(draftTimer.current);
      draftTimer.current = setTimeout(() => {
        saveProjectDraft(data);
        setDraftSavedAt(
          new Date().toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })
        );
      }, 800);
    },
    [isEdit]
  );

  const updateForm = useCallback(
    (updates: Partial<ClientProjectFormData>) => {
      setForm((prev) => {
        const next = { ...prev, ...updates };
        scheduleAutoSave(next);
        return next;
      });
      setErrors((prev) => {
        const keys = Object.keys(updates) as (keyof FormErrors)[];
        const next = { ...prev };
        keys.forEach((k) => delete next[k]);
        return next;
      });
    },
    [scheduleAutoSave]
  );

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed || form.skills.includes(trimmed)) return;
    updateForm({ skills: [...form.skills, trimmed] });
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    updateForm({ skills: form.skills.filter((s) => s !== skill) });
  };

  const addAttachment = () => {
    const mockFiles = [
      { name: "project-brief.pdf", size: "1.8 MB" },
      { name: "requirements.docx", size: "920 KB" },
      { name: "wireframes.fig", size: "4.2 MB" },
    ];
    const file = mockFiles[form.attachments.length % mockFiles.length];
    updateForm({
      attachments: [
        ...form.attachments,
        { id: `att-${Date.now()}`, ...file },
      ],
    });
    showToast("Attachment added (preview only)", "info");
  };

  const handleSaveDraft = () => {
    saveDraftOnly(form);
    setDraftSavedAt(
      new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
    );
    showToast("Draft saved successfully");
  };

  const handleClear = () => {
    setForm(DEFAULT_CLIENT_PROJECT_FORM);
    setErrors({});
    setSkillInput("");
    clearProjectDraft();
    setDraftSavedAt(null);
    showToast("Form cleared");
  };

  const handlePublish = async () => {
    const validation = validateProjectForm(form);
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      showToast("Please fix the errors before publishing", "error");
      return;
    }
    setPublishOpen(true);
  };

  const confirmPublish = async () => {
    setIsPublishing(true);
    await new Promise((r) => setTimeout(r, 600));
    const project = publishProject(form, editId);
    setIsPublishing(false);
    setPublishOpen(false);
    showToast(
      isEdit ? "Project updated successfully" : "Project published successfully"
    );
    router.push(`/client/projects/${project.id}`);
  };

  const skillSuggestions = getSkillSuggestions(form.category as ProjectCategory);
  const budgetHint = getBudgetRecommendation(
    form.category as ProjectCategory,
    form.experienceLevel as ExperienceLevel
  );

  const formSection = (
    <div className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div>
        <h2 className="text-xl font-semibold text-foreground">
          {isEdit ? "Edit Project" : "Post a New Project"}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in the details below to attract the right freelancers.
        </p>
        {!isEdit && draftSavedAt ? (
          <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Cloud className="size-3.5 text-primary" aria-hidden="true" />
            Draft auto-saved at {draftSavedAt}
          </p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label htmlFor="project-title">Project Title *</Label>
        <Input
          id="project-title"
          value={form.title}
          onChange={(e) => updateForm({ title: e.target.value })}
          placeholder="e.g. E-commerce Platform Redesign"
          className="h-11 rounded-xl"
          aria-invalid={!!errors.title}
        />
        {errors.title ? (
          <p className="text-sm text-destructive" role="alert">{errors.title}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="project-description">Project Description *</Label>
          <span
            className={cn(
              "text-xs",
              form.description.length > DESCRIPTION_MAX
                ? "text-destructive"
                : "text-muted-foreground"
            )}
          >
            {form.description.length}/{DESCRIPTION_MAX}
          </span>
        </div>
        <Textarea
          id="project-description"
          value={form.description}
          onChange={(e) => updateForm({ description: e.target.value })}
          placeholder="Describe your project goals, scope, and expectations..."
          rows={6}
          className="rounded-xl"
          aria-invalid={!!errors.description}
        />
        {errors.description ? (
          <p className="text-sm text-destructive" role="alert">{errors.description}</p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Minimum {DESCRIPTION_MIN} characters for best results.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="project-category">Category *</Label>
        <Select
          value={form.category || undefined}
          onValueChange={(v) => updateForm({ category: v as ProjectCategory })}
        >
          <SelectTrigger id="project-category" className="h-11 w-full rounded-xl">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {FILTER_OPTIONS.categories.map((cat) => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category ? (
          <p className="text-sm text-destructive" role="alert">{errors.category}</p>
        ) : null}
        {form.category ? (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <Lightbulb className="size-3.5 text-primary" aria-hidden="true" />
            <span className="text-xs text-muted-foreground">Suggested for you:</span>
            {FILTER_OPTIONS.categories
              .filter((c) => c !== form.category)
              .slice(0, 2)
              .map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => updateForm({ category: cat })}
                  className="rounded-lg bg-muted px-2 py-0.5 text-xs text-foreground transition-colors hover:bg-accent"
                >
                  {cat}
                </button>
              ))}
          </div>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label>Required Skills *</Label>
        <div className="flex gap-2">
          <Input
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addSkill(skillInput);
              }
            }}
            placeholder="Type a skill and press Enter"
            className="h-11 flex-1 rounded-xl"
          />
          <SecondaryButton
            type="button"
            onClick={() => addSkill(skillInput)}
            className="rounded-xl"
          >
            <Plus className="size-4" />
            Add
          </SecondaryButton>
        </div>
        {errors.skills ? (
          <p className="text-sm text-destructive" role="alert">{errors.skills}</p>
        ) : null}
        {form.skills.length > 0 ? (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {form.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="gap-1 rounded-lg pr-1">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="rounded p-0.5 hover:bg-muted"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
          </div>
        ) : null}
        {skillSuggestions.length > 0 ? (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
            <span className="text-xs text-muted-foreground">Suggestions:</span>
            {skillSuggestions
              .filter((s) => !form.skills.includes(s))
              .map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => addSkill(skill)}
                  className="rounded-lg border border-dashed border-border px-2 py-0.5 text-xs text-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  + {skill}
                </button>
              ))}
          </div>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="budget-min">Budget Min ($) *</Label>
          <Input
            id="budget-min"
            type="number"
            min={0}
            value={form.budgetMin}
            onChange={(e) => updateForm({ budgetMin: e.target.value })}
            placeholder="1000"
            className="h-11 rounded-xl"
            aria-invalid={!!errors.budgetMin}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget-max">Budget Max ($) *</Label>
          <Input
            id="budget-max"
            type="number"
            min={0}
            value={form.budgetMax}
            onChange={(e) => updateForm({ budgetMax: e.target.value })}
            placeholder="5000"
            className="h-11 rounded-xl"
            aria-invalid={!!errors.budgetMax}
          />
        </div>
      </div>
      {(errors.budgetMin || errors.budgetMax) ? (
        <p className="text-sm text-destructive" role="alert">
          {errors.budgetMin || errors.budgetMax}
        </p>
      ) : null}
      {budgetHint ? (
        <p className="inline-flex items-center gap-1.5 rounded-xl bg-primary/5 px-3 py-2 text-xs text-primary">
          <Lightbulb className="size-3.5" aria-hidden="true" />
          Recommended budget: {budgetHint}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="project-type">Project Type *</Label>
          <Select
            value={form.projectType || undefined}
            onValueChange={(v) => updateForm({ projectType: v as ProjectType })}
          >
            <SelectTrigger id="project-type" className="h-11 w-full rounded-xl">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fixed Price">Fixed Price</SelectItem>
              <SelectItem value="Hourly">Hourly</SelectItem>
            </SelectContent>
          </Select>
          {errors.projectType ? (
            <p className="text-sm text-destructive" role="alert">{errors.projectType}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="experience-level">Experience Level *</Label>
          <Select
            value={form.experienceLevel || undefined}
            onValueChange={(v) =>
              updateForm({ experienceLevel: v as ExperienceLevel })
            }
          >
            <SelectTrigger id="experience-level" className="h-11 w-full rounded-xl">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Expert">Expert</SelectItem>
            </SelectContent>
          </Select>
          {errors.experienceLevel ? (
            <p className="text-sm text-destructive" role="alert">{errors.experienceLevel}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="timeline">Timeline *</Label>
          <Select
            value={form.timeline || undefined}
            onValueChange={(v) => updateForm({ timeline: v as ClientProjectFormData["timeline"] })}
          >
            <SelectTrigger id="timeline" className="h-11 w-full rounded-xl">
              <SelectValue placeholder="Select timeline" />
            </SelectTrigger>
            <SelectContent>
              {FILTER_OPTIONS.durations.map((d) => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.timeline ? (
            <p className="text-sm text-destructive" role="alert">{errors.timeline}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Attachments</Label>
        <button
          type="button"
          onClick={addAttachment}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/30 px-4 py-8 text-sm text-muted-foreground transition-colors hover:border-primary hover:bg-primary/5 hover:text-foreground"
        >
          <Paperclip className="size-4" aria-hidden="true" />
          Click to upload files (preview only)
        </button>
        {form.attachments.length > 0 ? (
          <ul className="space-y-2">
            {form.attachments.map((file) => (
              <li
                key={file.id}
                className="flex items-center justify-between rounded-xl border border-border px-3 py-2 text-sm"
              >
                <span className="flex items-center gap-2">
                  <Paperclip className="size-4 text-muted-foreground" />
                  {file.name} ({file.size})
                </span>
                <button
                  type="button"
                  onClick={() =>
                    updateForm({
                      attachments: form.attachments.filter((a) => a.id !== file.id),
                    })
                  }
                  className="text-muted-foreground hover:text-destructive"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:flex-wrap">
        {!isEdit ? (
          <SecondaryButton type="button" onClick={handleSaveDraft} className="rounded-xl">
            <Cloud className="size-4" />
            Save Draft
          </SecondaryButton>
        ) : null}
        <SecondaryButton
          type="button"
          onClick={() => setShowPreview((p) => !p)}
          className="rounded-xl lg:hidden"
        >
          {showPreview ? "Hide Preview" : "Preview Project"}
        </SecondaryButton>
        <SecondaryButton type="button" onClick={handleClear} className="rounded-xl">
          Clear Form
        </SecondaryButton>
        <PrimaryButton type="button" onClick={handlePublish} className="rounded-xl sm:ml-auto">
          <Check className="size-4" />
          {isEdit ? "Update Project" : "Publish Project"}
        </PrimaryButton>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl p-4 pb-24 sm:p-6 lg:p-8">
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">{formSection}</div>
        <div className={cn("lg:col-span-2", showPreview ? "block" : "hidden lg:block")}>
          <PostProjectPreview form={form} />
        </div>
      </div>

      <ConfirmDialog
        open={publishOpen}
        onOpenChange={setPublishOpen}
        title={isEdit ? "Update this project?" : "Publish this project?"}
        description={
          isEdit
            ? "Your changes will be visible to freelancers immediately."
            : "Your project will go live on the marketplace and start receiving proposals."
        }
        confirmLabel={isEdit ? "Update Project" : "Publish Project"}
        isLoading={isPublishing}
        onConfirm={confirmPublish}
      />

      <ToastContainer />
    </div>
  );
}
