import React from 'react';
import { useState } from "react";
import { Form, Button, ListGroup, Card } from "react-bootstrap";
import ProfileItem from "../ProfileItem/ProfileItem";
import "../Search/Search.css";
import axios from 'axios';

export default function Search() {
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
        </Form>
        {searchResults.length > 0 ? (
          <div className="search-results-wrapper">
            <Card style={{ width: "100%" }}>
              <ListGroup variant="flush" className='list'>
                {searchResults.map((item, idx) => (
                  // <ProfileItem {...item} idx={idx} />
                  <li>{item.name}</li>
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