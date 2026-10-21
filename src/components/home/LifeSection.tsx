import { PhotoFrame } from "@/components/ui/PhotoFrame";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LotusMark } from "@/components/brand/Logo";
import { life } from "@/content/site";

export function LifeSection() {
  return (
    <section className="py-14 md:py-28" aria-labelledby="life-title">
      <div className="wrap flex flex-col gap-8 md:gap-10">
        <SectionHeading id="life-title" eyebrow="Life" title="Work smart, party smarter" />
        <ul className="m-0 grid list-none grid-cols-3 gap-3 p-0 sm:gap-5 md:gap-[22px]">
          {life.map((l) => (
            <li key={l.caption}>
              <figure className="m-0 flex flex-col gap-3">
                <PhotoFrame
                  src={l.image}
                  alt={l.caption}
                  className="aspect-[3/4] w-full bg-blush rounded-t-[200px] border-[3px] md:border-4 border-pink outline-2 outline-offset-4 outline-indigo"
                  fallback={
                    <span className="flex size-12 items-center justify-center rounded-full bg-ivory md:size-24">
                      <span className="scale-[0.55] md:scale-100"><LotusMark size={56} /></span>
                    </span>
                  }
                />
                <figcaption className="pt-1.5 text-center text-[14px] font-medium leading-snug md:text-[19px]">{l.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
