import { formatDistanceToNow } from 'date-fns';

const ProductCard = ({ product }) => {
  const { id, name, category, price, updatedAt } = product;

  const relativeTime = (() => {
    try {
      return formatDistanceToNow(new Date(updatedAt), { addSuffix: true })
        .replace('about ', '')
        .replace('less than a minute ago', 'just now');
    } catch {
      return 'recently';
    }
  })();

  // Format price
  const displayPrice = price ? `$${parseFloat(price).toFixed(2)}` : '$0.00';

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-5 flex flex-col gap-4 hover:border-secondary transition-all duration-200 group relative shadow-sm">
      {/* Category tag & Product Code identifier */}
      <div className="flex items-start justify-between">
        <span className="font-label-sm text-label-sm bg-surface-container text-on-surface-variant px-2 py-0.5 rounded border border-outline-variant">
          {category}
        </span>
        <span className="font-label-md text-label-md text-secondary uppercase font-mono">
          PC-{id}
        </span>
      </div>

      {/* Main product names & descriptions */}
      <div className="mt-1 flex-1">
        <h3 className="font-headline-md text-headline-md text-on-surface leading-tight mb-2 font-bold group-hover:text-secondary transition-colors line-clamp-1">
          {name}
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
          High quality selected product from our catalog category. Guaranteed stability, high efficiency, and professional delivery.
        </p>
      </div>

      {/* Pricing & Timing footer metadata */}
      <div className="mt-auto pt-4 border-t border-outline-variant/50 flex items-end justify-between">
        <div>
          <p className="font-label-sm text-label-sm text-on-surface-variant mb-0.5">Base Price</p>
          <p className="font-label-md text-label-md text-on-surface font-semibold">{displayPrice}</p>
        </div>
        <div className="text-right">
          <p className="font-label-sm text-label-sm text-on-surface-variant mb-0.5">Updated</p>
          <p className="font-label-md text-label-md text-on-surface font-medium">{relativeTime}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
