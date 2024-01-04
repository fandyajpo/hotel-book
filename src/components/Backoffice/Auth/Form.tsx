"use client";
import { useForm, Controller } from "react-hook-form";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/lib/Firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingSVG } from "@/components/Icons";
import { useStore } from "@/store";
import Link from "next/link";
type Auth = {
  email: string;
  password: string;
};

const AuthForm = () => {
  const { user } = useStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit } = useForm<Auth>({ mode: "onChange" });

  const onSubmit = handleSubmit(async (data: Auth) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      return router.replace("/bo/hotel?page=1");
    } catch (err) {
      return setLoading(false);
    }
  });

  return (
    <div className="flex items-center justify-center h-full">
      {user === null ? (
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
      ) : (
        <div>
          <p className="text-white">You have already logged in.</p>
          <div className="flex gap-2">
            <button
              onClick={() => signOut(auth)}
              className="bg-blue-600 w-36 my-2 h-10 text-white"
            >
              {loading ? (
                <LoadingSVG className="w-6 h-6 text-white" />
              ) : (
                "Sign out"
              )}
            </button>
            <Link
              href={"/bo/hotel?page=1&limit=10"}
              className="bg-blue-600 w-36 my-2 h-10 text-white flex items-center justify-center"
            >
              Go Dashboard
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
