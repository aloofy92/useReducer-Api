import React, { useReducer } from 'react';
import './MyComponent.css';

// Initial state for the component
const initialState = {
  route: 'posts', // Initial route value
  number: '', // Initial number value
  loading: false, // Loading state indicator
  error: '', // Error message
  data: null, // Fetched data
};

// Reducer function to handle state transitions based on dispatched actions
const reducer = (state, action) => {

  switch (action.type) {

    case 'SET_ROUTE':
      return { ...state, route: action.payload }; // Update the  selected route value
    case 'SET_NUMBER':
      return { ...state, number: action.payload }; // Update the  entered number value
    case 'FETCH_DATA_START':
      return { ...state, loading: true, error: '', data: null }; // Start fetching/loading data, clear error and previous data
    case 'FETCH_DATA_SUCCESS':
      return { ...state, loading: false, data: action.payload }; // Data fetching successful, update loading state and store the fetched data
    case 'FETCH_DATA_ERROR':
      return { ...state, loading: false, error: 'Error fetching data' }; // Data fetching error, update loading state and set error message
    default:

      return state;
  }
};

// The main component
const MyComponent = () => {

  const [state, dispatch] = useReducer(reducer, initialState); // State anddispatch function from useReducer

  const { route, number, loading, error, data } = state; // Destructure the state variables

  // Event handler for route selection change
  const handleRouteChange = (event) => {

    dispatch({ type: 'SET_ROUTE', payload: event.target.value }); // Update the route value on select change
  };

  // Event handler for number input change
  const handleNumberChange = (event) => {

    dispatch({ type: 'SET_NUMBER', payload: event.target.value }); // Update the number value on input change
  };

  // Function to Fetch data from the API
  const fetchData = () => {

    dispatch({ type: 'FETCH_DATA_START' }); // Start fetching data

    let url = `https://jsonplaceholder.typicode.com/${route}`;
    if (number) {
      url += `/${number}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data }); // Data fetching successful, store the fetched data
      })
      .catch((error) => {
        dispatch({ type: 'FETCH_DATA_ERROR' }); // Data fetching error, set error state
      });
  };

  return (
    <div className="container">
      <h1 className="title">JSONPlaceholder API Data</h1>
      <div className="form">
        {/* Route dropdown */}
        <label className="label">
          Route:
          <select className="select" value={route} onChange={handleRouteChange}>
                        {/* Route options */}
            <option value="posts">Posts</option>
            <option value="todos">Todos</option>
            <option value="users">Users</option>
          </select>
        </label>
        <br />
                {/* Number input */}
        <label className="label">
          Number:
          <input className="input" type="number" value={number} onChange={handleNumberChange} />
        </label>
        <br />
                {/* Fetch Data button */}
        <button className="button" onClick={fetchData}>Fetch Data</button>
      </div>
      {/* Loading indicator */}
      {loading && <p className="loading">Loading...</p>} {/* Show loading indicator if data is being fetched */}
       {/* Error message */}
      {error && <p className="error">{error}</p>} {/* Show error message if there's an error fetching data */}
         {/* Data display */}
      {data && (
        <div className="data-container">
          <h2 className="data-title">Data:</h2>
          <pre className="data">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default MyComponent;
