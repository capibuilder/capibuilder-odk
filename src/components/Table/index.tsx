import React, { useState } from "react";
import "./styles.css";

interface Product {
  name: string;
  free?: string | JSX.Element;
  standard?: string | JSX.Element;
  premium?: string | JSX.Element;
  soon?: boolean;
  tooltipMessage?: string;
}

interface ProductTableProps {
  products: Product[];
  title: string;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, title }) => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const handleMouseEnter = (index: number) => {
    setHoveredProduct(index);
  };
  const handleMouseLeave = () => {
    setHoveredProduct(null);
  };

  return (
    <div className="table-container">
      <h1 className="sideHeaderTable">{title}</h1>
      <table className="product-table">
        <tbody>
          {products.map((product, index) => (
            <tr
              key={index}
              className={`product-row ${index % 2 === 0 ? "even" : "odd"}`}
            >
              <th scope="row" className="product-name-cell actualrow">
                <span
                  className="NameQsn"
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  {product.name}
                  {product.soon && <span className="soon-text">soon</span>}

                  <div className="Toolthingy">
                    <svg
                      width="15"
                      height="14"
                      viewBox="0 0 17 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M8.5 16.5C12.6421 16.5 16 13.1421 16 9C16 4.85786 12.6421 1.5 8.5 1.5C4.35786 1.5 1 4.85786 1 9C1 13.1421 4.35786 16.5 8.5 16.5ZM8.5 17.5C13.1944 17.5 17 13.6944 17 9C17 4.30558 13.1944 0.5 8.5 0.5C3.80558 0.5 0 4.30558 0 9C0 13.6944 3.80558 17.5 8.5 17.5Z"
                        fill="#818B98"
                      />
                      <path
                        d="M6.30225 5.67015C6.42625 5.55415 6.56225 5.44415 6.71025 5.34015C6.86225 5.23615 7.02625 5.14415 7.20225 5.06415C7.38225 4.98415 7.57425 4.92215 7.77825 4.87815C7.98625 4.83015 8.21025 4.80615 8.45025 4.80615C8.76625 4.80615 9.05825 4.85215 9.32625 4.94415C9.59825 5.03615 9.83225 5.16615 10.0282 5.33415C10.2242 5.50215 10.3782 5.70615 10.4902 5.94615C10.6022 6.18615 10.6582 6.45615 10.6582 6.75615C10.6582 7.06015 10.6122 7.32215 10.5202 7.54215C10.4322 7.76215 10.3182 7.95615 10.1782 8.12415C10.0422 8.28815 9.89225 8.43215 9.72825 8.55615C9.56825 8.67615 9.41625 8.79015 9.27225 8.89815C9.12825 9.00615 9.00425 9.11415 8.90025 9.22215C8.80025 9.33015 8.74225 9.45015 8.72625 9.58215L8.61825 10.5002H7.88625L7.81425 9.50415C7.79825 9.32415 7.83225 9.16815 7.91625 9.03615C8.00025 8.90015 8.11025 8.77415 8.24625 8.65815C8.38225 8.53815 8.53225 8.42215 8.69625 8.31015C8.86025 8.19415 9.01225 8.06615 9.15225 7.92615C9.29625 7.78615 9.41625 7.62815 9.51225 7.45215C9.60825 7.27215 9.65625 7.05815 9.65625 6.81015C9.65625 6.63815 9.62225 6.48215 9.55425 6.34215C9.48625 6.20215 9.39425 6.08415 9.27825 5.98815C9.16225 5.88815 9.02425 5.81215 8.86425 5.76015C8.70825 5.70815 8.54025 5.68215 8.36025 5.68215C8.11625 5.68215 7.90625 5.71215 7.73025 5.77215C7.55825 5.83215 7.41225 5.89815 7.29225 5.97015C7.17225 6.04215 7.07425 6.10815 6.99825 6.16815C6.92625 6.22815 6.86625 6.25815 6.81825 6.25815C6.71825 6.25815 6.64025 6.21215 6.58425 6.12015L6.30225 5.67015ZM7.47225 12.8402C7.47225 12.7362 7.49025 12.6382 7.52625 12.5462C7.56625 12.4542 7.61825 12.3742 7.68225 12.3062C7.75025 12.2382 7.83025 12.1842 7.92225 12.1442C8.01425 12.1042 8.11225 12.0842 8.21625 12.0842C8.32025 12.0842 8.41825 12.1042 8.51025 12.1442C8.60225 12.1842 8.68225 12.2382 8.75025 12.3062C8.81825 12.3742 8.87225 12.4542 8.91225 12.5462C8.95225 12.6382 8.97225 12.7362 8.97225 12.8402C8.97225 12.9482 8.95225 13.0482 8.91225 13.1402C8.87225 13.2282 8.81825 13.3062 8.75025 13.3742C8.68225 13.4422 8.60225 13.4942 8.51025 13.5302C8.41825 13.5702 8.32025 13.5902 8.21625 13.5902C8.11225 13.5902 8.01425 13.5702 7.92225 13.5302C7.83025 13.4942 7.75025 13.4422 7.68225 13.3742C7.61825 13.3062 7.56625 13.2282 7.52625 13.1402C7.49025 13.0482 7.47225 12.9482 7.47225 12.8402Z"
                        fill="#818B98"
                      />
                    </svg>
                    {hoveredProduct === index && (
                      <div className="tooltipp">
                        {product.tooltipMessage ?? product.name}{" "}
                      </div>
                    )}
                  </div>
                </span>
              </th>
              <td className="icon-cell actualrow">
                {typeof product.free === "string" ? product.free : product.free}
              </td>
              <td className="icon-cell actualrow">
                {typeof product.standard === "string"
                  ? product.standard
                  : product.standard}
              </td>
              <td className="icon-cell lastRow actualrow">
                {typeof product.premium === "string"
                  ? product.premium
                  : product.premium}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
