import { AnimatedLetters } from "@/components/AnimatedLetters";

export function BranchIntroSection() {
  return (
    <section className="branch-intro-section" aria-labelledby="branch-intro-heading">
      <div className="branch-intro-inner">
        <AnimatedLetters
          as="h2"
          id="branch-intro-heading"
          className="text-h2"
          text="Ihre Sicherheit ist unsere Branche"
          delay={0.1}
          stagger={0.012}
          whenVisible
        />
        <AnimatedLetters
          as="p"
          className="text-section-body"
          text="Die Auswahl eines Geschäftspartners ist immer eine Frage von Vertrauen und Kompetenz. Wir sind uns der Verantwortung bewusst und kennen die individuellen Herausforderungen Ihrer Branche."
          delay={0.55}
          stagger={0.008}
          whenVisible
        />
      </div>
    </section>
  );
}
