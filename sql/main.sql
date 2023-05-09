-- Database: Web_Ban_Hang

-- DROP DATABASE IF EXISTS "Web_Ban_Hang";

CREATE DATABASE "Web_Ban_Hang"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- INSERT VALUE FOR TABLE USER
INSERT INTO "user" (user_id, email, address, phone, avatar_link, fullname, hashpass, role)
VALUES ('2kfvzy6d4lf7r5sk4', 'dev@gmail.com', 'KHTN', '0123456789', '',
		'Nguyen Dinh Phong','$2a$08$HX9Nnwi82NdMZWS4MmORiuwZ6jhTMPnVPw/bqVeQUcUhyicdFvpc.','normal_user');	
		
INSERT INTO "user" (user_id, email, address, phone, avatar_link, fullname, hashpass, role)
VALUES ('2kfvzy6d4lf7r5slf', 'dev1@gmail.com', 'KHTN', '0123456789', '',
		'No Name Group','$2a$08$HX9Nnwi82NdMZWS4MmORiuwZ6jhTMPnVPw/bqVeQUcUhyicdFvpc.','seller');

INSERT INTO "user" (user_id, email, address, phone, avatar_link, fullname, hashpass, role)
VALUES ('2kfvzy6qklf7r6k5f', 'admin@gmail.com', 'Admin Address', '0123456789', '',
		'Admin','$2a$08$HX9Nnwi82NdMZWS4MmORiuwZ6jhTMPnVPw/bqVeQUcUhyicdFvpc.','admin');
		
-- INSERT VALUE FOR TABLE PRODUCT
INSERT INTO "product" (product_id, owner_id, original_price, sale_price, name, detail, stock, 
                                        image_link, average_rate, sold_amount, type, brand, available, accept)
VALUES ('0', '2kfvzy6d4lf7r5slf', 24990000, 18490000, 'Laptop Asus Zenbook Flip 13 OLED UX363EA-HP726W', 
'13.3inch Full HD/Intel Core i5-1135G7/8GB/512GB SSD/Windows 11 Home/1.3kg', 300, 'https://lh3.googleusercontent.com/cc5g1yz6Mp_pdmUoVvVIY_A-GO9m72f19iaA8_2-4bkkwmHzbdYgM0ob-hJZU1yPPaIcopc-8J9gLO2zyfkp2OGoF3GNm8xS=w1000-rw',5, 50, 
'laptop', 'Asus', True, True);

INSERT INTO "product" (product_id, owner_id, original_price, sale_price, name, detail, stock, 
                                        image_link, average_rate, sold_amount, type, brand, available, accept)
VALUES ('1', '2kfvzy6d4lf7r5slf', 31900000, 28890000, 'MacBook Air 2022 13.6 inch MLY33SA/A', 
'M2/ 8GB/ SSD 256GB/ Onboard/ macOS/ 1.3kg', 100, 'https://lh3.googleusercontent.com/T4dQPx6nSJi3y147mwJH6kDJsxM6ULAAtIoZjgDDIi3yF5YpFYW7QbWh_nfT0Lhi2LxIDFuNPMamXlrBW-EcZ1NUGYBZ6VqbLw=w500-rw',5, 30, 
'laptop', 'MacBook', True, True);
    

INSERT INTO "product" (product_id, owner_id, original_price, sale_price, name, detail, stock, 
                                        image_link, average_rate, sold_amount, type, brand, available, accept)
VALUES ('2', '2kfvzy6d4lf7r5slf', 24490000, 21300000, 'Laptop MSI GF63 Thin 11UC', 
'i7-11800H/RAM 8GB/RTX 3050/512GB SSD/ Windows 10', 300, 'https://lh3.googleusercontent.com/uT6TQtXUhjrUx0zsDhb836NTYPwxyyDxXzxKY0qM-McJOzPvmmb_-d6UL2ZsC3EUtgOyfGeGbhFRUf_wF7CX851C_yuM6f_U=w500-rw',4.2, 250, 
'laptop', 'MSI', True, True);


INSERT INTO "product" (product_id, owner_id, original_price, sale_price, name, detail, stock,
                                        image_link, average_rate, sold_amount, type, brand, available, accept)
