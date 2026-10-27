import type { ReactNode } from "react";
import { SiteTopBar } from "@/components/SiteTopBar";

type TextPageProps = {
  title: string;
  children?: ReactNode;
};

export function TextPage({ title, children }: TextPageProps) {
  return (
    <main className="text-page">
      <SiteTopBar activeId={null} />
      <article className="text-page-body">
        <h1>{title}</h1>
        {children}
      </article>
    </main>
  );
}
