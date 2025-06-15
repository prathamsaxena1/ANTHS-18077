import { Listing } from "../models/Hotel.js";
import { User } from "../models/User.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { v2 as cloudinary } from 'cloudinary';

async function uploadImages(files, folder) {
    const uploadPromises = files.map(file => cloudinary.uploader.upload(file.tempFilePath, { folder }));
    return await Promise.all(uploadPromises);
}

const createListing = asyncHandler(async (req, res) => {
    console.log("Listing called");
    const {
        ownerEmail, name, description, address,
        regularPrice, discountPrice, bathrooms, bedrooms,
        furnished, parking
    } = req.body;

    const imageFiles = req.files?.images; // Assuming images are sent as a file array

    // Validate required fields
    if (!ownerEmail || !name || !description || !address ||
        !regularPrice || !discountPrice || !bathrooms || !bedrooms ||
        !furnished || !parking || !imageFiles) {
        throw new ApiError(401, "All the fields are required");
    }

    // Ensure imageFiles is an array (it could be a single file)
    const imageArray = Array.isArray(imageFiles) ? imageFiles : [imageFiles];

    let uploadedImages;
    try {
        uploadedImages = await uploadImages(imageArray, 'Listings');
        console.log("Images uploaded successfully:", uploadedImages);
    } catch (error) {
        console.error("Error uploading images:", error);
        throw new ApiError(500, 'Failed to upload images');
    }

    const imageUrls = uploadedImages.map(upload => upload.secure_url);

    // Find the user by ownerEmail
    const owner = await User.findOne({ email: ownerEmail });
    if (!owner) {
        throw new ApiError(404, 'Owner not found');
    }

    let listing;
    try {
        console.log("Creating listing ......");
        listing = await Listing.create({
            owner: owner._id, // Set the owner field with the user's _id
            name, description, address,
            regularPrice, discountPrice, bathrooms, bedrooms,
            furnished, parking, imageUrls
        });
        console.log("Listing created......");
    } catch (error) {
        console.error("An error occurred while creating the listing:", error);
        throw new ApiError(500, 'Internal server error');
    }

    return res.status(200).json({ listing });
});

const getListings = asyncHandler(async (req, res) => {
    try {
        const listings = await Listing.find().populate('owner', 'username email avatar');
        console.log("Listings retrieved successfully");

        return res.status(200).json({ listings });
    } catch (error) {
        console.error("An error occurred while retrieving listings:", error);
        throw new ApiError(500, 'Internal server error');
    }
});

const getListing = asyncHandler(async (req, res) => {
    const { listingId } = req.params;
    console.log(req.params)

    if (!listingId) {
        throw new ApiError(400, "Listing ID is required");
    }

    try {
        const listing = await Listing.findById(listingId).populate('owner', 'username email avatar');
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        console.log("Listing retrieved successfully");
        return res.status(200).json({ listing });
    } catch (error) {
        console.error("An error occurred while retrieving the listing:", error);
        throw new ApiError(500, 'Internal server error');
    }
});


export { createListing, getListings,getListing };
