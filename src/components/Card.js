import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './blogCard.css';
import { Card, Row, Col } from 'react-bootstrap';

const BlogCard = () => {
  const [blogs, setBlogs] = useState([]);
  function formatDateToDisplay(createdAt) {
    const date = new Date(createdAt);
    return date.toISOString().split('T')[0];
  }

  useEffect(() => {
    async function fetchBlogData() {
      try {
        const response = await axios.get('http://localhost:3030/post/list');
        setBlogs(response.data.data);
      } catch (error) {
        console.error('Error fetching blog data: ', error);
      }
    }

    fetchBlogData();
  }, []);

  return (
    <div className="container">
      <h2>Blog</h2>
      <Row>
        {blogs.map((blog) => (
          console.log(blog,'blog'),
          <Col key={blog.id} md={4} className='mb-4'>
            <Card style={{ width: '18rem', maxHeight: '400px', overflowY: 'auto',boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
              <Card.Img alt='no image' variant="top" src={blog.image} />
              <Card.Body>
                <Card.Title>
                  <strong className="blog-heading">{blog.heading}</strong>
                </Card.Title>
                <Card.Text className="blog-content">{blog.content}</Card.Text>
                <Card.Text>Hashtags: {blog.hashtag}</Card.Text>
                <Card.Text>Posted by {blog.user.name} on: {formatDateToDisplay(blog.createdAt)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default BlogCard;
