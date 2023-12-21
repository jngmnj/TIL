import React from 'react'
import { useEffect } from 'react'
import Sample from '../components/Sample';
import { connect } from 'react-redux';
import { getPost, getUsers } from '../modules/sample';

const SampleContainer = ({
    getPost,
    getUsers,
    post,
    users,
    loadingPost,
    loadingUsers
}) => {
    useEffect(() => {
      getPost(1);
      getUsers(1);
    }, [getPost, getUsers])
    
  return (
    <Sample 
        post={post}
        users={users}
        loadingPost={loadingPost}
        loadingUsers={loadingUsers}
    />
  )
}

export default connect(
    ({ sample }) => ({
        post: sample.post,
        users: sample.users,
        loadingPost: sample.loadingPost,
        loadingUsers: sample.loadingUsers
    }),
    {
        getPost,
        getUsers
    }
)(SampleContainer)