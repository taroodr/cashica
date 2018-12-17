export default function({ store, route, redirect }) {
  if (!store.getters.isAuthenticated && route.name !== 'signin') {
    redirect('/signin')
  }
  if (store.getters.isAuthenticated && route.name === 'signin') {
    redirect('/')
  }
}
