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

