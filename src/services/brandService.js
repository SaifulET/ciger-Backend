import Brand from "../models/brand.js";

// ✅ Create new brand
export const createBrand = async (data) => {
  console.log(data,"line5")
  const brand = new Brand(data);
  
  return await brand.save();
};

// ✅ Get all brands
export const getAllBrands = async () => {
  const brands = await Brand.aggregate([
    {
      $addFields: {
        normalizedName: { $trim: { input: { $toLower: "$name" } } }
      }
    },
    {
      $group: {
        _id: "$normalizedName",
        doc: { $first: "$$ROOT" } // take the first document for each unique normalized name
      }
    },
    {
      $replaceRoot: { newRoot: "$doc" } // replace the root with original document
    },
    {
      $sort: { createdAt: -1 } // sort by createdAt
    }
  ]);

  return brands;
};
// ✅ Update brand
export const updateBrand = async (id, data) => {
  console.log(data)
  return await Brand.findByIdAndUpdate(id, data, { new: true });
};

// ✅ Delete brand
export const deleteBrand = async (id) => {
  return await Brand.findByIdAndDelete(id);
};


export const getBrandByIdService = async (id) => {
  const brand = await Brand.findById(id);
  return brand;
};