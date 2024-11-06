# Shopping Online
เป็น Mini Project E-Commerce ที่ทำขึ้น เพื่อฝึกฝน การใช้งาน ReactJS NodeJS(ExpressJS) MongoDB

## ขั้นตอนการใช้งาน 
``` bash
npm install
```
ใช้คำสั่งนี้ใน Folder Client และ Folder Server
ทำการ Setting port Nodejs และ url ของ ReactJS เพื่อให้ Client กับ Server เชื่อมต่อกัน

## Language
##### Frontend

-   ReactJS
-   Bootstrap
-   React-Bootstrap

##### Backend

-   NodeJS
-   ExpressJS

##### Database

-   MongoDB

##### Tools

-   VsCode
- Chat GPT
-   PostMan
-   Git & Github

## System

##### Login

##### Register
##### Product
- Select Product
- Search Product
- Show Product

##### Cart
- Add Cart
- Show Data Cart
- Product Summary
  
##### Wishlist
- Add Wishlist
- Show Data Wishlist
  
##### CheckOut
- Order Products
  
##### Member

-   Show User
-   Edit User
-   Show OrderUser

##### Admin

-   Dashboard
-   Member
-   Brand
-   Product
-   Order

## รายละเอียด Project

#### Login
- เช็ค Username หรือ Email ที่กรอกเข้ามา ถ้าถูกต้อง Login ได้
- เช็ค Role ของ User ที่ Login ถ้า Role เป็น Admin จะไปที่หน้า Page Admin แต่ถ้าเป็น User จะไปที่หน้า Page User
#### Register
- เช็ค การกรอกข้อมูลทั้งหมด ถ้ามีข้อมูลว่าง จะ  Lock ปุ่ม Register และ Validation ของข้อมูลนั้นๆด้วย
- เช็ค Username และ Email เมื่อทำการกด Login ถ้า Username และ Email ซ้ำกับใน Database จะแจ้งเตือน Error เพื่อให้กรอกข้อมูลใหม่
- มีการเข้ารหัส Password เพื่อให้ข้อมูลปลอดภัยยิ่งขึ้น
#### Product
- แสดงข้อมูล ของ Product ทั้งหมด
- เลือกแสดง ข้อมูลสินค้า ตามประเภท Brand ที่ลือกได้
- ค้นหาสินค้า Auto โดยที่ไม่ต้องคลิกปุ่มค้นหา พิมพ์ค้นหาได้เลย
#### Cart
- เพิ่มสินค้า เข้าไปใน Cart ได้
- แสดงข้อมูล สินค้า ใน Cart
- คลิกเพื่อไปหน้าสรุป
   - สามารถเพิ่ม หรือ ลด จำนวนสินค้า ได้ พร้อมสรุปราคา Auto
#### Wishlist
- เพิ่มสินค้า เข้าไปใน Wishlist ได้
- แสดงข้อมูล สินค้า ใน Wishlist
#### Checkout
- สั่งซื้อสินค้า พร้อมสรุปจำนวนเงินทั้งหมด
- ต้องกรอกข้อมูลที่จำเป็นให้ครบ ถึงจะกดปุ่มได้
- เช็คจำนวนสินค้าทุกครั้งที่มีการกดสั่งซื้อ ถ้าสินค้าพอจะสั่งซื้อได้
#### Member
- เช็คการเขียนถึง Page Member ถ้า ไม่มีการ  Login หรือ Role ไม่ใช่ User แล้วพยายามเข้ามา จะเด้งกลับไปที่หน้า Login
- แสดงข้อมูล ของ User ที่ Login เข้ามา
- สามารถแก้ไข้ ของข้อมูลได้ เช่น Email Phone ฯลฯ
#### Admin
- เช็คการเขียนถึง Page Admin ถ้า ไม่มีการ  Login หรือ Role ไม่ใช่ Admin แล้วพยายามเข้ามา จะเด้งกลับไปที่หน้า Login
- Dashboard <br>
   - แสดงข้อมล จำนวน Member ทั้งหมดว่ามีกี่คน และแยกว่า Admin กี่คน, User กี่คน
   - แสดงข้อมูล Order ทั้งหมด และแยกว่า confirmed กี่Order, not confirmed กี่Order
   - แสดงข้อมูล ยอดขาย และ กำไร
   - แสดงข้อมูลสินค้าที่เหลือทั้งหมด
- Member<br>
  - แสดงตารางข้อมูลของ Member ทั้งหมด <br>
  - เพิ่ม ลบ แก้ไข ข้อมูลMember ได้ทุกคน แต่ไม่สามารถดู Password ของ Member ได้ <br>
  - ค้นหาข้อมูล ของ Member ได้ตรงมุมขวา สามารถพิมพ์ค้นหาได้เลย
- Brand<br>
  - แสดงตารางข้อมูลของ Brand ทั้งหมด <br>
  - เพิ่ม ลบ แก้ไข ข้อมูลBrand<br>
  - Auto BrandID<br>
  - ค้นหาข้อมูล ของ Brand ได้ตรงมุมขวา สามารถพิมพ์ค้นหาได้เลย
- Product<br>
  - แสดงตารางข้อมูลของ Product ทั้งหมด <br>
  - Auto BrandID<br>
  - เพิ่ม ลบ แก้ไข ข้อมูล Product<br>
  - ค้นหาข้อมูล ของ Product ได้ตรงมุมขวา สามารถพิมพ์ค้นหาได้เลย
- Order<br>
  - แสดงตารางข้อมูลของ Order ทั้งหมด <br>
  - สามารถเลือก Order ที่จะแสดงได้ เช่น confirmed หรือ not confirmed
  - ดู อัพเดทสถานะ และ ลบ ข้อมูล Order ได้ทุกออเดอร์ แต่ไม่สามารถลบ Order ที่ สถานะเป็น confirmed ได้ <br>
  - ค้นหาข้อมูล ของ Order ได้ตรงมุมขวา สามารถพิมพ์ค้นหาได้เลย
