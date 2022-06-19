import { FormEvent, useCallback, useState } from "react";
import { SearchResults } from "../components/SearchResults";

interface ResultsProps {
  totalPrice: number;
  data: any[];
}

interface ProductType {
  id: number;
  title: string;
  price: number;
  priceFormatted: string;
}

const Home = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<ResultsProps>({
    totalPrice: 0,
    data: [],
  });

  const handleSearch = async (event: FormEvent) => {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`);
    const data = await response.json();

    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    const products = data.map((product: ProductType) => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price),
      };
    });

    const totalPrice = data.reduce((total: number, product: ProductType) => {
      return total + product.price;
    }, 0);

    setResults({ totalPrice, data: products });
  };

  const addToWishList = useCallback(async (id: number) => {
    console.log(id);
  }, []);

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <SearchResults
        results={results.data}
        totalPrice={results.totalPrice}
        onAddToWishlist={addToWishList}
      />
    </div>
  );
};

export default Home;

/*
use case of 'useCallback'
Just for referential equality
*/
