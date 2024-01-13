"use server";

import { LocationT } from "@/types";

export const locationById = async (name: string) => {
  try {
    const location = await fetch(
      `${process.env.NEXT_PUBLIC_URL}api/location/search/${name}`,
      {
        method: "GET",
      }
    );

    const result: LocationT = await location?.json();

    return result;
  } catch (err) {
    throw err;
  }
};
