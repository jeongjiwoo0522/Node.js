var md = require('md-directory')
md.parse('./posts.md', function (err, contents) {
  console.log(contents.content);
});