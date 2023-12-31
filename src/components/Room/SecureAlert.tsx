"use client";
import { RoomT } from "@/types";
import { useForm, Controller } from "react-hook-form";

interface Props {
  room: RoomT;
}

type SecureFormT = {
  checkIn: string;
  checkOut: string;
  guest: number;
  email: string;
};

const SecureAlert = (props: Props) => {
  const { control } = useForm<SecureFormT>();
  return (
    <div>
      <div>
        <Controller
          rules={{
            required: true,
          }}
          control={control}
          render={({ field }) => <input />}
          name="checkIn"
        />
        <Controller
          rules={{
            required: true,
          }}
          control={control}
          render={({ field }) => <input />}
          name="checkOut"
        />
        <Controller
          rules={{
            required: true,
          }}
          control={control}
          render={({ field }) => <input />}
          name="guest"
        />
        <Controller
          rules={{
            required: true,
          }}
          control={control}
          render={({ field }) => <input />}
          name="email"
        />
      </div>
      <input className="border border-gray-300" />
    </div>
  );
};

export default SecureAlert;
