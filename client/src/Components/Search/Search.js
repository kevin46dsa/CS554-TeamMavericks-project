import React from 'react';
import { useState } from "react";
import { Form, Button, ListGroup, Card } from "react-bootstrap";
import ProfileItem from "../ProfileItem/ProfileItem";
import "../Search/Search.css";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Search() {
  const navigate = useNavigate();
  const [searchText, updateSearchText] = useState("");
  const [searchResults, updateSearchResults] = useState([]);

  function search() {
    fetch("/searchForUsername?text=" + searchText)
      .then((res) => res.json())
      .then((data) => updateSearchResults(data))
      .catch((err) => console.error(err));
  }

  const handleInp = async (event) => {
    event.preventDefault()
    let value = event.target.value
    updateSearchText(value)

    if(value != "") {
      let url = 'http://localhost:8000/data/getSearchUser/'+value
      await axios.get(url)
      .then(async (data)=>{
        let d = data.data.data
       
        updateSearchResults(d)
      })
      .catch((err)=>{
        console.log(err)
      })
    } else {
      updateSearchResults([])
    }
  }

  return (
    <div className="search">
      <div className="search-wrapper">
        
        <Form className="search-form">
          <label>
          <Form.Group className="search-field">

            <Form.Control
              type="text"
              onInput={handleInp}
              placeholder="Searching Someone...."
              className='searchtype'
            />

          </Form.Group>
          {/* <Button variant="primary" onClick={search}>
            Search
          </Button> */}
          </label>
        </Form>


        {searchResults.length > 0 ? (
          <div className="search-results-wrapper">
            <Card style={{ width: "100%" }}>
              <ListGroup variant="flush" className='list1'>
                {searchResults.map((item, idx) => (
                  <li  onClick={() => navigate(`/user/${item.id}`)}>{item.name}</li>
                ))}
              </ListGroup>
            </Card>
          </div>
        ) : (
          <p>No Search Results</p>
        )}
      </div>
    </div>
  );
}