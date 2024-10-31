// setting express
const express  = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs');

const fs = require('fs');
const multer = require('multer');
const path = require('path');

// use Model
const { Member ,
        Brand ,
        Product ,
        Order,
        saveData
      } = require('../models/connect')

// use UUID
const { v4: generateUuid } = require('uuid');

//------------------------------- Login Register Logout -------------------------------

function isLogin(req,res,next){
    const user = req.session.user
    if(user){
        if(user.Role === 'User'){
            return res.json({ message : 'Role : User'});
        }else{
            return res.json({ message : 'Role : Admin'});
        }
    }else{
        return next()
    }
}

router.get('/register', isLogin, async (req,res) => {
    try{
    }catch(err){
        console.log(err)
        res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/register',async (req,res) =>{
    try{
        const { Role, Username, Email, FirstName, LastName, Sex, Phone, Password } = req.body;
        const normalizedEmail = Email.toLowerCase();
        const normalizedUsername = Username.toLowerCase();
        const UUID = generateUuid();
        const hashPassword = await bcrypt.hash(Password, 10);

        const existingMember = await Member.findOne({
            $or: [
                { Email: normalizedEmail },
                { Username: normalizedUsername }
            ]
        });

        if (existingMember) {
            return res.status(400).json({ 
                message: existingMember.Email === normalizedEmail
                    ? "Email already exists!!"
                    : "Username already exists!!"
            });
        }else{
            const data = new Member({
                Role,
                Username: normalizedUsername,
                Email: normalizedEmail,
                FirstName,LastName,Sex,Phone,
                Password: hashPassword,
                CartUser: UUID
            });
            const register = await saveData(data)
            if(register){
                return res.status(200).json({ message: 'Register success' });
            }else{
                return res.status(400).json({ message: 'Register Failed' });
            }
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({ message : 'Server Error!!'})
    }
})

router.get('/login', isLogin, async (req,res) => {
    try{
    }catch(err){
        console.log(err)
        res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/login',async (req,res) => {
    try{
        const { Username , Password } = req.body
        if(!Username){ return res.status(400).json({ message : 'Username is required!!' }) }
        if(!Password){ return res.status(400).json({ message : 'Password is required!!' }) }
        const normalizedUsername = Username.toLowerCase();
        const existingMember = await Member.findOne({
            $or: [
                { Email: normalizedUsername },
                { Username: normalizedUsername }
            ]
        });
        if(existingMember){
            const passwordHash = existingMember.Password;
            const checkPassword = await bcrypt.compare(Password,passwordHash)
            if(checkPassword){
                req.session.user = {
                    Role : existingMember.Role,
                    Username : existingMember.Username,
                    Login : true,
                }
                return res.status(200).json({message : 'Login Successfully!!'})
            }else{
                return res.status(400).json({message : 'Invalid password!!'})
            }
        }else{
            return res.status(400).json({message : 'Username Or Email not found!!'})
        }
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/logout', async (req, res) => {
    try{
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send("Error occurred while logging out");
            }
            return res.status(200).send("Logged out successfully");
        });
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})

router.get('/navbar', async (req, res) => {
    try{
        const user = req.session
        res.status(200).json(user)
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})


//------------------------------------------------------ Admin ------------------------------------------------------
function isAdmin(req,res,next){
    const user = req.session.user
    if(user){
        if(user.Role === 'Admin'){
            return next()
            
        }else{
            return res.json(user);
        }
    }else{
        return res.json(user);
    }
}

router.get('/admin' ,isAdmin, async (req,res) => {
    try{
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})

// Admin/Member
router.get('/admin/member' , isAdmin , async (req,res) => {
    try{
        const member = await Member.find().sort({ Role: 1});
        return res.status(200).json(member)
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/admin/member/insert' , async (req,res) => {
    try{
        const { Role, Username, Email, FirstName, LastName, Sex, Phone, Password } = req.body;
        const normalizedEmail = Email.toLowerCase();
        const normalizedUsername = Username.toLowerCase();
        const UUID = generateUuid();
        const hashPassword = await bcrypt.hash(Password, 10);
        let cartMember = '';
        if(Role === 'Admin'){
            cartMember = ''
        }else{
            cartMember = UUID
        }

        const existingMember = await Member.findOne({
            $or: [
                { Email: normalizedEmail },
                { Username: normalizedUsername }
            ]
        });

        if (existingMember) {
            return res.status(400).json({ 
                message: existingMember.Email === normalizedEmail
                    ? "Email already exists!!"
                    : "Username already exists!!"
            });
        }else{
            const data = new Member({
                Role,
                Username: normalizedUsername,
                Email: normalizedEmail,
                FirstName,LastName,Sex,Phone,
                Password: hashPassword,
                CartUser: UUID
            });
            const register = await saveData(data)
            if(register){
                return res.status(200).json({ message: 'InsetMember success' });
            }else{
                return res.status(400).json({ message: 'InsetMember Failed' });
            }
        }
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/admin/member/edit', async (req,res) => {
    try{
        const { user } = req.body
        const queryMember = await Member.findOne({Username : user})
        if(queryMember){
            return res.status(200).json(queryMember);
        }else{
            return res.status(400).json({ message : 'Query Member Failed'})
        }
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/admin/member/update', async (req,res) => {
    try{
        const { OldEmail , newData } = req.body
        // CheckValue
        if(!newData.Role || !newData.Email || !newData.FirstName || !newData.LastName || !newData.Sex || !newData.Phone){ 
            return res.status(400).json({ message : 'Value is required!!' }) 
        }
         //Update
        if(OldEmail === newData.Email){
            const updateMember = await Member.findOneAndUpdate(
                { Username: newData.Username },
                newData
            );
            if(updateMember){
                return res.status(200).json({ message: 'Update Member By Username success!!' });
            }else{
                return res.status(400).json({ message: 'Update Member By Username Error!!' });
            }
        }else{
            const checkMember = await Member.findOne({ Email: newData.Email })
            if(checkMember){
                return res.status(400).json({ message: 'This email is already in use by another user in the system.' });
            }else{
                const updateMember = await Member.findOneAndUpdate(
                    { Username: newData.Username },
                    newData
                );
                if(updateMember){
                    return res.status(200).json({ message: 'Update Member By Username success!!' });
                }else{
                    return res.status(400).json({ message: 'Update Member By Username Error!!' });
                }
            }
        }
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/admin/member/delete', async (req,res) => {
    try{
        const { Username } = req.body;
        if(Username === 'admin.oil' || Username === 'user'){
            return res.status(400).json({ message : 'You cannot delete this username.!!'})
        }else{
            const deleteMember = await Member.deleteOne({ Username: Username });
            if(deleteMember){
                return res.status(200).json({ message: 'Delete Member Success!!' });
            }else{
                return res.status(400).json({ message: 'Delete Member Error!!' });
            }
        }
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})

// Admin/Brand
router.get('/admin/brand' , isAdmin , async (req,res) => {
    try{
        const brand = await Brand.find();
        if(brand){
            return res.status(200).json(brand)
        }else{
            return res.status(400).json({ message : 'Query Brand Error!!'})
        }
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/admin/brand' , async (req,res) => {
    try{
        let brandID = '';
        const brands = await Brand.findOne({}, { BrandID: 1 }).sort({ _id: -1 });
        if (!brands) {
            brandID = 'BN0000001'
        }else{
            const lastBrandID = brands.BrandID;
            const lastIdNumber = parseInt(lastBrandID.replace('BN', ''));
            const newIdNumber = lastIdNumber + 1;
            brandID = `BN${newIdNumber.toString().padStart(7, '0')}`;
        }

        return res.status(200).json(brandID)
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/admin/brand/insert' , async (req,res) => {
    try{
        const { BrandID , BrandName} = req.body
        const normalizedBrandName = BrandName.toLowerCase();
        const existingBrand = await Brand.findOne({
            $or: [
                { BrandID: BrandID },
                { BrandName: normalizedBrandName }
            ]
        });

        if (existingBrand) {
            return res.status(400).json({ 
                message: existingBrand.BrandID === BrandID
                    ? "BrandID already exists!!"
                    : "BrandName already exists!!"
            });
        }else{
            const data = new Brand({
                BrandID,
                BrandName: normalizedBrandName
            });
            const insert = await saveData(data)
            if(insert){
                return res.status(200).json({ message: 'InsetBrand success' });
            }else{
                return res.status(400).json({ message: 'InsetBrand Failed' });
            }
        }
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/admin/brand/edit' , async (req,res) => {
    try{
        const { brandID } = req.body
        const brand = await Brand.findOne({BrandID : brandID});
        return res.status(200).json(brand)
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/admin/brand/update' , async (req,res) => {
    try{
        const { OldBrandName, newData } = req.body
        if(!newData.BrandName){ 
            return res.status(400).json({ message : 'Value is required!!' }) 
        }

        if(OldBrandName === newData.BrandName){
            const updateBrand = await Brand.findOneAndUpdate(
                { Username: newData.Username },newData
            );
            if(updateBrand){
                return res.status(200).json({ message: 'Update Brand success!!' });
            }else{
                return res.status(400).json({ message: 'Update Brand Error!!' });
            }
        }else{
            const checkBrand = await Brand.findOne({ BrandName : newData.BrandName })
            if(checkBrand){
                return res.status(400).json({ message : 'This Brand is already in use!!'});
            }else{
                const updateBrand = await Brand.findOneAndUpdate(
                    { Username: newData.Username },newData
                );
                if(updateBrand){
                    return res.status(200).json({ message: 'Update Brand success!!' });
                }else{
                    return res.status(400).json({ message: 'Update Brand Error!!' });
                }
            }
        }
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/admin/brand/delete' , async (req,res) => {
    try{
        const { BrandID } = req.body
        const deleteBrand = await Brand.deleteOne({ BrandID: BrandID });
        if(deleteBrand){
            return res.status(200).json({ message: 'Delete Brand Success!!' });
        }else{
            return res.status(400).json({ message: 'Delete Brand Error!!' });
        }
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})
// Admin/Product
router.get('/admin/product' , isAdmin , async (req,res) => {
    try{
        const product = await Product.aggregate([
            {
              $lookup: {
                from: "brands",
                localField: "ProductBrand",
                foreignField: "BrandID",
                as: "brand",
              },
            }
          ]);
        if (product.length > 0) { // ตรวจสอบว่า product มีข้อมูล
            return res.status(200).json({ Brand: product.map(p => p.brand), Product: product });
        } else {
            return res.status(400).json({ message: 'Query Product Error!!' });
        }
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})

router.post('/admin/product' , async (req,res) => {
    try{
        let productID = '';
        const product = await Product.findOne({}, { ProductID: 1 }).sort({ _id: -1 });
        if (!product) {
            productID = 'PN0000001'
        }else{
            const lastProductID = product.ProductID;
            const lastIdNumber = parseInt(lastProductID.replace('PN', '')); // เอาหมายเลขจาก ProductID
            const newIdNumber = lastIdNumber + 1; // เพิ่มหมายเลข 1
            productID = `PN${newIdNumber.toString().padStart(7, '0')}`;
        }

        const brand = await Brand.find();
        if(brand){
            return res.status(200).json({ Brands:brand, ProductID:productID })
        }else{
            return res.status(400).json({ message : 'Query Brand Error!!'})
        }
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})

const storage = multer.diskStorage({
    destination:function(req,file,cd){
        cd(null,'../client/public/image/product')
    },
    filename:function(req,file,cd){
        cd(null,Date.now()+'.jpg')
    }
})

const MAX_SIZE = 2 * 1024 * 1024;
const fileFilter = (req, file, cb) => {
    // ตรวจสอบชนิดไฟล์
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (mimetype && extname) {
        // ตรวจสอบขนาดไฟล์
        if (file.size > MAX_SIZE) {
            req.fileValidationError = 'File size exceeds the limit of 2MB';
            return cb(null, false);
        }
        return cb(null, true);
    } else {
        req.fileValidationError = 'Only images are allowed (jpeg, jpg, png)';
        return cb(null, false);
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: MAX_SIZE }
}).single('ProductImage')

router.post('/admin/product/insert', upload, async (req, res) => {
    try {
        const errText = req.fileValidationError
        if (errText) {
            return res.status(400).json({ message: errText });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No files uploaded' });
        }

        const { ProductID, ProductName, ProductBrand, CostPrice, SellPrice, ProductQuantity } = req.body;

        if (!ProductID || !ProductName || !ProductBrand || !CostPrice || !SellPrice || !ProductQuantity) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Failed to delete the file:', err);
            });
            return res.status(400).json({ message: 'Value is required!!' });
        }else{
            const data = new Product({
                ProductID,ProductName,ProductBrand,
                CostPrice,SellPrice,ProductQuantity,
                ProductImage:req.file.filename
            });
            const insertProduct = await saveData(data)
            if(insertProduct){
                return res.status(200).json({ message: 'Inset Product success' });
            }else{
                return res.status(400).json({ message: 'Inset Product Failed' });
            }
        }
    } catch (err) {
        return res.status(500).json({ message : 'Server Error!!'})
    }
});

router.post('/admin/product/edit', async (req, res) => {
    try {
        const { productID } = req.body
        const brand = await Brand.find();
        const queryProduct = await Product.aggregate([
            {
              $match: { ProductID: productID } 
            },
            {
              $lookup: {
                from: "brands", 
                localField: "ProductBrand", 
                foreignField: "BrandID", 
                as: "brand", 
              },
            },
          ]);
        if (queryProduct.length > 0) { 
            return res.status(200).json({ Brand: brand, Product: queryProduct[0] });
        } else {
            return res.status(400).json({ message: 'Query Product Error!!' });
        }
    } catch (err) {
        return res.status(500).json({ message : 'Server Error!!'})
    }
});

router.post('/admin/product/update', upload, async (req, res) => {
    try {
        const { ProductID, ProductName, ProductBrand, CostPrice, SellPrice, ProductQuantity,OldImage } = req.body;
        const errText = req.fileValidationError
        if (errText) {
            return res.status(400).json({ message: errText });
        }

        if (!ProductID || !ProductName || !ProductBrand || !CostPrice || !SellPrice || !ProductQuantity) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Failed to delete the file:', err);
            });
            return res.status(400).json({ message: 'Value is required!!' });
        }else{
            if (!req.file) {
                const data = {
                    ProductID,
                    ProductName,
                    ProductBrand,
                    CostPrice,
                    SellPrice,
                    ProductQuantity,
                    ProductImage:OldImage
                };
                const updateProduct = await Product.findOneAndUpdate(
                    { ProductID: ProductID }, data, { new: true }
                );
                if(updateProduct){
                    return res.status(200).json({ message: 'Update Product success!!' });
                }else{
                    return res.status(400).json({ message: 'Update Product Error!!' });
                }
            }else{
                const data = {
                    ProductID,
                    ProductName,
                    ProductBrand,
                    CostPrice,
                    SellPrice,
                    ProductQuantity,
                    ProductImage:req.file.filename
                };
                const updateProduct = await Product.findOneAndUpdate(
                    { ProductID: ProductID }, data, { new: true }
                );
                if(updateProduct){
                    const deleteOldImage = req.file.destination + '/' + OldImage
                    fs.unlink(deleteOldImage, (err) => {
                        if (err) console.error('Failed to delete the file:', err);
                    });
                    return res.status(200).json({ message: 'Update Product success!!' });
                }else{
                    return res.status(400).json({ message: 'Update Product Error!!' });
                }
            }
        }
        
    } catch (err) {
        return res.status(500).json({ message : 'Server Error!!'})
    }
});

// Admin/Order
router.get('/admin/order' , isAdmin , async (req,res) => {
    try{
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})
//------------------------------------------------------ User ------------------------------------------------------
router.get('/', async (req, res) => {
    try{
        
    }catch(err){
        return res.status(500).json({ message : 'Server Error!!'})
    }
})

module.exports = router