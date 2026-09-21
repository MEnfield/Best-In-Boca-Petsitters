/**
 * The gallery: real cats Holly has actually cared for, with the names she gave
 * them on her old site.
 *
 * These are doing three jobs at once — they are the "cute" the design leans on,
 * they are proof she has a real client history, and their names make alt text
 * that is genuinely useful to a screen reader instead of "cat photo 4".
 *
 * Images are imported so Astro can optimise them at build time (resize, AVIF/
 * WebP, width/height attributes to prevent layout shift).
 */

import babyRomeo from "@/assets/cats/baby-romeo.jpg";
import bella from "@/assets/cats/bella.jpg";
import bellaSunbeam from "@/assets/cats/bella-sunbeam.jpg";
import bobby from "@/assets/cats/bobby.jpg";
import curledUp from "@/assets/cats/curled-up.jpg";
import greenEyedBeauties from "@/assets/cats/green-eyed-beauties.jpg";
import heroCat from "@/assets/cats/hero-cat.jpg";
import malcolm from "@/assets/cats/malcolm.jpg";
import peekABoo from "@/assets/cats/peek-a-boo.jpg";
import romeo from "@/assets/cats/romeo.jpg";
import romeoLounging from "@/assets/cats/romeo-lounging.jpg";
import romeoToyBox from "@/assets/cats/romeo-toy-box.jpg";
import serval from "@/assets/cats/serval.jpg";
import tabbyCloseup from "@/assets/cats/tabby-closeup.jpg";
import theLord from "@/assets/cats/the-lord.jpg";
import thor from "@/assets/cats/thor.jpg";

import type { ImageMetadata } from "astro";

export interface Cat {
  src: ImageMetadata;
  /** The cat’s name, where Holly recorded one. */
  name: string;
  /** Full alt text. Describes the picture, not just the name. */
  alt: string;
  /** Holly’s own caption from the old site, where she wrote one. */
  caption?: string;
}

export const cats: Cat[] = [
  {
    src: bella,
    name: "Bella",
    alt: "Bella, a cat Holly cares for in Boca Raton, looking at the camera",
  },
  {
    src: romeo,
    name: "Romeo",
    alt: "Romeo, a long-time client cat, settled comfortably at home",
  },
  {
    src: thor,
    name: "Thor",
    alt: "Thor, one of Holly’s client cats, relaxed indoors",
    caption: "Cute Thor",
  },
  {
    src: peekABoo,
    name: "Peek-a-boo",
    alt: "A client cat peeking around the corner of a piece of furniture",
    caption: "Peek a boo",
  },
  {
    src: malcolm,
    name: "Malcolm",
    alt: "Malcolm, a client cat, resting at home in Boca Raton",
  },
  {
    src: bobby,
    name: "Bobby",
    alt: "Bobby, a client cat, curled up indoors",
    caption: "Cutie pie Bobby",
  },
  {
    src: romeoToyBox,
    name: "Romeo",
    alt: "Romeo sitting inside his toy box",
    caption: "Romeo in the toy box",
  },
  {
    src: greenEyedBeauties,
    name: "Green-eyed beauties",
    alt: "Two green-eyed cats sitting together at home",
    caption: "Green eyed beauties",
  },
  {
    src: theLord,
    name: "The Lord",
    alt: "A client cat sprawled out regally across the furniture",
    caption: "The Lord",
  },
  {
    src: babyRomeo,
    name: "Baby Romeo",
    alt: "Romeo as a kitten, from early in Holly’s years caring for him",
    caption: "Baby Romeo",
  },
  {
    src: bellaSunbeam,
    name: "Bella",
    alt: "Bella stretched out comfortably in her own home",
  },
  {
    src: romeoLounging,
    name: "Romeo",
    alt: "Romeo lounging indoors during one of Holly’s visits",
  },
  {
    src: tabbyCloseup,
    name: "A client cat",
    alt: "Close-up of a tabby cat Holly cares for in Boca Raton",
  },
  {
    src: curledUp,
    name: "A client cat",
    alt: "A cat curled up asleep at home between visits",
  },
  {
    src: serval,
    name: "A serval",
    alt: "A serval Holly once cared for — an unusual visit in twenty years of cat sitting",
    caption: "A serval I took care of!",
  },
];

/** Used for the home page hero — the largest, highest-resolution photo we have. */
export const heroImage = heroCat;
