import {Button, StyleSheet, Text, View, TextInput} from 'react-native';
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";
import {useState} from "react";

// Use JSONPlaceholder for blog post

// Fetching all posts
const getBlogPost = async () => {
    const response = (await fetch('https://jsonplaceholder.typicode.com/posts')).then(res => {
        if(!res.ok) {
            throw new Error("Network response was not ok");
        };
        return res.json();
    })
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
    const [selectedId, setSelectedId] = useState(1)
    const handleClick = (id) => {
        setSelectedId(id)
    }

    const randomFact = Math.floor(Math.random() * 15)
    return (
        <QueryClientProvider client={queryClient}>
            <View style={styles.container}>
                <Blogs handleClick={handleClick}/>  
                <NewBlog />
            </View>
        </QueryClientProvider>
    );
}

//<Dog dogId={selectedId}/>

const NewBlog = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    return (
        <View>
            <TextInput
                value = {title}
                onChangeText={setTitle}
                placeholder="write blog title"
            />
            <TextInput
                value = {content}
                onChangeText={setContent}
                placeholder="write blog content"
            />
            <Button title="Add new post" onPress={createBlogPost(1, title, content)} />
        </View>

    );
}

const Blogs = ({handleClick}) => {
    const {data: posts, isLoading: postsLoading, isError: postsError} = useQuery({queryKey: ['id'], queryFn: getBlogPost})
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
                posts.map(d => <Text onPress={() => handleClick(d.id)} key={d.id}>{d.title}</Text>)
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
    heading: {
        fontSize: 30,
        fontWeight:'bold'
    }
});