"use server";
import { cacheConnection, getCollection, getView } from "@/lib/arangoDb";
import { ImageKitFileT } from "@/lib/imageKit";
import { CurrencyT, StatusT } from "@/types";

export const listHotel = async (
  page: number,
  limit: number,
  status: StatusT
) => {
  const db = cacheConnection();
  try {
    await getCollection("hotel", db);
    const resx = await db.query({
      query: ` 
      LET data = (
        FOR p IN @@coll
        FILTER p.status != @status
          LET cat = (
            FOR c IN category
              FILTER c._key == p.category
              RETURN c
          )
          LIMIT ${page}, ${limit}
        RETURN MERGE(p, { category: FIRST(cat) })
      )

      LET total = (
        FOR p IN @@coll
        FILTER p.status != @status
          COLLECT WITH COUNT INTO length
        return length
      )

      RETURN { total, data }`,
      bindVars: { "@coll": "hotel", status },
    });
    const result = await resx.all();
    return result[0];
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const hotelById = async (key: string) => {
  const db = cacheConnection();
  try {
    await getCollection("hotel", db);
    const resx = await db.query({
      query: `FOR u IN @@coll
      FILTER u._key == @key
            LET category = (
              FOR c IN category
                FILTER c._key == u.category
                RETURN  c 
            )
            LET location = (
              FOR c IN location
                FILTER c._key == u.location
                RETURN  c 
            )
       
      RETURN MERGE(u, { category: FIRST(category), location: FIRST(location) })`,
      bindVars: { "@coll": "hotel", key: key },
    });
    const result = await resx.all();
    return result?.[0];
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const hotelBySlug = async (slug: string) => {
  const db = cacheConnection();
  try {
    await getCollection("hotel", db);
    const resx = await db.query({
      query: `FOR u IN @@coll
      FILTER u.slug == @slug
            LET category = (
              FOR c IN category
                FILTER c._key == u.category
                RETURN  c 
            )
            LET location = (
              FOR c IN location
                FILTER c._key == u.location
                RETURN  c 
            )
       
      RETURN MERGE(u, { category: FIRST(category), location: FIRST(location) })`,
      bindVars: { "@coll": "hotel", slug },
    });
    const result = await resx.all();
    return result?.[0];
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const hotelByLocation = async (
  page: number,
  limit: number,
  location: string,
  status: string
) => {
  const db = cacheConnection();
  try {
    await getCollection("hotel", db);
    const resx = await db.query({
      query: `
          LET data = (
            FOR u IN @@coll
            FILTER u.status != @status
            FILTER u.location == @loc
            LET category = (
              FOR c IN category
                FILTER c._key == u.category
                RETURN  c 
            )
            LET location = (
              FOR a IN location
                FILTER a._key == u.location
                RETURN a 
            )
            LIMIT ${page}, ${limit}
            RETURN MERGE(u, { category: FIRST(category), location: FIRST(location) })
          )
            
          LET total = (
              FOR p IN @@coll
                FILTER p.status != @status
                FILTER p.location == @loc
                COLLECT WITH COUNT INTO length
              return length
          )

          RETURN { total, data }`,
      bindVars: { "@coll": "hotel", loc: location, status },
    });
    const result = await resx.all();
    return result[0];
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const createHotel = async (
  name: string,
  category: string,
  location: string,
  status: string,
  description: string,
  currency: CurrencyT,
  slug: string
) => {
  const db = cacheConnection();
  try {
    await getCollection("hotel", db);
    await db.query({
      query: `INSERT { 
        name: @name, 
        category: @category, 
        location: @location, 
        status: @status, 
        description: @description,
        currency: @currency,
        slug: @slug,
       } IN @@coll RETURN NEW`,
      bindVars: {
        "@coll": "hotel",
        name,
        category,
        location,
        status,
        description,
        currency,
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

export const updateHotel = async (
  key: string,
  name: string,
  category: string,
  location: string,
  status: string,
  description: string,
  currency: CurrencyT,
  slug: string
) => {
  const db = cacheConnection();
  try {
    await getCollection("hotel", db);
    await db.query({
      query: `LET f = DOCUMENT(@@coll, @key)
      FILTER f != null
      UPDATE f WITH { 
        name: @name,
        category: @category,
        location: @location,
        status: @status,
        description: @description,
        currency: @currency,
        slug: @slug,
      }
      IN @@coll`,
      bindVars: {
        "@coll": "hotel",
        key,
        name,
        category,
        location,
        status,
        description,
        currency,
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

export const updateHotelMedia = async (key: string, image: ImageKitFileT) => {
  const db = cacheConnection();
  try {
    await getCollection("hotel", db);
    await db.query({
      query: `LET f = DOCUMENT(@@coll, @key)
      FILTER f != null
      UPDATE f WITH { 
        "image": PUSH(f.image, @image),
      }
      IN @@coll`,
      bindVars: { "@coll": "hotel", key: key, image: image },
    });

    return { success: true };
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const delHotel = async (key: string) => {
  const db = cacheConnection();
  try {
    await getCollection("hotel", db);
    const resx = await db.query({
      query: `FOR u IN @@coll
        FILTER u._key == @key
          REMOVE {
            _key: @key
          }
        IN @@coll
        RETURN OLD`,
      bindVars: { "@coll": "hotel", key: key },
    });
    const result = await resx.all();

    return result?.[0];
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const searchhotel = async (search: string) => {
  const db = cacheConnection();
  try {
    await getView("hotelsearch", db);
    const resx = await db.query({
      query: `
      LET word = @search
      LET tokens = TOKENS(word, "text_en")
          FOR doc IN @@coll 
          SEARCH ANALYZER(TOKENS(tokens, "text_en")[0] ALL == doc.name OR
          PHRASE(doc.name, {WILDCARD: CONCAT('%', tokens[0] , '%')}, "text_en") OR 
          PHRASE(doc.name, word), "text_en") 
          LIMIT 9
          RETURN doc`,
      bindVars: { "@coll": "hotelsearch", search: search },
    });
    const result = await resx.all();
    return result;
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const updateHotelMediaPosition = async (
  key: string,
  image: Array<ImageKitFileT>
) => {
  const db = cacheConnection();
  try {
    await getCollection("hotel", db);
    await db.query({
      query: `LET f = DOCUMENT(@@coll, @key)
      FILTER f != null
      UPDATE f WITH { 
        image: @slug,
      }
      IN @@coll`,
      bindVars: {
        "@coll": "hotel",
        key,
        image,
      },
    });

    return { success: true };
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};
