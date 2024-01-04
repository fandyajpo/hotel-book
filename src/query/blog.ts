"use server";

import { cacheConnection, getCollection } from "@/lib/arangoDb";

export const createBlog = async (slug: string, html: string) => {
  const db = cacheConnection();
  try {
    await getCollection("blog", db);
    await db.query({
      query: `INSERT { 
          html: @html,
          slug: @slug,
        } IN @@coll RETURN NEW`,
      bindVars: { "@coll": "blog", slug, html },
    });
    return { success: true };
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const blogById = async (key: string) => {
  const db = cacheConnection();
  try {
    await getCollection("blog", db);
    const resx = await db.query({
      query: `FOR u IN @@coll
      FILTER u._key == @key
      RETURN u`,
      bindVars: { "@coll": "blog", key: key },
    });
    const result = await resx.all();
    return result?.[0];
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const blogBySlug = async (slug: string) => {
  const db = cacheConnection();
  try {
    await getCollection("blog", db);
    const resx = await db.query({
      query: `FOR u IN @@coll
               FILTER u.slug == @slug
               RETURN u`,
      bindVars: { "@coll": "blog", slug },
    });
    const result = await resx.all();
    return result?.[0];
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const listBlog = async (page: number, limit: number) => {
  const db = cacheConnection();
  try {
    await getCollection("blog", db);
    const resx = await db.query({
      query: `

      LET data = (
        FOR p IN @@coll
          LIMIT ${page}, ${limit}
        RETURN p
      )

      LET total = (
        FOR p IN @@coll
          COLLECT WITH COUNT INTO length
        return length
      )

      RETURN { total, data }
      `,
      bindVars: { "@coll": "blog" },
    });
    const result = await resx.all();
    return result[0];
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const updateBlogMetadata = async (
  key: string,
  title: string,
  description: string,
  slug: string
) => {
  const db = cacheConnection();
  try {
    await getCollection("blog", db);
    await db.query({
      query: `LET f = DOCUMENT(@@coll, @key)
      FILTER f != null
      UPDATE f WITH { 
        title: @title,
        description: @description,
        slug: @slug
      }
      IN @@coll RETURN NEW`,
      bindVars: {
        "@coll": "blog",
        key,
        title,
        description,
        slug,
      },
    });

    return { success: true };
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const updateBlog = async (key: string, html: string) => {
  const db = cacheConnection();
  try {
    await getCollection("blog", db);
    await db.query({
      query: `LET f = DOCUMENT(@@coll, @key)
      FILTER f != null
      UPDATE f WITH { 
        html: @html,
      }
      IN @@coll RETURN NEW`,
      bindVars: {
        "@coll": "blog",
        key,
        html,
      },
    });

    return { success: true };
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};
