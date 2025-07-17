import React, { useState, useEffect } from "react";
import wishlistService from "../../../services/wishlistService.js";
import NoDataComponent from "../../../components/helpers/NoDataComponent.jsx";
import Spinner from "../../../components/Spinner.jsx";
import WishlistCard from "../../../components/WishlistCard.jsx"; // corrected filename

export default function Wishlist() {
    const [wishlists, setWishlists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const { wishlists } = await wishlistService.getWishlist();
                setWishlists(wishlists);
            } catch (err) {
                console.error("Error fetching wishlists:", err);
            } finally {
                setLoading(false);
            }
        })();
        document.title = '3ird Shortlet | Wishlists';
    }, []);

    if (loading) return <Spinner />;

    return (
        <div className="container mx-auto px-4 py-8">
            {wishlists.length ? (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {wishlists[0].apartments.map((wl, i) => (
                        <WishlistCard key={i} wishlist={wl} />
                    ))}
                </div>
            ) : (
                <NoDataComponent
                    title="No Wishlists"
                    description="You don't have any wishlists yet. Create one now."
                />
            )}
        </div>
    );
}
