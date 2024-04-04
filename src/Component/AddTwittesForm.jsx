import React from "react";
import { useForm } from "react-hook-form";
import AppwriteService from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 30rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const TextArea = styled.textarea`
  height: 8rem;
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  outline: none;
  resize: vertical;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  outline: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #4f46e5;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4338ca;
  }
`;

function AddTwittesForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
    },
  });

  const submit = async (data) => {
    if (post) {
      //update post logic
      const updatedPost = await AppwriteService.updatePost(post.$id, {
        ...data,
        userId: userData.$id,
        username: userData.username,
      });
      if (updatedPost) {
        navigate(`/all-posts`);
      }
    } else {
      //create post logic
      data.userId = userData.$id;
      const newPost = await AppwriteService.createPost({
        ...data,
        userId: userData.$id,
        username: userData.name,
      });
      if (newPost) {
        navigate(`/all-posts`);
      }
    }
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit(submit)}>
        <FormGroup>
          <Label htmlFor="content">Write Your Twitte</Label>
          <TextArea
            {...register("content", { required: true })}
            placeholder="Enter Your Twitte"
          ></TextArea>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input type="text" {...register("title")} placeholder="Enter Title" />
        </FormGroup>
        <SubmitButton type="submit">Submit</SubmitButton>
      </StyledForm>
    </FormContainer>
  );
}

export default AddTwittesForm;
