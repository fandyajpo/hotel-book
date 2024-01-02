"use server";
import { cacheConnection, getCollection } from "@/lib/arangoDb";
import { ImageKitFileT } from "@/lib/imageKit";

export const listRoom = async (
  page: number,
  limit: number,
  hotel: string,
  status: string
) => {
  const db = cacheConnection();
  try {
    await getCollection("room", db);
    const resx = await db.query({
      query: `
      LET data = (
        FOR p IN @@coll
          FILTER p.hotel == @hotel
          FILTER p.status != @status
       
          LET hotel = (
            FOR c IN hotel
              FILTER c._key == p.hotel
              RETURN c
          )

          LIMIT ${page}, ${limit}
        RETURN MERGE(p, { hotel: FIRST(hotel)})
      )
      LET total = (
        FOR p IN @@coll
          FILTER p.hotel == @hotel
          FILTER p.status != @status
          COLLECT WITH COUNT INTO length
        return length
      )
      RETURN { total, data }`,
      bindVars: { "@coll": "room", hotel, status },
    });
    const result = await resx.all();
    return result[0];
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const roomByHotel = async (hotel: string) => {
  const db = cacheConnection();
  try {
    await getCollection("hotel", db);
    const resx = await db.query({
      query: `FOR u IN @@coll
       FILTER u.hotel == @hotel
       
            LET category = (
              FOR c IN category
                FILTER c._key == u.category
                RETURN  c 
            )

      RETURN MERGE(u, { category: FIRST(category) })`,
      bindVars: { "@coll": "room", hotel },
    });
    const result = await resx.all();
    return result;
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const roomById = async (key: string) => {
  const db = cacheConnection();
  try {
    await getCollection("room", db);
    const resx = await db.query({
      query: `FOR u IN @@coll
       FILTER u._key == @key
            LET hot = (
              FOR c IN hotel
                FILTER c._key == u.hotel
                RETURN  c 
            )
      RETURN MERGE(u, { hotel: FIRST(hot) })`,
      bindVars: { "@coll": "room", key: key },
    });
    const result = await resx.all();
    return result?.[0];
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const createRoom = async (
  name: string,
  hotel: string,
  status: string,
  description: string,
  bed: number,
  bath: number,
  price: number
) => {
  const db = cacheConnection();
  try {
    await getCollection("room", db);
    await db.query({
      query: `INSERT { 
        name: @name, 
        hotel: @hotel, 
        status: @status, 
        description: @description,
        bed: @bed,
        bath: @bath,
        price: @price,
      } IN @@coll RETURN NEW`,
      bindVars: {
        "@coll": "room",
        name,
        hotel,
        status,
        description,
        bed,
        bath,
        price,
      },
    });
    return { success: true };
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const updateRoom = async (
  key: string,
  name: string,
  status: string,
  description: string,
  price: number
) => {
  const db = cacheConnection();
  try {
    await getCollection("room", db);
    await db.query({
      query: `LET f = DOCUMENT(@@coll, @key)
      FILTER f != null
      UPDATE f WITH { 
        name: @name, 
        status: @status, 
        description: @description,
        price: @price,
      }
      IN @@coll`,
      bindVars: {
        "@coll": "room",
        key: key,
        name,
        status,
        description,
        price,
      },
    });

    return { success: true };
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const delRoom = async (key: string) => {
  const db = cacheConnection();
  try {
    await getCollection("room", db);
    const resx = await db.query({
      query: `FOR u IN @@coll
        FILTER u._key == @key
          REMOVE {
            _key: @key
          }
        IN @@coll
        RETURN OLD`,
      bindVars: { "@coll": "room", key: key },
    });
    const result = await resx.all();

    return result?.[0];
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const updateRoomMedia = async (key: string, image: ImageKitFileT) => {
  const db = cacheConnection();
  try {
    await getCollection("room", db);
    await db.query({
      query: `LET f = DOCUMENT(@@coll, @key)
      FILTER f != null
      UPDATE f WITH { 
        "image": PUSH(f.image, @image),
      }
      IN @@coll`,
      bindVars: { "@coll": "room", key: key, image: image },
    });

    return { success: true };
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const updateHotelRoomSummary = async (
  roomKey: string,
  hotelKey: string,
  bath: number,
  bed: number
) => {
  const db = cacheConnection();
  const transaction = await db.beginTransaction({
    read: ["room"],
    write: ["room", "hotel"],
  });
  try {
    const first = await transaction.step(() =>
      db.query({
        query: `  
        FOR u IN @@coll
        FILTER u._key == @roomKey
        UPDATE u WITH {
          "bed": @bed,
          "bath": @bath,
        } IN @@coll
        RETURN NEW
      `,
        bindVars: {
          "@coll": "room",
          roomKey,
          bed,
          bath,
        },
      })
    );
    const second = await transaction.step(() =>
      db.query({
        query: `
      let summary = (
        FOR u IN @@coll
        FILTER u.hotel == @hotelKey
        COLLECT AGGREGATE 
          minBath = MIN(u.bath), 
          maxBath = MAX(u.bath),
          minBed = MIN(u.bed),
          maxBed = MAX(u.bed)
        RETURN { 
          minBath, maxBath, minBed, maxBed
        }
      )
      FOR u IN hotel
      FILTER u._key == @hotelKey
      UPDATE u WITH {
        "summary": FIRST(summary)
      } IN hotel
      RETURN NEW
        `,
        bindVars: {
          "@coll": "room",
          hotelKey,
        },
      })
    );

    await transaction.commit();
    return { success: true };
  } catch (error) {
    await transaction.abort();
    throw error;
  } finally {
    db.close();
  }
};
