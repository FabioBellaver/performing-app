import { memo } from "react";

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
    priceFormatted: string;
  };
  onAddToWishlist: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => onAddToWishlist(product.id)}>
        Add to wishlist
      </button>
    </div>
  );
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
  }
);

/*
    'memo' avoid the component to enter in the default renderization flux
    use case of 'memo'
    1 - Pure Functional Components ();
    2 - Renders too often;
    3 - Re-render with same props;
    4 - Medium to big size.
    */
