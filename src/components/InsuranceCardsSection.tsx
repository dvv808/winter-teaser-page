import { BrandCard } from "@/components/BrandCard";

export function InsuranceCardsSection() {
  return (
    <section
      className="insurance-cards-section"
      aria-label="Versicherungsangebote"
    >
      <div className="insurance-cards-grid">
        <BrandCard
          corner="top-left"
          imageSrc="/images/insurances/pension.png"
          videoSrc="/images/insurances/pension_video.mp4"
          imageAlt=""
          title="Nicht nur eine Versicherung, sondern ein Sicherheitsnetz"
          href="#beratung"
          className="insurance-card--left"
          revealDelay={0}
        />
        <BrandCard
          corner="bottom-right"
          imageSrc="/images/insurances/car.png"
          videoSrc="/images/insurances/car.mp4"
          imageAlt=""
          title="Maßgearbeitete Versicherungen aus eigener Produktion"
          href="#beratung"
          className="insurance-card--right"
          revealDelay={160}
        />
      </div>
    </section>
  );
}
