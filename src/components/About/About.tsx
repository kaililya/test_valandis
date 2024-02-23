import styles from './About.module.css'

function About() {
  return (
  <ul className={styles.main_container}>
    <li className={styles.item}>
      <h3 className={styles.title}>
        Фильтрация
      </h3>
      <p className={styles.subtitle}>
        На сайте работает фильтр по 3 полям: "Название товара", "Цена товара" и "Бренд".
      </p>
      <p className={styles.subtitle}>
        Фильтрация по 1 полю, например "Цена товара" работает хорошо, <strong>однако сервер</strong>, на который отправляется запрос <strong>не может</strong> отфильтровать корректно более чем по 1 полю. Однако, если серверную часть расширят, то на фронте уже есть готове решение, позволящие фильтровать по всем полям одновременно. 
      </p>
      <p className={styles.subtitle}>
        Кнопки "Применить" и "Сбросить (все)" станут активными после того, как пользователь напишет хоть что-то в 1 из полей.
      </p>
    </li>
    <li className={styles.item}>
      <h3 className={styles.title}>
        Пагинация
      </h3>
      <p className={styles.subtitle}>
        На сайте есть пагинация, которая хорошо работает <strong>без фильтров</strong>. Если что-то укажите в любом из полей, то пагинация перестанет быть достпуной по причине:
      </p>
      <p className={styles.subtitle}>
        Фильтрованные данные не могут быть с пагинацией, так как при action = filter невозможно передать в params limit и offset. 
      </p>
      <p className={styles.subtitle}>
        Кнопки пагинации становятся неактивными пока идет запрос на сервер.
      </p>
    </li>
  </ul>);
}

export default About;
