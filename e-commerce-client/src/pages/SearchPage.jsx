import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/Search";

const SearchPage = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container">
        <div className="text-center">
          <h1 className="text-center mb-4"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#343a40",
            }}>Search Results</h1>
          <h6 className="text-center mb-4"
            style={{
              fontFamily: "Poppins, sans-serif;, serif",
              fontSize: "1.5rem",
              fontWeight: "700",
              color: "#343a40",
            }}>
            {values?.result.length < 1
              ? "No Product Found"
              : `Found ${values?.result.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.result.map((p) => (
              <div key={p._id} className="card m-2" style={{ width: "18rem" }}>
                {/* Image wrapper with fixed dimensions */}
                <div
                  style={{ width: "100%", height: "200px", overflow: "hidden" }}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="card-img-top"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain", // fills completely, crops if needed
                    }}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}
                  </p>
                  <p className="card-text">₹ {p.price}</p>
                  <button className="btn btn-primary ms-1">More Details</button>
                  <button className="btn btn-secondary ms-1">
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SearchPage;
