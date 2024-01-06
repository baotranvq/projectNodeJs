CREATE table categories (
    id int(11) auto_increment primary key,
    name varchar(255)
);
create table colors (
	id int(11) auto_increment primary key,
    color_name varchar(255)
);
create table sizes (
	id int(11) auto_increment primary KEY,
    size_name varchar(25)
);
create table images(
	id int(11) auto_increment primary KEY,
    thumbnail_1 varchar(255),
    big_image_1 varchar(255),
    thumbnail_2 varchar(255),
    big_image_2 varchar(255),
    thumbnail_3 varchar(255),
    big_image_3 varchar(255),
    thumbnail_4 varchar(255),
    big_image_4 varchar(255)
);
create table product(
	id int(11) auto_increment primary KEY,
    product_name varchar(255),
    description text,
    price float,
    promotion_price float,
    quantity int(11),
    created date,
    status int(11),
    color_id int(11),
    size_id int(11),
    image_id int(11),
    categories_id int(11),
    FOREIGN KEY (color_id) REFERENCES colors (id),
    FOREIGN KEY (size_id) REFERENCES sizes (id),
    FOREIGN KEY (image_id) REFERENCES images (id),
    FOREIGN KEY (categories_id) REFERENCES categories (id)
);
INSERT INTO `images` (`id`, `thumbnail_1`, `big_image_1`, `thumbnail_2`, `big_image_2`, `thumbnail_3`, `big_image_3`, `thumbnail_4`, `big_image_4`) VALUES (NULL, 'jordan-nu-retro-1-low-thumbnail1.png', 'jordan-nu-retro-1-low-big1.png', 'jordan-nu-retro-1-low-thumbnail2.png', 'jordan-nu-retro-1-low-big2.png', 'jordan-nu-retro-1-low-thumbnail3.png', 'jordan-nu-retro-1-low-big3.png', 'jordan-nu-retro-1-low-thumbnail4.png', 'jordan-nu-retro-1-low-big4.png');
INSERT INTO `sizes` (`id`, `size_name`) VALUES (NULL, 'EU 42'), (NULL, 'EU 43');


CREATE TABLE orderguest (
    orderguest_id int(11) AUTO_INCREMENT PRIMARY KEY,
    customer_name varchar(255),
    customer_email varchar(255),
    customer_phone varchar(255),
    customer_address varchar(255),
    orderguest_product_id int(11),
    orderguest_total_price 	decimal(10,2),
    orderguest_quantity int(11),
    orderguest_date date,
   	orderguest_status int(11),
    FOREIGN KEY (orderguest_product_id) REFERENCES product(product_id)
)

create table orders (
	order_id int(11) PRIMARY KEY AUTO_INCREMENT,
    id_user int(11),
    total_price decimal(10),
    payment varchar(255),
    careted_at date,
    FOREIGN KEY (id_user) REFERENCES users(id)
)

CREATE TABLE order_detail (
	order_detail_id int(11) PRIMARY KEY AUTO_INCREMENT,
    order_id int(11),
    product_id int(11),
    size_id int(11),
    color_id int(11),
    order_detail_quantity int(11),
    payment varchar(255),
    order_detail_created date,
    order_detail_phone int(11),
    order_detail_address varchar(255),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES product(product_id),
    FOREIGN KEY (size_id) REFERENCES sizes(size_id),
    FOREIGN KEY (color_id) REFERENCES colors(color_id)
)
