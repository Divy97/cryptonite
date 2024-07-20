"use client";
import React from "react";
import PropTypes from "prop-types";

const Table = ({ headers, data, renderRow }) => {
  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      <div className="h-[410px] overflow-y-auto inline-block min-w-full shadow-md rounded-lg">
        <table className="min-w-full leading-normal">
          <thead className="sticky top-0">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-3 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{data && data.map((item) => renderRow(item))}</tbody>
        </table>
      </div>
    </div>
  );
};

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.array.isRequired,
  renderRow: PropTypes.func.isRequired,
};

export default Table;
