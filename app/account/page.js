import { auth } from "../_lib/auth";

export const metadata = {
  title: "Accounts",
};

export default async function Page() {
  const {
    user: { name },
  } = await auth();

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {name}
    </h2>
  );
}
