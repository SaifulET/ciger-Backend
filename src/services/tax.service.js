import Taxjar from "taxjar";

export const calculateTaxService = async (payload) => {
  const { amount, from_zip, to_zip, to_state,to_street, shipping = 0 ,to_city} = payload;

  const client = new Taxjar({
    apiKey: process.env.TAXJAR_API_KEY,
  });

  const tax = await client.taxForOrder({
  from_country: 'US',
  from_zip: to_zip,
  from_state: to_state,
  from_city: to_city,
  
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
      zip: to_zip,
      state: to_state,
      city: to_city,
      street:to_street
    }
  ],
  
});


  return tax;
};
