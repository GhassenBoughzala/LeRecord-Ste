import React, { useEffect } from "react";
import { connect } from "react-redux";
import useForm from "../useForm";
import {getdetails} from "../../../redux/reducers/productReducer";
import { getAllCat } from "../../../redux/reducers/catReducer";
import { getAllFou  } from "../../../redux/reducers/forReducer";

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
  });

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
    setErrors,
    handleInputChange,
  } = useForm(initialFieldValues, props.setCurrentId);




  return (
    <>
  <div className="widgetLg">

    <label className="block uppercase text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
      Cliquer sur + pour ajouter un nouveau produit
    </label>

    <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4">
                <div className="relative w-full mb-3">
                  <br></br>
                  <label className="block uppercase text-gray-700 text-xm font-bold mb-2"
                    htmlFor="grid-password">
                    Catégorie: 
                  </label>
                  <select disabled name="category" 
                          onChange={handleInputChange}
                          value={values.category}
                          className=" block text-gray-700 text-xs font-bold mb-2 ">
                      <option value=""></option>
                      {props.ListCat.map((cat,index) => {
                        return ( 
                          <option key={index} value={cat._id}>{cat.name}</option>
                        );
                      })}
                  </select>  
                </div>
                
              </div>
              <div className="w-full lg:w-6/12 px-4">
                <br></br>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-700 text-xm font-bold mb-2"
                    htmlFor="grid-password">
                     Fournisseur:
                  </label>
                  <select disabled name="fournisseur" 
                          onChange={handleInputChange}
                          value={values.fournisseur} 
                          className=" block text-gray-700 text-xs font-bold mb-2 ">
                      <option value=""></option>
                      {props.ListFou.map((f,index) => {
                        return ( 
                          <option key={index} value={f._id}>{f.title}</option>
                        );
                      })}
                  </select>  
                </div>
              </div>
            </div>

            
</div>
    </>

  );
};

const mapStateToProps = (state) => ({
    List: state.productsReducer.products,
    ListCat: state.catReducer.categories,
    ListFou: state.forReducer.fournisseurs,
});

const mapActionToProps = {
  All: getAllCat,
  AllF: getAllFou,
  Details: getdetails,
};

export default connect(mapStateToProps, mapActionToProps)(ProductDetails);
