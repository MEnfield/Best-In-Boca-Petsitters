/**
 * Client reviews, transcribed verbatim from Holly’s Google listing via her
 * existing testimonials page. Quoted exactly — typos and all — because these
 * are other people’s words and trimming them to suit the marketing is not
 * ours to do.
 *
 * `published: false` marks a review held back pending a decision. Nothing is
 * deleted; flip the flag once Holly has weighed in. See `holdReason`.
 *
 * Holly has 31 reviews on Google; 17 were reproduced on the old site and are
 * captured here. The remaining 14 can be added after someone with access
 * copies them across — see docs/cutover-checklist.md.
 */

export interface Review {
  author: string;
  body: string;
  /** Rough recency/tenure signal pulled from the review text itself. */
  tenure?: string;
  published: boolean;
  holdReason?: string;
}

export const reviews: Review[] = [
  {
    author: "K Tracy",
    tenure: "Client for 4 years",
    body: "Holly is awesome! Choosing someone to take care of your pets and house can be very stressful. As soon as we talked to Holly via phone and then met her in-person, we knew she was the right choice. We have been using Holly for about 4 years since we moved to the area. She is very professional, extremely reliable, and most importantly, kind and loving to our pets as if they were her own. Holly is always available, even with little advance notice which is helpful with changing schedules. When we travel, we have confidence that our fur-babies will be well taken care of and we don’t worry about them! She lets us know how they are doing while we are away. Don’t know what we would do without Holly — seriously... she is the best!!",
    published: true,
  },
  {
    author: "Jessica Hirsh",
    body: "Holly is the most reliable and professional pet sitter we have ever had the pleasure of working with. She is always responsive and easy to communicate with. We love that she sends us photos and updates about our babies when we’re away. She goes above and beyond to make it a good experience for us and our pets and we are SO grateful to have found her!",
    published: true,
  },
  {
    author: "Jennifer Berns",
    body: "Holly is the absolute BEST! I don’t know where to start but I’ll try to cover all of it. First, she is a true animal lover and it shows in everything she does. She takes care of my two kitties about 10 days per month, she gives my older girl her meds and always reports back to me any anomalies in the house if she has questions. She goes beyond cat sitting — she looks out for me! Holly also checks mail, brings in packages, waters plants! Recently I was away for 3 weeks and she gave me peace of mind giving my girls some time on my back porch for some fresh air. She’s wonderful… beyond wonderful and trustworthy. I can text her my plans, she responds right away, easy to pay online and even offering cat advice when I need it. I love her and recommend her to anyone who loves their pets!",
    published: false,
    holdReason:
      "Says 'she gives my older girl her meds', which contradicts the FAQ statement that Holly does not administer medication. Confirm with Holly which is true — she may make exceptions for long-standing clients — then either publish this and soften the FAQ, or leave it held. Do not edit the quote to remove the clause.",
  },
  {
    author: "Mark Leonard",
    tenure: "Client for 10 years",
    body: "We have been using Holly’s services for 10 years. We have two small dogs and they are always extremely happy after she has looked after them. If you are looking for someone who is loving, caring, reliable, and professional this is the person you want to look after your pets.",
    published: false,
    holdReason:
      "About dogs. Holly is cats-only now, so this reads as confusing on a cat-specialist site — but the 10-year tenure is the strongest longevity proof she has. Mitch’s call.",
  },
  {
    author: "Kim Elger",
    body: "Holly is a great sitter for my cats. I’m very grateful I found her! She’s very caring and keeps in contact while I’m away and often send pics of my fur babies! If you want someone who’s reliable, professional, caring, and trustworthy then you need to contact her!!!",
    published: true,
  },
  {
    author: "Janet Clark",
    body: "I looked all over Boca for a good Petsitter. Holly answered my call immediately. Then answered all my many many questions promptly when I texted. I am lucky to have found someone who cares and loves my puppies as much as I do. When I’m away I can work at my job with peace of mind and without worry. My puppies run-up to her wagging their tails they love her. She has become their second mom. The care and attention is wonderful. I highly recommend Best in Boca Pet Sitters for great sitting service, attention, communication, and worry free real true caring and love for you fur kids.",
    published: false,
    holdReason: "About puppies. Same cats-only concern as Mark Leonard’s review.",
  },
  {
    author: "Jenny Schorer",
    body: "Holly is the BEST! She is the kindest and most reliable. We have used her regularly over the past few years and have had the most professional service possible. She’s always responsive and has a natural love for animals. She truly is the best pet sitter we have ever used for our cats!",
    published: true,
  },
  {
    author: "Debra Sellitti",
    tenure: "Client for several years",
    body: "I have had the pleasure and good fortune to have found Holly Rising and Best In Boca Pet Services. Holly is a professional first. She is 100% reliable. She checks in a few days before hand to review pre-arrangements and always checks in with you at the back end to make sure you’ve arrived back. I travel 2-3 times a year and each time Holly (over the past several years) has managed to be available to accommodate my schedule, checking in daily with my two cats, caring for them. Once I was away an extra day and she happily and readily adjusted her schedule and took the worry off my back. Yet what I admire most about Holly is her love for animals and her kindness with them (and with people, too!). She gives my pets the care, love and attention I would or even more so. I have peace of mind when Holly’s on the job and you as well as I know that peace of mind is priceless and rare.",
    published: true,
  },
  {
    author: "Scot Hulshizer",
    body: "Holly and Best in Boca Pet Sitters has earned not only the seal of approval of me and my wife, but also our two “fur children.” She spends time with the cats each visit, and also frequently sends pictures to my wife while we’re away. It’s a cute touch that means a lot to us — we feel like we’re leaving our pets in the care of someone who loves them (almost) as much as we do. She is also very conscientious and observant of anything unusual while we’re gone, so we get the benefit of having someone watching the house in addition to watching our pets.",
    published: true,
  },
  {
    author: "Ryan Cox",
    body: "Holly has been nothing but fantastic. From the first phone call and initial meeting we were instantly at ease leaving our 2 cats at home while we traveled. We have used Holly’s services twice and each time has been great — we love getting pictures of the cats when she visits! We 100% recommend working with Holly!",
    published: true,
  },
  {
    author: "Chelsea Hansen",
    body: "Holly is an amazing pet sitter! She took great care of our 3 cats when we were out of town for 10 days and it made the trip much more enjoyable because we knew they were in great hands. She even took the time to send us pictures of our cats and warn us about the flooded roads before our return. She’s a caring, sweet person and any time we go out of town we’ll call her again.",
    published: true,
  },
  {
    author: "Mustafa Motiwala",
    body: "I highly recommend Holly for looking over your pets. I went out of town for 20 days and she took care of my 2 cats. From the moment I met her, I knew she was a pet lover that actually cares about my pets. She went above and beyond our expectations. She is truly an angel on earth. I trust her with my home and pets over most of my family. Thank you Holly for everything!!!!",
    published: true,
  },
  {
    author: "Alyssa Salman",
    body: "Holly looked after my cat while I was away for over a week. She is incredibly trustworthy, dependendable and clearly loves cats. I will definitely continue using her and would recommend her.",
    published: true,
  },
  {
    author: "Sarha Hines",
    tenure: "Client for over a year",
    body: "I have been extremely pleased with the services that Best in Boca Pet Sitters has provided to over the past year. Holly is reliable, trustworthy, and accommodating, and I feel very secure leaving my two cats, Harry and Gatsby, in her care while I’m away. Would definitely recommend this agency to others in need of in-home pet care!",
    published: true,
  },
  {
    author: "Nanette Veysey",
    body: "I have known Holly for many years and I have never met anyone who loves animals as much as she does.",
    published: true,
  },
  {
    author: "Vinny McFeats",
    body: "I was on the road for a month, and not once did I doubt that my two cats were in the best of hands. I arrived home to find Molly and Murphy well fed and happy. Add another star to make this six. Thank you, Holly!",
    published: true,
  },
  {
    author: "Tara Stark",
    body: "I recently moved to the area and needed a reliable pet sitter. I contacted Holly and she came to my home to meet me and my pet. She has always been there when I travel and goes above and beyond. There was an instance whereby she came to take care of my pet and my AC unit was leaking. She stayed at my home until the unit was fixed to ensure Maddy was OK. It is great to have peace of mind when you travel knowing that your furry friends are in good hands. I would highly recommend Holly as a pet sitter!!",
    published: true,
  },
];

export const publishedReviews = reviews.filter((r) => r.published);

/**
 * Three reviews chosen for the home page. Picked to cover the three things a
 * nervous first-time caller is actually weighing: is she reliable, does she
 * communicate, and what happens when something goes wrong.
 */
export const featuredReviewAuthors = ["K Tracy", "Jessica Hirsh", "Tara Stark"];

export const featuredReviews = featuredReviewAuthors
  .map((name) => publishedReviews.find((r) => r.author === name))
  .filter((r): r is Review => Boolean(r));
