import React from "react";
import Card from "../common/UIElements/Card";

import "./AboutPage.css";

const AboutPage = () => (
  <Card className="about-page_wrapper">
    <h2 className="about-page_header">About Us</h2>
    <p className="our-story-header fancy">
      <span>OUR STORY</span>
    </p>
    <p className="about-page_content">
      My Name is Arie Goldkin and this project was built for business and
      private users and the purpose was to provide a simple and good user
      experience for any user. I challenged myself in learning new technologies
      and I used Web-based JavaScript by using React.js library, and state
      management via redux and using redux-saga. I also have been used a
      different style approach and I used material UI, CSS modules and more. and
      the back-end I have used the Node.js framework and using MongoDB as a
      database. I have built this server-side as a rest full API that fits the
      needs of the user interface.
    </p>
  </Card>
);

export default AboutPage;
