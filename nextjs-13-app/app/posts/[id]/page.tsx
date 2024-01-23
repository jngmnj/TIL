import React from 'react'

async function getPost(postId: string) {
  const res = await fetch(
    `http://127.0.0.1:8090/api/collections/posts/records/${postId}`,
    { next: {revalidate: 10 } } // revalidating data: 캐시된 데이터를 일정 시간간격으로 재검증
  );
  if(!res.ok) {
    // 가장 가까이에 있는 error.js activated
    throw new Error('Failed to fetch data');
  }
  const data = res.json();
  return data;
}

const PostDetailPage = async ({params}: any) => {
  const post = await getPost(params.id);
  return (
    <div>
        <h1>posts/{post.id}</h1>
        <h2>{post.title}</h2>
        <div>{post.created}</div>
    </div>
  )
}

export default PostDetailPage