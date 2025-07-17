export default {
  storage: {
    ftp: {
      driver: './storage/ftp-storage.js',
      config: {
        host: 'waws-prod-bay-209.ftp.azurewebsites.windows.net',
        port: 21,
        user: 'saharaviajesecommercewsqa\\$saharaviajesecommercewsqa',
        password: 'yyyNJon6ilxynRqgK3oBKFxr8KtnQtXuD4rb4fx6DW5yxR376LldAfbokKue',
        basePath: '/site/wwwroot/uploads',
        publicUrl: 'https://saharaviajesecommercewsqa.azurewebsites.net/uploads'
      }
    }
  }
};