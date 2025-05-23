import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title="All Categories">
      <div className="container py-5">
        <h1
          className="text-center mb-4"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: "700",
            fontSize: "2.5rem",
            color: "#212529",
          }}
        >
          Browse Categories
        </h1>

        <div className="row">
          {categories.map((c) => (
            <div className="col-md-4 mb-4" key={c._id}>
              <Link
                to={`/category/${c.slug}`}
                className="text-decoration-none"
              >
                <div
                  className="p-4 shadow-sm rounded bg-light text-center h-100 d-flex align-items-center justify-content-center"
                  style={{
                    border: "1px solid #dee2e6",
                    transition: "0.3s",
                    fontWeight: "600",
                    fontSize: "1.2rem",
                  }}
                >
                  {c.name}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
