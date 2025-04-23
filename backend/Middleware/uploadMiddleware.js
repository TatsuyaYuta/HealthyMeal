const multer = require('multer');
const path = require('path');
const fs = require('fs');

const diseaseCategories = {
  3: 'Diabetes',
  4: 'Heart Disease',
  5: 'Hypertension',
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let diseaseCategoryIdsRaw = req.body.suitableFor;

    console.log("Raw suitableFor:", diseaseCategoryIdsRaw);

    if (typeof diseaseCategoryIdsRaw === 'string') {
      try {
        diseaseCategoryIdsRaw = JSON.parse(diseaseCategoryIdsRaw);
      } catch (e) {
        diseaseCategoryIdsRaw = [diseaseCategoryIdsRaw];
      }
    }

    const diseaseCategoryIds = Array.isArray(diseaseCategoryIdsRaw)
      ? diseaseCategoryIdsRaw
      : [diseaseCategoryIdsRaw];

    if (!diseaseCategoryIds || diseaseCategoryIds.length === 0) {
      return cb(new Error("ประเภทโรคไม่ถูกต้อง"), null);
    }

    const categoryId = parseInt(diseaseCategoryIds[0]);
    const category = diseaseCategories[categoryId];

    if (!category) {
      return cb(new Error("ประเภทโรคไม่รองรับ"), null);
    }

    const uploadFolder = path.join(__dirname, '../images', category); // ปรับ path

    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }

    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

module.exports = upload;