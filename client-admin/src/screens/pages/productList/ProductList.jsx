import React, { useEffect, useState, Fragment, forwardRef } from "react";
import "./productList.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import Topbar from "../../../components/topbar/Topbar";
import { toast } from 'react-toastify';
import { connect } from "react-redux";
import { getAll, deleteProduct } from "../../../redux/reducers/productReducer";

const ProductList = (props) => {

  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.AllProducts();
  }, []);

  const onDLP = (id) => {
    const onSuccess = () => {
      toast.info(`Deleted successfully !`);
    };
    if(window.confirm("Are you sure to delete ?"))
      props.DeleteProducts(id, onSuccess);
  };


  return (
<>
<Topbar />
    <div className="containerr">
        <Sidebar />
  <div className="productList">
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Product List</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Name</th>
          <th className="widgetLgTh">Description</th>
          <th className="widgetLgTh">Quantity</th>
          <th className="widgetLgTh">Price</th>
          <th className="widgetLgTh">Status</th>
          <th className="widgetLgTh">Photo</th>
        </tr>
        {props.List.map((product, index) => {
                  return (
                    <Fragment key={index}>
          
          <tr className="widgetLgTr" key={product._id}>
            <td className="widgetLgDate">{product.name}</td>
            <td className="widgetLgDate">{product.description}</td>
            <td className="widgetLgDate">{product.quantity}</td>
            <td className="widgetLgDate">{product.price}</td>           
            <td className="widgetLgAmount">{product.shipping}</td>
            <td className="widgetLgAmount">
                        <div className="productListItem">
                          <img className="productListImg" src={product.photo} alt="" />
                        </div>
            </td>
            <td className="widgetLgStatus">
              <Button color="primary" size="sm" rounded onClick={() => setCurrentId(product._id)}>Edit</Button>  
              <Button color="danger"  size="sm"  rounded onClick={() => onDLP(product._id)}>Delete</Button>                         
            </td>
          </tr>
            </Fragment>
          );
        })}
      </table>
    </div>

    </div>
  </div>

</>


  );
};



const mapStateToProps = (state) => ({
  List: state.productsReducer.products,
});

const mapActionToProps = {
  AllProducts: getAll,
  DeleteProducts: deleteProduct,
};


const style = {
  card: `relative flex flex-col border-2 border-gray-200 rounded-lg`,
  cardBody: `block flex-grow flex-shrink p-5`,
  cardTitle: `font-medium text-gray-700 mb-3`,
  cardText: `text-black-500`,
};
const inlineStyle = {
  boxShadow: '0 2px 5px 0 rgb(0 0 0 / 16%), 0 2px 10px 0 rgb(0 0 0 / 12%)',
};
const Card = ({ children }) => (
  <div className={style.card} style={inlineStyle}>
    {children}
  </div>
);

Card.Body = ({ children }) => <div className={style.cardBody}>{children}</div>;
Card.Title = ({ children }) => (<div className={style.cardTitle}>{children}</div>);
Card.Text = ({ children }) => <div className={style.cardText}>{children}</div>;

const Button = forwardRef(({ children, color,size,rounded, ...props }, ref) => (
  <button
    {...props}
    ref={ref}
    className={`
                ${colors[color]} ${ size ? sizes[size] : sizes.md} text-black focus:outline-none shadow rounded font-medium transition ease-in duration-200,
                ${colors[color]} ${ rounded ? 'rounded-full' : 'rounded' } text-white focus:outline-none shadow px-4 py-2 font-medium transition ease-in duration-200 `}
  >
    {children}
  </button>
));
const colors = {
  primary: `bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:ring-offset-blue-100`,
  success: `bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-700 focus:ring-offset-green-100`,
  danger: `bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-600 focus:ring-offset-red-100`,
  dark: `bg-black focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 focus:ring-offset-gray-100`,
  warning: `bg-yellow-500 focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-yellow-100`,
  indigo: `bg-indigo-900 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-900 focus:ring-offset-indigo-100`,
};
const sizes = {
  sm: 'px-6 py-1 text-sm',
  md: 'px-6 py-2',
  lg: 'px-6 py-3 text-lg',
};

export default connect ( mapStateToProps, mapActionToProps )(ProductList);


