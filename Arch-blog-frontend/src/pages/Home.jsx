import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

// import axios from '../axios';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/posts';

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector(state => state.posts);

  const isPostsLoading = posts.status === 'loading';   // если статус поста - loading то в isPostsLoading будет true

  React.useEffect(() => {    // при певром рендере делаем запрос с помощью axios
    dispatch(fetchPosts());// выполняем запрос на бэкенд
    dispatch(fetchTags());
  }, []);



  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />    // Если идет загрузка то берем из фейкового массива 5 шт. или из реального моссива если в нем что-то есть (нам нужны obj и index)          
            ) : (
              <Post
                id={obj._id}
                title={obj.title}
                imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
                user={obj.user}     // юзер 
                createdAt={obj.createdAt}    // дата создания
                viewsCount={obj.viewsCount}  // число просмотров
                commentsCount={3}            // комментарии
                tags={obj.tags}              // тэги

                isEditable
              />
            ),
          )}



        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={['react', 'typescript', 'заметки']} isLoading={false} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