VALUES ('3', '2kfvzy6d4lf7r5slf', 20990000, 17690000, 'Laptop Asus Vivobook 15X OLED A1503ZA-L1422W',
'15.6Inch Full HD/Intel Core i5-12500H/8GB/512GB SSD/Windows 11 Home/1.7kg', 200, 'https://lh3.googleusercontent.com/ZPh7gfPRD6UrLh5zr6k4Zmk5NYoYC0AD_1p8gGexbKQT8W3SR1H2cCGlOTq5SVXxF28EDcIUBF9ntAB3K3XIl84RR0AeOtmy=w500-rw',4.4, 120,
'laptop', 'Asus', True, True);


INSERT INTO "product" (product_id, owner_id, original_price, sale_price, name, detail, stock,
                                        image_link, average_rate, sold_amount, type, brand, available, accept)
VALUES ('4', '2kfvzy6d4lf7r5slf', 33790000, 29590000, 'Laptop ACER Nitro AN515-58-773Y',
'i7-12700H/RAM 8GB/RTX 3050Ti/512GB SSD/ Windows 11', 150, 'https://lh3.googleusercontent.com/OyIhGGxumpQIsk8jL9Zv4vHiy0q-igYnY_OGg41VPOnkVgFXvOn0kfY1_C9Tzwb4bjEdFLi-WexmvOHIzTP9e6o1PPF3UqTa=w500-rw',4.7, 43,
'laptop', 'ACER', True, True);


INSERT INTO "product" (product_id, owner_id, original_price, sale_price, name, detail, stock,
                                        image_link, average_rate, sold_amount, type, brand, available, accept)
VALUES ('5', '2kfvzy6d4lf7r5slf', 14790000, 12890000, 'Laptop ACER Aspire 3 A315-59-381E',
'i3-1215U/RAM 8GB/512GB SSD/ Windows 11', 400, 'https://lh3.googleusercontent.com/1S6Ltn5pJWSMWh0U6V4w80Di1Lq8AVQhuDOzVHbQPmxwcztwofrF_3gyuy7Pk8AJ73MVFCYDgm4r1orx6eh88iwVj9nDyXk=w500-rw',4.0, 200,
'laptop', 'ACER', True, True);


INSERT INTO "product" (product_id, owner_id, original_price, sale_price, name, detail, stock,
                                        image_link, average_rate, sold_amount, type, brand, available, accept)
VALUES ('6', '2kfvzy6d4lf7r5slf', 22990000, 20390000, 'Laptop Dell Inspiron 14 5420',
'i5-1235U/RAM 8GB/512GB SSD/ Windows 11 + Office', 500, 'https://lh3.googleusercontent.com/1pScR2frEB3Idd3r7YIkQ67B3F0N0-iVx7SWStAxIU79sbdx2J_g59-O5Vlnq3lQ7D1kFAz_FNqFNawv4oycvfkLdZXf0vc9ww=w500-rw',4.8, 200,
'laptop', 'Dell', True, True);


INSERT INTO "product" (product_id, owner_id, original_price, sale_price, name, detail, stock,
                                        image_link, average_rate, sold_amount, type, brand, available, accept)
VALUES ('7', '2kfvzy6d4lf7r5slf', 26490000, 23990000, 'Laptop Dell Gaming G15 5515',
'Ryzen 5 6600H/RAM 8GB/NVIDIA GeForce RTX 3050/512GB SSD/ Windows 11', 400, 'https://lh3.googleusercontent.com/3u4cnDPo-P3jzbMNDp4ZTsPWjLGKgj3YKDCfIJ4XP5OJrE8_lsPO9uv_ErigpWFSZ1nVWKvslwMrFrFjFZssgdFblFZJucfo=w500-rw',5.0, 40,
'laptop', 'Dell', True, True);


INSERT INTO "product" (product_id, owner_id, original_price, sale_price, name, detail, stock,
                                        image_link, average_rate, sold_amount, type, brand, available, accept)
VALUES ('8', '2kfvzy6d4lf7r5slf', 24990000, 19990000, 'Laptop Lenovo Yoga Slim 7 Pro 14IHU5 O ',
'i5-11320H/RAM 16GB/512GB SSD/ Windows 11', 200, 'https://lh3.googleusercontent.com/P5RJ8aZpY1EMjshLpnErPTzNHW6WIsmrfuSVRzl9ogBWHc4oCm08vPYTGsB0d3jBhrjjGbPv6dh6iKtEF6mGMLixVrnLFyI5=w500-rw',4.5, 20,
'laptop', 'Lenovo', True, True);


