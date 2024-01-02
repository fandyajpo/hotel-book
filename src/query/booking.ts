"use server";

import { cacheConnection, getCollection } from "@/lib/arangoDb";
import { BookingT, SecureFormT, StatusT } from "@/types";

export const listBooking = async (
  page: number,
  limit: number,
  checkIn: string,
  checkOut: string
) => {
  const db = cacheConnection();
  try {
    await getCollection("booking", db);
    const resx = await db.query({
      query: `

      
      LET data = (
        FOR p IN @@coll
        FILTER !(@checkIn && @checkOut) || (p.checkIn >= DATE_ISO8601(@checkIn) && p.checkOut <= DATE_ISO8601(@checkOut))
         
        LET roo = (
          FOR c IN room
          FILTER c._key == p.room
          RETURN c
        )

        LET hot = (
          FOR h IN hotel
          FILTER h._key == p.hotel
          RETURN h
        )

        LIMIT ${page}, ${limit}
        RETURN MERGE(p, {room:FIRST(roo), hotel:FIRST(hot)})
      )
      LET total = (
        FOR p IN @@coll
          FILTER !(@checkIn && @checkOut) || (p.checkIn >= DATE_ISO8601(@checkIn) && p.checkOut <= DATE_ISO8601(@checkOut))
          COLLECT WITH COUNT INTO length
        return length
      )
      RETURN { total, data }
      `,
      bindVars: {
        "@coll": "booking",
        checkIn,
        checkOut,
      },
    });
    const result = await resx.all();
    return result[0];
  } catch (error) {
    throw error;
  } finally {
    db.close();
  }
};

export const createBooking = async (data: BookingT) => {
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
          room: @room,
          transactionUrl: @transactionUrl,
          amount: @amount,
          hotel: @hotel,
          currency: @currency,
          username:@username
        } IN @@coll RETURN NEW`,
      bindVars: {
        "@coll": "booking",
        checkIn: data?.checkIn || "",
        checkOut: data?.checkOut || "",
        email: data?.email || "",
        guest: data?.guest || "",
        phone: data?.phone || "",
        room: data?.room || "",
        transactionUrl: data?.transactionUrl || "",
        amount: Number(data?.amount) || 0,
        hotel: data?.hotel || "",
        currency: data?.currency || "IDR",
        username: data?.username || "",
      } as BookingT,
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

export const updateBookingStatus = async (
  bookId: string,
  roomId: string,
  status: StatusT
) => {
  const db = cacheConnection();
  const booking = db.collection("booking");
  const room = db.collection("room");
  const trx = await db.beginTransaction({
    read: ["booking"],
    write: ["booking", "room"],
  });

  try {
    await trx.step(() => {
      return booking.update(
        { _key: bookId, _id: `booking/${bookId}` },
        { status: "BOOKED" }
      );
    });

    await trx.step(() => {
      return room.update(
        { _key: roomId, _id: `room/${roomId}` },
        { status: "BOOKED" }
      );
    });

    await trx.commit();
    return { success: true };
  } catch (error) {
    await trx.abort();
    throw error;
  } finally {
    db.close();
  }
};

export const delBook = async (key: string) => {
  const db = cacheConnection();
  try {
    await getCollection("booking", db);
    const resx = await db.query({
      query: `FOR u IN @@coll
        FILTER u._key == @key
          REMOVE {
            _key: @key
          }
        IN @@coll
        RETURN OLD`,
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
