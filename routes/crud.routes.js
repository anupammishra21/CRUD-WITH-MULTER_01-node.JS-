const router = require('express').Router();
const crudController = require('../controllers/crud.controller');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // console.log(file, "fileeeeeeeeee");
        cb(null, './public/uploads')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + 'abhishek_majumdar' + uniqueSuffix + path.extname(file.originalname))
    }
});

// const maxSize = 1024;

const uploads = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('only jpg, jpeg, png are allowed'))
        }
    },
    // limits: maxSize
})

router.get('/add', crudController.add);
router.post('/insert', uploads.single('image'), crudController.insert);
router.get('/', crudController.list);
router.get('/edit/:id', crudController.edit);
router.post('/update', uploads.single('image'), crudController.update);
router.get('/delete/:id', crudController.delete);

module.exports = router;