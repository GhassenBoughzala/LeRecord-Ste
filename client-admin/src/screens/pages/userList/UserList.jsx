import React, { useEffect, useState, Fragment } from "react";
import "./userList.css";
import Sidebar from "../../../components/sidebar/Sidebar";
import { toast } from 'react-toastify';
import { connect } from "react-redux";
import { getAllUsers, deleteUser } from "../../../redux/reducers/userReducer";
import NewUser from "../newUser/NewUser";

const UserList = (props) => {

  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.All();
  }, []);

  const onDLP = (id) => {
    const onSuccess = () => {
      window.location.reload();
    };
    if(window.confirm("Are you sure to delete ?"))
        toast.error(`Deleted successfully !`);
        props.Delete(id, onSuccess);
      
  };


  return (
<>
    <div className="containerr">
        <Sidebar />
  <div className="userList">
    <div className="widgetLg">
      <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-gray-800 text-xl font-bold">
            List des utilisateurs
            </h6>
          </div>
        </div>
      <br></br>
      <table className="widgetLgTable">
        <thead>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Nom</th>
            <th className="widgetLgTh">Email</th>
            <th className="widgetLgTh">Role</th>
            <th className="widgetLgTh">Date Creation</th>
            <th className="widgetLgTh">Date MAJ</th>
            <th className="widgetLgTh text-center"><i className='fas fa-edit w-6 -ml-2' /></th>
            <th className="widgetLgTh text-center"><i className='mt-1 fas fa-trash-alt' /></th>
          </tr>
        </thead>
        <tbody>
          {props.List.map((user, index) => {
                    return (
          <Fragment key={index}>           
              <tr className="widgetLgTr" key={user._id}>
                <td className="widgetLgDate">{user.name}</td>
                <td className="widgetLgDate">{user.email}</td>
                <td className="widgetLgDate">{user.role}</td>
                <td className="widgetLgDate">{user.createdAt.substring(0, 10)}</td>           
                <td className="widgetLgAmount">{user.updatedAt.substring(0, 10)}</td>
                <td className="widgetLgStatus">
                  <button
                    type='submit'
                    onClick={() => setCurrentId(user._id)}
                    className='mt-1 tracking-wide font-semibold bg-blue-500 text-gray-100 w-full py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                  > Editer </button>                                       
                </td>
                <td className="widgetLgStatus">
                <button
                    type='submit'
                    onClick={() => onDLP(user._id)}
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
            <NewUser {...{ currentId, setCurrentId }} />
    </div>

    </div>
          

  </div>

</>


  );
};


const mapStateToProps = (state) => ({
  List: state.userReducer.uslist,
  isAuth: state.auth.isAuthenticated,
});

const mapActionToProps = {
  All: getAllUsers,
  Delete: deleteUser,
};


export default connect ( mapStateToProps, mapActionToProps )(UserList);


