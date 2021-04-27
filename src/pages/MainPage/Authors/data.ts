interface DataItem {
  name: string
  text: string
}

export const data: Array<DataItem> = [
  {
    name: 'Даниил Ситников',
    text: 'Вклад в проект: игры "Аудиовызов" и "Виселица", дизайн приложения, приложил руку к логике учебника.',
  },
  {
    name: 'Станислав Снопок',
    text: 'Тимлид. Вклад в проект: мини-игра "Саванна", основная логика учебника со словарём, работа с базой данных, общее руководство проектом.',
  },
  {
    name: 'Богдан Кармызов',
    text: 'Вклад в проект: игра "Спринт", главная страница приложения, роутинг, запись и озвучка видео для приложения.',
  },
  {
    name: 'Алексей Худалей',
    text: 'Вклад в проект: бэкенд проекта.',
  },
];

export default {
  data,
};