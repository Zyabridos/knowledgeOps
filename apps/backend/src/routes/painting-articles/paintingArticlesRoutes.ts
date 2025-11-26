import { FastifyInstance } from "fastify";
import { z } from "zod";
import { knex } from "../../db/knex";

const slugParamsSchema = z.object({
  slug: z.string().min(1),
});

export async function registerPaintingArticlesRoutes(app: FastifyInstance) {
  app.get("/api/painting-articles", async (_request, reply) => {
    const articles = await knex("painting_articles")
      .select(
        "slug",
        "title",
        "subtitle",
        "section",
        "estimated_minutes",
        "created_at",
      )
      .orderBy("created_at", "desc");

    return reply.send(articles);
  });

  app.get("/api/painting-articles/:slug", async (request, reply) => {
    const parseResult = slugParamsSchema.safeParse(request.params);
    if (!parseResult.success) {
      return reply.status(400).send({ error: "Invalid slug" });
    }

    const { slug } = parseResult.data;

    const article = await knex("painting_articles").where({ slug }).first();

    if (!article) {
      return reply.status(404).send({ error: "Article not found" });
    }

    return reply.send(article);
  });
}