INSERT INTO "product" (product_id, owner_id, original_price, sale_price, name, detail, stock,
                                        image_link, average_rate, sold_amount, type, brand, available, accept)
VALUES ('9', '2kfvzy6d4lf7r5slf', 25490000, 20490000, 'Laptop HP Victus 16-e1107AX',
'Ryzen 5 6600H/RAM 8GB/512GB SSD/ Windows 11', 100, 'https://lh3.googleusercontent.com/YU6oxG2QtC_1Bc9pv4ykzK_ldevPNz6YGKrNJ4KshpcG-eNURyzSqlTpzu1ZZ-Dl-8-0Dm_bq0kopcD5BMJU4X8x3MUnDt4C=w500-rw',3.8, 90,
'laptop', 'HP', True, True);


INSERT INTO "product" (product_id, owner_id, original_price, sale_price, name, detail, stock,
                                        image_link, average_rate, sold_amount, type, brand, available, accept)
VALUES ('10', '2kfvzy6d4lf7r5slf', 26990000, 24390000, 'Laptop GIGABYTE G5 KD',
'i5-11400H/RAM 16GB/512GB SSD/ Windows 11', 300, 'https://lh3.googleusercontent.com/K8-muTXgikgPTktDZSNcTziWvLay4e5b5eS_O2ACcNY4REDQTocX1HCbGK56R_sgIFjO2OA97c5T00fYmyfmdGB24g8JREHe4A=w500-rw',4.9, 100,
'laptop', 'GIGABYTE', True, True);


INSERT INTO "product" (product_id, owner_id, original_price, sale_price, name, detail, stock,
                                        image_link, average_rate, sold_amount, type, brand, available, accept)
VALUES ('11', '2kfvzy6d4lf7r5slf', 39990000, 36090000, 'Laptop LG Gram 16ZD90Q',
'i5-1240P/RAM 16GB/512GB SSD/ Free DOS', 500, 'https://lh3.googleusercontent.com/6kD3IwBUpUV2CEmshJ4jZU5WftuyTzuQguV8WURYLZFHtWw0A1ZZ44j76jfNlsJNG7SoG3cwBC1BirQhFq7Hb45NasEQ6Ah1=w500-rw',4.2, 247,
'laptop', 'LG', True, True);


INSERT INTO "product" (product_id, owner_id, original_price, sale_price, name, detail, stock,
                                        image_link, average_rate, sold_amount, type, brand, available, accept)
VALUES ('12', '2kfvzy6d4lf7r5slf', 38990000, 30790000, 'iPhone 14 Pro Max',
'LTPO Super Retina XDR OLED - 120Hz/ Camera sau: 48MP, 2x 12MP/ Camera trước: 12MP/ CPU: A16 Bionic/  Bộ nhớ: 256GB/ RAM: 6GB/ Hệ điều hành: IOS', 700, 'https://lh3.googleusercontent.com/GYRlKNDvBi3hMxPAfX1b6qKnN7eXWUHPvjqobPzCm3vUZAWM3B2wmB_X1GRehwUje7H71iRhH-28E7tbluDtSoOez35Ozkjk=w500-rw',5, 300,
'phone', 'iphone', True, True);


INSERT INTO "product" (product_id, owner_id, original_price, sale_price, name, detail, stock,
                                        image_link, average_rate, sold_amount, type, brand, available, accept)
VALUES ('13', '2kfvzy6d4lf7r5slf', 24990000, 15990000, 'iPhone 12',
'6.1 OLED - Super Retina XDR/ Camera sau: 2x 12MP/ Camera trước: 12MP/  CPU: Apple A14 Bionic/ Bộ nhớ: 64GB/ RAM: 4GB/ Hệ điều hành: IOS', 400, 'https://lh3.googleusercontent.com/n2_m2bxNsT-FdBu0cCWZg5ffkiM1pxFl4-v_PD6M8-x6HNl8eL0PKG0dYnvI1Prs8HKddEBREwiWApcSlcE=w500-rw',4.9, 100,
'phone', 'iphone', True, True);


INSERT INTO "product" (product_id, owner_id, original_price, sale_price, name, detail, stock,
                                        image_link, average_rate, sold_amount, type, brand, available, accept)
