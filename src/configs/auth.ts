export default {
  meEndpoint: '/auth/profile',
  loginEndpoint: '/auth/',
  logoutEndpoint: '/user/logout',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
