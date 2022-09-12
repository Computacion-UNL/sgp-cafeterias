import { Button, ProductCard } from "@components/elements";
import { useActiveProducts } from "@lib";
import { useRouter } from "next/router";
import {
  Dispatch,
  Fragment,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from "react";

export const ProductScroll = () => {
  const router = useRouter();
  const { category } = router.query;
  const [cnt, setCnt] = useState(1);
  const [isReachingEnd, setIsReachingEnd] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const pages = [];
  for (let i = 0; i < cnt; i++) {
    pages.push(
      <PageProducts
        page={i}
        key={i}
        category={category as string | undefined}
        setIsReachingEnd={setIsReachingEnd}
        setIsLoading={setIsLoading}
      />
    );
  }

  return (
    <Fragment>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {pages}
      </div>

      {isReachingEnd === false && (
        <div className="mt-10 mb-5 flex">
          <Button
            className="btn btn-outline mx-auto w-full lg:w-auto px-10"
            onClick={() => setCnt(cnt + 1)}
            loading={isLoading}
            disabled={isLoading}
          >
            Cargar más productos
          </Button>
        </div>
      )}
    </Fragment>
  );
};

const PageProducts = memo(
  (props: {
    category?: string;
    page: number;
    setIsReachingEnd: Dispatch<SetStateAction<boolean>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
  }) => {
    const { category, page, setIsReachingEnd, setIsLoading } = props;

    const { data: products, loading } = useActiveProducts(page, category);

    useEffect(() => {
      if (products) setIsReachingEnd(!products.hasNextPage);
    }, [products, setIsReachingEnd]);

    useEffect(() => {
      setIsLoading(loading);
    }, [loading, setIsLoading]);

    return (
      <Fragment>
        {products?.docs.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </Fragment>
    );
  }
);

PageProducts.displayName = "PageProducts";
