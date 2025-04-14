import axios from "axios";
import { createContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react';

const ForumContext = createContext();

const ForumContextWrapper = ({ children }) => {
  const nav = useNavigate();
  const [topics, setTopics] = useState([]);

  //*****************GET ALL TOPICS***************/
  const getAllTopics = useCallback(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/forum/all-topics`)
      .then((res) => {
        // console.log("All  topics:", res);
        setTopics(res.data.allTopics);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); 

  useEffect(() => {
    getAllTopics();
  }, [getAllTopics]);

  //*****************CREATE TOPIC ****************/
  async function handleCreateTopic(event, topic) {
    event.preventDefault();
    const myFormData = new FormData();
    myFormData.append("title", topic.title);
    myFormData.append("description", topic.description);
    myFormData.append("location", topic.location);
    myFormData.append("author", topic.author);

    const image = event.target.image.files[0];
    myFormData.append("imageUrl", image);

    try {
      const {data} = await axios.post(
        `${import.meta.env.VITE_API_URL}/forum/create-topic`,
        myFormData
      );
      //console.log(response)
      console.log("topic created", data);
      setTopics([data, ...topics]); 
      nav("/forum");
    } catch (error) {
      console.log(error);
    }
  }

  //*****************DELETE TOPIC***************/
  function handleDeleteTopic(topicId) {
    axios
      .delete(`${import.meta.env.VITE_API_URL}/forum/delete-topic/${topicId}`)
      .then((res) => {
        console.log("Topic removed", res);
        const filteredTopics = topics.filter(
          (oneTopic) => oneTopic._id !== topicId
        );
        setTopics(filteredTopics);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <ForumContext.Provider
      value={{
        topics,
        setTopics,
        handleCreateTopic,
        handleDeleteTopic,
        getAllTopics,
      }}
    >
      {children}
    </ForumContext.Provider>
  );
};

export { ForumContext, ForumContextWrapper };
