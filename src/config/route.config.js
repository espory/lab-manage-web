import Error404 from '../pages/404';

import Intro from '../pages/intro';
import Members from '../pages/members'
import News from '../pages/news'
import Papers from '../pages/papers'



export default {

  intro: {
    route: '/intro',
    entry: Intro,
  },
  intro: {
    route: '/intro',
    entry: Intro,
  },
  members: {
    route: '/members',
    entry: Members,
  },
  news: {
    route: '/news',
    entry: News,
  },
  papers: {
    route: '/papers',
    entry: Papers,
  },

  404: {
    route: '/404',
    entry: Error404,
  },
};
