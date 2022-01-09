import React, { useEffect, Fragment } from "react";
import { toast } from 'react-toastify';
import { connect } from "react-redux";
import useForm from "../useForm";
import {getdetails} from "../../../redux/reducers/productReducer";
import { getAllCat } from "../../../redux/reducers/catReducer";

const initialFieldValues = {
  name:"",
  description: "",
  price : "",
  quantity: "",
  category: "",
  fournisseur: "",
  shipping: "",
  photo: "",
}


const ProductDetails = ({ ...props }) => {

  useEffect(() => {
    props.All();
  }, []);

  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.List.find((p) => p._id === props.currentId),
      });
      setErrors({});
    }

  }, [props.currentId]);

  var {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  } = useForm(initialFieldValues, props.setCurrentId);

  const handleSubmit = (e) => {
    e.preventDefault();
    const onSuccess = () => {
      window.location.reload();
      resetForm();
    };
   
      if (props.currentId === 0){
          console.log(props)

      } else {
        toast.info('Mis à jour avec succés');
        props.Details(props.currentId, values);
        
      }   

  };


  return (
    <>
       <div className="widgetLg">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">
              Details par produit
            </h6>
            <div className="widgetLgAmount">
              <div className="productListItem">
                  <img className="productListImg" src={values.photo} alt={values.photo} /> 
              </div>
            </div>
            
          </div>
       <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <br></br>
                  <h1
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                    onChange={handleInputChange}>
                    Catégorie: 
                  </h1>
                  <select disabled name="category" 
                          onChange={handleInputChange}
                          value={values.category}
                          className=" block text-gray-700 text-xs font-bold mb-2 ">
                      <option value=""></option>
                      {props.ListCat.map((cat) => {
                        return ( 
                          <option value={cat._id}>{cat.name}</option>
                        );
                      })}
                  </select>  
                  <label
                    className="block uppercase text-gray-700 text-xs font-bold mb-2"
                    htmlFor="grid-password"
                    onChange={handleInputChange}>
                    Fournisseur: {values.fournisseur}
                  </label>

                </div>
        </div>


       </div>
    </>

  );
};

const mapStateToProps = (state) => ({
    List: state.productsReducer.products,
    ListCat: state.catReducer.categories,
});

const mapActionToProps = {
  All: getAllCat,
  Details: getdetails,
};

export default connect(mapStateToProps, mapActionToProps)(ProductDetails);
