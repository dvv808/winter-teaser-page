import { AnimatedLetters } from "@/components/AnimatedLetters";

const facts = [
  { value: "1.806", label: "Geschäftskunden" },
  { value: "4.210", label: "Betriebe" },
  { value: "23.210", label: "Schäden abgewickelt" },
  { value: "130", label: "Mitarbeitende" },
  { value: "33.200", label: "Aktive Verträge" },
] as const;

export function FactsSection() {
  return (
    <section
      id="fakten"
      className="facts-section"
      aria-label="Winter in Zahlen"
    >
      <div className="facts-grid">
        {facts.map((fact, index) => {
          const baseDelay = index * 0.12;

          return (
            <div key={fact.label} className="fact-item">
              <AnimatedLetters
                as="p"
                className="fact-value"
                text={fact.value}
                delay={baseDelay}
                stagger={0.03}
                whenVisible
              />
              <AnimatedLetters
                as="p"
                className="fact-label"
                text={fact.label}
                delay={baseDelay + 0.18}
                stagger={0.012}
                whenVisible
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
