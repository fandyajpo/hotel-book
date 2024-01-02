"use client";
import { useForm, Controller } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/Firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingSVG } from "@/components/Icons";

type Auth = {
  email: string;
  password: string;
};

const AuthForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm<Auth>({ mode: "onChange" });

  const onSubmit = handleSubmit(async (data: Auth) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      return router.replace("/bo/hotel?page=1");
    } catch (err) {
      setLoading(false);
      return console.log("ERROR : ", err);
    }
  });

  return (
    <div className="flex items-center justify-center h-full">
      <form onSubmit={onSubmit}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <div className="flex flex-col gap-2 w-80">
              <label className="text-white">Email</label>
              <input placeholder="Email" type="text" {...field} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <div className="flex flex-col gap-2 w-80">
              <label className="text-white">Password</label>
              <input placeholder="Password" type="password" {...field} />
            </div>
          )}
        />
        <button
          type="submit"
          className="bg-blue-600 w-full my-2 h-10 text-white"
        >
          {loading ? <LoadingSVG className="w-6 h-6 text-white" /> : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
