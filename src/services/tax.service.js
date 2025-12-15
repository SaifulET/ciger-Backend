import Taxjar from "taxjar";

export const calculateTaxService = async (payload) => {
  const { amount, from_zip, to_zip, to_state, shipping = 0 } = payload;

  const client = new Taxjar({
    apiKey: process.env.TAXJAR_API_KEY,
  });

  const tax = await client.taxForOrder({
  from_country: 'US',
  from_zip: '92093',
  from_state: 'CA',
  from_city: 'La Jolla',
  from_street: '9500 Gilman Drive',
  to_country: 'US',
  to_zip,
  to_state,
  to_city,
  amount,
  shipping,
  nexus_addresses: [
    {
      id: 'Main Location',
      country: 'US',
      zip: '92093',
      state: 'CA',
      city: 'La Jolla',
      street: '9500 Gilman Drive'
    }
  ],
  
});
console.log("calculated tax:", tax);
console.log("calculated tax:", tax);
  return tax;
};
