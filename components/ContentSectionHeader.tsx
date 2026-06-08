"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ContentSectionHeaderProps {
  title: string;
  description?: string;
  filter?: ReactNode;
  className?: string;
  centered?: boolean;
}

export function ContentSectionHeader({
  title,
  description,
  filter,
  className,
  centered = false,
}: ContentSectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={cn(
        "flex flex-col gap-6 mb-12 lg:flex-row lg:items-end lg:justify-between",
        centered && "lg:items-center",
        className
      )}
    >
      <div className={cn("max-w-3xl", centered && "mx-auto text-center lg:mx-0 lg:text-left")}>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3">
          {title}
        </h2>
        {description && (
          <p className="text-lg text-muted-foreground">{description}</p>
        )}
      </div>
      {filter && (
        <div className={cn("shrink-0", centered && "mx-auto lg:mx-0")}>
          {filter}
        </div>
      )}
    </motion.div>
  );
}
