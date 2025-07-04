import { Router } from 'express';
import { createListing, getListings, getUserListings } from '../../controllers/HotelController.js';

const listingRoutes = Router();

listingRoutes.post('/create', createListing);
listingRoutes.get('/getListings', getListings);
listingRoutes.post('/getUserListings', getUserListings);
// listingRoutes.post('/buyListing', buyListing);
// listingRoutes.delete('/deleteListing',deleteListing);
// listingRoutes.get('/getListing/:listingId', getListing);

export default listingRoutes;
