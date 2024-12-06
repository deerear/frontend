/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect, useRef } from 'react';
import { useInfiniteQuery, useQuery, InfiniteData } from '@tanstack/react-query';
import Layout from '~/widgets/layout';
import Flex from '~/shared/components/flex';
import Image from 'next/image';
import { getProfile, getPosts, getComments, getDMs } from '~/entities/api';
import { Comment, DM, PaginatedResponse, Post, Profile } from '~/shared/types/api';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Router from 'next/router';

type PostsQueryKey = ['posts'];
type CommentsQueryKey = ['comments'];
type DMsQueryKey = ['dms'];

const imgContainerStyle = css`
  width: 60px;
  height: 60px;
  position: relative;
  border-radius: 5px;
  overflow: hidden;
`;

const contentBoxStyle = css`
  margin-left: 10px;
  height: 60px;
  border: 1px solid #e9ecef;
  padding: 10px;
  border-radius: 5px;
  width: calc(100% - 60px);
`;

const useInfiniteScroll = (callback: () => void, hasNext: boolean | undefined) => {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNext) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      { threshold: 1 }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [callback, hasNext]);

  return observerRef;
};

function PostList({
  data,
  fetchNext,
  hasNext,
  loading
}: {
  data: InfiniteData<PaginatedResponse<Post>> | undefined;
  fetchNext: () => void;
  hasNext: boolean | undefined;
  loading: boolean;
}) {
  const observerRef = useInfiniteScroll(fetchNext, hasNext);

  return (
    <Flex direction='column' rowGap='10px' css={{ width: '100%' }}>
      {data?.pages.map((page: PaginatedResponse<Post>) =>
        page.objects.map((post) => (
          <div key={post.postId}>
            {post.title}
            <Flex css={{ width: '100%' }}>
              <div css={imgContainerStyle}>
                <Image src='/avatar.png' fill alt='post-image' />
              </div>
              <div css={contentBoxStyle}>{post.content}</div>
            </Flex>
          </div>
        ))
      )}
      {loading && <div>Loading more...</div>}
      <div ref={observerRef} />
    </Flex>
  );
}

function CommentList({
  data,
  fetchNext,
  hasNext,
  loading
}: {
  data: InfiniteData<PaginatedResponse<Comment>> | undefined;
  fetchNext: () => void;
  hasNext: boolean | undefined;
  loading: boolean;
}) {
  const observerRef = useInfiniteScroll(fetchNext, hasNext);

  return (
    <Flex direction='column' rowGap='10px' css={{ width: '100%' }}>
      {data?.pages.map((page: PaginatedResponse<Comment>) =>
        page.objects.map((comment) => <div key={comment.commentId}>{comment.content}</div>)
      )}
      {loading && <div>Loading more...</div>}
      <div ref={observerRef} />
    </Flex>
  );
}

function DMList({
  data,
  fetchNext,
  hasNext,
  loading
}: {
  data: InfiniteData<PaginatedResponse<DM>> | undefined;
  fetchNext: () => void;
  hasNext: boolean | undefined;
  loading: boolean;
}) {
  const observerRef = useInfiniteScroll(fetchNext, hasNext);

  return (
    <Flex direction='column' rowGap='10px' css={{ width: '100%' }}>
      {data?.pages.map((page: PaginatedResponse<DM>) =>
        page.objects.map((dm) => <div key={dm.dmId}>{dm.message}</div>)
      )}
      {loading && <div>Loading more...</div>}
      <div ref={observerRef} />
    </Flex>
  );
}

