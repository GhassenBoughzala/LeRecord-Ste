import React, { useEffect, useState, Fragment } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import { connect } from "react-redux";
import { getAllFou, deleteFou } from "../../../redux/reducers/forReducer";
import NewFo from "../fournisseur/newFournisseur";

const FournisseurList = (props) => {
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.All();
  });

  const onSuccess = () => {
    window.location.reload(true);
  };

  const onDLP = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ?"))
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
                    List des Fournisseurs
                  </h6>
                </div>
              </div>
              <br></br>
              <table className="widgetLgTable">
                <thead>
                  <tr className="widgetLgTr">
                    <th className="widgetLgTh">Title</th>
                    <th className="widgetLgTh">Description</th>
                    <th className="widgetLgTh text-center"></th>
                    <th className="widgetLgTh text-center"></th>
                  </tr>
                </thead>
                <tbody>
                  {props.List.map((f, index) => {
                    return (
                      <Fragment key={index}>
                        <tr className="widgetLgTr" key={f._id}>
                          <td className="widgetLgDate">{f.title}</td>
                          <td className="widgetLgDate">{f.desc}</td>
                          <td className="py-3 px-6 text-center">
                            <div className="flex item-center justify-center">
                              <div
                                onClick={() => setCurrentId(f._id)}
                                className="w-6 mr-2 transform hover:text-blue-500 hover:scale-110"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                  />
                                </svg>
                              </div>
                              <div
                                onClick={() => onDLP(f._id)}
                                className="w-6 mr-2 transform hover:text-red-500 hover:scale-110"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="widgetLg ">
              <NewFo {...{ currentId, setCurrentId }} />
            </div>
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

export default connect(mapStateToProps, mapActionToProps)(FournisseurList);
