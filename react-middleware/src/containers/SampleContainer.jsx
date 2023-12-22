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
      const fn = async() => {
        try {
          getPost(1);
          getUsers(1);
        } catch (e) {
          console.log(e);
        }
      }
      fn();
      // useEffect 파라미터로 넘는 함수는 async를 할 수 없어서
      // 내부에서 함수를 선언하고 호출해준다.
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
    ({ sample, loading }) => ({
        post: sample.post,
        users: sample.users,
        // loadingPost: sample.loadingPost,
        // loadingUsers: sample.loadingUsers
        loadingPost: loading['sample/GET_POST'],
        loadingUsers: loading['sample/GET_USERS']
    }),
    {
        getPost,
        getUsers
    }
)(SampleContainer)