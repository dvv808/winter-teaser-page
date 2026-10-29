import type { ReactNode } from "react";
import { ObfuscatedEmail } from "@/components/ObfuscatedEmail";
import { PhoneLink } from "@/components/PhoneLink";

type Part = {
  t: "text" | "br" | "link" | "email" | "phone" | string;
  v?: string;
  href?: string;
  user?: string;
  domain?: string;
};

type Block = {
  type: string;
  parts?: Part[];
  items?: Part[][];
};

function Parts({ parts }: { parts: Part[] }) {
  const nodes: ReactNode[] = [];
  parts.forEach((part, index) => {
    if (part.t === "br") {
      nodes.push(<br key={index} />);
      return;
    }
    if (part.t === "email" && part.user && part.domain) {
      nodes.push(
        <ObfuscatedEmail key={index} user={part.user} domain={part.domain} />,
      );
      return;
    }
    if (part.t === "phone" && part.v) {
      nodes.push(<PhoneLink key={index} phone={part.v} />);
      return;
    }
    if (part.t === "link" && part.href && part.v) {
      const external = part.href.startsWith("http");
      nodes.push(
        <a
          key={index}
          href={part.href}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {part.v}
        </a>,
      );
      return;
    }
    if (part.v) nodes.push(part.v);
  });
  return <>{nodes}</>;
}

export function LegalCopy({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-page-copy">
      {blocks.map((block, index) => {
        if (block.type === "h2" && block.parts) {
          return (
            <h2 key={index}>
              <Parts parts={block.parts} />
            </h2>
          );
        }
        if (block.type === "p" && block.parts) {
          return (
            <p key={index}>
              <Parts parts={block.parts} />
            </p>
          );
        }
        if ((block.type === "ul" || block.type === "ol") && block.items) {
          const List = block.type;
          return (
            <List key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Parts parts={item} />
                </li>
              ))}
            </List>
          );
        }
        return null;
      })}
    </div>
  );
}