function Mypage() {
  const tabStyle = (isActive: boolean) => css`
    flex: 1;
    text-align: center;
    font-weight: ${isActive ? 'bold' : 'normal'};
    background-color: transparent;
    border: none;
    cursor: pointer;
  `;

  const contentStyle = css`
    width: 100%;
    border: 1px solid #e9ecef;
    border-top: none;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 20px;
    overflow-y: auto;
  `;

  const [activeTab, setActiveTab] = useState<'posts' | 'comments' | 'dms'>('posts');

  const { data: profileData, isLoading: profileLoading } = useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: getProfile
  });

  const {
    data: postsData,
    isLoading: postsLoading,
    fetchNextPage: fetchNextPosts,
    hasNextPage: hasNextPosts,
    isFetchingNextPage: isFetchingNextPosts
  } = useInfiniteQuery<PaginatedResponse<Post>, Error, InfiniteData<PaginatedResponse<Post>>, PostsQueryKey, string>({
    queryKey: ['posts'],
    queryFn: ({ pageParam }) => getPosts(pageParam, 15),
    initialPageParam: '',
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.key : undefined),
    enabled: activeTab === 'posts'
  });

  const {
    data: commentsData,
    isLoading: commentsLoading,
    fetchNextPage: fetchNextComments,
    hasNextPage: hasNextComments,
    isFetchingNextPage: isFetchingNextComments
  } = useInfiniteQuery<
    PaginatedResponse<Comment>,
    Error,
    InfiniteData<PaginatedResponse<Comment>>,
    CommentsQueryKey,
    string
  >({
    queryKey: ['comments'],
    queryFn: ({ pageParam }) => getComments(pageParam, 15),
    initialPageParam: '',
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.key : undefined),
    enabled: activeTab === 'comments'
  });

  const {
    data: dmsData,
    isLoading: dmsLoading,
    fetchNextPage: fetchNextDMs,
    hasNextPage: hasNextDMs,
    isFetchingNextPage: isFetchingNextDMs
  } = useInfiniteQuery<PaginatedResponse<DM>, Error, InfiniteData<PaginatedResponse<DM>>, DMsQueryKey, string>({
    queryKey: ['dms'],
    queryFn: ({ pageParam }) => getDMs(pageParam, 15),
    initialPageParam: '',
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.key : undefined),
    enabled: activeTab === 'dms'
  });

  const handleClickEditProfile = () => {
    Router.push('/my-page/profile');
  };

  if (profileLoading || postsLoading || commentsLoading || dmsLoading) return <div>Loading...</div>;

  return (
    <Flex
      css={css`
        width: 100%;
        border-radius: 5px;
      `}
      direction='column'
      justifyContent='center'
      alignItems='center'
    >
      {/* Profile Section */}
      <Flex
        css={css`
          width: 100%;
          padding: 20px;
          border: 1px solid #e9ecef;
          border-radius: 5px;
          margin-bottom: 10px;
        `}
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <Flex
          direction='row'
          alignItems='center'
          columnGap='5px'
          css={css`
            width: 80%;
          `}
        >
          <Flex
            css={css`
              width: 80px;
              height: 80px;
              border-radius: 100%;
              position: relative;
              overflow: hidden;
            `}
          >
            <Image src={profileData?.profileImg ?? '/avatar.png'} fill alt='profile-image' />
          </Flex>
          <div>{profileData?.nickname}님</div>
        </Flex>
        <Flex
          columnGap='5px'
          justifyContent='center'
          alignItems='center'
          css={css`
            width: 40%;
          `}
        >
          <FontAwesomeIcon icon={faGear} />
          <span
            onClick={handleClickEditProfile}
            onKeyDown={handleClickEditProfile}
            tabIndex={0}
            role='button'
            css={css`
              cursor: pointer;
            `}
          >
            프로필 설정
          </span>
        </Flex>
      </Flex>

      {/* Tabs */}
      <Flex
        css={css`
          width: 100%;
          border: 1px solid #e9ecef;
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          padding: 20px;
        `}
        direction='row'
        justifyContent='space-between'
        alignItems='center'
      >
        <button css={tabStyle(activeTab === 'posts')} onClick={() => setActiveTab('posts')} type='button'>
          작성글
        </button>
        <button css={tabStyle(activeTab === 'comments')} onClick={() => setActiveTab('comments')} type='button'>
          작성댓글
        </button>
        <button css={tabStyle(activeTab === 'dms')} onClick={() => setActiveTab('dms')} type='button'>
          DM목록
        </button>
      </Flex>

      {/* Tab Content */}
      <Flex css={contentStyle}>
        {activeTab === 'posts' && (
          <PostList data={postsData} fetchNext={fetchNextPosts} hasNext={hasNextPosts} loading={isFetchingNextPosts} />
        )}
        {activeTab === 'comments' && (
          <CommentList
            data={commentsData}
            fetchNext={fetchNextComments}
            hasNext={hasNextComments}
            loading={isFetchingNextComments}
          />
        )}
        {activeTab === 'dms' && (
          <DMList data={dmsData} fetchNext={fetchNextDMs} hasNext={hasNextDMs} loading={isFetchingNextDMs} />
        )}
      </Flex>
    </Flex>
  );
}

Mypage.layout = (page: React.ReactNode) => (
  <Layout>
    <Layout.Header />
    <Layout.Content page='마이페이지'>{page}</Layout.Content>
  </Layout>
);

export default Mypage;
