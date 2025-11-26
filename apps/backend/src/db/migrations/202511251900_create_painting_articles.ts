import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("painting_articles", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("slug").notNullable().unique();
    table.string("title").notNullable();
    table.string("subtitle").nullable();
    table.string("section").notNullable().defaultTo("terrain");
    table.integer("estimated_minutes").notNullable().defaultTo(0);
    table.text("body_markdown").notNullable();
    table
      .jsonb("paints")
      .notNullable()
      .defaultTo("[]" as any);
    table.timestamps(true, true);
  });

  const slug = "painting-the-walls-quick-rough-but-effective";

  await knex("painting_articles").insert({
    slug,
    title: "Painting the Walls – Quick, Rough, but Effective",
    subtitle: "Fast tabletop-ready terrain in about six hours",
    section: "terrain",
    estimated_minutes: 6 * 60,
    body_markdown: `
This week I finally finished painting the walls for my terrain piece — nothing overly detailed, but definitely good enough for gaming. The entire process took about six hours, including acetone smoothing, basing, painting, and dry brushing. It wasn’t meant to be a showcase-level diorama, so I allowed myself to work fast and keep things simple.

## Base Colors

For the foundation layer, I mixed Light Sea Blue, Vallejo 451 Phthalo Blue, and a touch of white to get a cold, muted stone tone. This mix gave the walls a nice depth without becoming too saturated. I covered the entire surface with this blend, making sure to push the paint into all the texture.

## Dry Brushing

Once the base layer dried, I did a fairly aggressive dry brush with pure white. Since these are just wall pieces and not a hero centerpiece model, I didn’t bother with extremely careful highlighting. The white dry brushing caught the raised areas nicely and added a worn, slightly frosty look that suits dungeon and ruin terrain.

## Finishing

After everything was dry, I sealed the piece with a cheap matte varnish from Panduro. It’s definitely not the most durable finish in the world, but for simple terrain pieces it works well enough. I wouldn’t use it on a detailed diorama or a hero miniature, but for walls that will be moved and stacked during gameplay, it’s perfectly fine.

## Final Thoughts

No, the paint job isn’t detailed — and it wasn’t meant to be. For basic walls, this level of speed-painting is more than enough, especially when the goal is to get terrain onto the table rather than lose days on textures that won’t even be the focal point. If I were working on a proper diorama, I definitely wouldn’t be this reckless with dry brushing or finishing products. But for a fast and functional result, this method works great.
`.trim(),
    paints: JSON.stringify([
      {
        brand: "Generic",
        line: null,
        name: "Light Sea Blue",
        code: null,
        usage: "base mix",
      },
      {
        brand: "Vallejo",
        line: "Model Color",
        name: "Phthalo Blue",
        code: "451",
        usage: "base mix",
      },
      {
        brand: "Generic",
        line: null,
        name: "White",
        code: null,
        usage: "base mix & drybrush",
      },
      {
        brand: "Panduro",
        line: null,
        name: "Cheap matte varnish",
        code: null,
        usage: "finish",
      },
    ]),
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("painting_articles");
}
