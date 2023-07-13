const PORT = 8081;

const setPath = 'setFile';

const getPath = 'getFile';

const htmlSetForm = `
<form action="${setPath}" method="post" enctype="multipart/form-data">
<input type="file" name="filetoupload">
<br/>
<br/>
<input type="submit" value="Upload file!">
</form>
`;

const htmlGetForm = `
<form action="${getPath}" method="get" enctype="multipart/form-data">
<input type="submit" value="Load file!">
</form>
`;

module.exports = {
  PORT,
  setPath,
  getPath,
  htmlSetForm,
  htmlGetForm,
};
