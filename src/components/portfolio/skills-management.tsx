"use client";

import { motion } from "framer-motion";
import { Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Skill } from "@/lib/types/dashboard";
import { cn } from "@/lib/utils";

const SKILL_CATEGORIES = ["Frontend", "Backend", "Design", "DevOps", "Other"];

interface SkillsManagementProps {
  initialSkills: Skill[];
}

export function SkillsManagement({ initialSkills }: SkillsManagementProps) {
  const [skills, setSkills] = useState(initialSkills);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillCategory, setNewSkillCategory] = useState("Frontend");
  const [newSkillProficiency, setNewSkillProficiency] = useState(75);
  const [showAddForm, setShowAddForm] = useState(false);
  const [error, setError] = useState("");
  const [undoStack, setUndoStack] = useState<Skill[]>([]);

  const handleAddSkill = () => {
    if (!newSkillName.trim()) {
      setError("Skill name is required");
      return;
    }
    if (skills.some((s) => s.name.toLowerCase() === newSkillName.trim().toLowerCase())) {
      setError("Skill already exists");
      return;
    }
    const newSkill: Skill = {
      id: Date.now().toString(),
      name: newSkillName.trim(),
      category: newSkillCategory,
      proficiency: newSkillProficiency,
    };
    setSkills((prev) => [...prev, newSkill]);
    setNewSkillName("");
    setNewSkillProficiency(75);
    setShowAddForm(false);
    setError("");
  };

  const handleRemoveSkill = (id: string) => {
    const removed = skills.find((s) => s.id === id);
    if (removed) setUndoStack((prev) => [...prev, removed]);
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  const handleUndo = () => {
    const last = undoStack[undoStack.length - 1];
    if (last) {
      setSkills((prev) => [...prev, last]);
      setUndoStack((prev) => prev.slice(0, -1));
    }
  };

  const grouped = SKILL_CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat] = skills.filter((s) => s.category === cat);
      return acc;
    },
    {} as Record<string, Skill[]>
  );

  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="skills-heading" className="text-xl font-semibold text-foreground">
            Skills Management
          </h2>
          <p className="text-sm text-muted-foreground">
            {skills.length} skills listed
          </p>
        </div>
        <div className="flex gap-2">
          {undoStack.length > 0 && (
            <Button variant="outline" size="sm" onClick={handleUndo} className="rounded-xl">
              Undo
            </Button>
          )}
          <Button
            variant="default"
            size="sm"
            onClick={() => setShowAddForm(!showAddForm)}
            className="rounded-xl"
          >
            <Plus className="size-4 mr-1" aria-hidden="true" />
            Add Skill
          </Button>
        </div>
      </div>

      {showAddForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mb-6 rounded-2xl border border-border bg-card p-5"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="skill-name">Skill Name</Label>
              <Input
                id="skill-name"
                value={newSkillName}
                onChange={(e) => { setNewSkillName(e.target.value); setError(""); }}
                placeholder="e.g. Vue.js"
                className="h-10 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skill-category">Category</Label>
              <Select value={newSkillCategory} onValueChange={(v) => setNewSkillCategory(v ?? "Frontend")}>
                <SelectTrigger id="skill-category" className="h-10 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SKILL_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="skill-proficiency">Proficiency: {newSkillProficiency}%</Label>
              <input
                id="skill-proficiency"
                type="range"
                min={10}
                max={100}
                step={5}
                value={newSkillProficiency}
                onChange={(e) => setNewSkillProficiency(Number(e.target.value))}
                className="w-full accent-primary"
                aria-valuemin={10}
                aria-valuemax={100}
                aria-valuenow={newSkillProficiency}
              />
            </div>
          </div>
          {error && <p className="mt-2 text-sm text-destructive" role="alert">{error}</p>}
          <div className="mt-4 flex gap-2">
            <Button size="sm" onClick={handleAddSkill} className="rounded-xl">Save Skill</Button>
            <Button variant="ghost" size="sm" onClick={() => setShowAddForm(false)} className="rounded-xl">
              <X className="size-4" />
              Cancel
            </Button>
          </div>
        </motion.div>
      )}

      <div className="space-y-6">
        {SKILL_CATEGORIES.map((category) => {
          const categorySkills = grouped[category];
          if (!categorySkills?.length) return null;
          return (
            <div key={category}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                {category}
              </h3>
              <div className="space-y-3">
                {categorySkills.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex items-center gap-4 rounded-xl border border-border bg-card p-4"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="font-medium text-foreground">{skill.name}</span>
                        <span className="text-sm font-semibold text-primary">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <Progress
                        value={skill.proficiency}
                        className={cn(
                          "h-2",
                          skill.proficiency >= 90 && "[&>div]:bg-green-500",
                          skill.proficiency >= 70 && skill.proficiency < 90 && "[&>div]:bg-primary",
                          skill.proficiency < 70 && "[&>div]:bg-amber-500"
                        )}
                        aria-label={`${skill.name} proficiency: ${skill.proficiency}%`}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleRemoveSkill(skill.id)}
                      aria-label={`Remove ${skill.name}`}
                      className="shrink-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
