"use server";

import { cacheConnection, getCollection } from "@/lib/arangoDb";
import { SecureFormT } from "@/types";

export const listBooking = async (page: number, limit: number) => {
  const db = cacheConnection();
  try {
    await getCollection("booking", db);
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
      bindVars: { "@coll": "booking" },
    });
    const result = await resx.all();
    return result[0];
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const createBooking = async (data: SecureFormT) => {
  const db = cacheConnection();
  try {
    await getCollection("booking", db);
    await db.query({
      query: `INSERT { 
          checkIn: @checkIn, 
          checkOut: @checkOut,
          email: @email,
          guest: @guest,
          phone: @phone,
          room: @room
        } IN @@coll RETURN NEW`,
      bindVars: {
        "@coll": "booking",
        checkIn: data?.checkIn || "",
        checkOut: data?.checkOut || "",
        email: data?.email || "",
        guest: data?.guest || "",
        phone: data?.phone || "",
        room: data?.room || "",
      } as SecureFormT,
    });
    return { success: true };
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const bookingById = async (key: string) => {
  const db = cacheConnection();
  try {
    await getCollection("booking", db);
    const resx = await db.query({
      query: `FOR u IN @@coll
               FILTER u._key == @key
               RETURN u`,
      bindVars: { "@coll": "booking", key: key },
    });
    const result = await resx.all();
    return result?.[0];
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};
