import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { staggerContainer, fadeUpVariants } from "@/lib/animations";

const rsvpSchema = z
  .object({
    name: z.string().min(2, "Please enter your name"),
    email: z.string().email("Please enter a valid email"),
    attending: z.enum(["yes", "no", "maybe"]),
    guestCount: z.coerce.number().min(0).max(20),
    dietaryNotes: z.string().max(500).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.attending === "yes" || data.attending === "maybe") {
      if (data.guestCount < 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Enter at least 1 guest (including yourself)",
          path: ["guestCount"],
        });
      }
    }
  });

type RsvpForm = z.infer<typeof rsvpSchema>;

function formatRsvpMessage(data: RsvpForm): string {
  const lines = [
    "Wedding RSVP",
    "────────────",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Attending: ${data.attending}`,
    `Guests (including you): ${data.attending === "no" ? 0 : data.guestCount}`,
  ];
  if (data.dietaryNotes?.trim()) {
    lines.push(`Notes / dietary: ${data.dietaryNotes.trim()}`);
  }
  return lines.join("\n");
}

const RSVPSection = () => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "copied">("idle");

  const web3Key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
  const rsvpEmail = import.meta.env.VITE_RSVP_EMAIL as string | undefined;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RsvpForm>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      name: "",
      email: "",
      attending: "yes",
      guestCount: 1,
      dietaryNotes: "",
    },
  });

  const attending = watch("attending");

  const onSubmit = async (data: RsvpForm) => {
    setSubmitError(null);
    setStatus("sending");

    const guestCount = data.attending === "no" ? 0 : data.guestCount;
    const payload: RsvpForm = { ...data, guestCount };
    const message = formatRsvpMessage(payload);

    try {
      if (web3Key) {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            access_key: web3Key,
            subject: `Wedding RSVP — ${payload.name}`,
            name: payload.name,
            email: payload.email,
            replyto: payload.email,
            message,
          }),
        });
        const json = (await res.json()) as { success?: boolean; message?: string };
        if (!json.success) {
          throw new Error(json.message || "Could not send RSVP. Try again.");
        }
        setStatus("sent");
        reset();
        return;
      }

      if (rsvpEmail) {
        const subject = `Wedding RSVP — ${payload.name}`;
        window.location.href = `mailto:${rsvpEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
        setStatus("sent");
        reset();
        return;
      }

      try {
        await navigator.clipboard.writeText(message);
        setStatus("copied");
        reset();
      } catch {
        setSubmitError(
          "Could not copy to clipboard. Add VITE_WEB3FORMS_ACCESS_KEY or VITE_RSVP_EMAIL to your .env file so RSVPs reach you."
        );
        setStatus("idle");
      }
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Something went wrong.");
      setStatus("idle");
    }
  };

  return (
    <motion.section
      id="rsvp"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="px-6 py-16 sm:py-24 text-center max-w-lg mx-auto"
    >
      <motion.div variants={fadeUpVariants} className="ornate-divider mx-auto max-w-xs mb-10" />

      <motion.h3
        variants={fadeUpVariants}
        className="font-display text-2xl text-gradient-gold text-shadow-glow mb-4"
      >
        Join Our Celebration
      </motion.h3>

      <motion.p
        variants={fadeUpVariants}
        className="font-elegant text-foreground/70 text-lg mb-8 max-w-md mx-auto"
      >
        Your presence would make our special day even more memorable
      </motion.p>

      <motion.form
        variants={fadeUpVariants}
        onSubmit={handleSubmit(onSubmit)}
        className="text-left space-y-5 mb-10"
        noValidate
      >
        <div>
          <label htmlFor="rsvp-name" className="block font-elegant text-sm text-foreground/80 mb-1.5">
            Full name
          </label>
          <input
            id="rsvp-name"
            type="text"
            autoComplete="name"
            className="w-full rounded-md border border-gold/30 bg-card/60 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/40"
            placeholder="Your name"
            {...register("name")}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-destructive font-elegant">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="rsvp-email" className="block font-elegant text-sm text-foreground/80 mb-1.5">
            Email
          </label>
          <input
            id="rsvp-email"
            type="email"
            autoComplete="email"
            className="w-full rounded-md border border-gold/30 bg-card/60 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/40"
            placeholder="you@example.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-destructive font-elegant">{errors.email.message}</p>
          )}
        </div>

        <fieldset>
          <legend className="font-elegant text-sm text-foreground/80 mb-2">Will you attend?</legend>
          <div className="flex flex-wrap gap-4">
            {(
              [
                ["yes", "Joyfully yes"],
                ["maybe", "Not sure yet"],
                ["no", "Regretfully no"],
              ] as const
            ).map(([value, label]) => (
              <label
                key={value}
                className="inline-flex items-center gap-2 cursor-pointer font-elegant text-foreground/90"
              >
                <input
                  type="radio"
                  value={value}
                  className="accent-gold h-4 w-4"
                  {...register("attending")}
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        {(attending === "yes" || attending === "maybe") && (
          <div>
            <label htmlFor="rsvp-guests" className="block font-elegant text-sm text-foreground/80 mb-1.5">
              Number of guests (including you)
            </label>
            <input
              id="rsvp-guests"
              type="number"
              min={1}
              max={20}
              className="w-full rounded-md border border-gold/30 bg-card/60 px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40"
              {...register("guestCount")}
            />
            {errors.guestCount && (
              <p className="mt-1 text-sm text-destructive font-elegant">{errors.guestCount.message}</p>
            )}
          </div>
        )}

        <div>
          <label htmlFor="rsvp-notes" className="block font-elegant text-sm text-foreground/80 mb-1.5">
            Notes or dietary restrictions <span className="text-muted-foreground">(optional)</span>
          </label>
          <textarea
            id="rsvp-notes"
            rows={3}
            className="w-full rounded-md border border-gold/30 bg-card/60 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/40 resize-y min-h-[5rem]"
            placeholder="Anything we should know?"
            {...register("dietaryNotes")}
          />
          {errors.dietaryNotes && (
            <p className="mt-1 text-sm text-destructive font-elegant">{errors.dietaryNotes.message}</p>
          )}
        </div>

        {submitError && (
          <p className="text-sm text-destructive font-elegant text-center" role="alert">
            {submitError}
          </p>
        )}

        {status === "sent" && (
          <p className="text-sm text-gold-light font-elegant text-center" role="status">
            {web3Key
              ? "Thank you — your RSVP was sent."
              : rsvpEmail
                ? "Opening your email app… send the message to complete your RSVP."
                : null}
          </p>
        )}
        {status === "copied" && (
          <p className="text-sm text-gold-light font-elegant text-center" role="status">
            RSVP details copied. Paste them in a message to us, or add{" "}
            <code className="text-xs opacity-80">VITE_WEB3FORMS_ACCESS_KEY</code> in{" "}
            <code className="text-xs opacity-80">.env</code> for email delivery.
          </p>
        )}

        <div className="text-center pt-2">
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center justify-center min-h-12 px-8 rounded-md font-display tracking-widest text-base bg-gradient-to-r from-gold-dark via-gold to-gold-light text-background border border-gold-light/30 hover:shadow-[0_0_30px_hsl(43_90%_55%/0.5)] hover:scale-[1.02] active:scale-100 transition-all duration-300 disabled:opacity-60 disabled:pointer-events-none"
          >
            {status === "sending" ? "Sending…" : "Submit RSVP"}
          </button>
        </div>

        {!web3Key && !rsvpEmail && (
          <p className="text-xs text-muted-foreground font-elegant text-center leading-relaxed">
            Tip: add <code className="text-gold/70">VITE_WEB3FORMS_ACCESS_KEY</code> (free at web3forms.com) or{" "}
            <code className="text-gold/70">VITE_RSVP_EMAIL</code> for mailto.
          </p>
        )}
      </motion.form>

      <motion.div variants={fadeUpVariants} className="mt-16">
        <p className="font-elegant text-gold/60 text-sm tracking-widest uppercase mb-4">With Love</p>
        <p className="font-display text-xl text-gradient-gold">Parth & Srishti</p>
      </motion.div>

      <motion.div variants={fadeUpVariants} className="ornate-divider mx-auto max-w-xs mt-10" />

      <motion.p
        variants={fadeUpVariants}
        className="font-elegant text-muted-foreground/50 text-xs mt-16"
      >
        Made with love for our special day
      </motion.p>
    </motion.section>
  );
};

export default RSVPSection;
