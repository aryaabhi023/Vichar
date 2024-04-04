import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { MdDelete } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";

const StyledCard = styled.div`
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const CardContent = styled.div`
  background-color: #e2e2e2;
  padding: 1.5rem;
  padding-bottom: 0.1rem;
  width: 60%;
  margin: auto;
  margin-top: 12px;
  margin-bottom: 12px;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`;

const TitleTag = styled.div`
  display: inline-block;
  font-size: 0.75rem;
  background-color: #4a5568;
  color: #fff;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  margin-top: 0.75rem;
`;

const Footer = styled.div`
  margin-top: 10px;
  padding-top: 0.4rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  align-items: right;
`;

const AuthorDate = styled.span`
  font-size: 0.875rem;
  color: #718096;
  float: right;
`;

const DeleteButton = styled.button`
  background-color: #e53e3e;
  float: right;
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.2rem 0.3rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #c53030;
  }
`;

function Card({ $id, title, content, username, userId }) {
  const [liked, setLiked] = useState(true);
  const [likedCount, setLikedCount] = useState(0);
  const userData = useSelector((state) => state.auth.userData);
  const authStatus = userData.$id === userId;
  const navigate = useNavigate();

  const handleDelete = async () => {
    await appwriteService.deletePost($id);
    navigate("/") || navigate("/all-posts");
  };

  return (
    <StyledCard>
      <CardContent>
        {authStatus && (
          <DeleteButton onClick={handleDelete}>
            <MdDelete />
          </DeleteButton>
        )}
        <p className="text-gray-700">{content}</p>
        <TitleTag>{title}</TitleTag>
        <Footer>
          <AuthorDate>{`By: ${username}`}</AuthorDate>
        </Footer>
      </CardContent>
    </StyledCard>
  );
}

export default Card;
