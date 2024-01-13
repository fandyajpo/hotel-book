"use server";

import { getConnection, getCollection, getView } from "@/lib/arangoDb";

export const listCategory = async (page: number, limit: number) => {
  const db = getConnection();
  try {
    await getCollection("category", db);
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
      bindVars: { "@coll": "category" },
    });
    const result = await resx.all();
    return result[0];
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const createCategory = async (name: string) => {
  const db = getConnection();
  try {
    await getCollection("category", db);
    await db.query({
      query: "INSERT { name: @name } IN @@coll RETURN NEW",
      bindVars: { "@coll": "category", name: name },
    });
    return { success: true };
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const updateCategory = async (key: string, name: string) => {
  const db = getConnection();
  try {
    await getCollection("category", db);
    await db.query({
      query: `LET f = DOCUMENT(@@coll, @key)
      FILTER f != null
      UPDATE f WITH { 
        "name": @name,
      }
      IN @@coll`,
      bindVars: { "@coll": "category", key: key, name: name },
    });

    return { success: true };
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const delCat = async (key: string) => {
  const db = getConnection();
  try {
    await getCollection("category", db);
    const resx = await db.query({
      query: `FOR u IN @@coll
        FILTER u._key == @key
          REMOVE {
            _key: @key
          }
        IN @@coll
        RETURN OLD`,
      bindVars: { "@coll": "category", key: key },
    });
    const result = await resx.all();
    return result?.[0];
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const categoryById = async (key: string) => {
  const db = getConnection();
  try {
    await getCollection("category", db);
    const resx = await db.query({
      query: `FOR u IN @@coll
               FILTER u._key == @key
               RETURN u`,
      bindVars: { "@coll": "category", key: key },
    });
    const result = await resx.all();
    return result?.[0];
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const searchCategory = async (search: string) => {
  const db = getConnection();
  try {
    await getView("categorysearch", db);
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
      bindVars: { "@coll": "categorysearch", search: search },
    });
    const result = await resx.all();
    return result;
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};
