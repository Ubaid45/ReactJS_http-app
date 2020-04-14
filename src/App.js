import React, { Component } from "react";
import http from "./services/httpService";
import {ToastContainer} from "react-toastify";
import config from "./config.json";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    // Initiall promise is in pending state ->resolved (success) or rejected (failure)
     // promises to hold the result of async operation.
    const {data: posts} = await http.get(config.apiEndpoint); 
   
    this.setState({posts});
  }

  handleAdd = async () => {
    const obj = {title: "a", body: "b"};
    const {data : post}= await http.post(config.apiEndpoint, obj);
    
    const posts = [post, ...this.state.posts];
    this.setState({posts});
  };

  handleUpdate = async post => {
    post.title = "UPDATED";
    await http.put("s" + config.apiEndpoint + "/" + post.id, post); //Update whole post object
   // http.patch(config.apiEndpoint + "/" + post.id, {title: post.title}); //Update just a property
   const posts = [...this.state.posts];
   const index = posts.indexOf(post);
   posts[index] = {...post};
   this.setState({posts});

  };

  handleDelete = async post => {
    const originalPosts = this.state.posts;
    //Optimistic approach : Update table UI before call asyc method and expect it will be rendered successfully
    const posts = this.state.posts.filter(p => p.id !== post.id);
    this.setState({posts});
    try{
      await http.delete("s"+config.apiEndpoint + "/"+post.id);
      //throw new Error(""); Raise exception to test if everything is reverted
    }
     //if error occurs, revert to origial posts
    catch(ex){
     // Expected (404: not found, 400 bad request) - CLIENT ERRORS
     // - Display a specific error message
      if (ex.response && ex.response.status === 404)
        alert("This post has already been deleted");
      // Unexpected (network down, server down, db down, bug)
      // else 
      // - Log them
      // - Display a generic and friendly error message
     
      this.setState({posts: originalPosts});
    }
    
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
