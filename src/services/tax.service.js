import Taxjar from "taxjar";

export const calculateTaxService = async (payload) => {
  const { amount, from_zip, to_zip, to_state, shipping = 0 } = payload;

  const client = new Taxjar({
    apiKey: process.env.TAXJAR_API_KEY,
  });

  const tax = await client.taxForOrder({
    from_country: "US",
    from_zip,
    from_state: "IL", // your origin state
    to_country: "US",
    to_zip,
    to_state,
    amount,
    shipping,
    nexus_addresses: [
      {
        id: "Main Location",
        country: "US",
        zip: from_zip,
        state: "IL",
        city: "evanston",
        street: "3350 Chruch St",
      },
    ],
  });

  return tax;
};
