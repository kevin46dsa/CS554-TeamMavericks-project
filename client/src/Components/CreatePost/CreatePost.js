import React from 'react';
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { Link, useNavigate } from 'react-router-dom';
//import OAuth from '../OAuth/OAuth';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import "../CreatePost/CreatePost";
import useUser from '../../hooks/useUser';

export default function CreatePost({  setAlert }) {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();

  //Custom Hook 
  const {user,isLoading} = useUser()


  function uploadFile(e) {
    setFile(e.target.files[0]);
  }

  function makePost() {
    const formData = new FormData();
    formData.append("user", user.uid);
    formData.append("caption", caption);
    formData.append("file", file);
    const requestOptions = {
      method: "POST",
      body: formData,
    };
    fetch("/createPost", requestOptions)
      .then((_res) => {
        setAlert({ variant: "success", message: "Post created!" });
        navigate("/");
      })
      .catch((err) => setAlert({ variant: "danger", message: err.message }));
  }

  return (
    <Form className="post-form">
      <div className="create-post">
        <Form.Group className="mb-3">
          
          <img
            src={file ? URL.createObjectURL(file) : null}
            className="post-image"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <input type="file" accept=".jpg,.png,.jpeg,.webp" onChange={uploadFile} multiple required/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter a Caption"
            onInput={(e) => setCaption(e.target.value)}
          />
        </Form.Group>
        <div className="post-button-wrapper">
          <Button
            variant="primary"
            type="button"
            onClick={makePost}
            className="post-button"
          >
            Post
          </Button>
        </div>
      </div>
    </Form>
  );
}