import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

//for making it static , but we used auth here so the route becomes dynamic
export async function generateStaticParams() {
  const { data: cabins } = await getCabins();

  return cabins.map((cabin) => ({
    id: cabin._id,
  }));
}

export async function generateMetadata({ params }) {
  const {
    data: { name },
  } = await getCabin(params.id);

  return { title: name };
}

export default async function Page({ params }) {
  const { data: cabin } = await getCabin(params.id);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
