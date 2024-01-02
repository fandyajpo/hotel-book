"use server";

import { cacheConnection, getCollection, getView } from "@/lib/arangoDb";

export const listLocation = async (page: number, limit: number) => {
  const db = cacheConnection();
  try {
    await getCollection("location", db);
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

      RETURN { total, data }`,
      bindVars: { "@coll": "location" },
    });
    const result = await resx.all();
    return result[0];
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const createLocation = async (
  name: string,
  slug: string,
  description: string
) => {
  const db = cacheConnection();
  try {
    await getCollection("location", db);
    await db.query({
      query:
        "INSERT { name: @name, slug: @slug, description: @description } IN @@coll RETURN NEW",
      bindVars: { "@coll": "location", name, slug, description },
    });
    return { success: true };
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const updateLocation = async (
  key: string,
  name: string,
  slug: string,
  description: string
) => {
  const db = cacheConnection();
  try {
    await getCollection("location", db);
    await db.query({
      query: `LET f = DOCUMENT(@@coll, @key)
      FILTER f != null
      UPDATE f WITH { 
        name: @name,
        slug: @slug,
        description: @description
      }
      IN @@coll`,
      bindVars: { "@coll": "location", key, name, slug, description },
    });

    return { success: true };
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const delLocation = async (key: string) => {
  const db = cacheConnection();
  try {
    await getCollection("location", db);
    const resx = await db.query({
      query: `FOR u IN @@coll
        FILTER u._key == @key
          REMOVE {
            _key: @key
          }
        IN @@coll
        RETURN OLD`,
      bindVars: { "@coll": "location", key: key },
    });
    const result = await resx.all();
    return result?.[0];
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const locationById = async (key: string) => {
  const db = cacheConnection();
  try {
    await getCollection("location", db);
    const resx = await db.query({
      query: `FOR u IN @@coll
               FILTER u._key == @key
               RETURN u`,
      bindVars: { "@coll": "location", key: key },
    });
    const result = await resx.all();
    return result?.[0];
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const locationBySlug = async (slug: string) => {
  const db = cacheConnection();
  try {
    await getCollection("location", db);
    const resx = await db.query({
      query: `FOR u IN @@coll
               FILTER u.slug == @slug
               RETURN u`,
      bindVars: { "@coll": "location", slug },
    });
    const result = await resx.all();
    return result?.[0];
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const searchLocation = async (search: string) => {
  const db = cacheConnection();
  try {
    await getView("locationsearch", db);
    const resx = await db.query({
      query: `
      LET word = @search
      LET tokens = TOKENS(word, "text_en")
          FOR doc IN @@coll 
          SEARCH ANALYZER(TOKENS(tokens, "text_en")[0] ALL == doc.name OR
          PHRASE(doc.name, {WILDCARD: CONCAT('%', tokens[0] , '%')}, "text_en") OR 
          PHRASE(doc.name, word), "text_en") 
          LIMIT 10
          RETURN doc`,
      bindVars: { "@coll": "locationsearch", search: search },
    });
    const result = await resx.all();
    return result;
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};
