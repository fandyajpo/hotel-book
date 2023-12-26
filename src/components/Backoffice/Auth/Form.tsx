"use client";
import { useForm, Controller } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/Firebase";
import { useRouter } from "next/navigation";

type Auth = {
  email: string;
  password: string;
};

const AuthForm = () => {
  const router = useRouter();
  const { control, handleSubmit } = useForm<Auth>({ mode: "onChange" });

  const onSubmit = handleSubmit(async (data: Auth) => {
    try {
      const login = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      return router.replace("/bo/hotel?page=1");
    } catch (err) {
      return console.log("ERROR : ", err);
    }
  });

  return (
    <div className="flex items-center justify-center h-96">
      <form onSubmit={onSubmit}>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <input type="text" {...field} />
            </div>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label>Password</label>
              <input type="password" {...field} />
            </div>
          )}
        />
        <button
          type="submit"
          className="bg-blue-500 w-full my-2 h-10 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
