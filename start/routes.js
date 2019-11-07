'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

const User = use('App/Models/User')

// Generic Social Authentiction Routes
// Can be used with Twitter, Google, Facebook, Instagram, etc..

Route.get('login/???', async ({
  ally
}) => {
  await ally.driver('???').redirect()
})

Route.get('/authenticated/???', async ({
  ally,
  response,
  auth
}) => {
  const allyUser = await ally.driver('???').getUser()

  // user details to be saved
  const userDetails = {
    nickname: allyUser.getNickname(),
    email: allyUser.getEmail(),
    avatar: allyUser.getAvatar(),
    login_source: '???',
  }

  // search for existing user
  const whereClause = {
    email: allyUser.getEmail()
  }

  const user = await User.findOrCreate(whereClause, userDetails)
  await auth.login(user)

  return 'test'
})

Route.get('/login/jwt', async ({
  auth
}) => {
  let user = await auth.getUser()
  let jwt = await auth.authenticator('jwt').generate(user)
  return jwt
}).middleware(['auth'])

Route.get('/', async ({
  view
}) => {
  return view.render('index')
})
