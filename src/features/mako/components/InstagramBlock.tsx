import { Brand } from '../Brand';
import { InstagramEmbed } from './InstagramEmbed';

/**
 * Instagram feature block — links straight to her live profile so the site
 * never looks stale between manual updates.
 */
export const InstagramBlock = () => (
  <section className="bg-primary text-primary-foreground">
    <div className="
      mx-auto max-w-4xl px-6 py-24 text-center
      md:py-32
    "
    >
      <p className="
        text-xs font-semibold tracking-[0.25em] text-primary-foreground/70
        uppercase
      "
      >
        Follow along
      </p>
      <h2 className="
        mt-3 font-display text-5xl tracking-wide
        md:text-6xl
      "
      >
        @
        {Brand.instagramHandle}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
        Join
        {' '}
        {Brand.followers}
        {' '}
        followers for daily looks at our dogs, new litters and champion bloodline.
      </p>
      <a
        href={Brand.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="
          mt-8 inline-flex items-center gap-2 bg-background px-8 py-3
          font-semibold tracking-wide text-foreground uppercase
          transition-opacity
          hover:opacity-90
        "
      >
        View our Instagram
      </a>

      <div className="mt-12">
        <InstagramEmbed />
      </div>
    </div>
  </section>
);
