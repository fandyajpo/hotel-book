"use server";

import { getCollection, getView, getConnection } from "@/lib/arangoDb";

export const createBlog = async (slug: string, html: string) => {
  const db = getConnection();
  try {
    await getCollection("blog", db);
    const blog = await db.query({
      query: `INSERT { 
          html: @html,
          slug: @slug,
        } IN @@coll RETURN NEW`,
      bindVars: { "@coll": "blog", slug, html },
    });

    const result = await blog.all();
    return { success: true, data: result?.[0] };
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const blogById = async (key: string) => {
  const db = getConnection();
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
  const db = getConnection();
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
  const db = getConnection();
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
  const db = getConnection();
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
  const db = getConnection();
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

export const delBlog = async (key: string) => {
  const db = getConnection();
  try {
    await getCollection("blog", db);
    const resx = await db.query({
      query: `FOR u IN @@coll
        FILTER u._key == @key
          REMOVE {
            _key: @key
          }
        IN @@coll
        RETURN OLD`,
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

export const searchBlog = async (search: string) => {
  const db = getConnection();
  try {
    await getView("blogsearch", db);
    const resx = await db.query({
      query: `
      LET word = @search
      LET tokens = TOKENS(word, "text_en")
          FOR doc IN @@coll 
          SEARCH ANALYZER(TOKENS(tokens, "text_en")[0] ALL == doc.title OR
          PHRASE(doc.title, {WILDCARD: CONCAT('%', tokens[0] , '%')}, "text_en") OR 
          PHRASE(doc.title, word), "text_en") 
          LIMIT 9
          RETURN doc`,
      bindVars: { "@coll": "blogsearch", search: search },
    });
    const result = await resx.all();
    return result;
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};
