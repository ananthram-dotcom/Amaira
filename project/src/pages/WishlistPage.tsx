import React from 'react';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartWishlist } from '../context/CartWishlistContext';

const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart } = useCartWishlist();
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-red-900 flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-800 fill-current" />
            My Wishlist
          </h1>
          <p className="text-gray-600 mt-1">Your saved items and favorite beauty products.</p>
        </div>
        <span className="text-sm font-semibold bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
          {wishlist.length} saved
        </span>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-yellow-100 shadow-sm">
          <Heart className="h-16 w-16 text-red-200 mx-auto mb-4 stroke-1" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-6 text-sm">
            Save your favorite traditional ornaments, cosmetics, and silk garments by tapping the heart icon on any product card.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 bg-red-800 text-white rounded-full font-medium hover:bg-red-700 transition-colors shadow"
          >
            Explore Catalog
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-yellow-100 hover:shadow-lg transition-shadow flex flex-col justify-between"
            >
              <div className="relative">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover"
                  />
                </Link>
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white text-red-600 rounded-full shadow transition-colors"
                  title="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-yellow-700 font-semibold uppercase">{product.category}</span>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-base font-bold text-gray-900 line-clamp-1 hover:text-red-800 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-baseline space-x-2 mt-2">
                    <span className="text-lg font-extrabold text-red-900">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => addToCart(product)}
                  className="w-full mt-4 py-2 bg-red-800 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center space-x-2 shadow-sm"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Move to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
