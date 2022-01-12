import React, { useEffect } from "react";
import { toast } from 'react-toastify';
import { connect } from "react-redux";
import useForm from "../useForm";
import { Publish } from "@material-ui/icons";
import {updateUser} from "../../../redux/reducers/userReducer";

const initialFieldValues = {
    name:"",
    email: "",
    role : "",
    datecreation: "",
    dateupdate: "",
}

const UpUser = ({ ...props }) => {
  useEffect(() => {
    if (props.currentId !== 0) {
      setValues({
        ...props.List.find((u) => u._id === props.currentId),
      });
      setErrors({});
    }

  }, [props.currentId]);

  const validate = () => {
    let temp = {...errors};
    temp.name = values.name ? "" : "This field is required.";
    temp.email = values.enail ? "" : "This field is required.";
    temp.role = values.role ? "" : "This field is required.";
    temp.datecreation = values.datecreation ? "" : "This field is required.";
    temp.dateupdate = values.dateupdate ? "" : "This field is required.";
  
    setErrors({...temp,});
    return Object.values(temp).every((u) => u === "");
  };

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
    if (validate()) {
      if (props.currentId === 0){
          console.log(props);
      }else{
          toast.info('User updated successfully');
          props.updateU(props.currentId, values, onSuccess);
          resetForm();
          window.location.reload();
      } 
    }else { toast.warn('Warning ! '); }
  };

  const reset = (e) => {
    resetForm();
  }

  return (
<>
    <h6 className="text-gray-800 text-xl font-bold">
      Editer Utilisateur
    </h6>


    <form onSubmit={handleSubmit}>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative w-full mb-3">
            <br></br>
            <label
              className="block uppercase text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password">
              Nom
            </label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleInputChange}
              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
            />
          </div>
        </div>
        <div className="w-full lg:w-6/12 px-4">
          <br></br>
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password">
              Role
            </label>
            <input
              type="number"
              name="role"
              value={values.role}
              onChange={handleInputChange}
              className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap">
        <div className="w-full lg:w-6/6 px-4">
          <div className="relative w-full mb-3">
              <br></br>
              <label
                className="block uppercase text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-password">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleInputChange}
                className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
              />                 
            </div>
        </div>

      </div>

      <div className="flex flex-wrap">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative w-full mb-3">
            <button
              type="submit"
              className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
            >
              Editer
            </button>
          </div>
        </div>

        <div className="w-full lg:w-6/12 px-4">
          <div className="relative w-full mb-3">
            <button
              type="submit"
              onClick={() => reset()}
              className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </div>
      </form>
</>
            
  );
};

const mapStateToProps = (state) => ({
    List: state.userReducer.uslist,
});

const mapActionToProps = {
  updateU: updateUser,
};

export default connect(mapStateToProps, mapActionToProps)(UpUser);
