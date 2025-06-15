import { Listing } from "../models/Listing.model.js";
import { User } from "../models/User.model.js";
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
        // Fetch all listings from the database and populate the owner field
        const listings = await Listing.find().populate('owner', 'username email avatar');
        console.log("Listings retrieved successfully");

        // Return the listings in the response
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


const getUserListings = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        throw new ApiError(400, "Email parameter is required");
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        const listings = await Listing.find({ owner: user._id });

        return res.status(200).json({ listings });
    } catch (error) {
        console.error("An error occurred while retrieving user listings:", error);
        throw new ApiError(500, 'Internal server error');
    }
});


const buyListing = asyncHandler(async (req, res) => {
    const { listingId } = req.body;
    const { buyerEmail } = req.body;

    if (!buyerEmail) {
        throw new ApiError(400, 'Buyer email is required');
    }

    try {
        const listing = await Listing.findById(listingId);

        if (!listing) {
            throw new ApiError(404, 'Listing not found');
        }

        if (listing.isSold) {
            return res.status(200).json({ message: 'Listing is already sold' });
        }
        console.log("Listing is found")
        listing.isSold = true;
        listing.buyerEmail = buyerEmail;
        await listing.save();

        return res.status(200).json({ message: 'Listing purchased successfully' });
    } catch (error) {
        console.error("An error occurred while buying the listing:", error);
        throw new ApiError(500, 'Internal server error');
    }
});

const deleteListing = asyncHandler(async (req, res) => {
    const { listingId } = req.body;

    if (!listingId) {
        res.status(400);
        throw new Error('Listing ID is required');
    }

    const deletedListing = await Listing.findByIdAndDelete(listingId);

    if (!deletedListing) {
        res.status(404);
        throw new Error('Listing not found');
    }

    res.status(200).json({
        message: 'Listing deleted successfully',
        deletedListing,
    });
});

export { createListing, getListings, getUserListings, buyListing, deleteListing,getListing };