VALUES ('14', '2kfvzy6d4lf7r5slf', 4000000, 3590000, 'Xiaomi Redmi 12C 128GB',
'181g, 8.9mm thickness, Android 11, MIUI 12.5, 128GB storage, microSDXC', 100, 'https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/303163/xiaomi-redmi-12c-green-thumb-600x600.jpg',4.6, 92,
'phone', 'xiaomi', True, True);


INSERT INTO "product" (product_id, owner_id, original_price, sale_price, name, detail, stock,
                                        image_link, average_rate, sold_amount, type, brand, available, accept)
VALUES ('15', '2kfvzy6d4lf7r5slf', 3990000, 3290000, 'Xiaomi Redmi 9C',
' 6.53 IPS LCD/ Camera sau: 13MP, 2x 2MP/ Camera trước: 5MP/ CPU: Mediatek Helio G35/ Bộ nhớ: 128GB/  RAM: 4GB/ Hệ điều hành: Android', 300, 'https://lh3.googleusercontent.com/16i9VnhPllXNNzjyxfhneMWoaBog0NMNk9MtplvbnISH4u4IzdGGCx__qblm5aoQ8biVjxd5RdYlLdorOaUcked4BNd2caDDgQ=w500-rw',4.2, 28,
'phone', 'xiaomi', True, True);


INSERT INTO "product" (product_id, owner_id, original_price, sale_price, name, detail, stock,
                                        image_link, average_rate, sold_amount, type, brand, available, accept)
VALUES ('16', '2kfvzy6d4lf7r5slf', 9990000, 7790000, 'Samsung Galaxy A53 5G',
'6.5 Super AMOLED/ Camera sau: 12MP, 64MP, 2 x 5MP/ Camera trước: 32MP/ Bộ nhớ: 128GB/ RAM: 8GB/ Hệ điều hành: Android', 600, 'https://lh3.googleusercontent.com/Oea3qRYweE0VKShlm36L8jP9yo6-pm8OzGrchG-zLLr1LvKWG_YMXiuITT1iazkaCv-cRJiKmqiJiNwbc8d1Pk_GVSC-EOU=w500-rw',4.4, 263,
'phone', 'samsung', True, True);


INSERT INTO "product" (product_id, owner_id, original_price, sale_price, name, detail, stock,
                                        image_link, average_rate, sold_amount, type, brand, available, accept)
VALUES ('17', '2kfvzy6d4lf7r5slf', 24990000, 22990000, 'Điện thoại Samsung Galaxy S23',
'6.1 Dynamic AMOLED 2X/ Camera sau: 50MP, 12MP, 10MP/ Camera trước: 12MP/ CPU: Snapdragon 8 Gen 2/ Bộ nhớ: 256GB/ RAM: 8GB/ Hệ điều hành: Android', 1000, 'https://lh3.googleusercontent.com/kwlxVp58YTMBQRwCkVB3_hQcXfSufP4EWAKjRQkWvqBXM07va6Q-wxJeJ0MML0nnVyc4kIBqrUfwdYpmLt5knD974PAbF5E2QQ=w500-rw',4.8, 572,
'phone', 'samsung', True, True);


INSERT INTO "product" (product_id, owner_id, original_price, sale_price, name, detail, stock,
                                        image_link, average_rate, sold_amount, type, brand, available, accept)
VALUES ('18', '2kfvzy6d4lf7r5slf', 3545250, 3000000, 'Huawei Enjoy 50z picture',
'188g, 8.9mm thickness/ HarmonyOS 2.0/ 128GB/256GB storage, microSDXC', 400, 'https://fdn2.mobgsm.com/vv/pics/huawei/huawei-enjoy-50z-1.jpg',3.5, 372,
'phone', 'Huawei', True, True);


INSERT INTO "product" (product_id, owner_id, original_price, sale_price, name, detail, stock,
                                        image_link, average_rate, sold_amount, type, brand, available, accept)
VALUES ('19', '2kfvzy6d4lf7r5slf', 13990000, 10990000, 'Điện thoại OPPO Reno8 T 5G',
'AMOLED6.7 Full HD+/ Camera sau: Chính 108 MP & Phụ 2 MP, 2 MP/ Camera trước: 32MP/ Bộ nhớ: 256GB/ RAM: 8 GB/ Hệ điều hành: Android ', 1500, 'https://cdn.tgdd.vn/Products/Images/42/301642/oppo-reno8-t-vang-5g-1.jpg',4.1, 328,
'phone', 'OPPO', True, True);