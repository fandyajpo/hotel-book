import Link from "next/link";
const GoLogin = () => {
  return (
    <div className="bg-transparent fixed top-0 z-10 w-full flex justify-center px-4 py-3 text-white">
      <p className="text-center text-sm font-medium">
        Go to dashboard{" "}
        <Link href="/bo/auth" className="inline-block underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default GoLogin;
