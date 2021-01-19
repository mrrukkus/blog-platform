const routePaths = {
  main: '/',
  mainArticles: '/articles',
  profile: '/profile',
  newArticle: '/new-article',
  signIn: '/sign-in',
  signUp: '/sign-up',
  articleStatic: '/articles/:slug',
  articleEditStatic: '/articles/:slug/edit',
  articleDynamic: (slug) => `/articles/${slug}`,
  articleEditDynamic: (slug) => `/articles/${slug}/edit`
};

const localStorageActions = {
  getUser: () => localStorage.getItem('user'),
  removeUser: () => localStorage.removeItem('user'),
  setUser: (userData) => localStorage.setItem('user', userData)
};

export default routePaths;
export { localStorageActions };