import {StyleSheet, Text, View} from 'react-native';
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";
import {useState} from "react";

// Use JSONPlaceholder for blog post

// Fetching all posts
const getBlogPost = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    return response.json()
}

// Fetching post by id
const getBlogById = async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/post/${id}`);
    return response.json()
}

// Creating a Post
const createBlogPost = async (userId, title, content) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: {title},
            body: {content},
            userId: {userId},
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
    return response.json()
}

// Updating a Post
const updateBlogPost = async (id, userId, title, content) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: {id},
            title: {title},
            body: {content},
            userId: {userId},
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
    return response.json()
}

// Patching a Post Title
const patchBlogPost = async (id, title) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
            title: {title},
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    });
    return response.json()
}

// Deleting a Post by id
const deleteBlogPost = async (id) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
    });
    return response.json()
}

// Filtering Posts by User
const filterBlogPost = async (userId) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return response.json()
}

export default function App() {
    const queryClient = new QueryClient()
    const [selectedId, setSelectedId] = useState('')
    const handleClick = (id) => {
        setSelectedId(id)
    }

    const randomFact = Math.floor(Math.random() * 15)
    return (
        <QueryClientProvider client={queryClient}>
            <View style={styles.container}>
                <Blogs handleDogClick={handleDogClicked}/>  
                <Dog dogId={selectedId}/>
            </View>
        </QueryClientProvider>
    );
}

const Blogs = ({handleDogClick}) => {
    const {data: posts, isLoading: postsLoading, isError: postsError} = useQuery({queryKey: ['posts'], queryFn: getBlogPost})
    if (postsLoading) {
        return (
            <Text>Loading...</Text>
        )
    }
    if (postsError) {
        return (
            <Text>There was an error...</Text>
        )
    }
    return (
        <View>
            <Text style={styles.heading}>Blog Posts</Text>
            {
                posts.data.map(d => <Text onPress={() => handleClick(d.id)} key={d.id}>{d.attributes.name}</Text>)
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#d0d0c0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    dog: {
        width: '50%'
    },
    heading: {
        fontSize: 30,
        fontWeight:'bold'
    }
});