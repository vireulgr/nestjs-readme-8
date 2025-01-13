const blogPost = {
  postAuthor: 'user-id',
  publicationDate: '2025-01-01T12:30:00',
  createDate:  '2025-01-01T12:30:00',
  isRepost: false,
  isPublished: true,
  tags: ['test'],
  postType: 'text'
};

const dataString = JSON.stringify(blogPost);
console.log(dataString);

const requestOptions = {
  method: 'POST',
  headers: { 'Content-type': 'application/json' },
  body: dataString,
};

const req = new Request('/api/posts/create', requestOptions );

fetch(req)
  .then(console.log);

