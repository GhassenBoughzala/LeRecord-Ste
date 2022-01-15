import React, { useEffect, useState, Fragment } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import { toast } from 'react-toastify';
import { connect } from "react-redux";
import { getAllFou, deleteFou  } from "../../../redux/reducers/forReducer";
import NewFo from '../fournisseur/newFournisseur'


const FournisseurList = (props) => {

  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.All();
    
  }, []);

  const onDLP = (id) => {
    const onSuccess = () => {
      window.location.reload();
    };
    if(window.confirm("Êtes-vous sûr de vouloir supprimer ?"))
      toast.info(`Supprimé avec succès !`);
      props.Delete(id, onSuccess);
      
  };


  return (
<>
    <div className="containerr">
        <Sidebar />
  <div className="productList">
    <div className="widgetLg">
    <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">
              List des Fournisseurs 
            </h6>
          </div>
        </div>
      <br></br>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">ID</th>
            <th className="widgetLgTh">Title</th>
            <th className="widgetLgTh">Description</th>
            <th className="widgetLgTh text-center"><i className='fas fa-edit w-6 -ml-2' /></th>
            <th className="widgetLgTh text-center"><i className='mt-1 fas fa-trash-alt' /></th>
          </tr>
        </thead>
        <tbody>
          {props.List.map((f, index) => {
                    return (
            <Fragment key={index}>           
              <tr className="widgetLgTr" key={f._id}>
              <td className="widgetLgDate">{f._id}</td>
                <td className="widgetLgDate">{f.title}</td>
                <td className="widgetLgDate">{f.desc}</td>
                <td className="widgetLgStatus">
                  <button
                    type='submit'
                    onClick={() => setCurrentId(f._id)}
                    className='mt-1 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                  > Editer </button>                                       
                </td>
                <td className="widgetLgStatus">
                <button
                    type='submit'
                    onClick={() => onDLP(f._id)}
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
        <NewFo {...{ currentId, setCurrentId }} />
    </div>     



  </div>



  </div>

</>


  );
};


const mapStateToProps = (state) => ({
    List: state.forReducer.fournisseurs,
    isAuth: state.auth.isAuthenticated,
});

const mapActionToProps = {
  All: getAllFou,
  Delete: deleteFou,
};


export default connect ( mapStateToProps, mapActionToProps )(FournisseurList);

