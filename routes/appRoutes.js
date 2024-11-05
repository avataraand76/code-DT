const express = require('express');
const router = express.Router();

// Import controllers
const homeController = require('../controllers/homeController');
const issueController = require('../controllers/issueController');
const userController = require('../controllers/userController');
const productRecordController = require('../controllers/productRecordController');

// Define routes
router.get('/', homeController.index);
router.get('/home', homeController.index);
router.get('/home', homeController.index);
router.get('/ghi_nhan_van_de', issueController.addIssue);
router.post('/ghi_nhan_van_de', issueController.addIssueToList);
router.get('/danh_sach_van_de', issueController.listIssue);
router.post('/danh_sach_van_de', issueController.updateIssue);
router.get('/cap_nhat_van_de_update', issueController.updateToFileExcel);
router.get('/cap_nhat_van_de_add', issueController.addIssueToFileExcel);
router.get('/ghi_nhan_san_luong', productRecordController.index);
router.post('/them_ghi_nhan_san_luong', productRecordController.addProductRecord);
router.get('/dashboard', homeController.index);
router.get('/*', homeController.index);

module.exports = router;