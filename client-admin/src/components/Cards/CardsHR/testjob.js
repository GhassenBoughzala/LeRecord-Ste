import React, { Component } from "react";
import TableDropdown from "components/Dropdowns/HRDropDowns/TableDropdown";
import CardStats from "components/Cards/CardsHR/CardStats";
import PropTypes from "prop-types";

class TestJob extends Component {
  render() {
    const color = {};

    return (
      <>
        <div class=" xl:w-4/12  rounded overflow-hidden shadow-lg">
          <img
            class="w-full"
            src="https://tailwindcss-v0.netlify.app//img/card-top.jpg"
            alt="Sunset in the mountains"
          />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p class="text-grey-darker text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
          </div>
          <div class="px-6 py-4">
            <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
              #photography
            </span>
            <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker mr-2">
              #travel
            </span>
            <span class="inline-block bg-grey-lighter rounded-full px-3 py-1 text-sm font-semibold text-grey-darker">
              #winter
            </span>
          </div>
        </div>
      </>
    );
  }
}

export default TestJob;
