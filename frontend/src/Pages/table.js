import React, { useState } from "react"

const btnStyle = {
  backgroundColor: "black",
  color: "white",
  border: "none",
  padding: "5px 10px",
}

function Table({
  list,
  colNames,
  pageNum = 0,
  pageSize = 10,
  width = "auto",
  height = "auto",
}) {
  const [page, setPage] = useState(pageNum)

  const onBack = () => {
    setPage(page - 1 > -1 ? page - 1 : page)
  }

  const onNext = () => {
    setPage(page + 1 < list.length / pageSize ? page + 1 : page)
  }

  return (
    <div style={{ width: "50%", boxShadow: "3px 6px 3px #ccc" }}>
      {list.length > 0 && (
        <table
          cellSpacing="0"
          style={{ width: "100%", height: height, padding: "5px 10px" }}
        >
          <thead style={{ backgroundColor: "black", color: "white" }}>
            <tr>
              {colNames.map((headerItem, index) => (
                <th key={index}>{headerItem.toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.values(
              list.slice(pageSize * page, pageSize * page + pageSize)
            ).map((obj, index) => (
              <tr key={index}>
                {Object.values(obj).map((value, index2) => (
                  <td key={index2}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <td></td>
            <td style={{ padding: "10px 0" }}>
              <button style={btnStyle} onClick={onBack}>
                Back
              </button>
              <label style={{ padding: "0 1em" }}>{page + 1}</label>
              <button style={btnStyle} onClick={onNext}>
                Next
              </button>
            </td>
          </tfoot>
        </table>
      )}
    </div>
  )
}

export default Table