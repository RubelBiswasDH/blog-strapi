module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '15457d2a0cc37a4fa964699deae455cf'),
  },
});
