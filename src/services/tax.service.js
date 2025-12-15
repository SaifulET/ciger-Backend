import Taxjar from "taxjar";

export const calculateTaxService = async (payload) => {
  const { amount, from_zip, to_zip, to_state, shipping = 0 } = payload;

  const client = new Taxjar({
    apiKey: process.env.TAXJAR_API_KEY,
  });

  const tax = await client.taxForOrder({
  from_country: 'US',
  from_zip: '28056',
  from_state: 'NC',
  from_city: 'Gastonia',
  from_street: '3824 Quay Ct',
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
      zip: '28056',
      state: 'NC',
      city: 'Gastonia',
      street: '3824 Quay Ct'
    }
  ],
  
});
console.log("calculated tax:", tax);
console.log("calculated tax:", tax);
  return tax;
};
