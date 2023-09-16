const express = require('express');
const app = express();
const multer = require('multer');
const { createWorker } = require('tesseract.js')
const Tesseract = require('tesseract.js');
   
app.use(express.json());

const upload = multer({ dest: 'uploads/' });
  

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.post('/upload', upload.single('file'), async (req, res)=> {
    const recognizeText = async (image) => {
      const result = await Tesseract.recognize(
        image, 
        'eng+ara'
      ).then(({data: { text }}) => {
        console.log(text)
        res.json(text)
      })
    }
    await recognizeText(req.file.path)
    
})
app.listen(3000) 