require("dotenv").config();

module.exports = {
  plugins: [
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        "excerpt_separator": "<!-- end -->",
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 800
            }
          }
        ]
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`
      }
    }
  ]
}
