import multer from 'multer';
import GridFsStorage from 'multer-gridfs-storage';

const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/your-database-name',
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'uploads' // Name of the MongoDB collection
    };
  }
});

export default multer({ storage });
