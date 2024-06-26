import { getCountries } from "@/app/_lib/data-service";

// Let's imagine your colleague already built this component 😃

async function SelectCountry({ defaultCountry, name, id, className }) {
  const countries = await getCountries();

  const flag =
    countries.find(
      (country) => country.name.common.toLowerCase() === defaultCountry
    )?.flag ?? "";

  // {
  //   name: {
  //     common: 'Norway',
  //     official: 'Kingdom of Norway',
  //     nativeName: [Object]
  //   },
  //   flag: '🇳🇴'
  // }

  return (
    <select
      name={name}
      id={id}
      // Here we use a trick to encode BOTH the country name and the flag into the value. Then we split them up again later in the server action
      defaultValue={`${defaultCountry}%${flag}`}
      className={className}
    >
      <option defaultValue={defaultCountry}>Select country...</option>
      {countries.map((c) => (
        <option key={c.name.common} value={`${c.name.common}%${c.flag}`}>
          {c.name.common}
        </option>
      ))}
    </select>
  );
}

export default SelectCountry;
