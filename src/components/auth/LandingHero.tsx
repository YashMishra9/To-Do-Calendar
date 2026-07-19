export default function LandingHero() {
    return (
      <section className="text-center pt-24 pb-16 px-6">
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
          Plan your days.{" "}
          <span style={{ color: "var(--color-primary)" }}>Actually get things done.</span>
        </h1>
        <p className="text-[var(--color-muted)] max-w-md mx-auto mb-10">
          A calendar and task planner built for daily focus — categories,
          priorities, deadlines, and a dashboard that shows your real progress.
        </p>
      </section>
    );
  }