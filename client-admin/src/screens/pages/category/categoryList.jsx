/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, Fragment } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import { connect } from "react-redux";
import { getAllCat, deleteCat } from "../../../redux/reducers/catReducer";
import AddCat from "./newCategory";
import "./category.css";

const CatList = (props) => {

  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.All();  
  }, []);

  const onDLP = (id) => {
    const onSuccess = () => {
      window.location.reload();
    };
    if(window.confirm("Êtes-vous sûr de vouloir supprimer ?"))
      props.Delete(id, onSuccess);
      
  };


  return (
<>
    <div className="containerr">
        <Sidebar />
  <div className="productList">
    <div className="homeWidgets"> 
    <div className="widgetLg">
    <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">
              List des categories 
            </h6>
          </div>
        </div>
      <br></br>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Titre</th>
            <th className="widgetLgTh text-center"><i className='fas fa-edit w-6 -ml-2' /></th>
            <th className="widgetLgTh text-center"><i className='mt-1 fas fa-trash-alt' /></th>
          </tr>
        </thead>
        <tbody>
          {props.List.map((cat, index) => {
                    return (
          <Fragment key={index}>           
              <tr className="widgetLgTr " key={cat._id}>
                <td className="widgetLgDate">{cat.name}</td>
                <td className="widgetLgStatus">
                  <button
                    type='submit'
                    onClick={() => setCurrentId(cat._id)}
                    className='mt-1 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                  > Editer </button>                                       
                </td>
                <td className="widgetLgStatus">
                <button
                    type='submit'
                    onClick={() => onDLP(cat._id)}
                    className='mt-1 tracking-wide font-semibold bg-red-500 text-gray-100 w-full py-2 rounded-lg hover:bg-red-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                  > Supprimer </button>
                </td>
              </tr>
            </Fragment>
            );
          })}
        </tbody>

      </table>

     
    </div>

    <div className="widgetLg">
      <AddCat {...{ currentId, setCurrentId }} />
    </div>


  </div>

</div>
</div>

</>


  );
};


const mapStateToProps = (state) => ({
    List: state.catReducer.categories,
    isAuth: state.auth.isAuthenticated,
});

const mapActionToProps = {
  All: getAllCat,
  Delete: deleteCat,
};


export default connect ( mapStateToProps, mapActionToProps )(CatList);

