# Assignment: Managing Test Blog Posts with TanStack Query
AD 340 Assignment

## Objective
Understand how to use TanStack Query to manage API requests for CRUD operations and learn to implement these methods in a React (Expo) application.

## Tools and Technologies
React (Expo): A JavaScript library for building user interfaces 
TanStack Query: A powerful library for server-state management in React applications
JSONPlaceholder: A fake online REST API for testing and prototyping https://jsonplaceholder.typicode.com/

## Tasks
## Fetching Posts: 
Use TanStack Query to fetch all posts from JSONPlaceholder and display them in a list.

## Creating a Post:
Implement a form that allows users to submit new posts.
Use TanStack Query’s mutation hooks to send a POST request to create new posts.

## Updating a Post:
Add an edit option to each post in the list.
Use a form to capture the updated title and body, and send a PUT request using TanStack Query’s mutation hooks.

## Patching a Post:
Implement a functionality to update only the title of a post.
Use PATCH method and ensure only the title is sent in the request body.

## Deleting a Post:
Add a delete button next to each post.
Use TanStack Query’s mutation hooks to send a DELETE request.

## Filtering Posts by User:
Add a feature to filter posts by user ID.
Implement this by adding a search or filter component that modifies the fetch query based on the user ID.


