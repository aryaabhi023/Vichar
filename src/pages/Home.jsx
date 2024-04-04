import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, Card } from "../Component";
import { useSelector } from "react-redux";

function Home() {
  let userData = useSelector((state) => state.auth.userData);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) setPosts(posts.documents);
    });
  }, []);
  posts.reverse();

  if (posts.length === 0 || userData == null) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1
                className="text-2xl
                            font-bold hover: text-gray-500"
              >
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <Card {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
