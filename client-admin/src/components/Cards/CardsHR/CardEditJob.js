import React, { Component } from "react";
import { createJob } from "Redux/actions/job.actions";
import { connect } from "react-redux";

import fetchCandidates from "../../../views/hr/fetchCandidates";
class CardEditJob extends Component {
  constructor(props) {
    super(props);
    var str = window.location.pathname;
    let id = str.slice(12);
    console.log(id);

    this.state = {
      _id: 0,
      title: "",
      description: "",
      salary: 0,
      requirement: "",
      search: "",
    };
  }
  onChange = (e) => {
    this.setState({ search: e.target.value });
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.onAdd(this.state);
  }

  handlOnValueChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleReset(e) {
    e.preventDefault();
    this.setState({
      title: "",
      description: "",
      salary: 0,
      requirement: "",
    });
  }
  componentWillMount() {
    const props = this.props;

    if (props.location && props.location.state) {
      const job = props.location.state.job;
      this.setState({
        _id: job._id,
        title: job.title,
        description: job.description,
        salary: job.salary,
        requirement: job.requirement,
        candidateSubmit: job.candidateSubmit,
      });
    }
  }

  render() {
    return (
      <>
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-gray-800 text-xl font-bold">Edit this job</h6>
              <button
                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
              >
                EDit
              </button>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={this.handleSubmit.bind(this)}>
              <button
                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="submit"
              >
                EDit
              </button>

              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={this.handleReset.bind(this)}
              >
                REset
              </button>
              <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                Job Information
              </h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Title
                    </label>
                    <input
                      name="title"
                      type="text"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      placeholder="name this job"
                      onChange={this.handlOnValueChange.bind(this)}
                      value={this.state.title}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Description
                    </label>
                    <input
                      name="description"
                      type="text"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      placeholder="Describe your job"
                      onChange={this.handlOnValueChange.bind(this)}
                      value={this.state.description}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Salary
                    </label>
                    <input
                      name="salary"
                      type="text"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      placeholder="$"
                      onChange={this.handlOnValueChange.bind(this)}
                      value={this.state.salary}
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-gray-700 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Requirement
                    </label>
                    <input
                      name="requirement"
                      type="text"
                      className="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"
                      placeholder="Exemple(Angular , React ....)"
                      onChange={this.handlOnValueChange.bind(this)}
                      value={this.state.requirement}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="relative py-10 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-200 border-0 ">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between ">
              <h6 className="text-gray-800 text-xl font-bold"></h6>
              <form class="w-6 ">
                <div class="flex items-center border-b border-b-2 border-teal py-2">
                  <input
                    class="appearance-none bg-transparent border-none w-full
     text-grey-darker mr-3  px-2 leading-tight focus:outline-none"
                    type="text"
                    placeholder="Search here..."
                    onChange={this.onChange}
                    aria-label="Full name"
                  />
                </div>
              </form>
              <button
                className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
              >
                refresh
              </button>
            </div>
          </div>
          <div
            className={
              "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
              "bg-white"
            }
          >
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className={"font-semibold text-lg " + "text-gray-800"}>
                    Candidates Submission
                  </h3>
                </div>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                        "bg-gray-100 text-gray-600 border-gray-200"
                      }
                    >
                      Candidate
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                        "bg-gray-100 text-gray-600 border-gray-200"
                      }
                    >
                      Skills
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                        "bg-gray-100 text-gray-600 border-gray-200"
                      }
                    >
                      Status
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                        "bg-gray-100 text-gray-600 border-gray-200"
                      }
                    >
                      CV{" "}
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                        "bg-gray-100 text-gray-600 border-gray-200"
                      }
                    >
                      Action{" "}
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left " +
                        "bg-gray-100 text-gray-600 border-gray-200"
                      }
                    ></th>
                  </tr>
                </thead>
                {this.state.candidateSubmit.map((cand) => {
                  const { search } = this.state;

                  if (
                    search !== "" &&
                    cand.fullName
                      .toLowerCase()
                      .indexOf(search.toLocaleLowerCase()) === -1
                  ) {
                    return null;
                  }
                  return (
                    <>
                      {" "}
                      <tbody>
                        <tr>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-left flex items-center">
                            <img
                              src={require("assets/img/bootstrap.jpg")}
                              className="h-12 w-12 bg-white rounded-full border"
                              alt="..."
                            ></img>{" "}
                            <span className={"ml-3 font-bold "}>
                              {cand.fullName}{" "}
                            </span>
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            {cand.skills.map((skill) => {
                              return <>{skill.value}</>;
                            })}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            <i className="fas fa-circle text-orange-500 mr-2"></i>{" "}
                            {cand.status ? "true" : "false"}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            <button
                              className="bg-orange-500 px-4 py-2 text-white active:bg-blue-600 font-bold uppercase 
                      text-xs  py-0 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                              type="button"
                            >
                              View PDF{" "}
                            </button>{" "}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4">
                            <button
                              className="bg-green-500 px-4 py-2 text-white active:bg-blue-600 font-bold uppercase 
                      text-xs  py-0 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                              type="button"
                            >
                              Accepte{" "}
                            </button>
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-no-wrap p-4 text-right"></td>
                        </tr>
                      </tbody>
                    </>
                  );
                })}
              </table>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (job) => {
      dispatch(createJob(job));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CardEditJob);
