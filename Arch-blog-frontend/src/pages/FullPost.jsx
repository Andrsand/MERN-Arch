import React from "react";
import { useParams } from "react-router-dom";
import axios from '../axios';

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";

export const FullPost = () => {
  // делаем запрос не в Redax а локально, поскольку это вего лишь одна статья
  const [data, setData] = React.useState(); // тут просто хранится deta
  const [isLoading, setLoading] = React.useState(true); // стейт на то что идет загрузка
  const { id } = useParams();

  React.useEffect(() => {
    axios.get(`/posts/${id}`).then((res) => {                // делаем запрос с помощью axios на /posts/${id} 
      setData(res.data);                    // полученный результат сохраняем в стейт
      setLoading(false);                    // если запрос выполнился успешно - то setLoading(false); т.е. указать, что загрузка завершилась
    }).catch((err) => {                       // если же была ошибка ....
      console.log(err);
      alert('Ошибка при получении статьи');
    });
  }, []);

  if (isLoading) {    // если идет загрузка то рендерим isLoading 
    return <Post isLoading={isLoading} isFullPost />;  // isFullPost - объясняет, что это полная запись
  }

  return ( // если же загрузка завершена, то рендерим реальную информацию
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
        user={data.user}     // юзер 
        createdAt={data.createdAt}    // дата создания
        viewsCount={data.viewsCount}  // число просмотров
        commentsCount={3}            // комментарии
        tags={data.tags}              // тэги
        isFullPost>                   {/*// isFullPost - объясняет, что это полная запись*/}
        {/*<p>{data.text}</p> текст*/}
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
