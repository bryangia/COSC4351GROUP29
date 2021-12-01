import React, { useState, useEffect, useContext } from "react";
import { UncontrolledDropdown, DropdownToggle, DropdownItem } from "reactstrap";
import Table from "../../components/table/Table";
import { Context } from "../../context/Context";
import "./book.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { setHours, setMinutes } from "date-fns";
import Pay from "../../components/pay/Pay";
import { Link } from "react-router-dom";

export default function Book() {
  const { user } = useContext(Context);

  const [error, setError] = useState(false);

  const [payment, setPayment] = useState(false);
  const checkPayment = (data) => {
    setPayment(data);
  };

  // const [totalTables, setTotalTables] = useState([]);
  const [availableTables, setAvailableTables] = useState([]);
  const [sizeTables, setSizeTables] = useState([]);

  const filterTable = (totalTables) => {
    let tableSize = selection.size;
    if (tableSize % 2 === 1) {
      tableSize = tableSize + 1;
    }
    let sizeTable = [];
    let availTable = [];
    totalTables.forEach((table) => {
      if (table.capacity < tableSize) {
        availTable.push(table);
      } else {
        sizeTable.push(table);
      }
    });
    setAvailableTables(availTable);
    setSizeTables(sizeTable);
  };

  // Information about table and date
  const [selection, setSelection] = useState({
    table: {
      name: null,
      id: null,
    },
    datetime: null,
    size: null,
  });

  const [selectCombine, setSelectCombine] = useState({
    table1: {
      name: null,
      id: null,
      size: null,
    },
    table2: {
      name: null,
      id: null,
      size: null,
    },
  });

  // Information about reservation's user
  const [booking, setBooking] = useState({
    userId: user ? user._id : null,
    name: "",
    phone: "",
    email: "",
  });

  // Click and choose table
  const selectTable = (table_name, table_id) => {
    setSelection({
      ...selection,
      table: {
        name: table_name,
        id: table_id,
      },
    });
  };

  // Click and choose table1
  const selectCombineTable1 = (table_name, table_id, table_size) => {
    setSelectCombine({
      ...selectCombine,
      table1: {
        name: table_name,
        id: table_id,
        size: table_size,
      },
    });
  };

  // Click and choose table2
  const selectCombineTable2 = (table_name, table_id, table_size) => {
    setSelectCombine({
      ...selectCombine,
      table2: {
        name: table_name,
        id: table_id,
        size: table_size,
      },
    });
  };

  // Create size
  const getSizes = (_) => {
    let newSizes = [];
    for (let i = 1; i <= 8; i++) {
      newSizes.push(
        <DropdownItem
          key={i}
          className="bookingOptionItem"
          onClick={(e) => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table,
              },
              size: i,
            };
            setSelection(newSel);
          }}
        >
          {i}
        </DropdownItem>
      );
    }
    return newSizes;
  };

  // Create tables
  const getTables = (_) => {
    // console.log("Getting same size tables");
    if (getEmptyTables() > 0) {
      let tables = [];
      sizeTables.forEach((table) => {
        if (table.capacity)
          if (table.isAvailable) {
            tables.push(
              <Table
                key={table._id}
                id={table._id}
                chairs={table.capacity}
                name={table.name}
                empty
                selectTable={selectTable}
              />
            );
          } else {
            tables.push(
              <Table
                key={table._id}
                id={table._id}
                chairs={table.capacity}
                name={table.name}
                selectTable={selectTable}
              />
            );
          }
      });
      return tables;
    }
  };

  // Create tables
  const getAvailableTables = (_) => {
    // console.log("Getting available tables");
    let tables = [];
    availableTables.forEach((table) => {
      if (table.isAvailable)
        if (
          selectCombine.table1.size === null &&
          selectCombine.table2.size === null
        ) {
          tables.push(
            <Table
              key={table._id}
              id={table._id}
              chairs={table.capacity}
              name={table.name}
              empty
              available
              selectTable={selectCombineTable1}
            />
          );
        } else {
          if (table.capacity === selection.size - selectCombine.table1.size)
            if (table._id !== selectCombine.table1.id) {
              tables.push(
                <Table
                  key={table._id}
                  id={table._id}
                  chairs={table.capacity}
                  name={table.name}
                  empty
                  available
                  selectTable={selectCombineTable2}
                />
              );
            }
        }
    });
    return tables;
  };

  // Get total number of available tables
  const getEmptyTables = (_) => {
    let tables = sizeTables.filter((table) => table.isAvailable);
    return tables.length;
  };

  // Check if date is weekend or not
  const checkWeekend = (_) => {
    var currentDay = selection.datetime.getDay();
    var dateIsInWeekend = currentDay === 6 || currentDay === 0;
    if (dateIsInWeekend === true) {
      return true;
    } else {
      return false;
    }
  };

  // Date && Time
  const [startDate, setStartDate] = useState(null);
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  // API *** Get availability datetime and table
  useEffect(() => {
    if (selection.datetime && selection.size) {
      (async (_) => {
        let selectedDate = selection.datetime.toUTCString();
        // selectedDate = selectedDate.toISOString().split(".")[0];
        let res = await fetch("http://localhost:5000/api/availability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            date: selectedDate,
          }),
        });
        res = await res.json();

        // Get all tables same size as selection
        let tableSize = selection.size;
        if (tableSize % 2 === 1) {
          tableSize = tableSize + 1;
        }
        let tables = res.tables.filter((table) =>
          selection.size > 0 ? table.capacity <= tableSize : true
        );
        filterTable(tables);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection.datetime, selection.size]);

  // API *** Store Reservation to database
  const reserve = async (_) => {
    if (
      (booking.name.length === 0) |
      (booking.phone.length === 0) |
      (booking.email.length === 0)
    ) {
      _.preventDefault();
      console.log("Incomplete Details");
      setError(true);
    } else {
      try {
        let selectedDate = selection.datetime.toUTCString();
        let res = await fetch("http://localhost:5000/api/reserve", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...booking,
            date: selectedDate,
            table: selection.table.id,
          }),
        });
        // window.location.replace("/thankyou");
        res = await res.json();
        console.log("Reserved: " + res);
        window.location.replace("/thankyou");
      } catch (err) {}
    }
  };

  // API *** Store Reservation to database
  const reserveCombine = async (e) => {
    if (
      (booking.name.length === 0) |
      (booking.phone.length === 0) |
      (booking.email.length === 0)
    ) {
      e.preventDefault();
      console.log("Incomplete Details");
      setError(true);
    } else {
      try {
        let selectedDate = selection.datetime.toUTCString();
        let res = await Promise.all([
          fetch("http://localhost:5000/api/reserve", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...booking,
              date: selectedDate,
              table: selectCombine.table1.id,
            }),
          }),
          fetch("http://localhost:5000/api/reserve", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ...booking,
              date: selectedDate,
              table: selectCombine.table2.id,
            }),
          }),
          fetch("http://localhost:5000/api/combine", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              userId: user ? user._id : null,
              date: selection.datetime.toUTCString(),
              table1: selectCombine.table1.name,
              table2: selectCombine.table2.name,
            }),
          }),
        ]);
        res.forEach((response) => {
          response = response.json();
          console.log("Reserved: " + response);
          window.location.replace("/thankyou");
        });
      } catch (err) {}
    }
  };

  return (
    <div className="booking">
      <div className="bookingTop">
        <span className="bookingTitle">
          {!selection.table.id && !selectCombine.table2.id
            ? "Available Tables"
            : "Confirm Reservation"}
        </span>
        {!user && (
          <Link className="linkBook" to="/register">
            Sign up to receive points? Register Now
          </Link>
        )}
        <span className="bookingTableName">
          {selection.table.id &&
            "You are booking " +
              selection.table.name +
              " at " +
              selection.datetime.toLocaleString("en-US")}
          {selectCombine.table2.id &&
            "You are booking " +
              selectCombine.table1.name +
              " and " +
              selectCombine.table2.name +
              " at " +
              selection.datetime.toLocaleString("en-US")}
        </span>

        {error && (
          <span className="reservation-error">
            * Please fill out all of the details.
          </span>
        )}
      </div>

      {!selection.table.id && !selectCombine.table2.id ? (
        <div id="reservation-stuff" className="bookingPage">
          <div className="bookingItems">
            <div className="bookingItemEach">
              <DatePicker
                className="bookingOption"
                placeholderText="Select a Date and Time"
                selected={startDate}
                onChange={(e) => {
                  setStartDate(e);
                  selection.datetime = e;
                }}
                showTimeSelect
                timeIntervals={60}
                minDate={new Date()}
                minTime={setHours(setMinutes(new Date(), 0), 16)}
                maxTime={setHours(setMinutes(new Date(), 0), 23)}
                filterTime={filterPassedTime}
                dateFormat="MMMM d, yyyy h:mm aa"
              />
            </div>
            <div className="bookingItemEach">
              <UncontrolledDropdown>
                <DropdownToggle className="bookingOption">
                  {selection.size === null
                    ? "Select a Party Size"
                    : "Selected Size: " + selection.size.toString()}
                </DropdownToggle>
                <div className="bookingOptionMenu">{getSizes()}</div>
              </UncontrolledDropdown>
            </div>
          </div>
          <div className="tablesDisplay">
            <div>
              {getEmptyTables() > 0 && (
                <div className="availableNumbers">
                  {getEmptyTables()} Available Tables
                </div>
              )}

              {selection.datetime && selection.size ? (
                getEmptyTables() > 0 ? (
                  <div>
                    <div className="tableKey">
                      <span className="emptyTable"></span> &nbsp; Available
                      &nbsp;&nbsp;
                      <span className="fullTable"></span> &nbsp; Unavailable
                      &nbsp;&nbsp;
                    </div>
                    <div className="getTables">{getTables()}</div>
                  </div>
                ) : (
                  <div>
                    <div className="bookingTableMessage2">
                      No Available Tables Size {selection.size} - Please select
                      two combination tables or different size !
                    </div>
                    {selectCombine.table1.size && (
                      <div className="bookingTableMessage2">
                        First selection: {selectCombine.table1.name} size{" "}
                        {selectCombine.table1.size}
                      </div>
                    )}
                    <div className="tableKey">
                      <span className="emptyTable"></span> &nbsp; Available
                      &nbsp;&nbsp;
                      <span className="fullTable"></span> &nbsp; Unavailable
                      &nbsp;&nbsp;
                    </div>
                    <div className="getTables">{getAvailableTables()}</div>
                  </div>
                )
              ) : (
                <div className="bookingTableMessage">
                  Please select date, time, and size for your reservation.
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="reservation">
          {checkWeekend() && !payment && (
            <Pay
              tableName={selection.table.name}
              dateTime={selection.datetime.toString()}
              payment={checkPayment}
            />
          )}

          {(!checkWeekend() || payment) && (
            <form
              className="reservationForm"
              onSubmit={selection.table.id ? reserve : reserveCombine}
            >
              <label>Name</label>
              <input
                className="reservationInput"
                type="text"
                placeholder="Enter your name..."
                onChange={(e) => {
                  setBooking({
                    ...booking,
                    name: e.target.value,
                  });
                }}
              />
              <label>Email</label>
              <input
                className="reservationInput"
                type="email"
                placeholder="Enter your email..."
                onChange={(e) => {
                  setBooking({
                    ...booking,
                    email: e.target.value,
                  });
                }}
              />
              <label>Phone Number</label>
              <input
                className="reservationInput"
                type="number"
                placeholder="Enter your phone number..."
                onChange={(e) => {
                  setBooking({
                    ...booking,
                    phone: e.target.value,
                  });
                }}
              />
              <button className="reservationButton" type="submit">
                Book Now
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
